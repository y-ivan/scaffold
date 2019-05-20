
import "amfe-flexible"
import Vue from "vue"
import App from "./App"
import store from "./store"
import i18n from "./assets/locales"

import Panel from "./components/panel"
import colors from "./assets/config/color"

import { router } from "./router"
import { Lazyload, Button, Cell, CellGroup, Icon, Row, Col, Popup, Toast } from "vant"

Vue
  .use({
    install (Vue) {
      Vue.component("panel", Panel)
    },
  })
  .use(Lazyload, {})
  .use(Button)
  .use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(Row)
  .use(Col)
  .use(Popup)
  .use(Toast)

// 同vue.config.js 主题变量js配置 用于template 直接使用
Vue.prototype.$colors = colors

// 接口返回静态资源等
Vue.prototype.$publicPath = "http://publicpath.cn/"

new Vue({
  router,
  store,
  i18n,
  el: "#app",
  render: h => h(App),
})
