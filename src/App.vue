
<template>
    <div id="app">
        <keep-alive v-if="keeped" :max="10">
            <router-view v-if="$route.meta && $route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!keeped || !($route.meta && $route.meta.keepAlive)"></router-view>

        <transition name="van-slide-up">
          <van-tabbar
            v-show="hasTabbarPage"
            v-model="tabIndex"
            fixed>
            <van-tabbar-item
              v-for="(tab, idx) in tabs"
              :key="idx"
              :to="{ name: tab.name }">
              <span>{{ tab.text }}</span>
              <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? tab.icon.active : tab.icon.normal" alt="">
            </van-tabbar-item>
          </van-tabbar>
        </transition>
    </div>
</template>

<script>

import storage from "good-storage"

import { Tabbar, TabbarItem } from "vant"
import { mapState, mapMutations } from "vuex"

import messageIcon from "./assets/image/tabbar/message.png"
import messageIconA from "./assets/image/tabbar/message-s.png"

import manageIcon from "./assets/image/tabbar/manage.png"
import manageIconA from "./assets/image/tabbar/manage-s.png"

import workPlaceIcon from "./assets/image/tabbar/work-place.png"
import workPlaceIconA from "./assets/image/tabbar/work-place-s.png"

import contactIcon from "./assets/image/tabbar/contact.png"
import contactIconA from "./assets/image/tabbar/contact-s.png"

import mineIcon from "./assets/image/tabbar/mine.png"
import mineIconA from "./assets/image/tabbar/mine-s.png"

export default {

  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  watch: {
    $route (route) {
      if (route.meta && route.meta.tabbar) {
        this.tabIndex = route.meta.tabIndex
      }
    },
  },
  created () {
    let token = storage.get("token")
    let lifeTime = storage.get("lifeTime")

    this.updateToken(token)
    this.updateLifeTime(lifeTime)

  },
  computed: {
    hasTabbarPage () {
      return this.$route.meta && this.$route.meta.tabbar
    },
    ...mapState([
      "keeped",
    ]),
  },
  data () {
    return {
      tabIndex: 0,
      tabs: [ {
        text: "消息",
        name: "message",
        icon: {
          normal: messageIcon,
          active: messageIconA,
        },
      }, {
        text: "管理",
        name: "manage",
        icon: {
          normal: manageIcon,
          active: manageIconA,
        },
      }, {
        text: "工作台",
        name: "work-place",
        icon: {
          normal: workPlaceIcon,
          active: workPlaceIconA,
        },
      }, {
        text: "通讯录",
        name: "contact",
        icon: {
          normal: contactIcon,
          active: contactIconA,
        },
      }, {
        text: "我的",
        name: "mine",
        icon: {
          normal: mineIcon,
          active: mineIconA,
        },
      } ],
    }
  },
  methods: {
    ...mapMutations([
      "updateToken",
      "updateLifeTime",
    ]),
  },
}
</script>

<style lang="less">
    @import "./assets/css/index.less";

</style>
