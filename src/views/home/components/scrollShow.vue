<template>
  <div class="scrollShow">
    <div class="banner" ref="banner">
      <router-link
        class="banner_link"
        :to="{ name: 'bannerdetails', query: data }"
      >
        <p :style="data.isNew ? style.isNew.p_style : style.isHot.p_style">
          {{ title }}
        </p>
        <button
          :style="
            data.isNew ? style.isNew.button_style : style.isHot.button_style
          "
        >
          查看全部
        </button>
      </router-link>
    </div>
    <div class="scrollBanner">
      <div
        @click="getgoodsDetails(item.id)"
        class="item"
        v-for="item in list"
        :key="item.id"
      >
        <div class="img"><img :src="item.list_pic_url" alt="" /></div>
        <h4 class="ellipsis">{{ item.name }}</h4>
        <p class="ellipsis">{{ item.goods_brief }}</p>
        <span>￥{{ item.retail_price }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["list", "data", "banner_url"],
  data() {
    return {
      title: this.data.isNew == "1" ? "新品首发" : "人气推荐 · 好物精选",
      style: {
        isNew: {
          p_style: { color: "#8c9bae" },
          button_style: { color: "#8c9bae", backgroundColor: "#d8e4f0" },
        },
        isHot: {
          p_style: { color: "#b1a279" },
          button_style: { color: "#b1a279  ", backgroundColor: "#f4e9cb" },
        },
      },
    };
  },
  methods: {
    getgoodsDetails(id) {
      this.$router.push("/pages/goodsdetails/" + id);
    },
  },
  mounted() {
    this.$refs.banner.style.background = `url(${this.banner_url}) 0 0/cover`;
  },
};
</script>

<style scroped lang="scss">
.scrollShow {
  background-color: #f4f4f4;
  margin-bottom: 10px;
  .banner {
    padding: 30px 0 24px;
    height: 76px;
    margin-bottom: 10px;
    background-color: #f1f7fd;
    .banner_link {
      display: block;
      height: 100%;
      p {
        font-size: 16px;
      }
      button {
        border-width: 0;
      }
    }
    button {
      margin-top: 20px;
      height: 24px;
      width: 90px;
    }
  }
  .scrollBanner {
    display: flex;
    overflow: auto;
    background-color: #fff;
    .item {
      width: 150px;
      margin-right: 10px;
      flex-shrink: 0;
      .ellipsis {
        @include ellipsis;
      }
      h4 {
        padding: 0 15px;
        font-size: 15px;
      }
      p {
        padding: 0 12px;
        margin: 14px 0;
        font-size: 12px;
        color: #8a8a8a;
      }
      span {
        color: #9c3232;
      }
      .img {
        margin: 0 auto;
        width: 140px;
        height: 140px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>