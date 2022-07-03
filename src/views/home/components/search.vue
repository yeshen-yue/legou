<template>
  <div class="search">
    <router-link to="/home/pages/map">
      <div class="place">
        {{ location }}
      </div></router-link
    >
    <router-link class="searchLink" to="/home/pages/search">
      <van-search disabled v-model="value" placeholder="请输入搜索关键词" />
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      location: null,
    };
  },
  activated() {
    let location = JSON.parse(sessionStorage.getItem("location"));
    this.location = location ? location.name : "定位";
  },
};
</script>
<style lang="scss" scoped>
.search {
  @include flex();
  .place {
    line-height: 44px;
    width: 90px;
    height: 45.67px;
    @include ellipsis;
    padding: 0 5px;
  }
  .searchLink {
    flex-grow: 1;
  }
  .van-search {
    padding: 5px 5px;
  }
}
</style>