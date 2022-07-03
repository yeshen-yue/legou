<template>
  <div id="app">
    <keep-alive :include="['Home', 'Subject', 'Kinds', 'User']">
      <router-view />
    </keep-alive>
    <van-tabbar v-if="isshow" route>
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/subject" icon="description"
        >专题</van-tabbar-item
      >
      <van-tabbar-item replace to="/kinds" icon="qr">分类</van-tabbar-item>
      <van-tabbar-item replace to="/cart" icon="shopping-cart-o"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isshow: true,
    };
  },
  watch: {
    $route(to, from) {
      let routeArr = ["home", "subject", "cart", "kinds", "user"];
      if (!routeArr.includes(to.name)) {
        this.isshow = false;
      } else {
        this.isshow = true;
      }
      //复位页面滚动条
      document.querySelector("html").scrollTop = 0;
    },
  },
  created() {
    const userInfo = {
      openId: "13137604865",
      nickName: "赵六",
      avatarUrl:
        "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIbWFEIJj8IpGeHM7dGic1aTFZALjWcMm9ltWfFiaQfVRYticWBfgGfzXWMt2EkJWiaicPtftHAlWxUibxQ/132",
    };
    const openId = userInfo.openId;
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("openId", openId);
  },
};
</script>
<style scoped lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<style lang="scss">
h5 {
  font-weight: normal;
}
a {
  color: #000;
}
.van-nav-bar {
  border-bottom: 1px solid #f4f4f4 !important;
}
body {
  height: 100%;
  -webkit-touch-callout: none;
  user-select: none;
}
</style>