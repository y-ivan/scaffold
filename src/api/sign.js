
import axios from "../assets/http"

const loginApi = {

  /**
   * 用户登录接口
   *
   * @param {String} phone 用户手机号码
   * @param {String} password 密码字符串
   */
  loginIn: ({phone, password}) =>
    axios.post("login", {
      phone,
      password,
    }, {
      meta: {
        unLoading: true,
      },
    }),
}

export default loginApi