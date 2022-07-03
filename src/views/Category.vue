<template>
  <div class="category">
    <van-nav-bar
      title="分类"
      left-text="返回"
      left-arrow
      border
      :fixed="true"
      @click-left="$router.back()"
    />
    <!-- 分类导航 -->
    <ul class="nav" ref="nav">
      <li
        v-for="item in navData"
        :key="item.id"
        @click="getGoodsList(item)"
        class="nav_item"
      >
        {{ item.name }}
      </li>
      <!-- 红色横线 -->
      <span class="red_line" ref="red_line"></span>
    </ul>
    <!-- 商品列表 -->
    <div class="title">
      {{ currentNav.name }}
      <p>{{ currentNav.front_name }}</p>
    </div>
    <ul class="goods">
      <li
        v-for="item in goodsList"
        :key="item.id"
        class="goods_item"
        @click="getgoodsDetails(item.id)"
      >
        <img :src="item.list_pic_url" alt="" />
        <p>{{ item.name }}</p>
        <div class="price">￥{{ item.retail_price }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { categoryRequest, getGoodsList } from "@/request/category";
export default {
  name: "category",
  data() {
    return {
      currentNav: {},
      navData: [],
      goodsList: [],
      isfirst: true,
    };
  },
  methods: {
    test() {
      document.querySelector(".category .nav").scrollLeft = 300;
      console.log("cropp");
    },
    onClickLeft() {
      this.$router.back();
    },
    getGoodsList(item) {
      let index = this.navData.findIndex((i) => i.id == item.id);
      let children = Array.from(this.$refs["nav"].children);
      let width = children.reduce(
        (pre, next, i) =>
          i >= index ? pre : pre + parseFloat(next.offsetWidth),
        0
      );
      this.$refs["red_line"].style.left = (width * 10) / screen.width + "rem";
      getGoodsList({ categoryId: item.id }).then((res) => {
        this.goodsList = res.data.data;
        this.currentNav = res.data.currentNav;
      });
    },
    getgoodsDetails(id) {
      this.$router.push({ name: "goodsdetails", params: { id } });
    },
  },
  updated() {
    if (this.isfirst) {
      let index = this.navData.findIndex(
        (item) => item.id == this.$route.params.id
      );
      let children = Array.from(this.$refs["nav"].children);
      let width = children.reduce(
        (pre, next, i) =>
          i >= index ? pre : pre + parseFloat(next.offsetWidth),
        0
      );
      this.$refs["nav"].scrollLeft = width;
      this.getGoodsList(this.$route.params);
      this.isfirst = false;
    }
  },

  mounted() {
    let params = this.$route.params;
    categoryRequest(params).then((res) => {
      this.navData = res.data.navData;
    });
  },
};
</script>

<style lang="scss" scoped>
.category {
  background-color: #f4f4f4;
  .nav::-webkit-scrollbar {
    height: 0px;
  }
  .nav {
    position: relative;
    @include flex();
    margin: 62px auto 5px;
    background-color: #fff;
    overflow: auto;
    .red_line {
      position: absolute;
      left: 5px;
      bottom: 0;
      height: 2px;
      width: 43px;
      background-color: #f00;
      transition: left 0.1s;
    }
    .nav_item {
      padding: 0 10px;
      line-height: 44px;
      font-size: 14px;
      color: rgb(100, 101, 102);
      flex-shrink: 0;
    }
  }
  .title {
    font-size: 15px;
    padding: 30px 0 1px;
    background-color: #fff;
    p {
      margin: 12px auto;
      font-size: 12px;
      color: rgb(153, 153, 153);
    }
  }
  .goods {
    @include flex(wrap);
    .goods_item {
      width: 49.5%;
      margin-top: 2.5px;
      background-color: #fff;
      .item_link {
        display: block;
        height: 100%;
      }
      img {
        width: 151px;
        height: 151px;
      }
      .price {
        margin: 15px auto;
        font-size: 15px;
        color: rgb(180, 40, 45);
      }
      p {
        @include ellipsis;
        padding: 0 10px;
      }
    }
  }
}
</style>