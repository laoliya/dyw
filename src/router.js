import Vue from 'vue'
import Router from 'vue-router'
import index from "./views/index.vue"
import details from "./views/details.vue"
import regandlogin from './views/regandlogin'
import douban from './views/douban'
import particulars from './views/particulars'
import upload from './components/dyw/common/subset/upload'
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',component:index},
    {path:'/regandlogin',component:regandlogin},
    {path:"/details",component:details},
    {path:"/douban",component:douban},
    {path:"/particulars",component:particulars},
    {path:"/upload",component:upload}
  ]
})
