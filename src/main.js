import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//mi'ni'tui引入以及样式
import MintUI from 'mint-ui' 
import 'mint-ui/lib/style.css'
//引入elementui样式 并且注册
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 1.全局引用vue-video-player
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

// 引入swiper
import swiper from "swiper"
import "swiper/dist/css/swiper.min.css"
Vue.use(VideoPlayer)


Vue.config.productionTip = false



Vue.use(ElementUI)
// 引入字体图标
import './font/iconfont.css'
Vue.config.productionTip = false
Vue.use(MintUI); 
import qs from "qs"
import axios from "./axios"
Vue.config.productionTip=false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
