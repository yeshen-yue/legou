<template>
  <div class="searchPage">
    <van-nav-bar
      title="搜索"
      left-text="返回"
      left-arrow
      border
      :fixed="true"
      @click-left="onClickLeft"
    />
    <van-search
      @input="getKeyword"
      v-model="value"
      placeholder="请输入搜索关键词"
    />
    <!-- 历史记录和热词 -->
    <div v-if="current == 'hotword'" class="hotword_history">
      <div class="history" v-if="showHistory">
        <div class="history_title">
          历史记录<van-icon name="delete-o" size="20px" @click="clearHistory" />
        </div>
        <span
          @click="clickHistory(item.keyword)"
          class="history_keyword"
          v-for="item in history"
          :key="item.id"
          >{{ item.keyword }}</span
        >
      </div>
      <div class="hotword">
        <p>热门搜索</p>
        <span
          class="hotword_item"
          v-for="item in hotwordList"
          :key="item.keyword"
          >{{ item.keyword }}</span
        >
      </div>
    </div>
    <!-- 候选关键词 -->
    <div v-else-if="current == 'keyword'" class="keyword">
      <p v-for="item in keywordsList" :key="item.id" @click="getDetails(item)">
        {{ item.name }}
      </p>
    </div>
    <!-- 商品展示区 -->
    <div v-else class="goodsDetail">
      <div class="nav" @click="toggle">
        <div class="red">综合</div>
        <div class="price">
          价格
          <div class="icon">
            <van-icon
              name="arrow-up"
              size="10"
              :class="icon_active == 'up' ? 'active' : ''"
            />
            <van-icon
              name="arrow-down"
              size="10"
              :class="icon_active == 'down' ? 'active' : ''"
            />
          </div>
        </div>
        <div>分类</div>
      </div>
      <div v-for="item in currentGoods" :key="item.id" class="goodsList">
        <div class="goods" @click="getgoodsDetails(item.id)">
          <img :src="item.list_pic_url" alt="" />
          <div class="title">{{ item.name }}</div>
          <div class="price">￥{{ item.retail_price }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getKeyword,
  getHotword,
  addHistory,
  clearHistory,
} from "@/request/home/search";
export default {
  name: "searchPage",
  data() {
    return {
      value: "",
      current: "hotword",
      hotwordList: [],
      history: [],
      showHistory: true,
      keywordsList: [],
      currentGoods: [],
      icon_active: "default",
      timer: null,
    };
  },
  created() {
    let openId = localStorage.getItem("openId");
    getHotword({ openId }).then((res) => {
      this.hotwordList = res.data.hotKeywordList;
      this.history = res.data.historyData;
    });
  },
  methods: {
    clickHistory(keyword) {
      getKeyword({ keyword, order: "asc" }).then((res) => {
        this.currentGoods = res.data.keywords;
      });
      this.current = "goodsDetails";
    },
    toggle(e) {
      let cur = e.target;
      if (cur.className == "nav") {
        return;
      }
      let nodes = cur.parentNode.children;
      for (let i = 0; i < 3; i++) {
        nodes[i].classList.remove("red");
      }
      cur.classList.add("red");
      if (e.target.innerText == "价格") {
        if (this.icon_active == "default") {
          this.icon_active = "up";
        } else if (this.icon_active == "up") {
          this.icon_active = "down";
        } else {
          this.icon_active = "up";
        }
      } else {
        this.icon_active = "default";
      }
    },
    onClickLeft() {
      this.$router.back();
    },
    //获取商品详情
    getgoodsDetails(id) {
      this.$router.push({ name: "goodsdetails", params: { id } });
    },
    //获取搜索关键词
    getKeyword() {
      this.current = this.value != "" ? "keyword" : "hotword";
      // 防抖节流
      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(() => {
        getKeyword({ keyword: this.value, order: "asc" }).then((res) => {
          this.keywordsList = res.data.keywords;
        });
        clearTimeout(this.timer);
        this.timer = null;
      }, 1000);
    },

    getDetails(item) {
      this.currentGoods = [item];
      this.current = "goodsDetails";
      // 添加历史记录
      addHistory({
        openId: localStorage.getItem("openId"),
        keyword: item.name,
      }).then((res) => {
        console.log(res);
      });
    },
    //清空历史记录
    clearHistory() {
      clearHistory({ openId: localStorage.getItem("openId") }).then(
        (this.showHistory = false)
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.searchPage {
  text-align: left;
  .van-hairline--bottom::after {
    border-bottom-width: 1px;
    border-color: #d9d9d9;
  }
  .van-search {
    margin-top: 60px;
  }
  .hotword {
    padding: 16px;
    border-top: 10px solid #f4f4f4;
    p {
      margin-bottom: 10px;
    }
    .hotword_item:first-of-type {
      border-color: rgb(180, 40, 45);
      color: rgb(180, 40, 45);
    }
    .hotword_item {
      display: inline-block;
      padding: 5px;
      margin-right: 3px;
      margin: 0 3px 2px 0;
      border: 1px solid #999;
    }
  }
  .history {
    padding: 16px;
    .history_title {
      @include flex();
      margin-bottom: 10px;
    }
    .history_keyword {
      display: inline-block;
      padding: 5px;
      margin: 0 3px 2px 0;
      border: 1px solid #999;
    }
  }
  .keyword {
    p {
      margin: 10px auto;
      padding-left: 20px;
    }
  }
  .goodsDetail {
    .nav {
      @include flex($justify: space-around);
      font-size: 12px;
      border-bottom: 1px solid #d9d9d9;
      & > div {
        line-height: 28px;
      }
      .red {
        color: #f00;
      }
      .price {
        @include flex();
        align-items: center;
        .icon {
          color: #333;
          display: flex;
          flex-direction: column;
          .active {
            color: #f00;
          }
        }
      }
    }
    .goodsList {
      @include flex();
      .goods {
        width: 177.5px;
        border-right: 1px solid #d9d9d9;
        text-align: center;
        img {
          width: 151px;
          height: 151px;
        }
        .title {
          margin: 7px 15px;
          font-size: 12px;
        }
        .price {
          color: rgb(180, 40, 45);
          font-size: 15px;
          margin-bottom: 15px;
        }
      }
    }
  }
}
</style>