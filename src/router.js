import Vue from 'vue'
import Router from 'vue-router'

import regandlogin from './components/dyw/common/subset/regandlogin'
import header from './components/dyw/common/header'
import play from './components/dyw/common/subset/play'
import index from "./views/index.vue"
import details from "./views/details.vue"
Vue.use(Router)

export default new Router({
  routes: [
    {path:'/regandlogin',component:regandlogin},
    {path:'/header',component:header},
    {path:'/play',component:play},
    {path: '/',component:index},
    {path:"/details",component:details}



  ]
})
