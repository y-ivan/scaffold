
import userApi from "../../api/user"

const state = {
  info: {
    id: "",
    name: "",
    avatar: "",
  },
}

const getters = {
  userId: state => state && state.info.id,
}

const actions = {
  getUserInfo: ({ commit }) => {
    return userApi.getUser().then(res => {
      commit("setInfo", res.data)
      return res.data
    })
  },
}

const mutations = {
  setInfo (stata, payload) {
    stata.info = payload
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
