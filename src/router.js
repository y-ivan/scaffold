
import Vue from "vue"
import Router from "vue-router"
// import storage from "good-storage"
import store from "./store"
// import { callComponentsHookWith } from "./assets/utils/vnode"

Vue.use(Router)

const routes = [
  {
    path: "*",
    redirect: "/login",
  },

  {
    name: "login",
    component: () => import("./view/login"),
    meta: {
      title: "登录",
    },
  },

  {
    name: "register",
    component: () => import("./view/login/register"),
    meta: {
      title: "注册",
    },
  },

  {
    name: "forgotten",
    component: () => import("./view/login/forgotten"),
    meta: {
      title: "忘记密码",
    },
  },

  {
    name: "message",
    component: () => import("./view/message"),
    meta: {
      title: "消息",
      tabbar: true,
      tabIndex: 0,
      keepAlive: true,
    },
  },

  {
    name: "manage",
    component: () => import("./view/manage"),
    meta: {
      title: "管理",
      tabbar: true,
      tabIndex: 1,
      keepAlive: true,
    },
  },

  {
    name: "work-place",
    component: () => import("./view/work-place"),
    meta: {
      title: "工作台",
      tabbar: true,
      tabIndex: 2,
      keepAlive: true,
    },
  },

  {
    name: "contact",
    component: () => import("./view/contact"),
    meta: {
      title: "通讯录",
      tabbar: true,
      tabIndex: 3,
      keepAlive: true,
    },
  },

  {
    name: "mine",
    component: () => import("./view/mine"),
    meta: {
      title: "我的",
      tabbar: true,
      tabIndex: 4,
      keepAlive: true,
    },
  },

  {
    name: "refresh",
    component: () => import("./view/refresh"),
    meta: {
      title: "刷新中",
      keepAlive: true,
    },
  },
]

// add route path
routes.forEach(route => {
  route.path = route.path || "/" + (route.name || "");
})

// router 实例
const router = new Router({ mode: "history", routes })

router.beforeEach((to, from, next) => {
  // const launchFlag = storage.get("launchFlag")
  const multiPage = to.meta && to.meta.multi
  const title = to.meta && to.meta.title

  if (title) {
    document.title = title
  }

  // 活动分享等直接打开  建议改成多页面项目
  if (multiPage) return next()

  // 第一次打开页面
  // if (!launchFlag) return next({ name: "launch" })

  // 跳转检测登录
  if (to.matched.some(res => res.meta && res.meta.requireAuth)) {
    // 如果是 需要登录的 判断是否有登录权限 是否过期
    const nowTime = new Date().getTime()
    const token = store.state.token
    const lifeTime = store.state.lifeTime
    const user = store.getters["User/userId"]
    if (user && token && lifeTime && nowTime < lifeTime) {
      // 页面跳转
      next()
    } else {
      store.dispatch("User/getUserInfo").then(() => {
        next()
      })
    }
  } else next()
})

// router 初始化 用于 vuex sregisterModule 一般不使用
// router.onReady((initialRoute) => {
//   const initialMatched = router.getMatchedComponents(initialRoute)
//   callComponentsHookWith(initialMatched, "prepareVuex", { store, isClientInitialRoute: true })

//   router.beforeResolve((to, from, next) => {
//     const matched = router.getMatchedComponents(to)

//     Promise.all(callComponentsHookWith(matched, "prepareVuex", { store }))
//       .then(() => {
//         next()
//       })
//       .catch(() => {
//         next()
//       })
//   })

// })

export {
  router,
}
