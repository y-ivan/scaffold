
import axios from "../assets/http"

const baseApi = {

  /**
     * 发送验证码
     *
     * @param {Number | String} phone 待发送的手机号
     */
  sendVerifyCode: phone => axios.get("", phone),
}

export default baseApi