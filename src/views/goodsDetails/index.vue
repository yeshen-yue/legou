<template>
  <div class="goodsDetails" v-if="showPage">
    <van-nav-bar
      title="商品详情"
      left-text="返回"
      left-arrow
      border
      :fixed="true"
      @click-left="onClickLeft"
    />
    <!-- 顶部轮播 -->
    <van-swipe class="my-swipe" indicator-color="black">
      <van-swipe-item v-for="item in data.gallery" :key="item.id">
        <img :src="item.img_url" alt="" />
      </van-swipe-item>
    </van-swipe>
    <ul class="underswiper">
      <li class="item">30天无忧退货</li>
      <li class="item">48小时快速退款</li>
      <li class="item">满88元免邮费</li>
    </ul>
    <!-- 商品信息及规格 -->
    <div class="goodsInfo">
      <p class="name">{{ data.info.name }}</p>
      <p class="info">{{ data.info.goods_brief }}</p>
      <p class="price">￥{{ data.info.retail_price }}</p>
      <div class="chooseNum" @click="showAddCart">
        请选择规格数量<van-icon size="20px" name="arrow" />
      </div>
    </div>
    <!-- 商品参数 -->
    <ul class="attribute">
      <p class="title">商品参数</p>
      <li v-for="item in data.attribute" :key="item.name">
        <span class="attr_name"> {{ item.name }}</span>
        <span class="attr_value">{{ item.value }}</span>
      </li>
    </ul>
    <!-- 商品图片 -->
    <div v-html="data.info.goods_desc" class="goodsImg"></div>
    <!-- 主要问题 -->
    <ul class="issue_list">
      <div class="common_issue">
        <span class="line"></span><span class="title">常见问题</span
        ><span class="line"></span>
      </div>
      <li class="issue_item" v-for="item in data.issue" :key="item.id">
        <p class="issue">{{ item.question }}</p>
        <p class="answer">{{ item.answer }}</p>
      </li>
    </ul>
    <!-- 商品列表 -->
    <div class="top_bar">
      <span class="line"></span><span class="title">大家都爱看</span
      ><span class="line"></span>
    </div>
    <ul class="goods">
      <li v-for="item in data.productList" :key="item.id" class="goods_item">
        <router-link class="item_link" :to="'/pages/goodsdetails/' + item.id">
          <img :src="item.list_pic_url" alt="" />
          <p>{{ item.name }}</p>
          <div class="price">￥{{ item.retail_price }}</div>
        </router-link>
      </li>
    </ul>
    <!-- 添加购物车弹窗 -->
    <van-dialog
      v-model="isShowAddCart"
      class="showAddCart"
      :show-confirm-button="false"
      show-cancel-button
      cancel-button-text="x"
    >
      <div class="add_goodsInfo">
        <img class="img" :src="data.info.primary_pic_url" alt="" />
        <div class="price">
          <p>价格￥{{ data.info.retail_price }}</p>
          请选择数量
        </div>
      </div>
      <div class="goodsNum">
        <p class="num_title">数量</p>
        <van-stepper v-model="goodsNum" integer />
      </div>
    </van-dialog>
    <!-- 底部 -->
    <div class="footer">
      <div class="star">
        <van-icon
          :color="isStar ? 'red' : 'inherit'"
          @click="addStar"
          name="star-o"
          size="25px"
        />
      </div>
      <div class="cart">
        <router-link to="/cart"
          ><van-icon name="cart-o" size="25px" :badge="cartGoodsNum"
        /></router-link>
      </div>
      <div class="pay">立即购买</div>
      <div @click="addToCart" class="addCart">加入购物车</div>
    </div>
  </div>
</template>

<script>
import { getGoodsDetails } from "@/request/goodsDetails";
import { addCart, addStar } from "@/request/addCart";
import { getCartList } from "@/request/cart";
import { Toast } from "vant";
export default {
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    showAddCart() {
      this.isShowAddCart = true;
    },
    // 更新商品详情
    updateGoodsDetail() {
      console.log("跟新");
      let params = Object.assign(
        { openId: localStorage.getItem("openId") },
        this.$route.params
      );
      getGoodsDetails(params).then((res) => {
        console.log(res.data);
        this.data = res.data;
        this.showPage = true;
        //判断商品是否收藏
        this.isStar = this.data.collected;
        // 刷新下方购物车徽标
        this.cartGoodsNum = res.data.allnumber;
      });
    },
    //添加购物车
    addToCart() {
      if (this.isShowAddCart) {
        let data = {
          openId: localStorage.getItem("openId"),
          number: this.goodsNum + "",
          goodsId: this.data.info.id + "",
        };
        addCart(data).then((res) => {
          Toast.success({
            message: "添加成功",
            duration: 500,
          });
          // 刷新下方购物车徽标
          this.updateGoodsDetail();
        });
      } else {
        this.isShowAddCart = true;
      }
    },
    //收藏或取消收藏
    addStar() {
      let data = {
        openId: localStorage.getItem("openId"),
        goodsId: this.data.info.id + "",
      };
      addStar(data).then((res) => {
        if (!this.isStar) {
          Toast.success({
            message: "收藏成功",
            duration: 500,
          });
        } else {
          Toast.success({
            message: "取消收藏",
            duration: 500,
          });
        }
        this.isStar = !this.isStar;
      });
    },
  },
  data() {
    return {
      data: {},
      showPage: false,
      isShowAddCart: false,
      goodsNum: 1,
      isStar: false,
      cartGoodsNum: 0,
    };
  },
  created() {
    this.updateGoodsDetail();
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.updateGoodsDetail();
  },
};
</script>
<style lang="scss" scoped>
.goodsDetails {
  .my-swipe {
    margin: 60px auto 0;
    .van-swipe-item {
      height: 200px;
      background-color: #39a9ed;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .underswiper {
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
  .goodsInfo {
    .name {
      padding: 10px;
      font-size: 20px;
    }
    .info {
      margin: 12px auto;
      color: rgb(153, 153, 153);
    }
    .price {
      color: rgb(180, 40, 45);
      font-size: 17.5px;
      margin: 5px auto 17.5px;
    }
    .chooseNum {
      padding: 0px 10px;
      border-bottom: 12px solid #f4f4f4;
      height: 54px;
      @include flex();
      align-items: center;
    }
  }
  .attribute {
    text-align: left;
    .title {
      padding: 30px 15px;
      font-size: 19px;
    }
    li {
      padding-left: 25px;
      margin-bottom: 35px;
      color: #999;
      .attr_name {
        display: inline-block;
        width: 80px;
      }
      span {
        color: #000;
      }
    }
    border-bottom: 12px solid #f4f4f4;
  }
  .goodsImg {
    ::v-deep img {
      width: 100%;
      height: auto;
      vertical-align: bottom;
    }
  }
  .issue_list {
    padding: 0 15px;
    text-align: left;
    border-bottom: 55px solid #f4f4f4;
    .common_issue {
      @include flex(nowrap, center);
      align-items: center;
      padding: 17.5px 0;
      span.line {
        width: 50px;
        height: 0.5px;
        background-color: #ccc;
      }
      span.title {
        padding: 0 12.5px;
      }
    }
    .issue_item {
      margin-bottom: 12.5px;
      font-size: 13px;
      color: #787878;
      line-height: 20px;
      .issue {
        color: #303030;
        margin-bottom: 7.5px;
      }
    }
  }
  .top_bar {
    background-color: #fff;
    @include flex(nowrap, center);
    align-items: center;
    padding: 17.5px 0;
    span.line {
      width: 50px;
      height: 0.5px;
      background-color: #ccc;
    }
    span.title {
      padding: 0 12.5px;
    }
  }
  .goods {
    @include flex(wrap);
    background-color: #f4f4f4;
    .goods_item {
      width: 49.5%;
      margin-bottom: 2.5px;
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
  ::v-deep .showAddCart {
    width: 360px;
    bottom: 50px;
    left: 0;
    top: unset;
    transform: unset;
    border-radius: 0;
    text-align: left;
    padding: 15px;
    .van-dialog__footer {
      position: absolute;
      right: 0;
      top: 0;
      width: 70px;
      height: 50px;
      .van-button__text {
        font-size: 30px;
      }
    }
    .add_goodsInfo {
      display: flex;
      .img {
        width: 89px;
        height: 89px;
      }
      p {
        color: rgb(180, 40, 45);
      }
    }
  }
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    height: 51.3px;
    width: 100%;
    z-index: 10000;
    background-color: #fff;
    .addCart {
      width: 106px;
      height: 51.3px;
      background-color: rgb(180, 40, 45);
      color: #fff;
      line-height: 51.3px;
    }
    .pay {
      width: 106px;
      height: 51.3px;
      color: #333;
      line-height: 51.3px;
    }
    .star,
    .cart {
      flex-grow: 1;
      line-height: 51.3px;
    }
  }
}
</style>