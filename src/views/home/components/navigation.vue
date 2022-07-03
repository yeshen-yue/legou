<template>
  <div class="nav">
    <router-link
      :to="'/category/' + item.id"
      v-for="item in channel"
      :key="item.id"
      class="nav_item"
      ><img :src="item.icon_url" alt="" />
      <p>{{ item.name }}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["channel"],
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.nav {
  @include flex();
  .nav_item {
    display: block;
    width: 20%;
    padding-top: 10px;
    margin-bottom: 5px;
    background-color: #fff;
    img {
      width: 29px;
      height: 29px;
    }
    p {
      margin: 12px auto;
      color: #333;
    }
  }
}
</style>
<style>
</style>