<template>
  <div class="home">
    <Search />
    <Banner :banner="banner" />
    <Navigation :channel="channel" />
    <Maker :brandList="brandList" />
    <scroll-show
      :data="scrollShowList[0].data"
      :list="scrollShowList[0].list"
      :banner_url="scrollShowList[0].banner_url"
    />
    <scroll-show
      :data="scrollShowList[1].data"
      :list="scrollShowList[1].list"
      :banner_url="scrollShowList[1].banner_url"
    />
    <Recommend :topicList="topicList"></Recommend>
    <Show v-for="item in newCategoryList" :key="item.id" :list="item" />
  </div>
</template>

<script>
import homeRequest from "@/request/home";
import Search from "./components/search";
import Banner from "./components/banner";
import Navigation from "./components/navigation";
import Maker from "./components/maker.vue";
import ScrollShow from "./components/scrollShow.vue";
import Recommend from "./components/recommend.vue";
import Show from "./components/show";
export default {
  name: "Home",
  components: {
    Search,
    Banner,
    Navigation,
    Show,
    Maker,
    ScrollShow,
    Recommend,
  },
  data() {
    return {
      banner: [],
      brandList: [],
      scrollShowList: [
        {
          list: [],
          data: { isHot: "", isNew: "1", order: "" },
          banner_url: require("@/assets/new_banner.png"),
        },
        {
          list: [],
          data: { isHot: "1", isNew: "", order: "" },
          banner_url: require("@/assets/hot_banner.png"),
        },
      ],
      topicList: [],
      newCategoryList: [],
      channel: [],
    };
  },
  created() {
    homeRequest().then((res) => {
      console.log(res);
      this.brandList = res.data.brandList;
      this.scrollShowList[0].list = res.data.newGoods;
      this.scrollShowList[1].list = res.data.hotGoods;
      this.topicList = res.data.topicList;
      this.newCategoryList = res.data.newCategoryList;
      this.banner = res.data.banner;
      this.channel = res.data.channel;
    });
  },
};
</script>
<style >
.home {
  background-color: #f4f4f4;
  overflow: auto;
}
* {
  margin: 0;
  padding: 0;
}
</style>
<style scoped>
.home {
  padding-bottom: 70px;
}
</style>