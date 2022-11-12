function pt(e) {
  let n = null;
  return window.createObjectURL ? n = window.createObjectURL(e) : window.URL ? n = window.URL.createObjectURL(e) : window.webkitURL && (n = window.webkitURL.createObjectURL(e)), n;
}
function v(e, n) {
  return n.forEach((t) => {
    e.appendChild(t);
  }), e;
}
function N(e) {
  let n = e.type.indexOf("touch") >= 0, t = n ? e.touches[0].pageX : e.offsetX + e.target.offsetLeft, a = n ? e.touches[0].pageY : e.offsetY + e.target.offsetTop;
  return { x: t, y: a };
}
function k(e, n, t, a) {
  e == t && (e = e + 5, t = t - 5), n == a && (n = n + 5, a = a - 5);
  let o = {
    w: Math.abs(e - t),
    h: Math.abs(n - a),
    area: Math.abs((e - t) * (n - a))
  };
  e > t && n > a ? Object.assign(o, {
    x1: t,
    y1: a,
    x2: e,
    y2: a,
    x3: e,
    y3: n,
    x4: t,
    y4: n
  }) : e > t && n < a ? Object.assign(o, {
    x1: t,
    y1: n,
    x2: e,
    y2: n,
    x3: e,
    y3: a,
    x4: t,
    y4: a
  }) : e < t && n > a ? Object.assign(o, {
    x1: e,
    y1: a,
    x2: t,
    y2: a,
    x3: t,
    y3: n,
    x4: e,
    y4: n
  }) : e < t && n < a && Object.assign(o, {
    x1: e,
    y1: n,
    x2: t,
    y2: n,
    x3: t,
    y3: a,
    x4: e,
    y4: a
  });
  for (let l in o)
    o[l] = Math.floor(o[l]);
  return o;
}
function $e(e) {
  if (!e.length)
    return;
  let n = JSON.parse(JSON.stringify(e));
  n.sort((s, i) => s.x - i.x);
  let t = n[0], a = n[n.length - 1];
  n.sort((s, i) => s.y - i.y);
  let o = n[0], l = n[n.length - 1], r = {
    x1: t.x,
    x2: a.x,
    x3: a.x,
    x4: t.x,
    y1: o.y,
    y2: o.y,
    y3: l.y,
    y4: l.y,
    w: Math.abs(t.x - a.x),
    h: Math.abs(o.y - l.y),
    area: Math.abs((t.x - a.x) * (o.y - l.y))
  };
  for (let s in r)
    r[s] = Math.floor(r[s]);
  return r;
}
function M(e, n) {
  for (let t = 0; t < e.length; t++)
    e[t].classList.remove("is-selected");
  n.classList.add("is-selected");
}
function We(e, n, t, a, o, l) {
  return o >= e && o <= t && l >= n && l <= a || o >= t && o <= e && l >= n && l <= a || o >= t && o <= e && l >= a && l <= n || o >= e && o <= t && l >= a && l <= n;
}
function yt(e, n) {
  if (!(!e || !n))
    for (let t in n)
      e[t] = n[t];
}
function L(e, n) {
  let { placement: t, content: a } = n, o = document.createElement("div");
  o.className = "wxx-tooltip";
  let l = document.createElement("span");
  l.className = "wxx-tooltip-arrow";
  let r = document.createElement("div");
  r.className = "wxx-tooltip-content", r.innerText = a, v(o, [l, r]);
  let s = !0;
  e.addEventListener("mouseover", () => {
    let i = e.getBoundingClientRect(), c = !0;
    e.classList.forEach((d) => {
      d == "is-selected" && (c = !1);
    }), s = c, c && (document.body.appendChild(o), o.style.left = i.x + i.width + 20 + "px", o.style.top = i.y + (i.height - o.clientHeight) / 2 + "px");
  }), e.addEventListener("mouseleave", () => {
    s && document.body.removeChild(o);
  });
}
let Se = !1;
function Ue(e, n) {
  let { placement: t, content: a } = n, o = document.createElement("div");
  o.className = "wxx-popover";
  let l = document.createElement("span");
  l.className = "wxx-popover-arrow";
  let r = document.createElement("div");
  r.className = "wxx-popover-content", r.appendChild(a), v(o, [l, r]), e.addEventListener("click", (s) => {
    let i = e.getBoundingClientRect();
    document.body.appendChild(o), o.style.left = i.x + i.width + 20 + "px", o.style.top = i.y + (i.height - o.clientHeight) / 2 + "px", setTimeout(() => {
      Se = !0;
    }, 200);
  });
}
document.body.addEventListener("mousedown", (e) => {
  if (Se) {
    let n = !0;
    if (e.path.forEach((t) => {
      t.classList && t.classList.length && t.classList.forEach((a) => {
        a == "wxx-popover" && (n = !1);
      });
    }), n) {
      let t = document.getElementsByClassName("wxx-popover");
      t && t.length && (document.body.removeChild(t[0]), Se = !1);
    }
  }
});
const et = "data:image/gif;base64,R0lGODlhCAAIAJEAAKqqqv///wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgAAACwAAAAACAAIAAACDZQFCadrzVRMB9FZ5SwAIfkECQoAAAAsAAAAAAgACAAAAg+ELqCYaudeW9ChyOyltQAAIfkECQoAAAAsAAAAAAgACAAAAg8EhGKXm+rQYtC0WGl9oAAAIfkECQoAAAAsAAAAAAgACAAAAg+EhWKQernaYmjCWLF7qAAAIfkECQoAAAAsAAAAAAgACAAAAg2EISmna81UTAfRWeUsACH5BAkKAAAALAAAAAAIAAgAAAIPFA6imGrnXlvQocjspbUAACH5BAkKAAAALAAAAAAIAAgAAAIPlIBgl5vq0GLQtFhpfaIAACH5BAUKAAAALAAAAAAIAAgAAAIPlIFgknq52mJowlixe6gAADs=";
let D = {
  colorList: ["#409eff", "#67c23a", "#e6a23c", "#f56c6c", "#909399"],
  addCanvasHistoryHandler: null,
  uploadFileHandler: null,
  uploadImageHandler: null
}, V = {
  imageUrl: "",
  successHandler: null,
  exitHandler: null
};
function ht(e) {
  for (let n in e)
    D[n] = e[n];
}
function gt(e) {
  for (let n in e)
    V[n] = e[n];
}
function wt() {
  let e = document.createElement("canvas");
  return e.className = "wxx-canvas", e;
}
function At() {
  let e = document.createElement("canvas");
  return e.className = "wxx-temporary-canvas", e;
}
function vt() {
  let e = document.createElement("div");
  return e.className = "wxx-container", e;
}
function bt() {
  let e = document.createElement("div");
  e.id = "toolbar-draw", e.className = "wxx-toolbar-content__item", e.innerHTML = '<span class="iconfont icon-duobianxing"></span>', L(e, {
    content: "\u753B\u56FE",
    placement: "right"
  }), Ue(e, {
    content: n()
  });
  function n() {
    let t = ['<span class="iconfont icon-juxing"></span>', '<span class="iconfont icon-xingzhuang-sanjiaoxing"></span>', '<span class="iconfont icon-radio-on"></span>', '<span class="iconfont icon-tubiao"></span>'], a = document.createDocumentFragment(), o = document.createElement("div");
    o.className = "wxx-module", o.id = "wxx-draw-shapetype", t.forEach((c, d) => {
      let f = document.createElement("div");
      d == 0 ? f.className = "wxx-module-item is-selected" : f.className = "wxx-module-item", f.setAttribute("shapeType", d), f.innerHTML = c, o.appendChild(f);
    });
    let l = document.createElement("div");
    l.className = "wxx-range";
    let r = document.createElement("input");
    r.type = "range", r.value = 20, r.id = "wxx-draw-linewidth", l.appendChild(r);
    let s = document.createElement("div");
    return s.className = "wxx-module", s.id = "wxx-draw-color", ["#409eff", "#67c23a", "#e6a23c", "#f56c6c", "#909399"].forEach((c, d) => {
      let f = document.createElement("div");
      f.setAttribute("color", c);
      let x = document.createElement("div");
      d == 0 ? f.className = "wxx-module-item is-selected" : f.className = "wxx-module-item", x.className = "wxx-module-color", x.style.backgroundColor = c, f.appendChild(x), s.appendChild(f);
    }), v(a, [o, l, s]), a;
  }
  return e;
}
function Et() {
  let e = document.createElement("div");
  e.id = "toolbar-write", e.className = "wxx-toolbar-content__item", e.innerHTML = '<span class="iconfont icon-qianbipencil84"></span>', L(e, {
    content: "\u4E66\u5199",
    placement: "right"
  }), Ue(e, {
    content: n()
  });
  function n() {
    let t = ['<span class="iconfont icon-ziyouquxian"></span>', '<span class="iconfont icon-straight"></span>'], a = document.createDocumentFragment(), o = document.createElement("div");
    o.className = "wxx-module", o.id = "wxx-write-linetype", t.forEach((c, d) => {
      let f = document.createElement("div");
      d == 0 ? f.className = "wxx-module-item is-selected" : f.className = "wxx-module-item", f.setAttribute("lineType", d), f.innerHTML = c, o.appendChild(f);
    });
    let l = document.createElement("div");
    l.className = "wxx-range";
    let r = document.createElement("input");
    r.id = "wxx-write-linewidth", r.type = "range", r.value = 20, l.appendChild(r);
    let s = document.createElement("div");
    return s.className = "wxx-module", s.id = "wxx-write-color", ["#409eff", "#67c23a", "#e6a23c", "#f56c6c", "#909399"].forEach((c, d) => {
      let f = document.createElement("div");
      f.setAttribute("color", c);
      let x = document.createElement("div");
      d == 0 ? f.className = "wxx-module-item is-selected" : f.className = "wxx-module-item", x.className = "wxx-module-color", x.style.backgroundColor = c, f.appendChild(x), s.appendChild(f);
    }), v(a, [o, l, s]), a;
  }
  return e;
}
function Ct() {
  let e = document.createElement("div");
  return e.id = "toolbar-image", e.className = "wxx-toolbar-content__item", e.innerHTML = '<span class="iconfont icon-tupian"></span>', L(e, {
    content: "\u56FE\u7247",
    placement: "right"
  }), e;
}
function Tt() {
  let e = document.createElement("div");
  return e.id = "toolbar-pointer", e.className = "wxx-toolbar-content__item", e.innerHTML = '<span class="iconfont icon-pointer2"></span>', L(e, {
    content: "\u6307\u9488",
    placement: "right"
  }), e;
}
function Nt() {
  let e = document.createElement("div");
  e.id = "toolbar-text", e.className = "wxx-toolbar-content__item", e.innerHTML = '<span class="iconfont icon-text"></span>';
  function n() {
    let t = document.createDocumentFragment(), a = document.createElement("div");
    a.className = "wxx-range";
    let o = document.createElement("input");
    o.id = "wxx-text-fontsize", o.type = "range", o.value = 30, a.appendChild(o);
    let l = document.createElement("div");
    return l.className = "wxx-module", l.id = "wxx-text-color", ["#409eff", "#67c23a", "#e6a23c", "#f56c6c", "#909399"].forEach((s, i) => {
      let c = document.createElement("div");
      c.setAttribute("color", s);
      let d = document.createElement("div");
      i == 0 ? c.className = "wxx-module-item is-selected" : c.className = "wxx-module-item", d.className = "wxx-module-color", d.style.backgroundColor = s, c.appendChild(d), l.appendChild(c);
    }), v(t, [a, l]), t;
  }
  return L(e, {
    content: "\u6587\u672C",
    placement: "right"
  }), Ue(e, {
    content: n()
  }), e;
}
function kt() {
  let e = document.createElement("div");
  return e.id = "toolbar-undo", e.className = "wxx-toolbar-content__item", e.innerHTML = '<span class="iconfont icon-chexiao"></span>', L(e, {
    content: "\u64A4\u9500",
    placement: "right"
  }), e;
}
function Dt() {
  let e = document.createElement("div");
  return e.id = "toolbar-redo", e.className = "wxx-toolbar-content__item", e.innerHTML = '<span class="iconfont icon-fanchexiao"></span>', L(e, {
    content: "\u53CD\u64A4\u9500",
    placement: "right"
  }), e;
}
function St() {
  let e = document.createElement("div");
  return e.id = "toolbar-eraser", e.className = "wxx-toolbar-content__item", e.innerHTML = '<span class="iconfont icon-xiangpi1"></span>', L(e, {
    content: "\u6A61\u76AE",
    placement: "right"
  }), e;
}
function It() {
  let e = document.createElement("div");
  return e.id = "toolbar-open-file", e.className = "wxx-toolbar-content__item", e.innerHTML = '<span class="iconfont icon-wenjianjia"></span>', L(e, {
    content: "\u6253\u5F00\u6587\u4EF6",
    placement: "right"
  }), e;
}
function Bt() {
  let e = document.createElement("div");
  return e.id = "toolbar-add-page", e.className = "wxx-toolbar-content__item", e.innerHTML = '<span class="iconfont icon-jiahao"></span>', L(e, {
    content: "\u6DFB\u52A0\u9875\u9762",
    placement: "right"
  }), e;
}
function Lt() {
  let e = document.createElement("div");
  return e.id = "toolbar-delete-page", e.className = "wxx-toolbar-content__item", e.innerHTML = '<span class="iconfont icon-shanchu"></span>', L(e, {
    content: "\u5220\u9664\u9875\u9762",
    placement: "right"
  }), e;
}
function Ht() {
  let e = document.createElement("div");
  return e.id = "toolbar-reset", e.className = "wxx-toolbar-content__item", e.innerHTML = '<span class="iconfont icon-zhongzhi"></span>', L(e, {
    content: "\u91CD\u7F6E",
    placement: "right"
  }), e;
}
function Mt() {
  let e = document.createElement("div");
  return e.id = "toolbar-save", e.className = "wxx-toolbar-content__item", e.innerHTML = '<span class="iconfont icon-baocun"></span>', L(e, {
    content: "\u4FDD\u5B58",
    placement: "right"
  }), e;
}
function Pt() {
  let e = document.createElement("div");
  e.className = "wxx-toolbar-child";
  let n = document.createElement("div");
  n.id = "toolbar-pagination-prev", n.className = "wxx-toolbar-content__item", n.innerHTML = '<span class="iconfont  icon-shouqijiantouxiao"></span>';
  let t = document.createElement("div");
  t.id = "toolbar-pagination-page", t.className = "wxx-pagination-page";
  let a = document.createElement("div");
  return a.id = "toolbar-pagination-next", a.className = "wxx-toolbar-content__item", a.innerHTML = '<span class="iconfont icon-xialajiantouxiao"></span>', v(e, [n, t, a]), e;
}
function tt() {
  let e = document.createElement("div");
  return e.className = "wxx-overlay", e;
}
function Rt() {
  let e = document.createElement("div");
  e.id = "wxx-move-toolbar";
  let n = document.createElement("div");
  n.id = "move-toolbar-top", n.className = "wxx-move-toolbar__item", n.innerHTML = '<span class="iconfont  icon-set-top"></span>', L(n, {
    content: "\u7F6E\u9876",
    placement: "right"
  });
  let t = document.createElement("div");
  return t.id = "move-toolbar-bottom", t.className = "wxx-move-toolbar__item", t.innerHTML = '<span class="iconfont  icon-set-bottom"></span>', L(t, {
    content: "\u7F6E\u5E95",
    placement: "right"
  }), v(e, [n, t]), e;
}
function nt() {
  let e = document.createElement("div");
  e.id = "wxx-select-range";
  let n = document.createElement("div");
  n.className = "wxx-select-border";
  let t = document.createElement("div");
  t.className = "wxx-select-block";
  let a = ["left", "right", "top", "bottom"], o = ["left", "right", "top", "bottom", "leftTop", "leftBottom", "rightTop", "rightBottom"];
  a.forEach((s) => {
    let i = document.createElement("div");
    i.className = "select-range-border__" + s, i.style.background = `url(${et})`, n.appendChild(i);
  }), o.forEach((s) => {
    let i = document.createElement("div");
    i.className = "select-range-block__" + s, t.appendChild(i);
  });
  let l = document.createElement("img");
  return l.className = "wxx-screen-shot__background", l.src = `${V.imageUrl}`, v(e, [n, t]), e;
}
function Ot(e) {
  let n = document.createElement("div");
  n.id = "wxx-select-range";
  let t = document.createElement("div");
  t.className = "wxx-select-border";
  let a = document.createElement("div");
  a.className = "wxx-select-block";
  let o = ["left", "right", "top", "bottom"], l = ["left", "right", "top", "bottom", "leftTop", "leftBottom", "rightTop", "rightBottom"];
  o.forEach((i) => {
    let c = document.createElement("div");
    c.className = "select-range-border__" + i, c.style.background = `url(${et})`, t.appendChild(c);
  }), e && e.length && v(t, e), l.forEach((i) => {
    let c = document.createElement("div");
    c.className = "select-range-block__" + i, a.appendChild(c);
  });
  let r = document.createElement("img");
  return r.className = "wxx-screen-shot__background", r.src = `${V.imageUrl}`, v(n, [t, a]), n;
}
function he(e) {
  let n = document.getElementById("toolbar-pagination-page");
  n && (n.innerHTML = e);
}
function _t() {
  let e = document.createElement("img");
  return e.className = "wxx-screen-shot__background", e.src = `${V.imageUrl}`, e;
}
function Wt() {
  let e = document.createElement("img");
  return e.className = "wxx-screen-shot__cut", e.src = `${V.imageUrl}`, e;
}
function Ut() {
  let e = document.createElement("div");
  return e.id = "toolbar-exit", e.className = "wxx-toolbar-content__item", e.innerHTML = '<span class="iconfont icon-chacha"></span>', L(e, {
    content: "\u9000\u51FA",
    placement: "right"
  }), e;
}
function Jt() {
  let e = document.createElement("div");
  return e.id = "toolbar-success", e.className = "wxx-toolbar-content__item", e.innerHTML = '<span class="iconfont icon-duigou"></span>', L(e, {
    content: "\u5B8C\u6210",
    placement: "right"
  }), e;
}
function Ie(e, n) {
  e.beginPath(), e.moveTo(n[0].x, n[0].y), e.lineTo(n[1].x, n[1].y), e.stroke(), e.closePath();
}
function ve(e, n) {
  e.beginPath(), e.moveTo(n.x1, n.y1), e.quadraticCurveTo(n.x2, n.y2, n.x3, n.y3), e.stroke(), e.closePath();
}
function ot(e, n) {
  let t = null, a = null;
  if (n.length >= 3) {
    e.beginPath();
    for (let o = 0; o < n.length - 2; o++)
      a = {
        x: (n[o + 1].x + n[o + 2].x) / 2,
        y: (n[o + 1].y + n[o + 2].y) / 2
      }, t ? ve(e, {
        x1: t.x,
        y1: t.y,
        x2: n[o + 1].x,
        y2: n[o + 1].y,
        x3: a.x,
        y3: a.y
      }) : ve(e, {
        x1: n[o].x,
        y1: n[o].y,
        x2: n[o + 1].x,
        y2: n[o + 1].y,
        x3: a.x,
        y3: a.y
      }), t = a;
    e.closePath();
  }
}
async function Ft(e, n) {
  return new Promise((t) => {
    let { x: a, y: o, w: l, h: r, imageUrl: s } = n, i = new Image();
    i.crossOrigin = "*", i.src = s, i.onload = () => {
      e.drawImage(i, a, o, l, r), t(i);
    };
  });
}
function Be(e, n, t) {
  e.beginPath();
  let { x1: a, y1: o, x2: l, y2: r, x3: s, y3: i, x4: c, y4: d } = n;
  e.moveTo(a, o), e.lineTo(l, r), e.lineTo(s, i), e.lineTo(c, d), e.lineTo(a, o), t ? e.fill() : e.stroke();
}
function Le(e, n, t) {
  e.beginPath(), t ? e.fillRect(n.x, n.y, n.w, n.h) : e.strokeRect(n.x, n.y, n.w, n.h), e.closePath();
}
function He(e, n, t) {
  e.beginPath(), e.arc(n.x, n.y, n.r, 0, Math.PI * 2, !0), t ? e.fill() : e.stroke(), e.closePath();
}
function Me(e, n, t) {
  e.beginPath();
  let { x1: a, y1: o, x2: l, y2: r, x3: s, y3: i } = n;
  e.moveTo(a, o), e.lineTo(l, r), e.lineTo(s, i), e.lineTo(a, o), t ? e.fill() : e.stroke(), e.closePath();
}
function lt(e, n, t, a, o, l) {
  if (!(t && t.length))
    return;
  let r = "", s = 1, i = 0;
  if (e.measureText(t).width <= o)
    e.fillText(t, n.x, n.y);
  else
    for (let c = 0; c < t.length; c++)
      if (r += t[c], e.measureText(r).width >= o)
        if (s >= l) {
          e.fillText(t.substring(i, c) + "..", n.x, n.y);
          break;
        } else
          e.fillText(t.substring(i, c + 1), n.x, n.y), i = c + 1, s += 1, n.y += a, r = "";
      else
        c === t.length - 1 && e.fillText(t.substring(i), n.x, n.y);
}
function zt(e) {
  e = e || 10;
  for (var n = function() {
    return Math.random().toString(36).slice(2);
  }, t = n(); t.length < e; )
    t += n();
  return t.slice(0, e);
}
function ze(e) {
  return e instanceof Element;
}
function Pe(e) {
  return typeof e == "string";
}
function Re(e, n) {
  var t = document.createElement(e);
  return n && (t.className = n), t;
}
function ke(e, n) {
  var t = document.createElementNS("http://www.w3.org/2000/svg", e);
  for (var a in n)
    t.setAttribute(a, n[a]);
  return t;
}
function Qt() {
  var e = ke("svg", {
    width: "16px",
    height: "16px",
    stroke: "currentColor",
    viewBox: "0 0 16 16",
    "stroke-linecap": "round"
  }), n = ke("line", {
    x1: -7,
    y1: -7,
    x2: 6,
    y2: 6,
    transform: "translate(8.5 8.5)"
  }), t = ke("line", {
    x1: 6,
    y1: -7,
    x2: -7,
    y2: 6,
    transform: "translate(8.5 8.5)"
  });
  return e.appendChild(n), e.appendChild(t), e;
}
function at(e, n) {
  var t = n.previousElementSibling;
  t.classList.contains("_msg") && (e = parseInt(t.style.top) + parseInt(t.offsetHeight)), n.style.top = e + 16 + "px";
}
var Kt = "._msg{left:50%;color:#909399;font-size:14px;width:300px;padding:16px 17px;position:fixed;line-height:1;letter-spacing:1px;word-wrap:break-word;word-break:break-all;z-index:9999999999;border-radius:6px;border:1px solid #edf2fc;background-color:#edf2fc;transform:translateX(-50%);transition:opacity 0.3s,transform 0.5s,top 0.5s;}._msg p{margin:0;font-size:14px;padding-right:16px;}._msg svg{top:50%;right:15px;cursor:pointer;position:absolute;transform:translateY(-50%);}._msg-opacity{opacity:0;transform:translate(-50%,-100%);}._msg-success{background-color:#e1f3d8;border-color:#e1f3d8;color:#67c23a;}._msg-warn{background-color:#fdfce6;border-color:#fdfce6;color:#e6a23c;}._msg-error{background-color:#fef0f0;border-color:#fef0f0;color:#f56c6c;}", Oe = "_msg-opacity", Y = [], xe = ["info", "success", "warn", "error"], it = Re("style");
it.textContent = Kt;
document.head.appendChild(it);
var Yt = function(n) {
  X[xe[n]] = function(t) {
    Pe(t) ? t = {
      text: t,
      type: xe[n]
    } : t.type = xe[n], X(t);
  };
};
for (var jt in xe)
  Yt(jt);
function Ae(e, n, t, a) {
  return setTimeout(function() {
    e.style.top = 0, e.classList.add(Oe), typeof a == "function" && a(), setTimeout(function() {
      e.parentElement.removeChild(e);
    }, 500);
    var o = Y.findIndex(function(r) {
      return r.id === e.id;
    });
    Y.splice(o, 1);
    for (var l in Y)
      at(t, Y[l]);
  }, n);
}
X.destroyAll = function() {
  for (var e in Y)
    clearTimeout(Y[e].t), Ae(Y[e]);
};
function X(e) {
  Pe(e) && (e = {
    text: e
  });
  var n, t = Object.assign({
    type: xe[0],
    text: "",
    offset: 20,
    duration: 3e3
  }, e), a = t.text, o = t.type, l = t.zIndex, r = t.offset, s = t.duration, i = t.customClass, c = t.html, d = t.showClose, f = t.onClose, x = t.appendTo, u = Re("div", "_msg _msg-".concat(o, " ").concat(Oe, " ").concat(i || ""));
  u.style.zIndex = l || 1, u.id = zt(), Y.push(u), setTimeout(function() {
    u.classList.remove(Oe);
  }, 100), s && (u.t = Ae(u, s, r, f), u.onmouseenter = function() {
    n || clearTimeout(u.t);
  }, u.onmouseleave = function() {
    n || (u.t = Ae(u, s, r, f));
  });
  var y = Re("p");
  if (u.appendChild(y), c ? y.innerHTML = a : y.innerText = a, d || !s) {
    var H = Qt();
    H.onclick = function() {
      clearTimeout(u.t), n = !0, Ae(u, 0, r, f);
    }, u.appendChild(H);
  }
  var b;
  ze(x) ? b = x : Pe(x) && (b = document.querySelector(x)), ze(b) || (b = document.body), b.appendChild(u), at(r, Y[Y.length - 1]);
}
let p = [
  { canvasData: [], step: -1 },
  {
    canvasData: [],
    step: -1
  },
  {
    canvasData: [],
    step: -1
  }
], m = 0, E = 3, R = null, h = null, S = null, A = null, Z = -1, be = /* @__PURE__ */ new Map();
window.onkeydown = (e) => {
  console.log(e), Z != -1 && e.keyCode == 8 && (O(-1, {}, {
    deleteIndex: Z
  }), z(U(p[m].canvasData)), J()), e.keyCode == 37 && _e(), e.keyCode == 38 && pe(-1), e.keyCode == 39 && st(), e.keyCode == 40 && pe(1);
};
function Je(e, n) {
  be.has(e) || (console.log("\u6211\u5728\u7F13\u5B58\u56FE\u7247", e), be.set(e, n));
}
function O(e, n, t, a) {
  if (!n)
    return;
  p[m].step++, p[m].step < p[m].canvasData.length && (p[m].canvasData.length = p[m].step);
  let o = {
    actionType: e,
    position: n,
    options: t
  }, l = JSON.parse(JSON.stringify(T));
  o.index = p[m].canvasData.length, o.canvasResolution = l, p[a || m].canvasData.push(o), D.addCanvasHistoryHandler && D.addCanvasHistoryHandler({
    canvasHistory: p,
    nowPageIndex: m,
    allPageNumber: E
  }), console.log(p);
}
function F(e, n, t, a, o) {
  o && (Z = o);
  let l = k(e, n, t, a);
  ae.style.left = l.x2 + 20 + "px", ae.style.top = l.y2 - 10 + "px", j.style.left = l.x1 + "px", j.style.top = l.y1 + "px", j.style.width = Math.abs(l.x1 - l.x2) + "px", j.style.height = Math.abs(l.y1 - l.y3) + "px";
}
function J() {
  Z = -1, ae.style.left = -1e3 + "px", ae.style.top = -1e3 + "px", j.style.left = -1e3 + "px", j.style.top = -1e3 + "px";
}
function de() {
  h && R && h.clearRect(0, 0, R.width, R.height);
}
function P() {
  A && S && A.clearRect(0, 0, S.width, S.height);
}
function rt(e, n) {
  R = e, S = n, h = e.getContext("2d"), A = n.getContext("2d"), he(m + 1 + "/" + E);
}
function hn(e) {
  p = e.canvasHistory, m = e.nowPageIndex, E = e.allPageNumber;
  let n = p[m].canvasData;
  p[m].canvasData.length - 1 != p[m].step && (n = n.slice(0, p[m].step + 1)), he(m + 1 + "/" + E), z(U(n));
}
function Gt() {
  p.length && h && z(U(p[m].canvasData));
}
function U(e, n) {
  if (!e.length)
    return [];
  n && e.length - 1 != n && (e = e.slice(0, n + 1));
  let t = JSON.parse(JSON.stringify(e)), a = [];
  e.forEach((l, r) => {
    let { actionType: s, options: i, position: c, canvasResolution: d } = l;
    s == -1 ? (t[i.deleteIndex] = -1, t[r] = -1) : s == 0 ? (t[i.moveIndex].position = JSON.parse(JSON.stringify(c)), t[i.moveIndex].canvasResolution = JSON.parse(JSON.stringify(d)), i.drawData && (t[i.moveIndex].options.drawData = JSON.parse(JSON.stringify(i.drawData))), t[r] = -1) : s == 3 && (t[i.stretchIndex].position = JSON.parse(JSON.stringify(c)), t[i.stretchIndex].canvasResolution = JSON.parse(JSON.stringify(d)), i.drawData && (t[i.stretchIndex].options.drawData = JSON.parse(JSON.stringify(i.drawData))), t[r] = -1);
  });
  let o = JSON.parse(JSON.stringify(t));
  return t.forEach((l, r) => {
    if (l != -1) {
      if (l.actionType == 2 && o[l.options.topIndex] != -1) {
        let s = JSON.parse(JSON.stringify(t[l.options.topIndex]));
        for (let i = 0; i < o.length; i++)
          o[i].index == l.options.topIndex && (o.splice(i, 1), o.push(s));
      } else if (l.actionType == -2 && o[l.options.bottomIndex] != -1) {
        let s = JSON.parse(JSON.stringify(t[l.options.bottomIndex]));
        for (let i = 0; i < o.length; i++)
          o[i].index == l.options.bottomIndex && (o.splice(i, 1), o.unshift(s));
      }
    }
  }), o.forEach((l) => {
    if (l != -1 && l.actionType == 1) {
      let r = T.w / l.canvasResolution.w, s = T.h / l.canvasResolution.h;
      l.position = k(l.position.x1 * r, l.position.y1 * s, l.position.x3 * r, l.position.y3 * s);
      let { drawData: i, drawType: c } = l.options;
      if (c == 0 || c == 1)
        i.forEach((d) => {
          d.x = Math.floor(d.x * r), d.y = Math.floor(d.y * s);
        });
      else if (c == 2)
        i.x = Math.floor(i.x * r), i.y = Math.floor(i.y * s), i.w = Math.floor(i.w * r), i.h = Math.floor(i.h * s);
      else if (c == 3)
        i.x1 = Math.floor(i.x1 * r), i.y1 = Math.floor(i.y1 * s), i.x2 = Math.floor(i.x2 * r), i.y2 = Math.floor(i.y2 * s), i.x3 = Math.floor(i.x3 * r), i.y3 = Math.floor(i.y3 * s);
      else if (c == 4) {
        let d = Math.floor(l.position.x1 * r), f = Math.floor(l.position.y1 * s), x = Math.floor(l.position.x3 * r), u = Math.floor(l.position.y3 * s);
        i.x = (d + x) / 2, i.y = (f + u) / 2, i.r = Math.abs(x - d) / 2, l.position = k(d, (f + u) / 2 - i.r, x, (f + u) / 2 + i.r);
      } else
        c == 5 ? (i.x1 = Math.floor(i.x1 * r), i.y1 = Math.floor(i.y1 * s), i.x2 = Math.floor(i.x2 * r), i.y2 = Math.floor(i.y2 * s), i.x3 = Math.floor(i.x3 * r), i.y3 = Math.floor(i.y3 * s), i.x4 = Math.floor(i.x4 * r), i.y4 = Math.floor(i.y4 * s)) : c == 6 || c == 7 && (i.x = l.position.x1, i.y = l.position.y1, i.w = l.position.w, i.h = l.position.h);
      a.push(l);
    }
  }), a;
}
async function z(e) {
  de(), h.save();
  for (let n of e) {
    let { options: t, position: a } = n;
    if (t.ctxAttributes && yt(h, t.ctxAttributes), t.drawType == 0)
      ot(h, t.drawData);
    else if (t.drawType == 1)
      Ie(h, t.drawData);
    else if (t.drawType == 2)
      Le(h, t.drawData);
    else if (t.drawType == 3)
      Me(h, t.drawData);
    else if (t.drawType == 4)
      He(h, t.drawData);
    else if (t.drawType == 5)
      Be(h, t.drawData);
    else if (t.drawType == 6)
      lt(h, {
        x: a.x1,
        y: a.y1 + t.fontSize - Math.floor(t.fontSize / 6)
      }, t.text, t.fontSize, a.w, 100);
    else if (t.drawType == 7) {
      let { imageUrl: o, x: l, y: r, w: s, h: i } = t.drawData;
      if (be.has(o))
        h.drawImage(be.get(o), l, r, s, i);
      else {
        let c = await Ft(h, t.drawData);
        Je(o, c);
      }
    }
  }
  h.restore();
}
async function Vt(e, n) {
  let t = new Image();
  t.crossOrigin = "*";
  let a = "";
  D.uploadImageHandler ? a = await D.uploadImageHandler(e) : a = await pt(e), t.src = a, t.onload = () => {
    let o = (R.width - t.width / 2) / 2, l = (R.height - t.height / 2) / 2;
    h.drawImage(t, o, l, t.width / 2, t.height / 2), Je(a, t), O(1, k(o, l, o + t.width / 2, l + t.height / 2), {
      drawType: 7,
      isSelected: 1,
      drawData: {
        x: o,
        y: l,
        w: t.width / 2,
        h: t.height / 2,
        imageUrl: a
      }
    }), n && n();
  };
}
function Qe() {
  J(), S.style.zIndex = "-1", W.style.zIndex = "50";
  let e = !1, n = null, t = null, a = null, o = -1, l = null, r = null, s = null, i = null;
  function c(x) {
    e = !0;
    let u = N(x);
    if (p.length && p[m].canvasData.length) {
      let y = [];
      if (U(p[m].canvasData, p[m].step).forEach((b, C) => {
        if (b.actionType != -1) {
          let w = b.position;
          b.options.isSelected == 1 && We(w.x1, w.y1, w.x3, w.y3, u.x, u.y) && y.push(b);
        }
      }), y.length) {
        a = JSON.parse(JSON.stringify(y[y.length - 1])), o = y[y.length - 1].index, Z = o, t = u, i = !1;
        let { x1: b, y1: C, x3: w, y3: ue } = a.position;
        F(b, C, w, ue, o);
      } else
        x.srcElement.className.indexOf("select-range-block") != -1 || x.srcElement.className.indexOf("select-range-border") != -1 ? (t = u, i = x.srcElement.className.split("__")[1]) : (J(), i = !1, t = null, a = null, o = -1);
    }
  }
  function d(x) {
    if (!e || !t || o == -1)
      return;
    let { x1: u, y1: y, x2: H, y2: b, x3: C, y3: w, x4: ue, y4: Ne } = a.position;
    if (n = N(x), i) {
      if (x.srcElement.className.indexOf("select-range-block") == -1 && x.srcElement.className.indexOf("select-range-border") == -1)
        switch (n.x <= 15 && (n.x = 15), n.y <= 15 && (n.y = 15), n.x >= T.w - 15 && (n.x = T.w - 15), n.y >= T.h - 15 && (n.y = T.h - 15), i) {
          case "left":
            F(n.x, y, C, w), a.position.x1 = n.x, a.position.x4 = n.x;
            break;
          case "right":
            F(u, y, n.x, w), a.position.x2 = n.x, a.position.x3 = n.x;
            break;
          case "top":
            F(u, n.y, C, w), a.position.y1 = n.y, a.position.y2 = n.y;
            break;
          case "bottom":
            F(u, y, C, n.y), a.position.y3 = n.y, a.position.y4 = n.y;
            break;
          case "leftTop":
            F(n.x, n.y, C, w), a.position.x1 = n.x, a.position.y1 = n.y, a.position.y2 = n.y, a.position.x4 = n.x;
            break;
          case "leftBottom":
            F(n.x, y, C, n.y), a.position.x1 = n.x, a.position.y3 = n.y, a.position.x4 = n.x, a.position.y4 = n.y;
            break;
          case "rightTop":
            F(u, n.y, n.x, w), a.position.y1 = n.y, a.position.x2 = n.x, a.position.y2 = n.y, a.position.x3 = n.x;
            break;
          case "rightBottom":
            F(u, y, n.x, n.y), a.position.x2 = n.x, a.position.x3 = n.x, a.position.y3 = n.y, a.position.y4 = n.y;
            break;
        }
    } else
      r = n.x - t.x, s = n.y - t.y, u + r - 5 <= 0 && (r = 5 - u), y + s - 5 <= 0 && (s = 5 - y), C + r + 5 >= T.w && (r = T.w - C - 5), w + s + 5 >= T.h && (s = T.h - w - 5), F(u + r, y + s, C + r, w + s, o);
  }
  function f() {
    if (e = !1, !n || o == -1)
      return;
    let x = null, { drawData: u, drawType: y } = a.options;
    i ? x = k(a.position.x1, a.position.y1, a.position.x3, a.position.y3) : (x = k(a.position.x1 + r, a.position.y1 + s, a.position.x3 + r, a.position.y3 + s), a.position = x);
    let { x1: H, y1: b, x3: C, y3: w, w: ue, h: Ne } = x;
    if (y == 0 || y == 1)
      if (l = [], i) {
        let ge = x.w / a.position.w, mt = x.h / a.position.h;
        u.forEach((ne) => {
          l.push({
            x: Math.floor(ne.x * ge),
            y: Math.floor(ne.y * mt)
          });
        });
        let Fe = $e(l);
        l.forEach((ne) => {
          ne.x = ne.x - (Fe.x1 - x.x1), ne.y = ne.y - (Fe.y1 - x.y1);
        });
      } else
        u.forEach((ge) => {
          l.push({
            x: ge.x + r,
            y: ge.y + s
          });
        });
    else
      y == 2 ? l = {
        x: i ? H : u.x + r,
        y: i ? b : u.y + s,
        w: i ? ue : u.w,
        h: i ? Ne : u.h
      } : y == 3 ? l = {
        x1: i ? (H + C) / 2 : u.x1 + r,
        y1: i ? b : u.y1 + s,
        x2: i ? H : u.x2 + r,
        y2: i ? w : u.y2 + s,
        x3: i ? C : u.x3 + r,
        y3: i ? w : u.y3 + s
      } : y == 4 ? (l = {
        x: i ? (H + C) / 2 : u.x + r,
        y: i ? (b + w) / 2 : u.y + s,
        r: i ? Math.abs(H - C) / 2 : u.r
      }, i && (x = k(H, (b + w) / 2 - l.r, C, (b + w) / 2 + l.r), F(x.x1, x.y1, x.x3, x.y3))) : y == 5 ? l = {
        x1: i ? (H + C) / 2 : u.x1 + r,
        y1: i ? b : u.y1 + s,
        x2: i ? C : u.x2 + r,
        y2: i ? (b + w) / 2 : u.y2 + s,
        x3: i ? (H + C) / 2 : u.x3 + r,
        y3: i ? w : u.y3 + s,
        x4: i ? H : u.x4 + r,
        y4: i ? (b + w) / 2 : u.y4 + s
      } : y == 6 || y == 7 && (l = {
        x: i ? H : u.x + r,
        y: i ? b : u.y + s,
        w: i ? ue : u.w,
        h: i ? Ne : u.h,
        imageUrl: u.imageUrl
      });
    O(i ? 3 : 0, x, i ? {
      stretchIndex: o,
      drawData: l,
      isSelected: 1
    } : { moveIndex: o, drawData: l, isSelected: 1 }), z(U(p[m].canvasData)), n = null, t = null, l = null, r = null, s = null;
  }
  W.onmousedown = c, W.onmousemove = d, W.onmouseup = f, window.onmouseup = f;
}
function re(e) {
  W.style.zIndex = "-1", S.style.zIndex = "50", J(), h.lineWidth = e.lineWidth, h.strokeStyle = e.color, A.lineWidth = e.lineWidth, A.strokeStyle = e.color;
  let n, t, a, o = !1, l = null, r = null, s = [];
  if (e.lineType == 0) {
    let i = null;
    n = (c) => {
      o = !0, r = N(c), s.push(r);
    }, t = (c) => {
      if (!o)
        return;
      let d = N(c);
      if (Math.sqrt(Math.pow(s[s.length - 1].x - d.x, 2) + Math.pow(s[s.length - 1].y - d.y, 2)) >= 5 && (s.push(d), s.length >= 3)) {
        let f = s.slice(-2), x = {
          x: (f[0].x + f[1].x) / 2,
          y: (f[0].y + f[1].y) / 2
        };
        i ? ve(A, {
          x1: i.x,
          y1: i.y,
          x2: f[0].x,
          y2: f[0].y,
          x3: x.x,
          y3: x.y
        }) : ve(A, {
          x1: s[0].x,
          y1: s[0].y,
          x2: s[1].x,
          y2: s[1].y,
          x3: x.x,
          y3: x.y
        }), i = x;
      }
    }, a = () => {
      P(), ot(h, s);
      let c = $e(s);
      O(1, c, {
        drawType: 0,
        isSelected: 1,
        drawData: s,
        ctxAttributes: {
          lineWidth: e.lineWidth,
          strokeStyle: e.color
        }
      }), o = !1, i = null, l = null, r = null, s = [];
    };
  } else
    e.lineType == 1 && (n = (i) => {
      r = N(i), o = !0;
    }, t = (i) => {
      if (!o)
        return;
      let c = N(i);
      r && (P(), Ie(A, [r, c]), l = c);
    }, a = () => {
      if (l) {
        P(), s = [r, l], Ie(h, s);
        let i = k(r.x, r.y, l.x, l.y);
        O(1, i, {
          drawType: 1,
          drawData: s,
          isSelected: 1,
          ctxAttributes: {
            lineWidth: e.lineWidth,
            strokeStyle: e.color
          }
        });
      }
      o = !1, r = null, l = null, s = [];
    });
  S.onmousedown = n, S.onmousemove = t, S.onmouseup = a;
}
function fe(e) {
  W.style.zIndex = "-1", S.style.zIndex = "50", J();
  let n = e.shapeType;
  h.strokeStyle = e.color, h.lineWidth = e.lineWidth, A.strokeStyle = e.color, A.lineWidth = e.lineWidth;
  let t = null, a = !1, o = null, l = null;
  function r(c) {
    a = !0, l = N(c);
  }
  function s(c) {
    !a || !l || (o = N(c), P(), A.beginPath(), n == 0 ? (t = { x: l.x, y: l.y, w: o.x - l.x, h: o.y - l.y }, Le(A, t)) : n == 1 ? (t = {
      x1: (l.x + o.x) / 2,
      y1: l.y,
      x2: l.x,
      y2: o.y,
      x3: o.x,
      y3: o.y
    }, Me(A, t)) : n == 2 ? (t = {
      x: (l.x + o.x) / 2,
      y: (l.y + o.y) / 2,
      r: Math.abs(o.x - l.x) / 2
    }, He(A, t)) : n == 3 && (t = {
      x1: (l.x + o.x) / 2,
      y1: l.y,
      x2: o.x,
      y2: (l.y + o.y) / 2,
      x3: (l.x + o.x) / 2,
      y3: o.y,
      x4: l.x,
      y4: (l.y + o.y) / 2
    }, Be(A, t)), A.closePath());
  }
  function i(c) {
    if (a = !1, P(), o || (o = N(c)), Math.abs(o.x - l.x) <= 30 && Math.abs(o.y - l.y) <= 30) {
      let d = N(c);
      l = { x: d.x - 15, y: d.y - 15 }, o = { x: d.x + 15, y: d.y + 15 };
    }
    if (n == 0) {
      let d = k(l.x, l.y, o.x, o.y);
      t = { x: l.x, y: l.y, w: o.x - l.x, h: o.y - l.y }, Le(h, t), O(1, d, {
        drawType: 2,
        drawData: t,
        isSelected: 1,
        ctxAttributes: {
          lineWidth: e.lineWidth,
          strokeStyle: e.color
        }
      });
    } else if (n == 1) {
      let d = k(l.x, l.y, o.x, o.y);
      t = {
        x1: (l.x + o.x) / 2,
        y1: l.y,
        x2: l.x,
        y2: o.y,
        x3: o.x,
        y3: o.y
      }, Me(h, t), O(1, d, {
        drawType: 3,
        isSelected: 1,
        drawData: t,
        ctxAttributes: {
          lineWidth: e.lineWidth,
          strokeStyle: e.color
        }
      });
    } else if (n == 2) {
      t = {
        x: (l.x + o.x) / 2,
        y: (l.y + o.y) / 2,
        r: Math.abs(o.x - l.x) / 2
      };
      let d = k(l.x, (l.y + o.y) / 2 - t.r, o.x, (l.y + o.y) / 2 + t.r);
      He(h, t), O(1, d, {
        drawType: 4,
        drawData: t,
        isSelected: 1,
        ctxAttributes: {
          lineWidth: e.lineWidth,
          strokeStyle: e.color
        }
      });
    } else if (n == 3) {
      let d = k(l.x, l.y, o.x, o.y);
      t = {
        x1: (l.x + o.x) / 2,
        y1: l.y,
        x2: o.x,
        y2: (l.y + o.y) / 2,
        x3: (l.x + o.x) / 2,
        y3: o.y,
        x4: l.x,
        y4: (l.y + o.y) / 2
      }, Be(h, t), O(1, d, {
        drawType: 5,
        drawData: t,
        isSelected: 1,
        ctxAttributes: {
          lineWidth: e.lineWidth,
          strokeStyle: e.color
        }
      });
    }
    o = null, l = null, t = null;
  }
  S.onmousedown = r, S.onmousemove = s, S.onmouseup = i;
}
function Ee(e) {
  A.restore(), W.style.zIndex = "-1", S.style.zIndex = "50", J(), P(), h.font = e.font, h.strokeStyle = e.color, h.fillStyle = e.color;
  let n = !1, t = null, a = null, o = null;
  function l() {
    P(), A.beginPath(), A.lineWidth = 2, A.strokeStyle = "red", A.setLineDash([3, 3]), A.strokeRect(a.x, a.y, t.x - a.x, t.y - a.y), A.closePath(), A.setLineDash([]);
  }
  function r() {
    n = !0, a = N(event);
  }
  function s() {
    if (!a)
      return;
    if (t || (t = N(event)), Math.abs(t.x - a.x) <= 30 && Math.abs(t.y - a.y) <= 30) {
      let d = N(event);
      a = { x: d.x - 50, y: d.y - 50 }, t = { x: d.x + 50, y: d.y + 50 };
    }
    o = k(a.x, a.y, t.x, t.y), l();
    let c = document.createElement("div");
    c.contentEditable = "true", c.className = "wxx-edit-box", c.style.font = e.font, c.style.lineHeight = e.fontSize + "px", c.style.color = e.color, c.style.left = o.x1 + "px", c.style.top = o.y1 + "px", c.style.width = o.w + "px", c.style.height = o.h + "px", _.appendChild(c), c.focus(), c.onblur = () => {
      P();
      let d = c.innerText;
      d && d.length && (lt(h, {
        x: o.x1,
        y: o.y1 + e.fontSize - Math.floor(e.fontSize / 6)
      }, d, e.fontSize, o.w, 100), O(1, o, {
        drawType: 6,
        text: c.innerText,
        fontSize: e.fontSize,
        isSelected: 1,
        ctxAttributes: {
          fillStyle: e.color,
          strokeStyle: e.color,
          font: e.font
        }
      })), _.removeChild(c);
    }, n = !1, t = null, a = null;
  }
  function i(c) {
    !n || !a || (t = N(c), l());
  }
  S.onmousedown = r, S.onmousemove = i, S.onmouseup = s;
}
function _e(e) {
  let n = e || 0;
  p[m].step >= n ? (J(), de(), p[m].step -= 1, z(U(p[m].canvasData.slice(0, p[m].step + 1))), D.addCanvasHistoryHandler && D.addCanvasHistoryHandler({
    canvasHistory: p,
    nowPageIndex: m,
    allPageNumber: E
  })) : X({
    type: "warn",
    text: "\u65E0\u6CD5\u64A4\u9500",
    zIndex: 999
  });
}
function st() {
  p[m].step < p[m].canvasData.length - 1 ? (J(), de(), p[m].step += 1, z(U(p[m].canvasData.slice(0, p[m].step + 1))), D.addCanvasHistoryHandler && D.addCanvasHistoryHandler({
    canvasHistory: p,
    nowPageIndex: m,
    allPageNumber: E
  })) : X({
    type: "warn",
    text: "\u5DF2\u7ECF\u662F\u6700\u65B0\u8BB0\u5F55\u4E86",
    zIndex: 999
  });
}
function Xt() {
  W.style.zIndex = "-1", S.style.zIndex = "-1", J(), P();
  let e = !1, n = null, t = -1;
  function a() {
    e = !0;
  }
  function o(r) {
    if (!e)
      return;
    let s = N(r);
    if (n != null && p.length && p[m].canvasData.length) {
      let i = [];
      U(p[m].canvasData, p[m].step).forEach((d, f) => {
        let { position: x } = d;
        We(x.x1, x.y1, x.x3, x.y3, s.x, s.y) && (i.push(d), t = d.index);
      }), i.length && (O(-1, {}, {
        deleteIndex: t
      }), z(U(p[m].canvasData))), t = -1;
    }
    n = s;
  }
  function l() {
    e = !1, n = null;
  }
  R.onmousedown = a, R.onmousemove = o, R.onmouseup = l;
}
async function Zt(e) {
  if (!D.uploadFileHandler)
    return;
  X({
    type: "info",
    text: "\u6587\u4EF6\u6253\u5F00\u4E2D...",
    zIndex: 999,
    duration: 0
  });
  let n = await D.uploadFileHandler(e);
  X.destroyAll();
  let t = E - m, a = JSON.parse(JSON.stringify(T));
  n.forEach((o, l) => {
    p.push({
      canvasData: [{
        index: 0,
        actionType: 1,
        canvasResolution: a,
        position: k(0, 0, R.width, R.height),
        options: {
          drawType: 7,
          drawData: {
            x: 0,
            y: 0,
            w: R.width,
            h: R.height,
            imageUrl: o
          }
        }
      }],
      step: 0
    }), E += 1;
  }), pe(t);
}
function qt() {
  E < 99 ? (E++, m = E - 1, p.push({
    canvasData: [],
    step: -1
  }), he(m + 1 + "/" + E), P(), de(), J(), D.addCanvasHistoryHandler && D.addCanvasHistoryHandler({
    canvasHistory: p,
    nowPageIndex: m,
    allPageNumber: E
  })) : X({
    type: "warn",
    text: "\u6700\u591A\u6253\u5F0099\u9875",
    zIndex: 999
  });
}
function $t() {
  E > 3 ? (p.splice(m, 1), E--, m != 0 && m--, P(), de(), J(), he(m + 1 + "/" + E), z(U(p[m].canvasData, p[m].step)), D.addCanvasHistoryHandler && D.addCanvasHistoryHandler({
    canvasHistory: p,
    nowPageIndex: m,
    allPageNumber: E
  })) : X({
    type: "warn",
    text: "\u6700\u5C11\u4FDD\u75593\u9875",
    zIndex: 999
  });
}
function en() {
  p[m].canvasData = [], p[m].step = -1, de(), D.addCanvasHistoryHandler && D.addCanvasHistoryHandler({
    canvasHistory: p,
    nowPageIndex: m,
    allPageNumber: E
  });
}
function Ke() {
  let e = document.createElement("a");
  e.href = R.toDataURL("image/png", 1), e.download = Date.now() + "-wxx", e.click();
}
function pe(e) {
  let n = m + e;
  n >= 0 && n < E && (J(), m = n, he(m + 1 + "/" + E), z(U(p[m].canvasData, p[m].step)), D.addCanvasHistoryHandler && D.addCanvasHistoryHandler({
    canvasHistory: p,
    nowPageIndex: m,
    allPageNumber: E
  }));
}
function tn() {
  Z != -1 && (O(2, {}, {
    topIndex: Z
  }), P(), z(U(p[m].canvasData)));
}
function nn() {
  Z != -1 && (O(-2, {}, {
    bottomIndex: Z
  }), P(), z(U(p[m].canvasData)));
}
const on = "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAS5JREFUWEftluFtAjEMRj826Sa0k7RMQjsJ3QQ2KZuAnnSWroFzbAcJCZ1/cSLkvTi2uY2eHJsn87UKvFQG3iVtJf1k6uoRGThIOkv6knSaPoclRgWOkjg58THBP6fnkMSIwBwOkyzsshJVgRZu156WqAgswUsSWYEefC5BTRBuTWQEovB7Evul7ogKZOHtdfB7MkKb/ouIAH1Oj4/E79QhN3v0BB4BB1oSYMCQutFYhLOxlwHSTvG8DRi4cE+A0wNnstFG3wWJLtwT+JvNdjKQlQjBPYFLcz0ZiTC8J9D2bUQiBfcEuH/qwMaplYAnkYZ7AgZiTfu/fk+iBO+1oSdBdhhSrCnDewJ8bxLMhPnLBs+WGQTK0RvFtrHVhJ049LoVsYoKRPYqrVkF1gxcAd5NRCFMX2QdAAAAAElFTkSuQmCC", Ye = "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAATBJREFUWEft1jEoRVEYwPHfK8VgsRjFgMHIZBApGW1GDPQmk0FKyiKZjBjIZDNKFCWbUYoMZGKwKiW6de748u69Ojev922nzun/P993ztdXUXJUSuZrCuTNwBpGa5TvCXP1ljavwMUvAj0NL5BecBjXYbGJ5Xpvnu7LW4L0/DSOwqKKndgCS9gK0EmcxhbYxmKA9uMhtsAxpgK0FZ+xBW4wiBd0ZYUn+4s+wld04gojsQXa8BGgh5iJLdCH+wBdR9KeM0eREozjPBCT3n+QmV7wDcxiP0DHcBlbYBVJ6pPoxnNsgV3M4wsteeBFv+EJkvb7iN4yBG4xgDNMlCHwHaB7WIgt0IH3AF3BRiyBdBZsx1CA3uENmWbBVDhrI/qzWfDfCuQtdc1zWUvQFGi8DPwAc4IwIXga0xcAAAAASUVORK5CYII=", ie = "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAV9JREFUWEfF1i1LBUEUxvH/bRbRZrtN8CVY/RZefIuC1SQ2k1puMxisFkHEFwSrVTApKKjNYPADWKxyljkwDHfcvXfPGQc27JTnN+fMsqfDP69OyJ8EboDP8DwDT8CHt08Bi8DDgLB14NIToYBx4DsJ0vBz4NoLogDJ/gHGAkLDT4DNZM+0IDHgHZgBNPwY2MpUxQwRA87CRZSeHwI7mRTTexED1kKf+8BuzRHNEDFAMveBvYb1NUGkgOKIQYCiiBygGOIvQBFEHcAd0QTgimgKcEMMA3BBDAswR4wCMEWMCjBDtAGYINoCWiMsAE0Rt8AqMA286R/XClCHuAOWgS5wEaauCmEJyCHugR4wFcLngVdFWANSxCOwBExE4Vr9F2DBA6CIlRAuk7aUXU6ergMvgATNhhbnwr+AOU9A3cXcAE69ATnENnDk8RXkBmqZtGXsl3UVpu/qpUQFcqhq/xcow1CwGZMpXAAAAABJRU5ErkJggg==", je = "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAKBJREFUWEftltEJg0AQBcdO0olJJ7ESsZKkk2gnliIPFBRNNKewCu++99i5Ofd5GcErC+6PAS5voARuQJH6Le0x8ARefeMHUKdAHAUgA28D2IANHG1Ac/5r5cBQoxFsVuoXx/RbDihg1gD+PbAAZol5WgDl+z3yCrboHf8LHMU2YAMhBpQTn35eQwAUVnqUtkC1JTiWava8CVN7TvYZwAY66rstIT+8ni4AAAAASUVORK5CYII=";
let ct = null, g = null;
function Q(e, n, t, a) {
  let o = k(e, n, t, a);
  te.style.left = o.x1 + "px", te.style.top = o.y1 + "px", te.style.width = Math.abs(o.x1 - o.x2) + "px", te.style.height = Math.abs(o.y1 - o.y3) + "px", ye.style.left = -o.x1 + "px", ye.style.top = -o.y1 + "px";
}
function De() {
  te.style.left = -1e3 + "px", te.style.top = -1e3 + "px";
}
function Ge() {
  me.style.opacity = "0.6";
}
function ln() {
  me.style.opacity = "1";
}
function we(e) {
  if (e) {
    let { x1: n, y1: t, x3: a, y3: o, w: l, h: r } = g;
    n - 50 >= 0 ? (K.style.left = n - 50 + "px", K.style.top = t + "px") : (K.style.left = a + 5 + "px", K.style.top = t + "px");
  } else
    K.style.left = "-1000px", K.style.top = "-1000px";
}
function an(e, n) {
  ct = n, e.getContext("2d"), n.getContext("2d");
}
function rn() {
  ct.style.zIndex = "-1", $.style.zIndex = "50", $.style.cursor = "crosshair", we(!1), De();
  let e = !1, n = null, t = null, a = null, o = null, l = !1, r = null;
  function s(d) {
    e = !0;
    let f = N(d);
    n = f, g ? We(g.x1, g.y1, g.x3, g.y3, f.x, f.y) ? (r = "move", l = !1) : d.srcElement.className.indexOf("select-range-block") != -1 || d.srcElement.className.indexOf("select-range-border") != -1 ? (r = "stretch", l = d.srcElement.className.split("__")[1]) : (r = "draw", g = null, De(), Ge()) : (r = "draw", g = null, De(), Ge());
  }
  function i(d) {
    if (!(!e || !n)) {
      if (we(!1), r == "draw")
        d.srcElement.className == "wxx-overlay" && (t = N(d), Q(n.x, n.y, t.x, t.y));
      else if (r == "move") {
        let { x1: f, y1: x, x3: u, y3: y } = g;
        t = N(d), a = t.x - n.x, o = t.y - n.y, f + a - 5 <= 0 && (a = 5 - f), x + o - 5 <= 0 && (o = 5 - x), u + a + 5 >= _.clientWidth && (a = _.clientWidth - u - 5), y + o + 5 >= _.clientHeight && (o = _.clientHeight - y - 5), Q(f + a, x + o, u + a, y + o);
      } else if (r == "stretch" && d.srcElement.className.indexOf("select-range-block") == -1 && d.srcElement.className.indexOf("select-range-border") == -1) {
        let { x1: f, y1: x, x3: u, y3: y } = g;
        switch (t = N(d), l) {
          case "left":
            Q(t.x, x, u, y), g.x1 = t.x;
            break;
          case "right":
            Q(f, x, t.x, y), g.x3 = t.x;
            break;
          case "top":
            Q(f, t.y, u, y), g.y1 = t.y;
            break;
          case "bottom":
            Q(f, x, u, t.y), g.y3 = t.y;
            break;
          case "leftTop":
            Q(t.x, t.y, u, y), g.x1 = t.x, g.y1 = t.y;
            break;
          case "leftBottom":
            Q(t.x, x, u, t.y), g.x1 = t.x, g.y3 = t.y;
            break;
          case "rightTop":
            Q(f, t.y, t.x, y), g.y1 = t.y, g.x3 = t.x;
            break;
          case "rightBottom":
            Q(f, x, t.x, t.y), g.x3 = t.x, g.y3 = t.y;
            break;
        }
      }
    }
  }
  function c() {
    if (e = !1, !t) {
      n && !g && (ln(), we(!1));
      return;
    }
    if (r == "draw")
      g = k(n.x, n.y, t.x, t.y);
    else if (r == "move") {
      let { x1: d, y1: f, x3: x, y3: u } = g;
      g = k(d + a, f + o, x + a, u + o);
    } else if (r == "stretch") {
      let { x1: d, y1: f, x3: x, y3: u } = g;
      g = k(d, f, x, u);
    }
    we(!0), t = null, n = null, a = null, o = null, r = null, l = !1;
  }
  $.onmousedown = s, $.onmousemove = i, $.onmouseup = c, window.onmouseup = c;
}
let I = wt(), B = At(), sn = Ct(), ee = Tt(), le = Et(), se = bt(), ce = Nt(), dt = kt(), cn = Dt(), Ce = St(), dn = Bt(), un = Lt(), xn = Ht(), ut = Mt(), fn = It(), mn = Pt(), pn = Ut(), yn = Jt(), Te = null, K = null, me = null, ye = null, _ = vt(), W = tt(), $ = tt(), j = null, te = null, ae = Rt(), T = { w: 0, h: 0 }, G = {
  lineType: 0,
  lineWidth: 2,
  color: "#409eff"
}, q = {
  shapeType: 0,
  lineWidth: 2,
  color: "#409eff"
}, oe = {
  fontSize: 15,
  font: "15px Arial",
  color: "#409eff"
};
function xt() {
  let e = [ee, le, se, ce, Ce];
  Te && Te.addEventListener("click", (t) => {
    switch (t.stopPropagation(), t.preventDefault(), P(), t.target.id) {
      case "toolbar-image":
        let a = document.createElement("input");
        a.type = "file", a.accept = "image/*", a.click(), a.onchange = (l) => {
          Vt(l.target.files[0], () => {
            ee.click(), setTimeout(() => {
              let r = document.createEvent("MouseEvents");
              r.initMouseEvent("mousedown", !0, !0, window, 0, 0, 0, T.w / 2, T.h / 2, !1, !1, !1, !1, 0, null), W.dispatchEvent(r), r.initMouseEvent("mouseup", !0, !0, window, 0, 0, 0, T.w / 2, T.h / 2, !1, !1, !1, !1, 0, null), W.dispatchEvent(r);
            }, 200);
          });
        };
        break;
      case "toolbar-pointer":
        I.style.cursor = "initial", B.style.cursor = "initial", M(e, ee), Qe();
        break;
      case "toolbar-write":
        B.style.cursor = `url(${ie}),default`, I.style.cursor = `url(${ie}),default`, M(e, le), re(G), Ve();
        break;
      case "toolbar-draw":
        B.style.cursor = `url(${je}),default`, M(e, se), fe(q), Xe();
        break;
      case "toolbar-text":
        B.style.cursor = `url(${Ye}),default`, M(e, ce), Ee(oe), Ze();
        break;
      case "toolbar-undo":
        _e();
        break;
      case "toolbar-redo":
        st();
        break;
      case "toolbar-eraser":
        I.style.cursor = `url(${on}),default`, M(e, Ce), Xt();
        break;
      case "toolbar-open-file":
        let o = document.createElement("input");
        o.type = "file", o.accept = "*", o.click(), o.onchange = (l) => {
          console.log(l), Zt(l.target.files[0]);
        };
        break;
      case "toolbar-add-page":
        qt();
        break;
      case "toolbar-delete-page":
        $t();
        break;
      case "toolbar-reset":
        en();
        break;
      case "toolbar-save":
        Ke();
        break;
      case "toolbar-pagination-prev":
        pe(-1);
        break;
      case "toolbar-pagination-next":
        pe(1);
        break;
    }
  }), ae && ae.addEventListener("click", (t) => {
    switch (t.stopPropagation(), t.preventDefault(), t.target.id) {
      case "move-toolbar-top":
        tn();
        break;
      case "move-toolbar-bottom":
        nn();
        break;
    }
  });
  function n() {
    return new Promise((t) => {
      let { x1: a, y1: o, w: l, h: r } = g, s = document.createElement("div");
      s.className = "wxx-screen-edit", s.style.width = l + "px", s.style.height = r + "px", s.style.left = a + "px", s.style.top = o + "px";
      let i = I.getContext("2d"), c = new Image();
      c.crossOrigin = "*";
      let d = new Image();
      d.crossOrigin = "*", c.src = ye.src, c.onload = () => {
        i.drawImage(c, a, o, l, r, 0, 0, l, r);
        let f = I.toDataURL("image/png", 1), x = {
          x: 0,
          y: 0,
          w: l,
          h: r,
          imageUrl: f
        };
        O(1, k(0, 0, l, r), {
          drawType: 7,
          isSelected: 0,
          drawData: x
        }), d.src = f, d.onload = () => {
          Je(f, d), t(!0);
        };
      }, v(W, [j]), v(s, [I, B, W]), _.replaceChild(s, $), _ = s, ft(s), n = () => new Promise((f) => {
        f(!0);
      });
    });
  }
  K && K.addEventListener("click", (t) => {
    n().then(() => {
      switch (t.stopPropagation(), t.preventDefault(), P(), t.target.id) {
        case "toolbar-pointer":
          I.style.cursor = "initial", B.style.cursor = "initial", M(e, ee), Qe();
          break;
        case "toolbar-write":
          B.style.cursor = `url(${ie}),default`, I.style.cursor = `url(${ie}),default`, M(e, le), re(G), Ve();
          break;
        case "toolbar-draw":
          B.style.cursor = `url(${je}),default`, M(e, se), fe(q), Xe();
          break;
        case "toolbar-text":
          B.style.cursor = `url(${Ye}),default`, M(e, ce), Ee(oe), Ze();
          break;
        case "toolbar-save":
          Ke();
          break;
        case "toolbar-undo":
          _e(1);
          break;
        case "toolbar-exit":
          V.exitHandler && V.exitHandler();
          break;
        case "toolbar-success":
          if (V.successHandler) {
            let a = I.toDataURL("image/png", 1);
            V.successHandler(a);
          }
          break;
      }
    });
  });
}
function Ve() {
  function e(r) {
    r.srcElement.className.includes("wxx-module-item") && (M(a.children, r.srcElement), G.lineType = r.srcElement.getAttribute("lineType"), re(G));
  }
  function n(r) {
    let s = Number(r.srcElement.value) * 0.1;
    s === 0 && (s = 1), G.lineWidth = s.toFixed(0), re(G);
  }
  function t(r) {
    r.srcElement.className.includes("wxx-module-item") && (M(o.children, r.srcElement), G.color = r.srcElement.getAttribute("color"), re(G));
  }
  let a = document.getElementById("wxx-write-linetype"), o = document.getElementById("wxx-write-color"), l = document.getElementById("wxx-write-linewidth");
  l.removeEventListener("change", n), a.removeEventListener("click", e), o.removeEventListener("click", t), l.addEventListener("change", n), a.addEventListener("click", e), o.addEventListener("click", t);
}
function Xe() {
  function e(r) {
    r.srcElement.className.includes("wxx-module-item") && (M(a.children, r.srcElement), q.shapeType = r.srcElement.getAttribute("shapeType"), fe(q));
  }
  function n(r) {
    let s = Number(r.srcElement.value) * 0.1;
    s === 0 && (s = 1), q.lineWidth = s.toFixed(0), fe(q);
  }
  function t(r) {
    r.srcElement.className.includes("wxx-module-item") && (M(o.children, r.srcElement), q.color = r.srcElement.getAttribute("color"), fe(q));
  }
  let a = document.getElementById("wxx-draw-shapetype"), o = document.getElementById("wxx-draw-color");
  document.getElementById("wxx-draw-linewidth").addEventListener("change", n), a.addEventListener("click", e), o.addEventListener("click", t);
}
function Ze() {
  function e(o) {
    let l = Number(o.srcElement.value) * 0.5;
    l === 0 && (l = 1), oe.fontSize = Number(l.toFixed(0)), oe.font = l.toFixed(0) + "px Arial", Ee(oe);
  }
  function n(o) {
    o.srcElement.className.includes("wxx-module-item") && (M(a.children, o.srcElement), oe.color = o.srcElement.getAttribute("color"), Ee(oe));
  }
  let t = document.getElementById("wxx-text-fontsize"), a = document.getElementById("wxx-text-color");
  t.addEventListener("change", e), a.addEventListener("click", n);
}
function ft(e) {
  qe(e.clientWidth, e.clientHeight), window.addEventListener("resize", () => {
    ee.click(), qe(e.clientWidth, e.clientHeight);
  });
}
function qe(e, n) {
  (e != T.w || n != T.h) && (I.width = e, B.width = e, I.height = n, B.height = n, T.w = e, T.h = n, Gt());
}
function gn(e, n) {
  n && ht(n), j = nt();
  let t = document.createElement("div");
  t.className = "wxx-toolbar";
  let a = document.createElement("div");
  a.className = "wxx-toolbar-child";
  let o = document.createElement("div");
  o.className = "wxx-toolbar-content", v(o, [sn, ee, le, se, ce]);
  let l = document.createElement("div");
  l.className = "wxx-toolbar-content", v(l, [dt, cn, Ce]);
  let r = document.createElement("div");
  r.className = "wxx-toolbar-content", v(r, [fn, dn, un, xn, ut]), v(a, [o, l, r]), v(t, [a, mn]), Te = t, v(W, [j]), v(_, [I, Te, B, W, ae]);
  let s = document.createElement("div");
  s.className = "wxx-toolbar-child", s.innerText = "wxx", e.parentElement.replaceChild(_, e), xt(), rt(I, B), ft(_), setTimeout(() => {
    B.style.cursor = `url(${ie}),default`, I.style.cursor = `url(${ie}),default`, M([ee, le, se, ce, Ce], le), re(G);
  }, 500);
}
function wn(e, n) {
  n && gt(n);
  let t = document.createElement("div");
  t.className = "wxx-screen-toolbar";
  let a = document.createElement("div");
  a.className = "wxx-toolbar-content";
  let o = document.createElement("div");
  o.className = "wxx-toolbar-content", v(a, [ee, le, se, ce, ut]), v(o, [dt, pn, yn]), v(t, [a, o]), K = t, me = _t(), ye = Wt(), j = nt(), te = Ot([ye, I, B]), v($, [te]), v(_, [me, $, K]), _.style.background = "#000", e.parentElement.replaceChild(_, e), an(I, B), rt(I, B), xt(), me.addEventListener("mousedown", (l) => (l.stopPropagation(), l.preventDefault(), !1)), rn();
}
export {
  wn as initScreenShot,
  gn as initWhiteBoard,
  hn as updateCanvasHistory
};
