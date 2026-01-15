# 常用工具方法


## 数组转换为 Map 结构

```ts
/**
 * 将数组转换为 Map 结构
 * @param list 原始数组
 * @param getKey 从数组元素中提取键的函数
 * @param getValue 从数组元素中提取值的函数（可选，默认为元素本身）
 * @returns 生成的 Map 对象
 */
function listToMap<T, K extends string | number | symbol, V>(
  list: T[],
  getKey: (item: T) => K,
  getValue?: (item: T) => V
): Record<K, V> {
  return list.reduce((map, item) => {
    const key = getKey(item);
    const value = getValue ? getValue(item) : item as unknown as V;
    return { ...map, [key]: value };
  }, {} as Record<K, V>);
}
```

## 将错误日志存储到本地

```ts
/**
 * 将错误日志存储到本地
 * @param moduleName 存储日志所属模块，一般指项目名
 * @param errorInfo 错误日志对象
 * @param options 存储相关配置项
 */
import dayjs from 'dayjs'

export function saveErrorLog(
    moduleName: string,
    errorInfo: {
        type: string,
        content: string
    },
    options?: {
        maxCacheCount?: number,
        storageSuffix?: string
    }
) {
    let storageSuffix = '-error-log-list'
    let maxCacheCount = 10
    const createTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    
    if (options) {
        if (options?.maxCacheCount) {
            maxCacheCount = options.maxCacheCount
        }
        if (options?.storagesuffix) {
            storageSuffix = options.storageSuffix
        }
    }

    let storageKey = moduleName + storageSuffix
    const errorLogs = window.localStorage.getItem(storageKey)
    const _errorInfo = {...errorInfo, createTime}

    if (errorLogs?.length) {
        const errorLogList = JSoN.parse(errorLogs)
        errorLogList.push(_errorInfo)
        if (errorLogList?.length > maxCachecount) {
            errorLogList.splice(0, 1)
            window.localstorage.setItem(storageKey, JSoN.stringify(errorLogList))
        }
    } else {
        window.localStorage.setItem(storagekey, JsoN.stringify([_errorInfo]))
    }
}
```