<template>
  <div class="subjectDeatails">
    <van-nav-bar
      title="专题详情"
      left-text="返回"
      left-arrow
      :fixed="true"
      @click-left="onClickLeft"
    />
    <div v-html="imgstr" class="imgbox"></div>
    <div class="recommend">
      <p class="title">专题推荐</p>
      <div v-for="item in recommendList" :key="item.id" class="item">
        <img :src="item.scene_pic_url" alt="" />
        <p>{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { subjectDeatailsRequest } from "@/request/subject";
export default {
  data() {
    return {
      imgstr: "",
      recommendList: [],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
  },
  created() {
    subjectDeatailsRequest(this.$route.params).then((res) => {
      this.imgstr = res.data.data.content;
      this.recommendList = res.data.recommendList;
    });
  },
};
</script>
<style lang="scss" scoped>
.subjectDeatails {
  padding-bottom: 50px;
  background-color: #f4f4f4;
  .imgbox {
    ::v-deep img {
      width: 100%;
      height: auto;
    }
  }
  .recommend {
    .title {
      margin: 30px auto 30px;
      font-size: 15px;
    }
    .item {
      width: 345px;
      height: 213px;
      margin: 0 auto 15px;
      padding: 12px 12px 0px;
      background-color: #fff;
      font-size: 14px;
      img {
        width: 321px;
        height: 139px;
      }
      P {
        width: 321px;
        text-align: left;
        margin: 15px auto 14px;
      }
    }
  }
}
</style>
<style>
</style>