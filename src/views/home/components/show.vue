<template>
  <div class="show">
    <p class="kind">{{ list.name }}好物</p>
    <div class="content">
      <div
        @click="getgoodsDetails(item.id)"
        v-for="item in list.goodsList"
        :key="item.id"
        class="item"
      >
        <div class="img"><img :src="item.list_pic_url" alt="" /></div>
        <p class="title">{{ item.name }}</p>
        <p class="price">￥{{ item.retail_price }}</p>
      </div>
      <div class="item">
        {{ list.name }}
        <router-link :to="'/category/' + list.id" class="more_link">
          好物<span class="icon"></span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["list"],
  methods: {
    getgoodsDetails(id) {
      this.$router.push({ name: "goodsdetails", params: { id } });
    },
  },
};
</script>
<style lang="scss" scoped>
.show {
  font-size: 12px;
  text-align: left;
  text-indent: 1em;
  background-color: #f4f4f4;
  p.kind {
    padding: 15px 0 12px;
    text-align: center;
    text-indent: 0;
  }
  .content {
    @include flex(wrap, space-evenly);
    //解决flex最后一行问题
    .item:last-child:nth-child(2n - 1) {
      margin-right: 186px;
    }
    //最后一个item为更多内容的链接，单独设置样式
    .item:last-child {
      padding-top: 30px;
      position: relative;
      text-align: center;
      font-size: 16px;
      .icon {
        position: absolute;
        width: 36px;
        height: 36px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: url("@/assets/rightArrow.png") 0 0 / cover;
      }
      .more_link {
        display: block;
        height: 100%;
      }
    }
    .item {
      width: 180px;
      margin-bottom: 5px;
      background-color: #fff;
      .img {
        width: 151px;
        height: 151px;
        margin: 0 auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .price {
        color: #9c3232;
        margin: 12px 0 2px;
      }
    }
  }
}
</style>
<style >
</style>