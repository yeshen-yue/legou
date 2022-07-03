<template>
  <div class="order">
    <van-nav-bar
      title="订单详情"
      left-text="返回"
      left-arrow
      border
      :fixed="true"
      @click-left="$router.back()"
    />
    <router-link
      class="address"
      :to="{ path: '/user/pages/manageaddress', query: { select: false } }"
    >
      <div class="address_item">
        <div class="name">
          {{ address.name }}
          <div v-if="address.is_default == 1" class="default">默认</div>
        </div>
        <div class="info">
          <div class="tel">{{ address.mobile }}</div>
          <div class="address">
            {{ address.address }}{{ address.address_detail }}
          </div>
        </div>
        <van-icon size="25px" name="arrow" />
      </div>
    </router-link>
    <ul class="order_info">
      <li class="totalPrice">
        商品合计<span>￥{{ totalPrice }}</span>
      </li>
      <li>运费<span>免运费</span></li>
      <li>优惠券<span>暂无</span></li>
    </ul>
    <!-- 订单商品列表 -->
    <ul class="goods_list">
      <li class="goods_item" v-for="item in goodsList" :key="item.goods_id">
        <div class="img">
          <img :src="item.list_pic_url" alt="" />
        </div>
        <div class="info">
          <p class="name">{{ item.goods_name }}</p>
          <p class="price">￥{{ item.retail_price }}</p>
        </div>
        <div class="num">X{{ item.number }}</div>
      </li>
    </ul>
    <!-- 底部 -->
    <div class="footer">
      实付：￥{{ totalPrice }}
      <div class="pay">支付</div>
    </div>
  </div>
</template>

<script>
import { submitOrder, detailAction } from "@/request/cart/index";
import { manageAddress } from "@/request/user";
export default {
  data() {
    return {
      address: {},
      goodsList: [],
      totalPrice: "0",
    };
  },
  methods: {
    // 加载订单信息
    submitOrder() {
      submitOrder(this.$route.query).then((res) => {
        console.log("订单提交成功");
        detailAction({
          addressId: this.address.id,
          openId: this.$route.query.openId,
        }).then((res) => {
          this.goodsList = res.data.goodsList;
          this.totalPrice = res.data.allPrise;
        });
      });
    },
  },
  created() {
    //加载地址
    if (sessionStorage.getItem("address")) {
      this.address = JSON.parse(sessionStorage.getItem("address"));
      this.submitOrder();
    } else {
      manageAddress({ openId: localStorage.getItem("openId") }).then((res) => {
        let data = res.data.data;
        this.address = data.find((i) => i.is_default == 1);
        this.submitOrder();
      });
    }
  },
  beforeDestroy() {
    //销毁页面时清除本地缓存的地址信息
    sessionStorage.removeItem("address");
  },
};
</script>

<style lang="scss" scoped>
.order {
  .address {
    margin-top: 50px;
    display: block;
    .address_item {
      display: flex;
      width: 355px;
      padding: 15px 0;
      margin: auto;
      border-bottom: 1px solid #d9d9d9;
      .name {
        width: 60px;
        .default {
          margin: 10px auto;
          width: 33px;
          color: #b4282d;
          border: 1px solid #b4282d;
        }
      }
      .info {
        width: 240px;
        padding: 0 10px;
        text-align: left;
        .address {
          color: #666;
          margin-top: 10px;
        }
      }
      .van-icon-edit {
        line-height: 40px;
      }
    }
  }
  .order_info {
    border-top: 10px solid #f4f4f4;
    border-bottom: 10px solid #f4f4f4;
    padding: 0 20px;
    li {
      @include flex();
      padding: 15px 0;
      border-bottom: 1px solid #d9d9d9;
    }
    li:last-of-type {
      border-bottom: unset;
    }
  }
  .goods_list {
    margin-bottom: 50px;
    .goods_item {
      display: flex;
      height: 117px;
      align-items: center;
      border-bottom: 10px solid #f4f4f4;
      .img {
        width: 62.55px;
        height: 62.55px;
        background-color: #f4f4f4;
        margin: 0 15px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        width: 240px;
        text-align: left;
        .price {
          margin-top: 10px;
        }
      }
    }
  }
  .footer {
    @include flex();
    position: fixed;
    left: 0;
    bottom: 0;
    width: 365px;
    height: 50px;
    padding-left: 10px;
    line-height: 50px;
    background-color: #fff;
    .pay {
      width: 100px;
      height: 50px;
      line-height: 50px;
      background-color: rgb(180, 40, 45);
      color: #fff;
      font-size: 14.5px;
    }
  }
}
</style>