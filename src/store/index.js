import Vue from "vue"
import Vuex from "vuex"
import createLogger from "vuex/dist/logger"

import User from "./modules/user"

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== "production"

const state = {
  // 网络状态默认良好
  network: true,
  token: false,
  lifeTime: "",
  keepMaxLength: 10,
  keeped: true,
  // 保存的历史路由名称
  keepAliveComponents: [],
}

const getters = {

  /**
     * 查找路由名称是否存在
     *
     * @param {String} name 路由名称
     * @returns {Number} 返回到该路由需要的历史记录数量
     */
  hasKeepedAlive (state) {
    return name => {
      const idx = state.indexOf(name)
      if (idx !== -1) return state.keepMaxLength - idx
      return false
    }
  },
}

const actions = {
  toggleKeep ({ commit }) {
    commit("toggleKeep", false)
    // setTimeout(() => {
    //     commit("toggleKeep", true)
    // }, 0)
  },
}

const mutations = {

  /**
     * 改变网络状态
     *
     * @param {Object} state
     * @param {Boolean} bool
     */
  changeNetwork(state, bool) {
    state.network = bool
  },
  toggleKeep (state, bool) {
    state.keeped = bool
  },
  updateToken (state, token) {
    state.token = token
  },
  updateLifeTime (state, time) {
    state.lifeTime = time
  },
  saveKeepAlive (state, component) {
    !state.keepAliveComponents.includes(component) &&
            state.keepAliveComponents.push(component)
  },
  removeKeepAlive (state, component) {
    const idx = state.keepAliveComponents.indexOf(component)
    idx !== -1 && state.keepAliveComponents.splice(idx, 1)
  },
  removeKeepAliveMutil (state, num) {
    if (num >=0 && num <= 10)
      state.keepAliveComponents.splice(state.keepMaxLength - num + 1, num -1)
  },

}

export default new Vuex.Store({
  modules: {
    User,
  },
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [ createLogger() ] : [],
})