<template>
  <div class="suggestion">
    <van-nav-bar
      title="分类"
      left-text="返回"
      left-arrow
      border
      :fixed="true"
      @click-left="$router.back()"
    />
    <div class="content">
      <div class="title">意见与反馈</div>
      <van-field
        v-model="message"
        rows="3"
        autosize
        label="留言"
        type="textarea"
        placeholder="请填写你的意见和反馈"
        maxlength="300"
        show-word-limit
        class="message"
      />
      <van-field
        v-model="tel"
        placeholder="邮箱/手机号/微信号"
        label="联系方式："
        class="tel"
      />
      <div class="submit" @click="submit">提交</div>
    </div>
  </div>
</template>

<script>
import { suggestion } from "@/request/user";
import { Toast } from "vant";
export default {
  data() {
    return {
      message: "",
      tel: "",
    };
  },
  methods: {
    submit() {
      let data = {
        openId: localStorage.getItem("openId"),
        name: localStorage.getItem("userInfo").nickName,
        phone: this.tel,
        content: this.message,
      };
      suggestion(data).then((res) => {
        Toast.success({
          message: "提交成功",
          duration: 500,
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.suggestion {
  .content {
    padding: 0 10px;
    margin-top: 50px;
    .title {
      padding: 10px 0;
      text-align: left;
      border-bottom: 1px solid #d9d9d9;
    }
    .message {
      border-bottom: 1px solid #d9d9d9;
    }
    .tel {
      border-bottom: 1px solid #d9d9d9;
    }
    .submit {
      margin: 50px auto;
      width: 337px;
      height: 50px;
      line-height: 50px;
      background-color: #b4282d;
      color: #fff;
      font-size: 16px;
      border-radius: 5px;
    }
  }
}
</style>