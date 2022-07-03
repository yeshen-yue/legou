<template>
  <div class="user">
    <div class="username">
      <div class="photo">
        <img
          src="http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png"
          alt=""
        />
      </div>
      <div class="name">{{ name }}</div>
    </div>
    <div class="menu">
      <div class="menu_item">我的订单</div>
      <div class="menu_item">优惠券</div>
      <div class="menu_item">我的足迹</div>
      <router-link class="menu_item" to="/user/pages/mystar"
        >我的收藏</router-link
      >
      <router-link class="menu_item" to="/user/pages/manageaddress"
        >地址管理</router-link
      >
      <div class="menu_item">联系客服</div>
      <div class="menu_item">帮助中心</div>
      <router-link class="menu_item" to="/user/pages/suggestion"
        >意见反馈</router-link
      >
      <div class="menu_item"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "User",
  computed: {
    name() {
      return JSON.parse(localStorage.getItem("userInfo")).nickName;
    },
  },
};
</script>
<style lang="scss" scoped>
.user {
  background-color: #f4f4f4;
  height: 100vh;
  .username {
    display: flex;
    align-items: center;
    width: 345px;
    height: 140px;
    padding: 0 15px;
    background-color: #333;
    .photo {
      width: 66px;
      height: 66px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .name {
      margin-left: 20px;
      color: #fff;
    }
  }
  .menu {
    @include flex(wrap);
    background-color: #fff;
    .menu_item {
      display: block;
      padding: 25px 0;
      width: 33%;
      border-right: 0.667px solid rgba(0 0 0/0.2);
      border-bottom: 0.667px solid rgba(0 0 0/0.2);
    }
    .menu_item:nth-child(3n) {
      border-right: 0 solid;
    }
    .menu_item:nth-child(n + 7) {
      border-bottom: 0 solid;
    }
  }
}
</style>