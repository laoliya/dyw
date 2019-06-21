import Vue from 'vue'
import Router from 'vue-router'
import index from "./views/index.vue"
import details from "./views/details.vue"
import regandlogin from './views/regandlogin'
import douban from './views/douban'
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',component:index},
    {path:'/regandlogin',component:regandlogin},
    {path:"/details",component:details},
    {path:"/douban",component:douban},
  ]
})
