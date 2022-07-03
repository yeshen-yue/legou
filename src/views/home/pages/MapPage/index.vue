<template>
  <div class="mapPage">
    <!-- 顶部导航 -->
    <van-nav-bar
      title="搜索地名"
      left-text="返回"
      left-arrow
      border
      :fixed="true"
      @click-left="$router.back()"
    />
    <input type="text" v-model="val" class="search" placeholder="请输入地名" />
    <div class="locationList">
      <p
        class="location_item"
        @click="selectLocation(item)"
        v-for="item in locationList"
        :key="item.id"
      >
        {{ item.name }}({{ item.district }})
      </p>
    </div>
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: "",
      locationList: [],
      city: "",
      map: null,
    };
  },
  watch: {
    val(newValue, oldValue) {
      let that = this;
      AMap.plugin("AMap.AutoComplete", function () {
        var autoOptions = {
          //city 限定城市，默认全国
          city: that.city,
        };
        // 实例化AutoComplete
        var autoComplete = new AMap.AutoComplete(autoOptions);
        // 根据关键字进行搜索
        autoComplete.search(that.val, function (status, result) {
          // 搜索成功时，result即是对应的匹配数据
          that.locationList = result.tips;
        });
      });
    },
  },
  methods: {
    selectLocation(item) {
      let location = {
        name: item.name,
        pos: item.location ? [item.location.lng, item.location.lat] : null,
      };
      sessionStorage.setItem("location", JSON.stringify(location));
      this.$router.back();
    },
  },
  mounted() {
    let that = this;
    let location = JSON.parse(sessionStorage.getItem("location"));
    if (location && location.pos) {
      var map = new AMap.Map("container", {
        zoom: 11, //级别
        center: location.pos, //中心点坐标
        viewMode: "3D", //使用3D视图
      });
      var marker = new AMap.Marker({
        position: location.pos, //位置
      });
      map.add(marker); //添加到地图
    } else {
      var map = new AMap.Map("container", {
        zoom: 11, //级别
        viewMode: "3D", //使用3D视图
      });
    }
    this.map = map;
    //获取当前城市信息
    AMap.plugin("AMap.CitySearch", function () {
      var citySearch = new AMap.CitySearch();
      citySearch.getLocalCity(function (status, result) {
        if (status === "complete" && result.info === "OK") {
          that.city = result.city;
        }
      });
    });
  },
  destroyed() {
    this.map.destroy();
    this.map = null;
    this.mapModule = null;
  },
};
</script>

<style lang="scss" scoped>
.mapPage {
  .search {
    margin-top: 50px;
    width: 70%;
    padding: 10px;
    border-color: #f4f4f4;
    border-style: solid;
  }
  .locationList {
    height: calc(100vh - 320px);
    overflow: auto;
    .location_item {
      padding: 5px 0;
    }
  }
  #container {
    width: 100%;
    height: 200px;
    position: fixed;
    left: 0;
    bottom: 0;
  }
}
</style>