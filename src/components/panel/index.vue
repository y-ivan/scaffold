
<template>
  <div class="panel full-panel" :style="{ background: bgColor }">
    <div  ref="mainPanel" class="main-panel">
      <div class="top">
          <div class="nav-bar"
              v-show="show">
            <van-nav-bar
                :title="titleText"
                :left-text="hasLeftArrow ? $t('back') : '' "
                :right-text="titleOnly ? '' : rightText "
                :left-arrow="hasLeftArrow"
                :fixed="fixed"
                :border="border"
                @click-left="clickLeftHandle"
                @click-right="clickRightHandle">

                <div v-if="!titleOnly && $slots.left" slot="left" class="nav-bar__left cell-between">
                    <slot name="left"></slot>
                </div>
                <slot v-if="$slots.title" name="title"  slot="title"></slot>
                <div v-if="!titleOnly && $slots.right" slot="right" class="nav-bar__right cell-between">
                    <slot name="right"></slot>
                </div>
            </van-nav-bar>
          </div>
          <!-- slot outside of scroll -->
          <slot name="top"></slot>
      </div>
      <div class="middle">
        <div class="content" v-if="scroll">
          <scroll
              ref="scroll"
              :data="data"
              :fill="fill"
              :scrollbar="scrollbar"
              :startY="startY"
              :pullDownRefresh="pullDownRefresh"
              :pullUpLoad="pullUpLoad"
              :click="click"
              :eventPassthrough="eventPassthrough"
              :direction="direction"
              :stopPropagation="stopPropagation"
              @pullingDown="pullingDownHandle"
              @pullingUp="pullingUpHandle"
          >
              <slot></slot>
          </scroll>
        </div>
        <div class="content" v-else>
            <slot></slot>
        </div>
        <slot name="fixed-middle"></slot>
      </div>
      <div class="bottom" v-if="$slots.bottom">
          <!-- slot outside of scroll -->
          <slot name="bottom"></slot>
      </div>
    </div>
    <div class="fixed-panel">
        <slot name="fixed"></slot>
    </div>
  </div>
</template>

<script>

import scroll from "../scroll"
import { getRootVnode } from "../../assets/utils/vnode"
import { pxtorem } from "../../assets/utils/util"
import { NavBar } from "vant"

export default {
  name: "panel",

  components: {
    scroll,
    [NavBar.name]: NavBar,
  },

  props: {
    show: {
      type: Boolean,
      default: true,
    },
    bottom: {
      type: Number,
      default: 0,
    },
    border: {
      type: Boolean,
      default: true,
    },
    bgColor: String,
    fixed: {
      type: Boolean,
      default: false,
    },
    back: {
      type: Function,
    },
    title: {
      type: String,
    },
    titleOnly: {
      type: Boolean,
      default: false,
    },
    leftArrow: {
      type: Boolean,
      default: true,
    },
    rightText: {
      type: String,
      default: "",
    },
    refresh: {
      type: Boolean,
      default: true,
    },
    click: {
      type: Boolean,
      default: true,
    },
    scroll: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Array,
      default: () => [],
    },
    scrollbar: {
      type: null,
      default: false,
    },
    fill: {
      default: true,
    },
    startY: {
      type: null,
      default: 0,
    },
    eventPassthrough: {
      default: "",
    },
    direction: {
      default: "vertical",
    },
    stopPropagation: {
      default: false,
    },
    pullDownRefresh: {
      type: null,
      default: false,
      // {
      //     threshold: 70,
      //     stop: 40
      // }
    },
    pullUpLoad: {
      type: null,
      default: false,
      // {
      //     threshold: 0,
      //     moreTxt: "加载更多",
      //     noMoreTxt: "没有更多数据了"
      // }
    },
  },
  computed: {
    hasLeftArrow () {
      return this.leftArrow && !this.titleOnly && !this.hasTabbarPage
    },
    hasTabbarPage () {
      return this.$route.meta && this.$route.meta.tabbar
    },
    titleText () {
      let routeName = this.$route.name
      return this.title || this.$t(`title.${routeName}`) || ""
    },
  },
  activated () {
    document.title = this.title

    this.$nextTick(() => {
      const scroll = this.$refs.scroll
      scroll && scroll.refresh()
    })
  },
  created () {
    let num = this.bottom || this.hasTabbarPage && 50 || 0
    if (num) {
      num = pxtorem(num)
      this.$nextTick(() => {
        this.$refs.mainPanel.style.bottom = num + "rem"
      })
    }
  },
  methods: {
    backHandle () {
      let backStatus = true

      if (this.back && typeof this.back === "function") {
        backStatus = this.back()
      }
      backStatus && this.$router.back()
    },
    clickLeftHandle () {
      this.$emit("click-left")
      this.backHandle()
    },
    clickRightHandle () {
      if (this.$slots.right) return false
      this.$emit("click-right")
    },
    refreshHandle () {
      if (this.$route && this.$route.meta && this.$route.meta.keepAlive) {
        if (this.$vnode.parent && this.$vnode.parent.componentOptions && this.$vnode.parent.componentOptions.Ctor) {
          const keepAliveVnode = getRootVnode(this.$vnode)
          const cache = keepAliveVnode.componentInstance.cache
          const keys = keepAliveVnode.componentInstance.keys
          const key = this.$vnode.parent.componentOptions.Ctor.cid

          if (cache && cache[key]) {
            if (keys.length) {
              var index = keys.indexOf(key + "")
              index > -1 && keys.splice(index, 1)
            }
            delete cache[key]
          }
          this.$vnode.parent.componentInstance.$destroy()
        }
      }

      this.$router.replace({ name: "refresh" })
    },

    // 下拉刷新
    pullingDownHandle (...arg) {
      this.$emit("pullingDown", ...arg)
    },

    // 上拉加载
    pullingUpHandle (...arg) {
      this.$emit("pullingUp", ...arg)
    },
  },
  beforeDestroy () {
    this.$refs.scroll && this.$refs.scroll.destroy()
  },
}
</script>

<style lang="less" scoped>
  @import "../../assets/css/mixins.less";

  .panel {
    font-size: @font-size-lg;
    background: @bg-color-gray;

    .nav-bar {

      &__left, &__right {
        height: 100%;
        font-size: @font-size-base;
        color: @color-primary;

        .van-icon {
          font-size: @font-size-lg;
        }
      }
    }
    &.full-panel {
      .fullScreen(absolute);
    }

    .main-panel {
      .fullScreen(absolute);
      z-index: 1;
      display: flex;
      flex-direction: column;
      max-height: 100%;

      .middle {
          flex: 1;

          .content {
              width: 100%;
              .fullScreen(absolute);
          }
      }

      .top, .bottom, .middle {
          position: relative;
          width: 100%;
      }

      .bottom {
          padding-top: @spacing-col-lg;
      }
    }
    .fixed-panel {
      position: fixed;
      left: 0;
      right: 0;
      width: 0px;
      height: 0px;
      z-index: 1;
    }
  }

</style>
