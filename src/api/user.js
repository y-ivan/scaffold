
import axios from "../assets/http"

const userApi = {

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

  getUser: id => {
    let api = id ? "cusers/" + id : "cusers"
    return axios.get(api, {
      meta: {
        unLoading: true,
      },
    })
  },
}

export default userApi