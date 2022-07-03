<template>
  <div class="kinds">
    <router-link class="searchLink" to="/home/pages/search">
      <van-search disabled placeholder="商品搜索,共239款好物" />
    </router-link>
    <div class="kinds_body">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item
          v-for="(item, index) in navList"
          :key="item.id"
          :class="{ active: activeKey == index }"
          :title="item.name"
          @click="getKinds"
        />
      </van-sidebar>
      <div class="kinds_show">
        <img :src="currentNav.banner_url" alt="" class="img" />
        <div class="title">— {{ currentNav.name }}分类 —</div>
        <ul class="kinds_list">
          <li
            v-for="item in currentNav.subList"
            :key="item.id"
            class="kinds_item"
            @click="getGoodsList(item.id)"
          >
            <img :src="item.wap_banner_url" alt="" />
            <p class="kinds_name">{{ item.name }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentNav, getNavList } from "@/request/category";
export default {
  name: "Kinds",
  data() {
    return {
      activeKey: 0,
      currentNav: {},
      navList: [],
    };
  },
  methods: {
    getCurrentNav(id) {
      getCurrentNav({ id }).then((res) => {
        this.currentNav = res.data.data.currentOne;
      });
    },
    getKinds(index) {
      this.getCurrentNav(this.navList[index].id + "");
    },
    getGoodsList(id) {
      this.$router.push("/category/" + id);
    },
  },
  created() {
    this.getCurrentNav("1005000");
    getNavList().then((res) => {
      this.navList = res.data.categoryList;
    });
  },
};
</script>
<style lang="scss" scoped>
.kinds {
  .searchLink {
    display: block;
    border-bottom: 2px solid rgb(237, 237, 237);
    .van-cell {
      border-radius: 5px;
      background-color: #ededed;
      ::v-deep .van-field__left-icon {
        margin-left: 5px;
      }
    }
  }
  .kinds_body {
    @include flex();
    padding: 10px 0 60px;
    ::v-deep .van-sidebar-item--select::before {
      height: 60px;
    }
    ::v-deep .van-sidebar-item--select {
      font-size: 0.48rem;
      color: #ab2b2b;
    }
  }
  .kinds_show {
    width: 264px;
    padding: 0 15px;
    .img {
      width: 264px;
      height: 111px;
    }
    .title {
      margin: 25px auto;
    }
    .kinds_list {
      @include flex(wrap);
      img {
        width: 72px;
        height: 72px;
      }
    }
  }
}
</style>