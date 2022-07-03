<template>
  <div class="banner">
    <van-swipe class="my-swipe" indicator-color="black">
      <van-swipe-item v-for="item in banner" :key="item.id">
        <img :src="item.image_url" alt="" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  props: ["banner"],
};
</script>

<style scoped lang="scss">
.my-swipe .van-swipe-item {
  height: 200px;
  background-color: #39a9ed;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>