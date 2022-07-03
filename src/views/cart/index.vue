<template>
  <div class="cart" @click="hideDelBtn" v-if="showPage">
    <van-nav-bar
      title="购物车"
      left-text="返回"
      left-arrow
      border
      :fixed="true"
      @click-left="$router.back()"
    />
    <!-- 商品信息 -->
    <div class="top_bar">
      <li class="item">30天无忧退货</li>
      <li class="item">48小时快速退款</li>
      <li class="item">满88元免邮费</li>
    </div>
    <ul class="goods">
      <li
        class="goods_item"
        v-for="item in goodsList"
        :key="item.goods_id"
        @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend="touchend"
      >
        <van-checkbox
          v-model="item.checked"
          checked-color="#f00"
        ></van-checkbox>
        <div @click="getgoodsDetails(item.goods_id)" class="img_bc">
          <img :src="item.list_pic_url" alt="" class="img" />
        </div>
        <div class="info">
          <p class="name">{{ item.goods_name }}</p>
          <p class="price">￥{{ item.retail_price }}</p>
        </div>
        <div class="num">X{{ item.number }}</div>
        <!-- 删除按钮 -->
        <button class="del_button" v-if="showDel" @click="delGoods(item.id)">
          删除
        </button>
      </li>
    </ul>
    <!-- 全选和下单按钮 -->
    <div class="total">
      <van-checkbox v-model="allChecked" checked-color="#f00"
        >全选</van-checkbox
      >
      <div class="total_pay">
        <span class="totalPrice"> ￥{{ totalPrice }}</span>
        <router-link
          class="pay_button"
          :to="{
            name: 'order',
            query: {
              goodsId: goodsId.join(','),
              openId: this.openId,
              allPrise: totalPrice + '',
            },
          }"
          >下单</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getCartList, delGoods } from "@/request/cart";
import { Toast } from "vant";
export default {
  name: "Cart",
  data() {
    return {
      goodsList: [],
      showPage: false,
      openId: localStorage.getItem("openId"),
      timer: null,
      showDel: false,
    };
  },
  beforeMount() {
    getCartList({ openId: this.openId }).then((res) => {
      res.data.data.forEach((i) => {
        i.checked = false;
      });
      this.goodsList = res.data.data;
      this.showPage = true;
    });
  },
  methods: {
    //定义长按购物车触发删除
    touchstart(e) {
      let that = this;
      // 阻止默认事件
      e.target.addEventListener("contextmenu", function (e) {
        e.preventDefault();
      });
      this.timer = setTimeout(() => {
        that.showDel = true;
      }, 1000);
    },
    touchmove() {
      clearTimeout(this.timer);
    },
    touchend() {
      clearTimeout(this.timer);
    },
    delGoods(id) {
      delGoods({ id }).then((res) => {
        Toast.success({
          message: "删除成功",
          duration: 500,
        });
        //删除后更新购物车
        getCartList({ openId: this.openId }).then((res) => {
          res.data.data.forEach((i) => {
            i.checked = false;
          });
          this.goodsList = res.data.data;
        });
        //隐藏删除按钮
        this.showDel = false;
      });
    },
    //点击其他区域时隐藏删除按钮
    hideDelBtn(e) {
      if (e.target.className != "del_button") {
        this.showDel = false;
      }
    },
    //获取商品详情
    getgoodsDetails(id) {
      this.$router.push({ name: "goodsdetails", params: { id } });
    },
  },
  computed: {
    allChecked: {
      get() {
        return this.goodsList.every((i) => i.checked);
      },
      set(val) {
        this.goodsList.forEach((i) => (i.checked = val));
      },
    },
    goodsId() {
      let arr = [];
      this.goodsList.forEach((i) => {
        if (i.checked == true) {
          arr.push(i.goods_id);
        }
      });
      return arr;
    },
    totalPrice() {
      return this.goodsList.reduce(
        (pre, next) =>
          next.checked ? pre + next.retail_price * next.number : pre,
        0
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.cart {
  .top_bar {
    margin-top: 50px;
    @include flex();
    padding: 10px 5px 20px;
    background-color: #f4f4f4;
    .item {
      padding-left: 10px;
      font-size: 12.5px;
      color: #666;
      background: url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/servicePolicyRed-518d32d74b.png)
        0/5px 5px no-repeat;
    }
  }
  .goods {
    margin-bottom: 100px;
    .goods_item {
      @include flex();
      align-items: center;
      padding: 20.5px 25px 20.5px 10px;
      .img_bc {
        background-color: #f4f4f4;
      }
      .img {
        width: 62.55px;
        height: 62.55px;
      }
    }
  }
  .total {
    position: fixed;
    left: 0;
    bottom: 50px;
    height: 50.4px;
    width: 100%;
    padding-left: 10px;
    @include flex();
    align-items: center;
    background-color: #fff;
    .total_pay {
      color: #b4282d;
      .totalPrice {
        margin-right: 20px;
      }
      .pay_button {
        display: inline-block;
        height: 50px;
        width: 100px;
        font-size: 14.5px;
        line-height: 50px;
        color: #fff;
        background-color: rgb(180, 40, 45);
      }
    }
  }
}
</style>