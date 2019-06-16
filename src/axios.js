// 配置axios
// 1.引入vue
import Vue from "vue"
// 2.引入axios库
import axios from "axios"
//引入qs
import qs from "qs"
// 3.设置跨域保存session
axios.defaults.withCredentials=true
// 4.设置服务器请求的基础命令 //访问https
// axios.defaults.baseURL="https://www.wz2018.top:3001/"
// 4.设置服务器请求的基础命令 //访问本地
axios.defaults.baseURL="http://127.0.0.1:3000/"
// 5.将axios注册vue实例
Vue.prototype.axios=axios
//将qs注册到vue实例
Vue.prototype.qs=qs;
//