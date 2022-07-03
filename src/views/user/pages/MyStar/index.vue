<template>
  <div class="myStar">
    <van-nav-bar
      title="收藏"
      left-text="返回"
      left-arrow
      border
      :fixed="true"
      @click-left="$router.back()"
    />
    <h4>我的收藏</h4>
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
import { myStar } from "@/request/user";
export default {
  data() {
    return {
      goodsList: [],
    };
  },
  created() {
    myStar({ openId: localStorage.getItem("openId") }).then((res) => {
      this.goodsList = res.data.collectGoodsList;
    });
  },
};
</script>

<style lang="scss" scoped>
.myStar {
  background-color: #f4f4f4;
  h4 {
    padding: 10px;
    margin-top: 50px;
    font-size: 18px;
    background-color: #fff;
    border-bottom: 1px solid #f4f4f4;
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