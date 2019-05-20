
/**
 * 检查 `class` 属性中是否包含类
 *
 * @export hasClass
 * @param {Element} el HTML元素节点
 * @param {String} className 需要查找到的类名称
 * @returns
 */
export function hasClass (el, className) {
  let reg = new RegExp("(^|\\s)" + className + "(\\s|$)")
  return reg.test(el.className)
}

/**
 * 从HTML `class` 属性中添加类
 *
 * @export addClass
 * @param {Element} el HTML元素节点
 * @param {String} className 需要添加的类名称
 */
export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }

  let newClass = el.className.split(" ")
  newClass.push(className)
  el.className = newClass.join(" ")
}

/**
 * 从HTML `class` 属性中移除类
 *
 * @export removeClass
 * @param {Element} el HTML元素节点
 * @param {String} className 需要移除的类名称
 */
export function removeClass (el, className) {
  if (!hasClass(el, className)) {
    return
  }

  let reg = new RegExp("(^|\\s)" + className + "(\\s|$)", "g")
  el.className = el.className.replace(reg, " ")
}

/**
 * 设置/获取HTML节点属性
 *
 * @export getData
 * @param {Element} el HTML元素节点
 * @param {String} name 需要获取的属性名称
 * @param {*} val val 是 truth 函数变为设置节点属性值
 * @returns 获取的属性值
 */
export function getData (el, name, val) {
  let prefix = "data-"
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

/**
 * 获取节点位置信息
 *
 * @export getRect
 * @param {Element} el HTML元素节点
 * @returns {Object} 返回节点位置信息对象
 */
export function getRect (el) {
  if (el instanceof window.SVGElement) {
    let rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    }
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight,
    }
  }
}
