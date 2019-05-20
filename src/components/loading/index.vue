
<template>

  <div class="loading-container">
    <img src="./loading.gif">
  </div>

</template>

<script>

const COMPONENT_NAME = "loading"

export default {
  name: COMPONENT_NAME,
}

</script>

<style lang="less" scoped>
  .loading-container {
      img {
          width: 20px;
          height: 20px;
          display: block;
      }
  }
</style>
