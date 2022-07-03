import Vue from 'vue'
import Home from '../views/home'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/home",
  },
  //首页
  {
    path: '/home',
    name: 'home',
    component: Home,
  }
  ,
  //首页搜索页面
  {
    path: '/home/pages/search',
    name: 'search',
    component: () => import('../views/home/pages/SearchPage'),
  }
  ,
  //首页地图页面
  {
    path: '/home/pages/map',
    name: 'map',
    component: () => import('../views/home/pages/MapPage'),
  }
  ,
  //制造商列表页面
  {
    path: '/home/pages/makerlist',
    name: 'makerlist',
    component: () => import('../views/home/pages/MakerList'),
  }
  ,
  //制造商详情页面
  {
    path: '/home/pages/makerDetails/:id',
    name: 'makerdetails',
    component: () => import('../views/home/pages/MakerDetails'),
  }
  ,
  //banner广告详情页面
  {
    path: '/home/pages/bannerdetails',
    name: 'bannerdetails',
    component: () => import('../views/home/pages/BannerDetails'),
  }
  ,
  //主题界面
  {
    path: '/subject',
    name: 'subject',
    component: () => import('../views/subject'),
    // children: []
  },
  //主题详情
  {
    path: '/subject/details/:id',
    name: 'subjectDetails',
    component: () => import('../views/subject/pages/SubjectDetails'),
  },
  //分类界面
  {
    path: '/kinds',
    name: 'kinds',
    component: () => import('../views/kinds')
  }
  ,
  //分类详情页面
  {
    path: '/category/:id',
    name: 'category',
    component: () => import('../views/Category'),
  }
  ,

  //商品详情页面
  {
    path: '/pages/goodsdetails/:id',
    name: 'goodsdetails',
    component: () => import('../views/goodsDetails'),
  },
  //购物车界面
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/cart')
  }
  ,
  //确认订单
  {
    path: '/cart/pages/order',
    name: 'order',
    component: () => import('../views/cart/pages/Order/index.vue')
  }
  ,
  //用户界面
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/user')
  },
  //收藏
  {
    path: '/user/pages/mystar',
    name: 'mystar',
    component: () => import('../views/user/pages/MyStar/index.vue')
  },
  //地址管理
  {
    path: '/user/pages/manageaddress',
    name: 'manageaddress',
    component: () => import('../views/user/pages/ManageAddress/index.vue')
  },
  //地址管理
  {
    path: '/user/pages/addaddress',
    name: 'addaddress',
    component: () => import('../views/user/pages/AddAddress/index.vue')
  },
  //意见反馈
  {
    path: '/user/pages/suggestion',
    name: 'suggestion',
    component: () => import('../views/user/pages/Suggestion/index.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
