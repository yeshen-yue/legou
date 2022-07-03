<template>
  <div class="makerList">
    <van-nav-bar
      title="制造商"
      left-text="返回"
      left-arrow
      border
      :fixed="true"
      @click-left="onClickLeft"
    />
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="item in list" :key="item.id" class="item">
          <router-link :to="'/home/pages/makerDetails/' + item.id">
            <img :src="item.app_list_pic_url" alt="" class="img" />
            <div class="info">
              <span class="name">{{ item.name }}</span> |
              <span class="price">{{ item.floor_price }}元起</span>
            </div>
          </router-link>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getBrandList } from "@/request/home/maker";
export default {
  name: "makerList",
  data() {
    return {
      page: 1,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onLoad() {
      getBrandList({ page: `${this.page}` }).then((res) => {
        this.list.push(...res.data.data);
        this.page++;
        this.loading = false;
        if (this.page >= 9) {
          this.finished = true;
        }
      });
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  },
};
</script>

<style lang="scss" scoped>
.makerList {
  .item {
    position: relative;
    .img {
      width: 100%;
      height: auto;
    }
    .info {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 0.46667rem;
      font-weight: 700;
      color: #fff;
    }
  }
}
</style>