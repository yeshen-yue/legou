<template>
  <div class="makerDetails">
    <van-nav-bar
      title="制造商"
      left-text="返回"
      left-arrow
      border
      :fixed="true"
      @click-left="onClickLeft"
    />
    <div class="maker_info">
      <img :src="data.list_pic_url" alt="" class="img" />
      <div class="title">
        <span class="name">{{ data.name }}</span>
        <span class="line"></span>
      </div>
      <div class="info">{{ data.simple_desc }}</div>
    </div>
    <!-- 商品列表 -->
    <ul class="goods_list">
      <li
        v-for="item in goodsList"
        :key="item.id"
        class="item"
        @click="getgoodsDetails(item.id)"
      >
        <img :src="item.list_pic_url" alt="" class="img" />
        <p class="title">{{ item.name }}</p>
        <div class="price">￥2{{ item.retail_price }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getMakerDetails } from "@/request/home/maker";
export default {
  data() {
    return {
      data: {},
      goodsList: [],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    getgoodsDetails(id) {
      this.$router.push({ name: "goodsdetails", params: { id } });
    },
  },
  created() {
    getMakerDetails(this.$route.params).then((res) => {
      this.data = res.data.data;
      this.goodsList = res.data.goodsList;
    });
  },
};
</script>

<style lang="scss" scoped>
.makerDetails {
  .maker_info {
    position: relative;
    margin-top: 40px;
    border-bottom: 10px solid #f4f4f4;
    .img {
      width: 100%;
      height: auto;
    }
    .info {
      padding: 21px 16px;
      font-size: 15px;
      color: rgb(102, 102, 102);
    }
    .title {
      position: absolute;
      left: 50%;
      top: 40%;
      display: flex;
      flex-direction: column;
      transform: translate(-50%, -50%);
      font-size: 0.50667rem;
      color: #fff;
      .line {
        position: absolute;
        left: 0;
        bottom: -3px;
        width: 100%;
        height: 2px;
        background-color: #fff;
      }
    }
  }
  .goods_list {
    @include flex(wrap);
    background-color: #f4f4f4;
    .item {
      width: 49.5%;
      margin-bottom: 3px;
      padding-bottom: 20px;
      background-color: #fff;
      img {
        width: 151px;
        height: 151px;
      }
      .title {
        margin: 7.5px auto 12px;
      }
      .price {
        color: rgb(180, 40, 45);
        font-size: 15px;
      }
    }
  }
}
</style>