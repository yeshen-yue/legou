<template>
  <div class="recommend">
    <div class="top">
      <div>专题精选 <span class="icon"></span></div>
    </div>
    <div class="content">
      <div class="item-container">
        <div v-for="item in topicList" :key="item.id" class="item">
          <router-link :to="'/subject/details/' + item.id" class="item_link">
            <div class="img"><img :src="item.item_pic_url" alt="" /></div>
            <div class="title">
              <h4>{{ item.title }}</h4>
              <span>{{ item.price_info }}元起</span>
            </div>
            <p>{{ item.subtitle }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["topicList"],
};
</script>
<style lang="scss" scoped>
.recommend {
  background-color: #fff;
  font-size: 12px;
  .top {
    padding: 18px;

    .icon {
      display: inline-block;
      width: 16px;
      height: 16px;
      vertical-align: middle;
      background: url("@/assets/small_rightArrow.png") 0 0 / cover;
    }
  }
  .content {
    overflow: auto;
    .item-container {
      display: flex;
      width: fit-content;
    }
    .item:last-child {
      margin-right: 12px;
    }
    .item {
      width: 287px;
      margin-left: 12px;
      flex-shrink: 0;
      .item_link {
        display: block;
        height: 100%;
      }
      .img {
        height: 163px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        display: flex;
        justify-content: space-between;
        h4 {
          font-size: 15px;
        }
        span {
          color: #9c3232;
        }
      }
      p {
        margin: 16px 0 30px;
        text-align: left;
        @include ellipsis;
      }
    }
  }
}
</style>