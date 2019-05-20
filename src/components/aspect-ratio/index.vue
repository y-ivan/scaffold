
<template>
  <div class="aspect-ratio" :style="{ 'padding-bottom': getHeight }">
    <div class="aspect-ratio__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    ratio: {
      type: String,
      default: "1:1",
    },
  },

  computed: {
    getHeight(){
      let ratio = this.ratio.split(":")

      return 100 * ratio[1] / ratio[0] + "%"
    },
  },
}
</script>

<style lang="less" scoped>

  @import "../../assets/css/mixins.less";

  .aspect-ratio {
    width: 100%;
    position: relative;

    &__content {
      .fullScreen(absolute);
    }
  }

</style>
