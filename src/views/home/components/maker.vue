<template>
  <div class="maker">
    <router-link to="/home/pages/makerlist">
      <h3>品牌制造商直供</h3>
    </router-link>
    <div class="container">
      <div v-for="item in brandList" :key="item.id" class="item">
        <router-link
          class="item_link"
          :to="'/home/pages/makerDetails/' + item.id"
        >
          <img :src="item.new_pic_url" alt="" />
          <h4>{{ item.name }}制造商</h4>
          <h5>{{ item.floor_price }}元起</h5>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["brandList"],
  mounted() {},
};
</script>

<style scoped lang="scss">
.maker {
  margin: 8px auto;
  padding-top: 20px;
  background-color: #fff;
  h3 {
    color: #000;
    margin-bottom: 15px;
  }
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item {
      width: 178px;
      margin-bottom: 4px;
      .item_link {
        position: relative;
        display: block;
        height: 116px;
        color: #000;
      }
      img {
        width: 100%;
        height: 100%;
      }
      h4 {
        position: absolute;
        left: 10px;
        top: 20px;
        font-weight: normal;
      }
      h5 {
        position: absolute;
        left: 10px;
        top: 40px;
      }
    }
  }
}
</style>