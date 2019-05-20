
// axios封装
// 请求拦截、响应拦截、错误统一处理
import axios from "axios"
import store from "../../store"
import { router } from "../../router"
import { Toast } from "vant"
import { HOST } from "../config"

/**
 * 轻提示
 *
 * @param {*} msg   提示文本信息
 * @param {string} [type="text"] 提示类型默认为文本 可选 `loading` `success` `fail` `html`
 */
const toast = (msg, type = "text") => {
  Toast({
    type,
    message: msg,
    duration: 2000,
  })
}

/**
 * 跳转到登录
 *
 */
const toLogin = () => {
  if (router.currentRoute.name === "login") return false
  router.replace({
    name: "login",
    query: {
      redirect: router.currentRoute.fullPath,
    },
  })
}

/**
 * 获取请求反馈状态文本提示
 *
 * @param {Number} status 请求响应状态码
 * @returns {String} 响应码对应的文本信息
 */
const errorText = (status) => {
  // 状态码判断
  let text
  switch (status) {
  case 400:
    text = "客户端错误"
    break
  case 401:
    text = "请求未授权"
    break
  case 403:
    text = "服务器拒绝执行"
    break
  case 404:
    text = "请求资源未找到"
    break
  case 405:
    text = "请求方法未允许"
    break
  case 408:
    text = "请求超时"
    break
  case 422:
    text = "无法响应含有语义错误"
    break
  case 500:
    text = "服务器端出错"
    break
  case 501:
    text = "服务器不支持该请求"
    break
  case 502:
    text = "网关或网络错误"
    break
  case 503:
    text = "服务当前不可用"
    break
  case 504:
    text = "网关或网络超时"
    break
  case 505:
    text = "服务器不支持该HTTP版本"
    break
  default:
    text = "请求出现未知错误"
  }

  return text
}
// 创建axios实例
const instance = axios.create({
  timeout: 1000 * 6,
  baseURL: HOST,
})

// 设置post请求头
instance.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"

//  请求拦截器
//  每次请求前，如果存在token则在请求头中携带token
instance.interceptors.request.use(
  config => {

    // 发起请求 toast loading
    // 除非接口明确关闭loading  否则视为开启
    if (!(config.meta && config.meta.unLoading))
      toast("请求中", "loading")

    // 请求接口添加token验证
    const token = store.state.token
    const defaultHeader = {
      // "Accept": "application/json",
    }

    token && (defaultHeader["Authorization"] = `Bearer ${token}`)
    config.headers = Object.assign({}, defaultHeader, config.headers)
    return config
  },
  error => Promise.reject(error)
)

//  响应拦截器
//  每次响应完成, 提前处理错误 提示
instance.interceptors.response.use(
  // 请求成功
  res => {
    // 请求成功 关闭所有 toast
    Toast.clear()

    // 除非接口明确关闭toast  否则视为开启
    // 当返回结果为字符串 默认提示显示
    if (!(res.config.meta && res.config.meta.unToast))
      if (typeof res.data.data === "string") toast(res.data.data)

    return res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res.data)
  },
  // 请求失败
  error => {
    const { response } = error
    // 请求失败 关闭所有 toast
    Toast.clear()

    if (response) {
      let text = errorText(response.status)
      response.message = text

      // 除非接口明确关闭toast  否则视为开启
      // 显示当前接口错误状态
      if (!(response.config.meta && response.config.meta.unToast))
        toast(`code:${response.status} ${text}`)

      // 请求未授权 跳转到登录
      if (response.status === 401)
        toLogin()

      return Promise.reject(response)
    } else {
      const message = error.name + ": " + error.message
      // toast(message)
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      store.commit("changeNetwork", false)
      return Promise.reject(message)
    }
  }
)

export default instance
