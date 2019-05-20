
/**
 * 默认 `callback` 空函数
 *
 * @export noop
 */
export function noop () {}

/**
 * px 转成 rem 辅助函数
 * 解决行内样式不能转成rem的问题
 *
 * @export pxtorem
 * @param {Number} num 像素数值 px
 * @param {Number} [base="37.5"] rootvalue 基础数值 同 px-to-rem loader rootValue
 * @returns {Number} 返回的rem数值 保留5位小数
 */
export function pxtorem (num, base = 37.5) {
  return ( num / base ).toFixed(5)
}

/**
 * 获取键值对的集合
 *
 * @export getPropByPath
 * @param {Object} obj 基础对象
 * @param {String} path 对象的路径
 * @param {Boolean} strict 是否需要查找全部路径 默认只找到最顶层
 * @returns {Object} `o` 查找路径所在的对象 `k` 查找路径的结束的key `v` 找到的value
 */
export function getPropByPath (obj, path, strict) {
  let tempObj = obj
  path = path.replace(/\[(\w+)\]/g, ".$1")
  path = path.replace(/^\./, "")

  let keyArr = path.split(".")
  let i = 0

  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break

    let key = keyArr[i]
    if (key in tempObj) {
      tempObj = tempObj[key]
    } else {
      if (strict) {
        throw new Error("please transfer a valid prop path to form item!")
      }
      break
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null,
  }
}

/**
 * `Object.assign` 的实现 依次copy 后续参数对象的属性方法到目标对象
 *
 * @export merge
 * @param {Object} target 需要copy到的目标对象
 * @returns {Object} copy后的目标对象 `target`
 */
export function merge (target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {}

    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop]
        if (value !== undefined) {
          target[prop] = value
        }
      }
    }
  }

  return target
}

/**
 * 金额 数量等转换为 千分制格式化
 *
 * @export formatToKilo
 * @param {String | Number} str 需要转换的数字或字符串
 * @param {string} [preffix=""] 前缀加金钱等单位 默认 `""`
 * @param {string} [format=","] 转换格式 默认 `,`
 * @returns 返回格式化的字符串
 */
export function formatToKilo(str, preffix = "", format=",") {
  if (typeof str === "number") str = str.toString()
  return preffix + str.replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1" + format)
}

/**
 * 匹配是否手机号码
 *
 * @export mobile
 * @param {String} value
 * @returns
 */
export function mobile (value) {
  value = value && value.replace(/[^-|\d]/g, "")
  return /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(value)
}