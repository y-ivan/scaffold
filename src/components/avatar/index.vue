<template>
  <div class="avatar">
    <div class="avatar-inner"
      :style="style"
    >
      <i
        class="iconfont"
        :class="['icon-' + icon]"
        :style="{
          fontSize: fontSize
        }"
        v-if="icon">
      </i>

      <img
        v-else
        :src="src"
        width="100%"
        height="100%" />
    </div>

    <span
      v-if="counter > 0"
      class="dot">{{ counter > 99 ? '···' : counter }}
    </span>

    <span
      v-if="text"
      class="avatar-text"
      :style="{ color: color }">{{ text }}
    </span>
  </div>
</template>

<script>

import { pxtorem } from "../../assets/utils/util"

export default {
  name: "avatar",
  props: {
    bg: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    size: {
      type: Number,
      default: 104,
    },
    src: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    counter: Number,
  },
  computed: {
    fontSize () {
      return pxtorem(this.size)
    },
    uppercaseInitials () {
      return this.text ? this.text.charAt(0).toUpperCase() : undefined
    },
    style () {
      if (this.icon) return `width: ${this.fontSize}rem; height: ${this.fontSize}rem; fontSize: ${this.fontSize / 2}rem; background: ${this.bg}`
      return `width: ${this.fontSize}rem; height: ${this.fontSize}rem;`
    },
  },
}
</script>

<style lang="less">
  @import "../../assets/css/mixins.less";

	.avatar {
		position: relative;

		.dot {
      .center;
      position: absolute;
			right: -8px;
			top: -8px;
			background: @color-danger;
			width: 16px;
			height: 16px;
			font-size: @font-size-sm;
			color: @text-color-inverse;
			border-radius: @border-radius-circle;
		}

		.avatar-inner {
			display: flex;
			align-items: center;
			justify-content: center;
			color: @text-color-inverse;
			border-radius: @border-radius-circle;
			overflow: hidden;
		}

		.avatar-text {
			margin-top: @spacing-col-sm;
      text-align: center;
      font-size: @font-size-base;
		}
	}

</style>
