<template>
  <div class="bannerDetails">
    <!-- 顶部导航 -->
    <van-nav-bar
      title="搜索"
      left-text="返回"
      left-arrow
      border
      :fixed="true"
      @click-left="onClickLeft"
    />
    <!-- 商品展示 -->
    <div class="goodsDetail">
      <div class="nav" @click="toggle">
        <div class="red">综合</div>
        <div class="price">
          价格
          <div class="icon">
            <van-icon
              name="arrow-up"
              size="10"
              :class="icon_active == 'up' ? 'active' : ''"
            />
            <van-icon
              name="arrow-down"
              size="10"
              :class="icon_active == 'down' ? 'active' : ''"
            />
          </div>
        </div>
        <div>分类</div>
      </div>
      <div class="goodsShow">
        <div
          @click="getgoodsDetails(item.id)"
          v-for="item in goodsList"
          :key="item.id"
          class="goods"
        >
          <img :src="item.list_pic_url" alt="" />
          <div class="title">{{ item.name }}</div>
          <div class="price">￥{{ item.retail_price }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBannerGoods } from "@/request/home/banner";
export default {
  data() {
    return {
      goodsList: [],
      icon_active: "default",
      params: {},
    };
  },
  methods: {
    toggle(e) {
      let cur = e.target;
      let nodes = cur.parentNode.children;
      for (let i = 0; i < 3; i++) {
        nodes[i].classList.remove("red");
      }
      cur.classList.add("red");
      if (e.target.innerText == "价格") {
        if (this.icon_active == "default") {
          this.icon_active = "up";
        } else if (this.icon_active == "up") {
          this.icon_active = "down";
        } else {
          this.icon_active = "up";
        }
      } else {
        this.icon_active = "default";
      }
      this.getBannerGoods();
    },
    onClickLeft() {
      this.$router.back();
    },
    getBannerGoods() {
      let order = "";
      if (this.icon_active == "up") {
        order = "asc";
      } else if (this.icon_active == "down") {
        order = "desc";
      }
      let params = Object.assign(this.params, { order });
      getBannerGoods(params).then((res) => {
        this.goodsList = res.data.data;
      });
    },
    getgoodsDetails(id) {
      this.$router.push({ name: "goodsdetails", params: { id } });
    },
  },
  created() {
    this.params = this.$route.query;
    this.getBannerGoods();
  },
};
</script>

<style lang="scss" scoped>
.bannerDetails {
  .goodsDetail {
    margin-top: 50px;
    .nav {
      @include flex($justify: space-around);
      font-size: 14px;
      & > div {
        line-height: 28px;
      }
      .red {
        color: #f00;
      }
      .price {
        @include flex();
        align-items: center;
        .icon {
          color: #333;
          display: flex;
          flex-direction: column;
          .active {
            color: #f00;
          }
        }
      }
    }
    .goodsShow {
      @include flex(wrap);
      background-color: #f4f4f4;
    }
    .goods {
      width: 49.5%;
      margin-bottom: 5px;
      background-color: #fff;
      img {
        width: 151px;
        height: 151px;
      }
      .title {
        margin: 7px 15px;
        font-size: 12px;
      }
      .price {
        color: rgb(180, 40, 45);
        font-size: 15px;
        margin-bottom: 15px;
      }
    }
  }
}
</style>