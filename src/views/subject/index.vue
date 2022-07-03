<template>
  <div class="subject">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="item in list" :key="item.id" class="item">
          <router-link :to="'/subject/details/' + item.id">
            <div class="img"><img :src="item.scene_pic_url" alt="" /></div>
            <div class="title">{{ item.title }}</div>
            <p class="info">{{ item.subtitle }}</p>
            <div class="price">{{ item.price_info }}元起</div>
          </router-link>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { subjectRequest } from "@/request/subject";
export default {
  name: "Subject",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      page: 1,
    };
  },
  created() {},
  methods: {
    onLoad() {
      subjectRequest({ page: `${this.page}` }).then((res) => {
        this.list.push(...res.data.data);
        this.page++;
        this.loading = false;
        if (this.page > 4) {
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
.subject {
  color: #999;
  font-size: 12px;
  .van-list {
    background-color: #f4f4f4;
    padding-bottom: 60px;
  }

  .item {
    background-color: #fff;
    margin-bottom: 10px;
    padding-bottom: 23px;
    .img {
      height: 208px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      color: #333;
      font-size: 17px;
      margin: 15px auto 17px;
    }
    .info {
      padding: 0 10px;
    }
    .price {
      color: rgb(180, 40, 45);
      font-size: 13.5px;
      margin: 10px auto 0px;
    }
  }
}
</style>