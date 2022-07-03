<template>
  <div class="manageAddress">
    <van-nav-bar
      title="分类"
      left-text="返回"
      left-arrow
      :fixed="true"
      @click-left="$router.back()"
    />
    <div class="address_list">
      <div
        v-for="item in addressList"
        @click="selectAddress(item)"
        :key="item.id"
        class="address_item"
      >
        <div class="name">
          {{ item.name }}
          <div v-if="item.is_default == 1" class="default">默认</div>
        </div>
        <div class="info">
          <div class="tel">{{ item.mobile }}</div>
          <div class="address">{{ item.address }}{{ item.address_detail }}</div>
        </div>
        <van-icon size="25px" @click="editAddress(item.id)" name="edit" />
      </div>
    </div>
    <router-link class="addAddress" to="/user/pages/addaddress"
      >+新增地址</router-link
    >
  </div>
</template>

<script>
import { manageAddress } from "@/request/user";
export default {
  data() {
    return {
      addressList: [],
    };
  },
  created() {
    manageAddress({ openId: localStorage.getItem("openId") }).then((res) => {
      this.addressList = res.data.data;
    });
  },
  methods: {
    editAddress(id) {
      this.$router.push({ path: "/user/pages/addaddress", query: { id } });
    },
    selectAddress(item) {
      //判断是否由订单界面跳转
      if (this.$route.query.select) {
        sessionStorage.setItem("address", JSON.stringify(item));
        this.$router.back();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.manageAddress {
  background-color: #fff;
  .address_list {
    margin-top: 50px;
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
  .addAddress {
    display: block;
    position: fixed;
    left: 50%;
    bottom: 20px;
    transform: translate(-50%, 0);
    width: 312px;
    height: 37px;
    line-height: 37px;
    color: #b4282d;
    border: 1px solid #b4282d;
  }
}
</style>