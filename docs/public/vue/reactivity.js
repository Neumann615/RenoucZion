/**
 * @vue/reactivity v3.5.26
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/
import {
    extend,
    hasChanged,
    isArray,
    isIntegerKey,
    isSymbol,
    isMap,
    hasOwn,
    makeMap,
    isObject,
    capitalize,
    toRawType,
    def,
    isFunction,
    EMPTY_OBJ,
    isSet,
    isPlainObject,
    remove,
    NOOP
} from './shared.js';

function warn(msg, ...args) {
    console.warn(`[Vue warn] ${msg}`, ...args);
}
// Vue 3 响应式系统中副作用（Effect）的生命周期管理器。它的核心思想是为副作用创建一个可管理的作用域边界，使得副作用的创建、追踪、暂停、恢复和清理能够在一个可控的范围内进行
let activeEffectScope;

class EffectScope {
    constructor(detached = false) {
        // 是否为独立的作用域
        this.detached = detached;
        /**
         * @internal
         */
        // 作用域是否活跃
        this._active = true;
        /**
         * @internal track `on` calls, allow `on` call multiple times
         */
        // on 调用计数器
        this._on = 0;
        /**
         * @internal
         */
        // 管理的副作用数组
        this.effects = [];
        /**
         * @internal
         */
        // 清理函数数组
        this.cleanups = [];
        // 是否暂停
        this._isPaused = false;
        // 父作用域
        this.parent = activeEffectScope;
        // 非独立作用域链接到父作用域
        if (!detached && activeEffectScope) {
            this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
                this
            ) - 1;
        }
    }

    get active() {
        return this._active;
    }

    pause() {
        if (this._active) {
            this._isPaused = true;
            let i, l;
            if (this.scopes) {
                for (i = 0, l = this.scopes.length; i < l; i++) {
                    this.scopes[i].pause();
                }
            }
            for (i = 0, l = this.effects.length; i < l; i++) {
                this.effects[i].pause();
            }
        }
    }

    /**
     * Resumes the effect scope, including all child scopes and effects.
     */
    resume() {
        if (this._active) {
            if (this._isPaused) {
                this._isPaused = false;
                let i, l;
                if (this.scopes) {
                    for (i = 0, l = this.scopes.length; i < l; i++) {
                        this.scopes[i].resume();
                    }
                }
                for (i = 0, l = this.effects.length; i < l; i++) {
                    this.effects[i].resume();
                }
            }
        }
    }
    // 上下文切换
    run(fn) {
        if (this._active) {
            const currentEffectScope = activeEffectScope;
            try {
                activeEffectScope = this;
                return fn();
            } finally {
                activeEffectScope = currentEffectScope;
            }
        } else if (!!('production' !== 'production')) {
            warn(`cannot run an inactive effect scope.`);
        }
    }

    // 引用计数激活,这只应在非分离的作用域上调用
    on() {
        if (++this._on === 1) {
            this.prevScope = activeEffectScope;
            activeEffectScope = this;
        }
    }

    // 引用计数激活,这只应在非分离的作用域上调用
    off() {
        if (this._on > 0 && --this._on === 0) {
            activeEffectScope = this.prevScope;
            this.prevScope = void 0;
        }
    }
    // 停止清理
    stop(fromParent) {
        if (this._active) {
            this._active = false;
            let i, l;
            for (i = 0, l = this.effects.length; i < l; i++) {
                this.effects[i].stop();
            }
            this.effects.length = 0;
            for (i = 0, l = this.cleanups.length; i < l; i++) {
                this.cleanups[i]();
            }
            this.cleanups.length = 0;
            if (this.scopes) {
                for (i = 0, l = this.scopes.length; i < l; i++) {
                    this.scopes[i].stop(true);
                }
                this.scopes.length = 0;
            }
            if (!this.detached && this.parent && !fromParent) {
                const last = this.parent.scopes.pop();
                if (last && last !== this) {
                    this.parent.scopes[this.index] = last;
                    last.index = this.index;
                }
            }
            this.parent = void 0;
        }
    }
}
// 简单的工厂函数，用于创建 EffectScope实例
function effectScope(detached) {
    return new EffectScope(detached);
}
// 返回当前激活的 EffectScope 实例。它是 Vue 3 响应式系统中作用域栈管理的关键访问器
function getCurrentScope() {
    return activeEffectScope;
}
// 注册清理函数的工具函数，它将清理函数注册到当前活跃的 EffectScope 中，在作用域停止时自动执行
function onScopeDispose(fn, failSilently = false) {
    if (activeEffectScope) {
        activeEffectScope.cleanups.push(fn);
    } else if (!!('production' !== 'production') && !failSilently) {
        warn(
            `onScopeDispose() is called when there is no active effect scope to be associated with.`
        );
    }
}
// 在 Vue 3 的响应式系统中跟踪当前激活的订阅（Subscription）或副作用（Effect）。它是一个关键的内部状态变量，用于管理响应式依赖的收集和追踪
let activeSub;
// 管理副作用（Effect）的各种状态
const EffectFlags = {
    // 副作用是否处于活跃状态
    "ACTIVE": 1,
    "1": "ACTIVE",
    // 副作用当前是否正在执行
    "RUNNING": 2,
    "2": "RUNNING",
    // 副作用是否正在收集依赖
    "TRACKING": 4,
    "4": "TRACKING",
    // 副作用已被通知需要重新执行
    "NOTIFIED": 8,
    "8": "NOTIFIED",
    // 计算属性的值已过期，需要重新计算
    "DIRTY": 16,
    "16": "DIRTY",
    // 允许副作用在执行过程中触发自身的重新执行
    "ALLOW_RECURSE": 32,
    "32": "ALLOW_RECURSE",
    // 副作用被暂停，不执行更新
    "PAUSED": 64,
    "64": "PAUSED",
    // 副作用已经被评估/计算过
    "EVALUATED": 128,
    "128": "EVALUATED"
};
// 为响应式效果、EffectScope 和 WatchHandle 提供暂停/恢复功能
const pausedQueueEffects = new WeakSet();
// 响应式系统的基石，它实现了精确的依赖跟踪、高效的批处理更新和完整的生命周期管理。通过位运算优化状态管理，使用双向链表优化依赖清理，为 Vue 的响应式特性提供了坚实的基础
class ReactiveEffect {
    constructor(fn) {
        this.fn = fn;
        this.deps = void 0;
        this.depsTail = void 0;
        this.flags = 1 | 4;
        this.next = void 0;
        this.cleanup = void 0;
        this.scheduler = void 0;
        if (activeEffectScope && activeEffectScope.active) {
            activeEffectScope.effects.push(this);
        }
    }

    pause() {
        this.flags |= 64;
    }

    resume() {
        if (this.flags & 64) {
            this.flags &= -65;
            if (pausedQueueEffects.has(this)) {
                pausedQueueEffects.delete(this);
                this.trigger();
            }
        }
    }

    notify() {
        if (this.flags & 2 && !(this.flags & 32)) {
            return;
        }
        if (!(this.flags & 8)) {
            batch(this);
        }
    }

    run() {
        if (!(this.flags & 1)) {
            return this.fn();
        }
        this.flags |= 2;
        cleanupEffect(this);
        prepareDeps(this);
        const prevEffect = activeSub;
        const prevShouldTrack = shouldTrack;
        activeSub = this;
        shouldTrack = true;
        try {
            return this.fn();
        } finally {
            if (!!('production' !== 'production') && activeSub !== this) {
                warn(
                    "Active effect was not restored correctly - this is likely a Vue internal bug."
                );
            }
            cleanupDeps(this);
            activeSub = prevEffect;
            shouldTrack = prevShouldTrack;
            this.flags &= -3;
        }
    }

    stop() {
        if (this.flags & 1) {
            for (let link = this.deps; link; link = link.nextDep) {
                removeSub(link);
            }
            this.deps = this.depsTail = void 0;
            cleanupEffect(this);
            this.onStop && this.onStop();
            this.flags &= -2;
        }
    }

    trigger() {
        if (this.flags & 64) {
            pausedQueueEffects.add(this);
        } else if (this.scheduler) {
            this.scheduler();
        } else {
            this.runIfDirty();
        }
    }

    runIfDirty() {
        if (isDirty(this)) {
            this.run();
        }
    }

    get dirty() {
        return isDirty(this);
    }
}

// 控制批处理嵌套层级的关键变量
let batchDepth = 0;
// 存储待执行的普通响应式效果（非计算属性）的队列
let batchedSub;
// 存储待执行的计算属性效果的队列
let batchedComputed;
// 将响应式效果加入批处理队列的核心函数
function batch(sub, isComputed = false) {
    sub.flags |= 8;
    if (isComputed) {
        sub.next = batchedComputed;
        batchedComputed = sub;
        return;
    }
    sub.next = batchedSub;
    batchedSub = sub;
}
// 增加 batchDepth 计数器来标记一个批处理周期的开始，这确保在批处理期间触发的响应式更新不会立即执行，而是被排队等待批处理结束后统一处理
function startBatch() {
    batchDepth++;
}
// 负责在批处理周期结束时执行所有排队的 effect。它首先检查 batchDepth，只有当计数器归零时才真正执行更新，这支持了嵌套批处理
function endBatch() {
    // 首先递减 batchDepth，如果仍大于 0 则直接返回，等待最外层的 endBatch() 调用
    if (--batchDepth > 0) {
        return;
    }
    // 优先处理 batchedComputed 队列，确保计算属性在普通 effect 之前更新，这维护了计算属性的依赖关系正确性
    if (batchedComputed) {
        let e = batchedComputed;
        batchedComputed = void 0;
        while (e) {
            const next = e.next;
            e.next = void 0;
            e.flags &= -9;
            e = next;
        }
    }
    let error;
    while (batchedSub) {
        let e = batchedSub;
        batchedSub = void 0;
        while (e) {
            const next = e.next;
            e.next = void 0;
            e.flags &= -9;
            if (e.flags & 1) {
                try {
                    ;
                    e.trigger();
                } catch (err) {
                    if (!error) error = err;
                }
            }
            e = next;
        }
    }
    if (error) throw error;
}
// 在 effect 执行前被调用，用于标记所有现有依赖项为"可能未使用"状态，为后续的依赖清理做准备
function prepareDeps(sub) {
    for (let link = sub.deps; link; link = link.nextDep) {
        link.version = -1;
        link.prevActiveLink = link.dep.activeLink;
        link.dep.activeLink = link;
    }
}
// 在 effect 执行后被调用，用于移除在当前 effect 运行中未被访问的依赖项，实现自动的依赖管理
function cleanupDeps(sub) {
    let head;
    let tail = sub.depsTail;
    let link = tail;
    while (link) {
        const prev = link.prevDep;
        if (link.version === -1) {
            if (link === tail) tail = prev;
            removeSub(link);
            removeDep(link);
        } else {
            head = link;
        }
        link.dep.activeLink = link.prevActiveLink;
        link.prevActiveLink = void 0;
        link = prev;
    }
    sub.deps = head;
    sub.depsTail = tail;
}
// 判断订阅者（effect 或 computed）是否需要重新执行
function isDirty(sub) {
    for (let link = sub.deps; link; link = link.nextDep) {
        // 每个依赖（Dep）都有一个 version 属性，当依赖发生变化时会递增，链接（Link）保存了订阅者上次访问时的版本号。通过比较这两个版本号，可以高效地判断依赖是否发生了变化
        if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) {
            return true;
        }
    }
    if (sub._dirty) {
        return true;
    }
    return false;
}
// 刷新 computed 值的核心方法，它实现了 computed 的懒加载和缓存机制，确保了 computed 值只在真正需要时才重新计算，大大提升了性能
function refreshComputed(computed) {
    // 如果 computed 正在追踪依赖但不是脏状态，直接返回
    if (computed.flags & 4 && !(computed.flags & 16)) {
        return;
    }
    // 清除脏标记
    computed.flags &= -17;
    // 如果全局版本号未变化，说明没有响应式更新，直接返回。这是重要的性能优化
    if (computed.globalVersion === globalVersion) {
        return;
    }
    computed.globalVersion = globalVersion;
    // 在非 SSR 环境下，如果 computed 已评估且依赖未变化，则不需要重新计算
    if (!computed.isSSR && computed.flags & 128 && (!computed.deps && !computed._dirty || !isDirty(computed))) {
        return;
    }
    computed.flags |= 2;
    const dep = computed.dep;
    const prevSub = activeSub;
    const prevShouldTrack = shouldTrack;
    activeSub = computed;
    shouldTrack = true;
    // 设置 RUNNING 标志，准备依赖追踪，执行计算函数，并在值变化时更新缓存和版本号
    try {
        prepareDeps(computed);
        const value = computed.fn(computed._value);
        if (dep.version === 0 || hasChanged(value, computed._value)) {
            computed.flags |= 128;
            computed._value = value;
            dep.version++;
        }
    } catch (err) {
        dep.version++;
        throw err;
    } finally {
        // 恢复追踪上下文，清理未使用的依赖，清除 RUNNING 标志
        activeSub = prevSub;
        shouldTrack = prevShouldTrack;
        cleanupDeps(computed);
        computed.flags &= -3;
    }
}
// 用于移除订阅者的核心方法，负责维护依赖和订阅者之间的双向链表关系
function removeSub(link, soft = false) {
    // 更新前驱和后继节点的指针，将当前链接从双向链表中移除
    const { dep, prevSub, nextSub } = link;
    if (prevSub) {
        prevSub.nextSub = nextSub;
        link.prevSub = void 0;
    }
    if (nextSub) {
        nextSub.prevSub = prevSub;
        link.nextSub = void 0;
    }
    // 如果移除的是链表头部，更新头指针
    if (!!('production' !== 'production') && dep.subsHead === link) {
        dep.subsHead = nextSub;
    }
    // 如果移除的是链表尾部，更新尾指针。对于 computed 值，当失去所有订阅者时，停止追踪其依赖
    if (dep.subs === link) {
        dep.subs = prevSub;
        if (!prevSub && dep.computed) {
            dep.computed.flags &= -5;
            for (let l = dep.computed.deps; l; l = l.nextDep) {
                removeSub(l, true);
            }
        }
    }
    // 在非软移除模式下，如果依赖的订阅者计数归零，从依赖映射中删除该依赖
    if (!soft && !--dep.sc && dep.map) {
        dep.map.delete(dep.key);
    }
}
// 响应式系统中用于从订阅者的依赖链表中移除指定链接的工具函数
function removeDep(link) {
    // 从 Link 对象中提取前驱节点 prevDep 和后继节点 nextDep
    const { prevDep, nextDep } = link;
    // 如果存在前驱节点，将其 nextDep 指向当前节点的后继节点，并清除当前节点的 prevDep 指针
    if (prevDep) {
        prevDep.nextDep = nextDep;
        link.prevDep = void 0;
    }
    // 如果存在后继节点，将其 prevDep 指向当前节点的前驱节点，并清除当前节点的 nextDep 指针
    if (nextDep) {
        nextDep.prevDep = prevDep;
        link.nextDep = void 0;
    }
}
// 响应式系统的核心入口，用于创建响应式副作用。
function effect(fn, options) {
    // 检查传入的 fn 是否已经是一个 effect runner，如果是则提取其原始函数
    if (fn.effect instanceof ReactiveEffect) {
        fn = fn.effect.fn;
    }
    // 创建 ReactiveEffect 实例并合并options选项
    const e = new ReactiveEffect(fn);
    if (options) {
        extend(e, options);
    }
    // 立即执行 effect 以建立初始依赖关系。如果执行失败，会清理 effect 并重新抛出错误
    try {
        e.run();
    } catch (err) {
        e.stop();
        throw err;
    }
    // 返回绑定的 runner 函数，并在其上挂载 effect 实例引用
    const runner = e.run.bind(e);
    runner.effect = e;
    return runner;
}
// 用于停止响应式副作用的工具函数，它通过调用 effect 实例的 stop() 方法来清理所有依赖关系。
function stop(runner) {
    runner.effect.stop();
}
// 全局标志，在 track 函数中检查以决定是否建立依赖关系
let shouldTrack = true;
// 保存历史状态，支持嵌套调用
const trackStack = [];
// 保存当前状态后修改全局标志shouldTrack false
function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
}
// 保存当前状态后修改全局标志shouldTrack true
function enableTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = true;
}
// 恢复上一个状态，栈为空时默认为 true
function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === void 0 ? true : last;
}

// 为当前活跃的响应式 effect 注册清理回调，该回调会在 effect 重新运行之前或 effect 停止时执行
function onEffectCleanup(fn, failSilently = false) {
    // 检查是否存在活跃的 ReactiveEffect 实例(activeSub)
    if (activeSub instanceof ReactiveEffect) {
        activeSub.cleanup = fn;
    } else if (!!('production' !== 'production') && !failSilently) {
        warn(
            `onEffectCleanup() was called when there was no active effect to associate with.`
        );
    }
}
// 负责执行响应式 effect 的清理回调，确保清理过程在没有活跃 effect 上下文的环境中执行
function cleanupEffect(e) {
    // 从 effect 对象中提取 cleanup 函数
    const { cleanup } = e;
    // 立即将 e.cleanup 设为 undefined，防止重复执行
    e.cleanup = void 0;
    // 如果存在清理函数，则在特殊的上下文中执行：
    if (cleanup) {
        // 保存当前的 activeSub
        const prevSub = activeSub;
        // 将 activeSub 设为 undefined，确保清理过程不建立新的依赖关系
        activeSub = void 0;
        // 在 try/finally 块中执行清理函数，确保无论如何都会恢复 activeSub
        try {
            cleanup();
        } finally {
            activeSub = prevSub;
        }
    }
}
// globalVersion 在每次响应式数据变化时递增，为计算属性提供快速路径判断是否需要重新计算。
let globalVersion = 0;
// Link 表示一个双向关系：一个订阅者依赖于一个响应式数据源。由于响应式系统是多对多的关系（一个订阅者可以依赖多个数据源，一个数据源也可以被多个订阅者依赖），每个连接都需要一个 Link 实例。
class Link {
    constructor(sub, dep) {
        // 订阅者（Effect 或 Computed 实例）
        this.sub = sub;
        // 依赖（Dep 实例，代表一个响应式属性）
        this.dep = dep;
        // 版本号，用于跟踪链接的使用状态
        this.version = dep.version;
        // nextDep/prevDep: 在订阅者的依赖链表中的前后指针
        // nextSub/prevSub: 在依赖的订阅者链表中的前后指针
        // prevActiveLink: 保存之前的活跃链接状态
        this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
    }
}
// 负责管理依赖关系和触发更新
class Dep {

    constructor(computed) {
        // 关联的计算值实例
        this.computed = computed;
        // 版本号，每次触发时递增
        this.version = 0;
        // 当前活跃 effect 的链接
        this.activeLink = void 0;
        // 订阅者双向链表（尾）
        this.subs = void 0;
        // 用于对象属性依赖的清理
        this.map = void 0;
        this.key = void 0;
        // 订阅者计数器 
        this.sc = 0;
        //  标记用于跳过响应式处理 
        this.__v_skip = true;
        if (!!('production' !== 'production')) {
            // 仅在开发模式下使用，用于按正确顺序触发调试钩子
            this.subsHead = void 0;
        }
    }
    // 当响应式属性被访问时调用，建立当前活跃 effect 与此 dep 的连接
    track(debugInfo) {
        // 检查是否应该追踪（有活跃 effect 且允许追踪）
        if (!activeSub || !shouldTrack || activeSub === this.computed) {
            return;
        }
        let link = this.activeLink;
        // 创建或复用 Link 对象连接 effect 和 dep
        // 将 link 添加到 effect 的依赖链表和 dep 的订阅链表
        if (link === void 0 || link.sub !== activeSub) {
            link = this.activeLink = new Link(activeSub, this);
            if (!activeSub.deps) {
                activeSub.deps = activeSub.depsTail = link;
            } else {
                link.prevDep = activeSub.depsTail;
                activeSub.depsTail.nextDep = link;
                activeSub.depsTail = link;
            }
            addSub(link);
        } else if (link.version === -1) {
            link.version = this.version;
            if (link.nextDep) {
                const next = link.nextDep;
                next.prevDep = link.prevDep;
                if (link.prevDep) {
                    link.prevDep.nextDep = next;
                }
                link.prevDep = activeSub.depsTail;
                link.nextDep = void 0;
                activeSub.depsTail.nextDep = link;
                activeSub.depsTail = link;
                if (activeSub.deps === link) {
                    activeSub.deps = next;
                }
            }
        }
        // 在开发模式下触发 onTrack 钩子
        if (!!('production' !== 'production') && activeSub.onTrack) {
            activeSub.onTrack(
                extend(
                    {
                        effect: activeSub
                    },
                    debugInfo
                )
            );
        }
        return link;
    }
    // 当响应式属性值改变时调用
    trigger(debugInfo) {
        // 递增 version 和 globalVersion
        this.version++;
        globalVersion++;
        // 调用 notify() 通知所有订阅者
        this.notify(debugInfo);
    }
    // 实际执行通知过程
    notify(debugInfo) {
        // 启动批处理模式
        startBatch();
        try {
            // 在开发模式下按正确顺序触发 onTrigger 钩子
            if (!!('production' !== 'production')) {
                for (let head = this.subsHead; head; head = head.nextSub) {
                    if (head.sub.onTrigger && !(head.sub.flags & 8)) {
                        head.sub.onTrigger(
                            extend(
                                {
                                    effect: head.sub
                                },
                                debugInfo
                            )
                        );
                    }
                }
            }
            // 遍历所有订阅者，调用其 notify() 方法
            for (let link = this.subs; link; link = link.prevSub) {
                // 对于计算值，额外通知其自身的 dep
                if (link.sub.notify()) {
                    ;
                    link.sub.dep.notify();
                }
            }
        } finally {
            // 结束批处理
            endBatch();
        }
    }
}
// 将订阅者（effect 或 computed）添加到依赖的订阅列表中。
function addSub(link) {
    // 递增依赖的订阅者计数器 sc，用于跟踪有多少个订阅者
    link.dep.sc++;
    // 只有当订阅者设置了 TRACKING 标志（值为 4）时才进行处理
    if (link.sub.flags & 4) {
        const computed = link.dep.computed;
        // 当依赖关联的是计算值且这是第一个订阅者时
        // 当计算值获得第一个订阅者时，它会立即订阅自己的所有依赖，形成级联关系
        if (computed && !link.dep.subs) {
            // 启用计算值的追踪和脏标记标志
            computed.flags |= 4 | 16;
            // 递归订阅计算值的所有依赖
            for (let l = computed.deps; l; l = l.nextDep) {
                addSub(l);
            }
        }
        const currentTail = link.dep.subs;
        // 将新的订阅链接添加到依赖的订阅链表尾部
        if (currentTail !== link) {
            link.prevSub = currentTail;
            if (currentTail) currentTail.nextSub = link;
        }
        if (!!('production' !== 'production') && link.dep.subsHead === void 0) {
            link.dep.subsHead = link;
        }
        link.dep.subs = link;
    }
}
// 响应式系统的核心存储结构，采用三层映射
// 第一层：WeakMap<object, KeyToDepMap> - 目标对象到属性依赖映射
// 第二层：Map<any, Dep> - 属性键到依赖实例的映射
// 第三层：Dep - 管理订阅该属性的所有 effect
// 该设计确保了：
// 对象被垃圾回收时，相关依赖自动清理
// 每个属性独立管理自己的订阅者
// 支持动态属性的依赖追踪
const targetMap = new WeakMap();
// 用于追踪对象/Map/Set 的整体迭代操作
const ITERATE_KEY = Symbol(
    !!('production' !== 'production') ? "Object iterate" : ""
);
// 专门用于 Map 的键迭代追踪
const MAP_KEY_ITERATE_KEY = Symbol(
    !!('production' !== 'production') ? "Map keys iterate" : ""
);
// 用于数组迭代操作的依赖追踪
const ARRAY_ITERATE_KEY = Symbol(
    !!('production' !== 'production') ? "Array iterate" : ""
);
// 响应式属性被访问时建立依赖关系
function track(target, type, key) {
    // 只有在允许追踪且有活跃订阅者时才执行依赖追踪
    if (shouldTrack && activeSub) {
        // 第一层 - 目标对象映射：
        let depsMap = targetMap.get(target);
        if (!depsMap) {
            // 获取或创建目标对象的依赖映射表
            targetMap.set(target, depsMap = new Map());
        }
        // 第二层 - 属性键映射：
        let dep = depsMap.get(key);
        if (!dep) {
            // 获取或创建特定属性的 Dep 实例，并设置反向引用用于清理
            depsMap.set(key, dep = new Dep());
            dep.map = depsMap;
            dep.key = key;
        }
        // 开发模式：传递调试信息 {target, type, key}
        if (!!('production' !== 'production')) {
            dep.track({
                target,
                type,
                key
            });
        }
        // 生产模式：直接调用无参数版本
        else {
            dep.track();
        }
    }
}
// 响应式数据变化时通知所有相关的订阅者重新执行
function trigger(target, type, key, newValue, oldValue, oldTarget) {
    // 获取依赖映射
    const depsMap = targetMap.get(target);
    if (!depsMap) {
        globalVersion++;
        return;
    }
    // 封装了触发依赖的逻辑，开发模式下传递调试信息
    const run = (dep) => {
        if (dep) {
            if (!!('production' !== 'production')) {
                dep.trigger({
                    target,
                    type,
                    key,
                    newValue,
                    oldValue,
                    oldTarget
                });
            } else {
                dep.trigger();
            }
        }
    };
    startBatch();
    // 集合清空时触发所有依赖
    if (type === "clear") {
        depsMap.forEach(run);
    } else {
        const targetIsArray = isArray(target);
        const isArrayIndex = targetIsArray && isIntegerKey(key);
        // 数组长度变化时触发：length 属性的依赖ARRAY_ITERATE_KEY（数组迭代）被删除索引的依赖（索引 ≥ 新长度）
        if (targetIsArray && key === "length") {
            const newLength = Number(newValue);
            depsMap.forEach((dep, key2) => {
                if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) {
                    run(dep);
                }
            });
        } else {
            // 触发特定属性的依赖，数组索引变化时额外触发迭代依赖
            if (key !== void 0 || depsMap.has(void 0)) {
                run(depsMap.get(key));
            }
            if (isArrayIndex) {
                run(depsMap.get(ARRAY_ITERATE_KEY));
            }
            // 操作类型特殊处理
            switch (type) {
                case "add":
                    // 非数组对象：触发 ITERATE_KEY，Map 对象额外触发 MAP_KEY_ITERATE_KEY
                    if (!targetIsArray) {
                        run(depsMap.get(ITERATE_KEY));
                        if (isMap(target)) {
                            run(depsMap.get(MAP_KEY_ITERATE_KEY));
                        }
                    }
                    // 数组：触发 length 依赖 
                    else if (isArrayIndex) {
                        run(depsMap.get("length"));
                    }
                    break;
                case "delete":
                    // 非数组对象：触发 ITERATE_KEY，Map 对象额外触发 MAP_KEY_ITERATE_KEY
                    if (!targetIsArray) {
                        run(depsMap.get(ITERATE_KEY));
                        if (isMap(target)) {
                            run(depsMap.get(MAP_KEY_ITERATE_KEY));
                        }
                    }
                    break;
                case "set":
                    // Map 对象：触发 ITERATE_KEY
                    if (isMap(target)) {
                        run(depsMap.get(ITERATE_KEY));
                    }
                    break;
            }
        }
    }
    endBatch();
}
// 从响应式对象中获取特定属性的依赖实例
function getDepFromReactive(object, key) {
    // 从 targetMap 获取对象的依赖映射表
    const depMap = targetMap.get(object);
    // 从映射表中获取特定键的 Dep 实例
    return depMap && depMap.get(key);
}
// 用于数组方法的实现中，如 concat、join、toReversed、toSorted、toSpliced 等 
// 追踪数组整体的变化（而不是单个元素）确保返回的数组元素保持响应式特性
function reactiveReadArray(array) {
    // 使用 toRaw(array) 获取数组的原始版本，绕过响应式代理
    const raw = toRaw(array);
    // 如果输入数组已经是原始数组（非响应式），直接返回，避免不必要的处理
    if (raw === array) return raw;
    // 调用 track(raw, "iterate", ARRAY_ITERATE_KEY) 建立数组迭代的依赖关系
    track(raw, "iterate", ARRAY_ITERATE_KEY);
    // 对于浅层响应式数组（isShallow(array) 为 true），返回原始数组
    // 对于深层响应式数组，使用 raw.map(toReactive) 将每个元素转换为响应式对象
    return isShallow(array) ? raw : raw.map(toReactive);
}
// 获取原始数组，依赖追踪，返回原始数组
function shallowReadArray(arr) {
    track(arr = toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
    return arr;
}
// 确保数组方法返回值保持正确响应式状态的工具函数
function toWrapped(target, item) {
    // 检查目标数组是否为只读状态
    if (isReadonly(target)) {
        // 如果目标是只读且响应式：先转换为响应式，再标记为只读
        // 如果目标是只读但非响应式：仅标记为只读
        return isReactive(target) ? toReadonly(toReactive(item)) : toReadonly(item);
    }
    // 如果目标非只读：直接转换为响应式
    return toReactive(item);
}
// 拦截和增强数组方法的核心对象，它确保数组操作能够正确地进行依赖追踪和响应式处理
const arrayInstrumentations = {
    __proto__: null,
    [Symbol.iterator]() {
        return iterator(this, Symbol.iterator, (item) => toWrapped(this, item));
    },
    concat(...args) {
        return reactiveReadArray(this).concat(
            ...args.map((x) => isArray(x) ? reactiveReadArray(x) : x)
        );
    },
    entries() {
        return iterator(this, "entries", (value) => {
            value[1] = toWrapped(this, value[1]);
            return value;
        });
    },
    every(fn, thisArg) {
        return apply(this, "every", fn, thisArg, void 0, arguments);
    },
    filter(fn, thisArg) {
        return apply(
            this,
            "filter",
            fn,
            thisArg,
            (v) => v.map((item) => toWrapped(this, item)),
            arguments
        );
    },
    find(fn, thisArg) {
        return apply(
            this,
            "find",
            fn,
            thisArg,
            (item) => toWrapped(this, item),
            arguments
        );
    },
    findIndex(fn, thisArg) {
        return apply(this, "findIndex", fn, thisArg, void 0, arguments);
    },
    findLast(fn, thisArg) {
        return apply(
            this,
            "findLast",
            fn,
            thisArg,
            (item) => toWrapped(this, item),
            arguments
        );
    },
    findLastIndex(fn, thisArg) {
        return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
    },
    // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
    forEach(fn, thisArg) {
        return apply(this, "forEach", fn, thisArg, void 0, arguments);
    },
    includes(...args) {
        return searchProxy(this, "includes", args);
    },
    indexOf(...args) {
        return searchProxy(this, "indexOf", args);
    },
    join(separator) {
        return reactiveReadArray(this).join(separator);
    },
    // keys() iterator only reads `length`, no optimization required
    lastIndexOf(...args) {
        return searchProxy(this, "lastIndexOf", args);
    },
    map(fn, thisArg) {
        return apply(this, "map", fn, thisArg, void 0, arguments);
    },
    pop() {
        return noTracking(this, "pop");
    },
    push(...args) {
        return noTracking(this, "push", args);
    },
    reduce(fn, ...args) {
        return reduce(this, "reduce", fn, args);
    },
    reduceRight(fn, ...args) {
        return reduce(this, "reduceRight", fn, args);
    },
    shift() {
        return noTracking(this, "shift");
    },
    // slice could use ARRAY_ITERATE but also seems to beg for range tracking
    some(fn, thisArg) {
        return apply(this, "some", fn, thisArg, void 0, arguments);
    },
    splice(...args) {
        return noTracking(this, "splice", args);
    },
    toReversed() {
        return reactiveReadArray(this).toReversed();
    },
    toSorted(comparer) {
        return reactiveReadArray(this).toSorted(comparer);
    },
    toSpliced(...args) {
        return reactiveReadArray(this).toSpliced(...args);
    },
    unshift(...args) {
        return noTracking(this, "unshift", args);
    },
    values() {
        return iterator(this, "values", (item) => toWrapped(this, item));
    }
};
// 确保迭代过程中的依赖追踪和响应式包装的准确性
function iterator(self, method, wrapValue) {
    // 获取原始数组并追踪依赖
    const arr = shallowReadArray(self);
    // 创建基础迭代器：调用原始数组的迭代方法创建迭代器
    const iter = arr[method]();
    // 检查是否需要增强
    if (arr !== self && !isShallow(self)) {
        // 保存原始 next 方法到 _next 属性 
        iter._next = iter.next;
        // 重写 next 方法，在返回值时应用 wrapValue 包装
        iter.next = () => {
            const result = iter._next();
            if (!result.done) {
                result.value = wrapValue(result.value);
            }
            return result;
        };
    }
    return iter;
}

const arrayProto = Array.prototype;
// 处理数组方法调用，确保数组遍历操作能正确的进行依赖追踪和响应式包装
function apply(self, method, fn, thisArg, wrappedRetFn, args) {
    // 获取原始数组并追踪依赖
    const arr = shallowReadArray(self);
    // 判断是否需要包装：needsWrap 变量判断是否需要对返回值进行响应式包装
    const needsWrap = arr !== self && !isShallow(self);
    const methodFn = arr[method];
    if (methodFn !== arrayProto[method]) {
        const result2 = methodFn.apply(self, args);
        return needsWrap ? toReactive(result2) : result2;
    }
    // 包装回调函数
    let wrappedFn = fn;
    if (arr !== self) {
        if (needsWrap) {
            wrappedFn = function (item, index) {
                return fn.call(this, toWrapped(self, item), index, self);
            };
        } else if (fn.length > 2) {
            wrappedFn = function (item, index) {
                return fn.call(this, item, index, self);
            };
        }
    }
    // 使用包装后的回调函数调用原始方法，并根据需要包装返回值
    const result = methodFn.call(arr, wrappedFn, thisArg);
    return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
}
// 专门处理 reduce 和 reduceRight 数组方法的核心工具函数 
function reduce(self, method, fn, args) {
    // 获取原始数组并追踪依赖
    const arr = shallowReadArray(self);
    let wrappedFn = fn;
    if (arr !== self) {
        if (!isShallow(self)) {
            // 对于深层响应式数组，使用 toWrapped 包装 item 参数，确保返回值保持响应式特性
            wrappedFn = function (acc, item, index) {
                return fn.call(this, acc, toWrapped(self, item), index, self);
            };
        } else if (fn.length > 3) {
            // 对于浅层响应式数组，如果回调函数需要第4个参数（数组本身），则传递原始数组 
            wrappedFn = function (acc, item, index) {
                return fn.call(this, acc, item, index, self);
            };
        }
    }
    // 调用原始数组的 reduce 方法，传入包装后的回调函数
    return arr[method](wrappedFn, ...args);
}
// 处理数组身份敏感方法（includes、indexOf、lastIndexOf）的核心工具函数 
function searchProxy(self, method, args) {
    // 获取原始数组并追踪依赖：使用 toRaw(self) 获取原始数组，并调用 track 建立迭代依赖
    const arr = toRaw(self);
    track(arr, "iterate", ARRAY_ITERATE_KEY);
    // 使用原始参数调用数组方法
    const res = arr[method](...args);
    // 检查搜索是否失败（返回 -1 或 false）
    if ((res === -1 || res === false) && isProxy(args[0])) {
        // 如果失败且搜索参数是响应式代理，将其转换为原始值后重试
        args[0] = toRaw(args[0]);
        return arr[method](...args);
    }
    return res;
}
// 执行特定数组方法时避免依赖追踪
function noTracking(self, method, args = []) {
    // 调用 pauseTracking() 禁用依赖收集
    pauseTracking();
    // 调用 startBatch() 进入批处理模式
    startBatch();
    // 在原始对象上执行指定方法
    const res = toRaw(self)[method].apply(self, args);
    // 调用 endBatch() 刷新批处理队列
    endBatch();
    // 调用 resetTracking() 恢复之前的追踪状态 
    resetTracking();
    return res;
}
// 标识不应该被依赖追踪的特殊属性键 
const isNonTrackableKeys = makeMap(`__proto__,__v_isRef,__isVue`);
// 标识不应被依赖追踪的内置 Symbol 的常量
const builtInSymbols = new Set(
    Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
/* Symbol.asyncIterator
Symbol.hasInstance
Symbol.isConcatSpreadable
Symbol.iterator
Symbol.match
Symbol.matchAll
Symbol.replace
Symbol.search
Symbol.species
Symbol.split
Symbol.toPrimitive
Symbol.toStringTag
Symbol.unscopables
Symbol.dispose
Symbol.asyncDispose */
// 拦截 Object.prototype.hasOwnProperty 调用的自定义实现
function hasOwnProperty(key) {
    // 检查 key 是否为 Symbol，如果不是则转换为字符串
    if (!isSymbol(key)) key = String(key);
    // 使用 toRaw(this) 获取响应式代理的原始对象
    const obj = toRaw(this);
    // 调用 track(obj, TrackOpTypes.HAS, key) 建立依赖关系
    track(obj, "has", key);
    // 在原始对象上调用真正的 hasOwnProperty
    return obj.hasOwnProperty(key);
}
// 实现了响应式代理的 get 陷阱处理器
class BaseReactiveHandler {
    constructor(_isReadonly = false, _isShallow = false) {
        this._isReadonly = _isReadonly;
        this._isShallow = _isShallow;
    }

    get(target, key, receiver) {
        if (key === "__v_skip") return target["__v_skip"];
        const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
        if (key === "__v_isReactive") {
            return !isReadonly2;
        } else if (key === "__v_isReadonly") {
            return isReadonly2;
        } else if (key === "__v_isShallow") {
            return isShallow2;
        } else if (key === "__v_raw") {
            if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) ||
                Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
                return target;
            }
            return;
        }
        const targetIsArray = isArray(target);
        if (!isReadonly2) {
            let fn;
            if (targetIsArray && (fn = arrayInstrumentations[key])) {
                return fn;
            }
            if (key === "hasOwnProperty") {
                return hasOwnProperty;
            }
        }
        const res = Reflect.get(
            target,
            key,
            isRef(target) ? target : receiver
        );
        if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
            return res;
        }
        if (!isReadonly2) {
            track(target, "get", key);
        }
        if (isShallow2) {
            return res;
        }
        if (isRef(res)) {
            const value = targetIsArray && isIntegerKey(key) ? res : res.value;
            return isReadonly2 && isObject(value) ? readonly(value) : value;
        }
        if (isObject(res)) {
            return isReadonly2 ? readonly(res) : reactive(res);
        }
        return res;
    }
}
// 负责处理可变响应式对象的属性操作。它继承自 BaseReactiveHandler 并实现了关键的代理方法
class MutableReactiveHandler extends BaseReactiveHandler {
    constructor(isShallow2 = false) {
        super(false, isShallow2);
    }

    set(target, key, value, receiver) {
        let oldValue = target[key];
        const isArrayWithIntegerKey = isArray(target) && isIntegerKey(key);
        // 在非浅层模式下，会对 oldValue 和 value 调用 toRaw() 获取原始值 
        if (!this._isShallow) {
            const isOldValueReadonly = isReadonly(oldValue);
            if (!isShallow(value) && !isReadonly(value)) {
                oldValue = toRaw(oldValue);
                value = toRaw(value);
            }
            // 当旧值是 ref 而新值不是 ref 时，会直接更新 ref 的 .value 属性而不是替换整个 ref
            if (!isArrayWithIntegerKey && isRef(oldValue) && !isRef(value)) {
                if (isOldValueReadonly) {
                    if (!!('production' !== 'production')) {
                        warn(
                            `Set operation on key "${String(key)}" failed: target is readonly.`,
                            target[key]
                        );
                    }
                    return true;
                } else {
                    oldValue.value = value;
                    return true;
                }
            }
        }
        const hadKey = isArrayWithIntegerKey ? Number(key) < target.length : hasOwn(target, key);
        const result = Reflect.set(
            target,
            key,
            value,
            isRef(target) ? target : receiver
        );
        if (target === toRaw(receiver)) {
            if (!hadKey) {
                trigger(target, "add", key, value);
            } else if (hasChanged(value, oldValue)) {
                trigger(target, "set", key, value, oldValue);
            }
        }
        return result;
    }
    // 处理属性删除操作，记录旧值并在成功删除后触发 "delete" 类型的更新
    deleteProperty(target, key) {
        const hadKey = hasOwn(target, key);
        const oldValue = target[key];
        const result = Reflect.deleteProperty(target, key);
        if (result && hadKey) {
            trigger(target, "delete", key, void 0, oldValue);
        }
        return result;
    }
    // 在检查属性存在性时进行依赖追踪，但会跳过内置 Symbol 属性
    has(target, key) {
        const result = Reflect.has(target, key);
        if (!isSymbol(key) || !builtInSymbols.has(key)) {
            track(target, "has", key);
        }
        return result;
    }
    // 在获取对象所有键时追踪迭代依赖，对数组使用 "length" 作为键，其他对象使用 ITERATE_KEY
    ownKeys(target) {
        track(
            target,
            "iterate",
            isArray(target) ? "length" : ITERATE_KEY
        );
        return Reflect.ownKeys(target);
    }
}
// 创建只读响应式对象的核心类，它继承自 BaseReactiveHandler 并阻止所有修改操作
class ReadonlyReactiveHandler extends BaseReactiveHandler {
    constructor(isShallow2 = false) {
        super(true, isShallow2);
    }
    // set方法在开发环境下会发出警告，提示设置操作失败，然后直接返回 true 而不执行实际的设置操作
    set(target, key) {
        if (!!('production' !== 'production')) {
            warn(
                `Set operation on key "${String(key)}" failed: target is readonly.`,
                target
            );
        }
        return true;
    }
    // deleteProperty 方法同样在开发环境下发出警告，提示删除操作失败，然后返回 true 而不执行实际的删除操作
    deleteProperty(target, key) {
        if (!!('production' !== 'production')) {
            warn(
                `Delete operation on key "${String(key)}" failed: target is readonly.`,
                target
            );
        }
        return true;
    }
}
// 深度可变响应式 reactive
const mutableHandlers = new MutableReactiveHandler();
// 深度只读响应式 readonly
const readonlyHandlers = new ReadonlyReactiveHandler();
// 浅层可变响应式 shallowReactive
const shallowReactiveHandlers = new MutableReactiveHandler(true);
// 浅层只读响应式 shallowReadonly
const shallowReadonlyHandlers = new ReadonlyReactiveHandler(true);
// 一个恒等函数，直接返回传入的值而不进行任何转换,用作值包装器，避免将嵌套对象转换为响应式
const toShallow = (value) => value;
// 使用 Reflect.getPrototypeOf() 获取对象的原型,获取原型相关的has、get方法
const getProto = (v) => Reflect.getPrototypeOf(v);
// 为集合类型（Map、Set）创建迭代器方法
function createIterableMethod(method, isReadonly2, isShallow2) {
    return function (...args) {
        // 获取原始目标
        const target = this["__v_raw"];
        const rawTarget = toRaw(target);
        const targetIsMap = isMap(rawTarget);
        // 根据方法名和集合类型判断迭代行为
        const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
        const isKeyOnly = method === "keys" && targetIsMap;
        const innerIterator = target[method](...args);
        // 根据浅层和只读标志选择值包装器 
        const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
        // 非只读模式下会追踪迭代依赖
        !isReadonly2 && track(
            rawTarget,
            "iterate",
            isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
        );
        // 返回一个实现了迭代器协议的对象 
        return {
            // 包装原始迭代器的返回值
            next() {
                const { value, done } = innerIterator.next();
                return done ? { value, done } : {
                    value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
                    done
                };
            },
            // 返回自身以支持可迭代协议
            [Symbol.iterator]() {
                return this;
            }
        };
    };
}
// 创建只读集合方法的高阶函数
function createReadonlyMethod(type) {
    // 函数接收一个 type 参数，表示操作的类型（如 "add"、"set"、"delete"、"clear"）
    return function (...args) {
        if (!!('production' !== 'production')) {
            const key = args[0] ? `on key "${args[0]}" ` : ``;
            warn(
                `${capitalize(type)} operation ${key}failed: target is readonly.`,
                toRaw(this)
            );
        }
        // 根据操作类型返回不同的值
        // "delete" 操作：返回 false 表示删除失败
        // "clear" 操作：返回 undefined（与原生 Map.clear() 和 Set.clear() 一致）
        // 其他操作：返回 this 以支持链式调用
        return type === "delete" ? false : type === "clear" ? void 0 : this;
    };
}
// 创建集合类型（Map、Set、WeakMap、WeakSet）响应式方法的核心函数
function createInstrumentations(readonly, shallow) {
    const instrumentations = {
        get(key) {
            // 通过 this["__v_raw"] 获取原始目标
            const target = this["__v_raw"];
            const rawTarget = toRaw(target);
            const rawKey = toRaw(key);
            // 对响应式键和原始键都进行依赖追踪
            if (!readonly) {
                if (hasChanged(key, rawKey)) {
                    track(rawTarget, "get", key);
                }
                track(rawTarget, "get", rawKey);
            }
            const { has } = getProto(rawTarget);
            // 使用 wrap 函数根据模式包装返回值
            const wrap = shallow ? toShallow : readonly ? toReadonly : toReactive;
            if (has.call(rawTarget, key)) {
                return wrap(target.get(key));
            } else if (has.call(rawTarget, rawKey)) {
                return wrap(target.get(rawKey));
            } else if (target !== rawTarget) {
                target.get(key);
            }
        },
        get size() {
            const target = this["__v_raw"];
            // 追踪 ITERATE_KEY 依赖
            !readonly && track(toRaw(target), "iterate", ITERATE_KEY);
            // 直接返回原始集合的 size
            return target.size;
        },
        has(key) {
            const target = this["__v_raw"];
            const rawTarget = toRaw(target);
            const rawKey = toRaw(key);
            // 对响应式键和原始键都进行追踪
            if (!readonly) {
                if (hasChanged(key, rawKey)) {
                    track(rawTarget, "has", key);
                }
                track(rawTarget, "has", rawKey);
            }
            // 支持同时检查原始键和响应式键
            return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
        },
        forEach(callback, thisArg) {
            const observed = this;
            const target = observed["__v_raw"];
            const rawTarget = toRaw(target);
            const wrap = shallow ? toShallow : readonly ? toReadonly : toReactive;
            // 追踪迭代依赖
            !readonly && track(rawTarget, "iterate", ITERATE_KEY);
            return target.forEach((value, key) => {
                // 使用 wrap 包装回调函数中的值和键
                return callback.call(thisArg, wrap(value), wrap(key), observed);
            });
        }
    };
    // 根据readonly合并配置项
    extend(
        instrumentations,
        readonly ? {
            add: createReadonlyMethod("add"),
            set: createReadonlyMethod("set"),
            delete: createReadonlyMethod("delete"),
            clear: createReadonlyMethod("clear")
        } : {
            add(value) {
                if (!shallow && !isShallow(value) && !isReadonly(value)) {
                    value = toRaw(value);
                }
                const target = toRaw(this);
                const proto = getProto(target);
                const hadKey = proto.has.call(target, value);
                if (!hadKey) {
                    target.add(value);
                    trigger(target, "add", value, value);
                }
                return this;
            },
            set(key, value) {
                if (!shallow && !isShallow(value) && !isReadonly(value)) {
                    value = toRaw(value);
                }
                const target = toRaw(this);
                const { has, get } = getProto(target);
                let hadKey = has.call(target, key);
                if (!hadKey) {
                    key = toRaw(key);
                    hadKey = has.call(target, key);
                } else if (!!('production' !== 'production')) {
                    checkIdentityKeys(target, has, key);
                }
                const oldValue = get.call(target, key);
                target.set(key, value);
                if (!hadKey) {
                    trigger(target, "add", key, value);
                } else if (hasChanged(value, oldValue)) {
                    trigger(target, "set", key, value, oldValue);
                }
                return this;
            },
            delete(key) {
                const target = toRaw(this);
                const { has, get } = getProto(target);
                let hadKey = has.call(target, key);
                if (!hadKey) {
                    key = toRaw(key);
                    hadKey = has.call(target, key);
                } else if (!!('production' !== 'production')) {
                    checkIdentityKeys(target, has, key);
                }
                const oldValue = get ? get.call(target, key) : void 0;
                const result = target.delete(key);
                if (hadKey) {
                    trigger(target, "delete", key, void 0, oldValue);
                }
                return result;
            },
            clear() {
                const target = toRaw(this);
                const hadItems = target.size !== 0;
                const oldTarget = !!('production' !== 'production') ? isMap(target) ? new Map(target) : new Set(target) : void 0;
                const result = target.clear();
                if (hadItems) {
                    trigger(
                        target,
                        "clear",
                        void 0,
                        void 0,
                        oldTarget
                    );
                }
                return result;
            }
        }
    );
    const iteratorMethods = [
        "keys",
        "values",
        "entries",
        Symbol.iterator
    ];
    // 针对特定方法属性覆盖其IterableMethod
    iteratorMethods.forEach((method) => {
        instrumentations[method] = createIterableMethod(method, readonly, shallow);
    });
    return instrumentations;
}
// 为集合类型创建代理 getter 的核心函数
function createInstrumentationGetter(isReadonly2, shallow) {
    // 创建包含所有响应式方法的对象 instrumentations
    const instrumentations = createInstrumentations(isReadonly2, shallow);
    console.log('wxx',instrumentations,isReadonly2,shallow)
    return (target, key, receiver) => {
        // 特殊标志处理
        if (key === "__v_isReactive") {
            return !isReadonly2;
        } else if (key === "__v_isReadonly") {
            return isReadonly2;
        } else if (key === "__v_raw") {
            return target;
        }
        // 方法委托
        return Reflect.get(
            // 如果属性在 instrumentations 中且在 target 中存在，从 instrumentations 获取
            // 否则从原始 target 获取
            hasOwn(instrumentations, key) && key in target ? instrumentations : target,
            key,
            receiver
        );
    };
}
// 深度可变集合
const mutableCollectionHandlers = {
    get: createInstrumentationGetter(false, false)
};
// 浅层可变集合
const shallowCollectionHandlers = {
    get: createInstrumentationGetter(false, true)
};
// 深度只读集合
const readonlyCollectionHandlers = {
    get: createInstrumentationGetter(true, false)
};
// 浅层只读集合
const shallowReadonlyCollectionHandlers = {
    get: createInstrumentationGetter(true, true)
};
// 检测集合类型（Map、Set 等）中是否同时存在同一个对象的原始版本和响应式版本作为键值，这可能导致不一致的行为
function checkIdentityKeys(target, has, key) {
    const rawKey = toRaw(key);
    if (rawKey !== key && has.call(target, rawKey)) {
        const type = toRawType(target);
        warn(
            `Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
        );
    }
}

// 在 createReactiveObject 函数中，这些 WeakMap 用于：
// 缓存检查: 首先检查目标对象是否已有对应的代理
// 存储新代理: 创建新代理后存储到对应的 WeakMap 中

// 优点
// 自动垃圾回收: 当目标对象不再被引用时，WeakMap 中的条目会被自动清理，避免内存泄漏
// 隐私性: WeakMap 的键不可枚举，提供了更好的封装性
// 存储深度响应式代理
const reactiveMap = new WeakMap();
// 存储浅层响应式代理
const shallowReactiveMap = new WeakMap();
// 存储深度只读代理
const readonlyMap = new WeakMap();
// 存储浅层只读代理
const shallowReadonlyMap = new WeakMap();

// 将原始类型字符串分类为不同的目标类型，以便选择合适的代理处理器
function targetTypeMap(rawType) {
    // Object、Array 普通对象类型
    // Map、Set、WeakMap、WeakSet 集合类型
    // 其他 无效类型
    switch (rawType) {
        case "Object":
        case "Array":
            return 1 /* COMMON */;
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
            return 2 /* COLLECTION */;
        default:
            return 0 /* INVALID */;
    }
}
// 判断一个对象是否可以被转换为响应式对象，以及应该使用哪种类型的处理器
// 在 createReactiveObject 中被调用，用于决定是否创建响应式代理以及使用哪种处理器
function getTargetType(value) {
    // value["__v_skip"] - 检查对象是否被标记为跳过响应式处理
    // !Object.isExtensible(value) - 检查对象是否不可扩展（被冻结、密封等）
    return value["__v_skip"] || !Object.isExtensible(value) ? 0 /* INVALID */ : targetTypeMap(toRawType(value));
}

function reactive(target) {
    if (isReadonly(target)) {
        return target;
    }
    return createReactiveObject(
        target,
        false,
        mutableHandlers,
        mutableCollectionHandlers,
        reactiveMap
    );
}

function shallowReactive(target) {
    return createReactiveObject(
        target,
        false,
        shallowReactiveHandlers,
        shallowCollectionHandlers,
        shallowReactiveMap
    );
}

function readonly(target) {
    return createReactiveObject(
        target,
        true,
        readonlyHandlers,
        readonlyCollectionHandlers,
        readonlyMap
    );
}

function shallowReadonly(target) {
    return createReactiveObject(
        target,
        true,
        shallowReadonlyHandlers,
        shallowReadonlyCollectionHandlers,
        shallowReadonlyMap
    );
}

function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject(target)) {
        if (!!('production' !== 'production')) {
            warn(
                `value cannot be made ${isReadonly2 ? "readonly" : "reactive"}: ${String(
                    target
                )}`
            );
        }
        return target;
    }
    if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
        return target;
    }
    const targetType = getTargetType(target);
    if (targetType === 0 /* INVALID */) {
        return target;
    }
    const existingProxy = proxyMap.get(target);
    if (existingProxy) {
        return existingProxy;
    }
    const proxy = new Proxy(
        target,
        targetType === 2 /* COLLECTION */ ? collectionHandlers : baseHandlers
    );
    proxyMap.set(target, proxy);
    return proxy;
}

function isReactive(value) {
    if (isReadonly(value)) {
        return isReactive(value["__v_raw"]);
    }
    return !!(value && value["__v_isReactive"]);
}

function isReadonly(value) {
    return !!(value && value["__v_isReadonly"]);
}

function isShallow(value) {
    return !!(value && value["__v_isShallow"]);
}

function isProxy(value) {
    return value ? !!value["__v_raw"] : false;
}

function toRaw(observed) {
    const raw = observed && observed["__v_raw"];
    return raw ? toRaw(raw) : observed;
}

function markRaw(value) {
    if (!hasOwn(value, "__v_skip") && Object.isExtensible(value)) {
        def(value, "__v_skip", true);
    }
    return value;
}

const toReactive = (value) => isObject(value) ? reactive(value) : value;
const toReadonly = (value) => isObject(value) ? readonly(value) : value;

function isRef(r) {
    return r ? r["__v_isRef"] === true : false;
}

function ref(value) {
    return createRef(value, false);
}

function shallowRef(value) {
    return createRef(value, true);
}

function createRef(rawValue, shallow) {
    if (isRef(rawValue)) {
        return rawValue;
    }
    return new RefImpl(rawValue, shallow);
}

class RefImpl {
    constructor(value, isShallow2) {
        this.dep = new Dep();
        this["__v_isRef"] = true;
        this["__v_isShallow"] = false;
        this._rawValue = isShallow2 ? value : toRaw(value);
        this._value = isShallow2 ? value : toReactive(value);
        this["__v_isShallow"] = isShallow2;
    }

    get value() {
        if (!!('production' !== 'production')) {
            this.dep.track({
                target: this,
                type: "get",
                key: "value"
            });
        } else {
            this.dep.track();
        }
        return this._value;
    }

    set value(newValue) {
        const oldValue = this._rawValue;
        const useDirectValue = this["__v_isShallow"] || isShallow(newValue) || isReadonly(newValue);
        newValue = useDirectValue ? newValue : toRaw(newValue);
        if (hasChanged(newValue, oldValue)) {
            this._rawValue = newValue;
            this._value = useDirectValue ? newValue : toReactive(newValue);
            if (!!('production' !== 'production')) {
                this.dep.trigger({
                    target: this,
                    type: "set",
                    key: "value",
                    newValue,
                    oldValue
                });
            } else {
                this.dep.trigger();
            }
        }
    }
}

function triggerRef(ref2) {
    if (ref2.dep) {
        if (!!('production' !== 'production')) {
            ref2.dep.trigger({
                target: ref2,
                type: "set",
                key: "value",
                newValue: ref2._value
            });
        } else {
            ref2.dep.trigger();
        }
    }
}

function unref(ref2) {
    return isRef(ref2) ? ref2.value : ref2;
}

function toValue(source) {
    return isFunction(source) ? source() : unref(source);
}

const shallowUnwrapHandlers = {
    get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
    set: (target, key, value, receiver) => {
        const oldValue = target[key];
        if (isRef(oldValue) && !isRef(value)) {
            oldValue.value = value;
            return true;
        } else {
            return Reflect.set(target, key, value, receiver);
        }
    }
};

function proxyRefs(objectWithRefs) {
    return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}

class CustomRefImpl {
    constructor(factory) {
        this["__v_isRef"] = true;
        this._value = void 0;
        const dep = this.dep = new Dep();
        const { get, set } = factory(dep.track.bind(dep), dep.trigger.bind(dep));
        this._get = get;
        this._set = set;
    }

    get value() {
        return this._value = this._get();
    }

    set value(newVal) {
        this._set(newVal);
    }
}

function customRef(factory) {
    return new CustomRefImpl(factory);
}

function toRefs(object) {
    if (!!('production' !== 'production') && !isProxy(object)) {
        warn(`toRefs() expects a reactive object but received a plain one.`);
    }
    const ret = isArray(object) ? new Array(object.length) : {};
    for (const key in object) {
        ret[key] = propertyToRef(object, key);
    }
    return ret;
}

class ObjectRefImpl {
    constructor(_object, _key, _defaultValue) {
        this._object = _object;
        this._key = _key;
        this._defaultValue = _defaultValue;
        this["__v_isRef"] = true;
        this._value = void 0;
        this._raw = toRaw(_object);
        let shallow = true;
        let obj = _object;
        if (!isArray(_object) || !isIntegerKey(String(_key))) {
            do {
                shallow = !isProxy(obj) || isShallow(obj);
            } while (shallow && (obj = obj["__v_raw"]));
        }
        this._shallow = shallow;
    }

    get value() {
        let val = this._object[this._key];
        if (this._shallow) {
            val = unref(val);
        }
        return this._value = val === void 0 ? this._defaultValue : val;
    }

    set value(newVal) {
        if (this._shallow && isRef(this._raw[this._key])) {
            const nestedRef = this._object[this._key];
            if (isRef(nestedRef)) {
                nestedRef.value = newVal;
                return;
            }
        }
        this._object[this._key] = newVal;
    }

    get dep() {
        return getDepFromReactive(this._raw, this._key);
    }
}

class GetterRefImpl {
    constructor(_getter) {
        this._getter = _getter;
        this["__v_isRef"] = true;
        this["__v_isReadonly"] = true;
        this._value = void 0;
    }

    get value() {
        return this._value = this._getter();
    }
}

function toRef(source, key, defaultValue) {
    if (isRef(source)) {
        return source;
    } else if (isFunction(source)) {
        return new GetterRefImpl(source);
    } else if (isObject(source) && arguments.length > 1) {
        return propertyToRef(source, key, defaultValue);
    } else {
        return ref(source);
    }
}

function propertyToRef(source, key, defaultValue) {
    return new ObjectRefImpl(source, key, defaultValue);
}

class ComputedRefImpl {
    constructor(fn, setter, isSSR) {
        this.fn = fn;
        this.setter = setter;
        /**
         * @internal
         */
        this._value = void 0;
        /**
         * @internal
         */
        this.dep = new Dep(this);
        /**
         * @internal
         */
        this.__v_isRef = true;
        // TODO isolatedDeclarations "__v_isReadonly"
        // A computed is also a subscriber that tracks other deps
        /**
         * @internal
         */
        this.deps = void 0;
        /**
         * @internal
         */
        this.depsTail = void 0;
        /**
         * @internal
         */
        this.flags = 16;
        /**
         * @internal
         */
        this.globalVersion = globalVersion - 1;
        /**
         * @internal
         */
        this.next = void 0;
        // for backwards compat
        this.effect = this;
        this["__v_isReadonly"] = !setter;
        this.isSSR = isSSR;
    }

    /**
     * @internal
     */
    notify() {
        this.flags |= 16;
        if (!(this.flags & 8) && // avoid infinite self recursion
            activeSub !== this) {
            batch(this, true);
            return true;
        } else if (!!('production' !== 'production'));
    }

    get value() {
        const link = !!('production' !== 'production') ? this.dep.track({
            target: this,
            type: "get",
            key: "value"
        }) : this.dep.track();
        refreshComputed(this);
        if (link) {
            link.version = this.dep.version;
        }
        return this._value;
    }

    set value(newValue) {
        if (this.setter) {
            this.setter(newValue);
        } else if (!!('production' !== 'production')) {
            warn("Write operation failed: computed value is readonly");
        }
    }
}

function computed(getterOrOptions, debugOptions, isSSR = false) {
    let getter;
    let setter;
    if (isFunction(getterOrOptions)) {
        getter = getterOrOptions;
    } else {
        getter = getterOrOptions.get;
        setter = getterOrOptions.set;
    }
    const cRef = new ComputedRefImpl(getter, setter, isSSR);
    if (!!('production' !== 'production') && debugOptions && !isSSR) {
        cRef.onTrack = debugOptions.onTrack;
        cRef.onTrigger = debugOptions.onTrigger;
    }
    return cRef;
}

const TrackOpTypes = {
    "GET": "get",
    "HAS": "has",
    "ITERATE": "iterate"
};
const TriggerOpTypes = {
    "SET": "set",
    "ADD": "add",
    "DELETE": "delete",
    "CLEAR": "clear"
};
const ReactiveFlags = {
    "SKIP": "__v_skip",
    "IS_REACTIVE": "__v_isReactive",
    "IS_READONLY": "__v_isReadonly",
    "IS_SHALLOW": "__v_isShallow",
    "RAW": "__v_raw",
    "IS_REF": "__v_isRef"
};

const WatchErrorCodes = {
    "WATCH_GETTER": 2,
    "2": "WATCH_GETTER",
    "WATCH_CALLBACK": 3,
    "3": "WATCH_CALLBACK",
    "WATCH_CLEANUP": 4,
    "4": "WATCH_CLEANUP"
};
const INITIAL_WATCHER_VALUE = {};
const cleanupMap = new WeakMap();
let activeWatcher = void 0;

function getCurrentWatcher() {
    return activeWatcher;
}

function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
    if (owner) {
        let cleanups = cleanupMap.get(owner);
        if (!cleanups) cleanupMap.set(owner, cleanups = []);
        cleanups.push(cleanupFn);
    } else if (!!('production' !== 'production') && !failSilently) {
        warn(
            `onWatcherCleanup() was called when there was no active watcher to associate with.`
        );
    }
}

function watch(source, cb, options = EMPTY_OBJ) {
    const { immediate, deep, once, scheduler, augmentJob, call } = options;
    const warnInvalidSource = (s) => {
        (options.onWarn || warn)(
            `Invalid watch source: `,
            s,
            `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`
        );
    };
    const reactiveGetter = (source2) => {
        if (deep) return source2;
        if (isShallow(source2) || deep === false || deep === 0)
            return traverse(source2, 1);
        return traverse(source2);
    };
    let effect;
    let getter;
    let cleanup;
    let boundCleanup;
    let forceTrigger = false;
    let isMultiSource = false;
    if (isRef(source)) {
        getter = () => source.value;
        forceTrigger = isShallow(source);
    } else if (isReactive(source)) {
        getter = () => reactiveGetter(source);
        forceTrigger = true;
    } else if (isArray(source)) {
        isMultiSource = true;
        forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
        getter = () => source.map((s) => {
            if (isRef(s)) {
                return s.value;
            } else if (isReactive(s)) {
                return reactiveGetter(s);
            } else if (isFunction(s)) {
                return call ? call(s, 2) : s();
            } else {
                !!('production' !== 'production') && warnInvalidSource(s);
            }
        });
    } else if (isFunction(source)) {
        if (cb) {
            getter = call ? () => call(source, 2) : source;
        } else {
            getter = () => {
                if (cleanup) {
                    pauseTracking();
                    try {
                        cleanup();
                    } finally {
                        resetTracking();
                    }
                }
                const currentEffect = activeWatcher;
                activeWatcher = effect;
                try {
                    return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
                } finally {
                    activeWatcher = currentEffect;
                }
            };
        }
    } else {
        getter = NOOP;
        !!('production' !== 'production') && warnInvalidSource(source);
    }
    if (cb && deep) {
        const baseGetter = getter;
        const depth = deep === true ? Infinity : deep;
        getter = () => traverse(baseGetter(), depth);
    }
    const scope = getCurrentScope();
    const watchHandle = () => {
        effect.stop();
        if (scope && scope.active) {
            remove(scope.effects, effect);
        }
    };
    if (once && cb) {
        const _cb = cb;
        cb = (...args) => {
            _cb(...args);
            watchHandle();
        };
    }
    let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
    const job = (immediateFirstRun) => {
        if (!(effect.flags & 1) || !effect.dirty && !immediateFirstRun) {
            return;
        }
        if (cb) {
            const newValue = effect.run();
            if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
                if (cleanup) {
                    cleanup();
                }
                const currentWatcher = activeWatcher;
                activeWatcher = effect;
                try {
                    const args = [
                        newValue,
                        // pass undefined as the old value when it's changed for the first time
                        oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
                        boundCleanup
                    ];
                    oldValue = newValue;
                    call ? call(cb, 3, args) : (
                        // @ts-expect-error
                        cb(...args)
                    );
                } finally {
                    activeWatcher = currentWatcher;
                }
            }
        } else {
            effect.run();
        }
    };
    if (augmentJob) {
        augmentJob(job);
    }
    effect = new ReactiveEffect(getter);
    effect.scheduler = scheduler ? () => scheduler(job, false) : job;
    boundCleanup = (fn) => onWatcherCleanup(fn, false, effect);
    cleanup = effect.onStop = () => {
        const cleanups = cleanupMap.get(effect);
        if (cleanups) {
            if (call) {
                call(cleanups, 4);
            } else {
                for (const cleanup2 of cleanups) cleanup2();
            }
            cleanupMap.delete(effect);
        }
    };
    if (!!('production' !== 'production')) {
        effect.onTrack = options.onTrack;
        effect.onTrigger = options.onTrigger;
    }
    if (cb) {
        if (immediate) {
            job(true);
        } else {
            oldValue = effect.run();
        }
    } else if (scheduler) {
        scheduler(job.bind(null, true), true);
    } else {
        effect.run();
    }
    watchHandle.pause = effect.pause.bind(effect);
    watchHandle.resume = effect.resume.bind(effect);
    watchHandle.stop = watchHandle;
    return watchHandle;
}

function traverse(value, depth = Infinity, seen) {
    if (depth <= 0 || !isObject(value) || value["__v_skip"]) {
        return value;
    }
    seen = seen || new Map();
    if ((seen.get(value) || 0) >= depth) {
        return value;
    }
    seen.set(value, depth);
    depth--;
    if (isRef(value)) {
        traverse(value.value, depth, seen);
    } else if (isArray(value)) {
        for (let i = 0; i < value.length; i++) {
            traverse(value[i], depth, seen);
        }
    } else if (isSet(value) || isMap(value)) {
        value.forEach((v) => {
            traverse(v, depth, seen);
        });
    } else if (isPlainObject(value)) {
        for (const key in value) {
            traverse(value[key], depth, seen);
        }
        for (const key of Object.getOwnPropertySymbols(value)) {
            if (Object.prototype.propertyIsEnumerable.call(value, key)) {
                traverse(value[key], depth, seen);
            }
        }
    }
    return value;
}

export {
    ARRAY_ITERATE_KEY,
    EffectFlags,
    EffectScope,
    ITERATE_KEY,
    MAP_KEY_ITERATE_KEY,
    ReactiveEffect,
    ReactiveFlags,
    TrackOpTypes,
    TriggerOpTypes,
    WatchErrorCodes,
    computed,
    customRef,
    effect,
    effectScope,
    enableTracking,
    getCurrentScope,
    getCurrentWatcher,
    isProxy,
    isReactive,
    isReadonly,
    isRef,
    isShallow,
    markRaw,
    onEffectCleanup,
    onScopeDispose,
    onWatcherCleanup,
    pauseTracking,
    proxyRefs,
    reactive,
    reactiveReadArray,
    readonly,
    ref,
    resetTracking,
    shallowReactive,
    shallowReadArray,
    shallowReadonly,
    shallowRef,
    stop,
    toRaw,
    toReactive,
    toReadonly,
    toRef,
    toRefs,
    toValue,
    track,
    traverse,
    trigger,
    triggerRef,
    unref,
    watch
};