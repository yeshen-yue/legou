<template>
  <div class="addAddress">
    <van-nav-bar
      title="新增地址"
      left-text="返回"
      left-arrow
      border
      :fixed="true"
      @click-left="$router.back()"
    />
    <div class="address">
      <van-cell-group>
        <van-field v-model="name" placeholder="姓名" />
        <van-field v-model="tel" type="tel" placeholder="手机号" />
        <van-field
          readonly
          clickable
          placeholder="选择城市"
          @click="showPicker = true"
          v-model="province"
        />
        <van-popup v-model="showPicker" round position="bottom">
          <van-area
            @cancel="showPicker = false"
            @confirm="getProvince"
            title="标题"
            :area-list="areaList"
          />
        </van-popup>
        <van-field v-model="addressDetail" placeholder="详细地址" />
      </van-cell-group>
      <van-checkbox
        icon-size="15px"
        checked-color="#b4282d"
        v-model="checked"
        shape="square"
        >设为默认地址</van-checkbox
      >
    </div>
    <div class="addAddressButton" @click="addAddress">保存地址</div>
  </div>
</template>

<script>
import { addAddress, getAddressDetail } from "@/request/user";
import { areaList } from "@vant/area-data";
import { Toast } from "vant";
export default {
  data() {
    return {
      name: "",
      tel: "",
      addressDetail: "",
      province: "",
      showPicker: false,
      areaList,
      checked: false,
    };
  },

  methods: {
    getProvince(value) {
      this.province = value.map((el) => el.name).join(" ");
      this.showPicker = false;
    },
    addAddress() {
      let data = {
        address: this.province,
        addressId: this.$route.query.id ? this.$route.query.id : "",
        checked: this.checked,
        detailadress: this.addressDetail,
        openId: localStorage.getItem("openId"),
        telNumber: this.tel,
        userName: this.name,
      };
      addAddress(data).then((res) => {
        Toast.success({
          message: "地址保存成功",
          duration: 500,
        });
      });
      this.$router.back();
    },
  },
  created() {
    if (this.$route.query.id) {
      getAddressDetail(this.$route.query).then((res) => {
        let data = res.data.data;
        this.name = data.name;
        this.tel = data.mobile;
        this.province = data.address;
        this.addressDetail = data.address_detail;
        this.checked = data.is_default == 1 ? true : false;
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.addAddress {
  .address {
    margin-top: 50px;
    background-color: #f4f4f4;
  }
  ::v-deep .van-checkbox {
    padding-left: 16px;
    background-color: #fff;
  }
  .addAddressButton {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: #fff;
    background-color: #b4282d;
  }
}
</style>