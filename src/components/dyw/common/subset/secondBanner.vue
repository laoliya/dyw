
<template>
<!-- 首页第二个轮播 -->
    <div class="secondbanner">
            <!-- 标题 -->
        <div class="topTitle">
            <div class="title">
                <div class="leftTitle">
                    <h3>                  
                        <i class="iconfont icon-qushi"></i>    
                        最近流行的
                    </h3>
                </div>
                <div class="rightTitle">
                    <ul>
                        <li>
                            <i class="iconfont icon-huo"></i>    
                            <span>流行</span>
                        </li>
                        <li>
                            <i class="iconfont icon-WatchEvent"></i>    
                            <span>首映</span>
                        </li>
                        <li>
                            <i class="iconfont icon-hao"></i>                            
                            <span>最近加入</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="D_hr"></div>
            <!--类型-->
        <div class="catena_nav">
            <ul  class="nav" @click="selectiveType">
                <li v-for="(item,index) of mytype" :key=index>{{item.cname}}</li>
            </ul>
        </div>  
        <!-- 轮播部分 -->
        <!-- <div>{{movies}}</div> -->
        <!-- <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">Slide 1</div>
                <div class="swiper-slide">Slide 2</div>
                <div class="swiper-slide">Slide 3</div>
                <div class="swiper-slide">Slide 4</div>
                <div class="swiper-slide">Slide 5</div>
            </div>
        </div> -->


            <!-- Swiper -->
            <div class="swiper-container">
                <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(movie,index) of myMovies" :key=index @click="jumpvideo(movie.mid)">
                        <img :src="'http://127.0.0.1:3000/img/'+movie.mimg" alt="">              
                        <!--电影名称-->
                        <h4>{{movie.mname}}</h4> 
                        <div> <!--上映时间-->
                            <p>{{movie.myear}}</p>
                            <!--收藏  浏览  评分-->
                            <div>
                                <ul>
                                    <li  class="iconfont icon-collection"></li>
                                    <li  class="iconfont icon-liulan"></li>
                                    <li  class="iconfont icon-pingfen-"></li>
                                    <li>{{movie.mgrade}}</li>
                                </ul>
                            </div>
                        </div>
                </div>
                </div>
                <!-- 轮播指示符  -->
                <!-- <div class="swiper-pagination"></div> -->

                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
            





    </div>
</template>

<script>
import Swiper from "swiper";
export default {
    data(){
        return{
            myMovies:[],    //从父元素得到的电影的值
            mytype:[],      //从父元素得到的类型的值
        }
    },
    props:["movies","mclass"],
    // 监听获取父元素传来的变量
    watch: {
       movies(){
        //    将父元素传进来的数组 遍历到data中
           this.myMovies.splice(0,this.myMovies.length)
           for(var m of this.movies){
               this.myMovies.push(m)
           }
           console.log(this.movies)           
       },
       mclass(){
            //    将父元素传进来的数组 遍历到data中
            this.mytype.splice(0,this.mytype.length)
            for(var m of this.mclass){
                this.mytype.push(m)
            }
        }
    },
    methods: {       
        // 单机类型触发事件
        selectiveType(){},
        jumpvideo(mid){
             localStorage.setItem('mid',mid);
            this.$router.push("/play")
        }
    },
    mounted() {

        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 6,
            spaceBetween:20,
            // pagination: {el: '.swiper-pagination',clickable: true,},/* */
            /*左右按钮 */
            navigation:{
                prevEl:".swiper-button-prev",/*上一张 */
                nextEl:".swiper-button-next",/*上一张 */
            },
            /*前进后退按钮 */
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        })

        
    },
}
</script>
<
<style scoped>
    .secondbanner{    
        width: 1200px;
        margin: 0 auto;
        padding: 0 40px;
    }
    .title{
        display:flex;
        justify-content: space-between;
        padding-top:20px;
        height:80px;
        line-height: 80px;
    }
    .topTitle{
        padding-top: 20px;
        height: 80px;
        line-height: 80px;
    }

    .leftTitle>h3{
        color:#fff;
        font-size:18px;
        font-weight:0
    }
    .leftTitle i{
        margin-right:5px
    }
    .rightTitle>ul{display:flex;justify-content:space-around;color:#65656D;font-size:14px;   } 
    .rightTitle>ul>li{
         margin-right:30px;
         cursor: pointer;
    }
    .D_hr{
        width:100%;
        height:2px;
        background:#292931;
    }
    /*导航部分*/
    .catena_nav{margin-top:40px;}
    .catena_nav .nav{
        display:flex;
        justify-content:space-around;
        width:100%
    }
    .catena_nav .nav>li{
        width:120px;
        height:35px;
        color:#fff;
        background:#1E1D23;
        border-radius:50px;
        line-height: 34px;
        cursor:pointer;
    }

    .leftTitle>h3{
        color: #fff;
        font-size: 18px;
    }

    .rightTitle>ul>li{
         margin-right:30px;
         cursor: pointer;
    }
    .rightTitle span{font-size:15px}
    .rightTitle i{font-size:20px;margin-right:5px}


/*轮播*/
    .swiper-container {
      width: 100%;
      height: 100%;
      padding-top:40px;
    }
    .swiper-slide {
      text-align: center;
      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
    }



    /* 单个item的组件 */
    .swiper-slide{
        width:180px !important;
        display: block !important;
        margin-right: 20px !important;
        cursor:pointer;
    }
    /* 轮播图片 */
    .swiper-slide img{
        width:100%;
        width:100%;border-radius:3 px;transition: all 0.8s
    }
    .swiper-slide img:hover{transform:scale(1.1)}
    .swiper-slide h4{color:#fff;margin:15px 0 10px;text-align: left;font-family:"宋体"}
    .swiper-slide h4:hover{color:#FFFF58}
    .swiper-slide div{display:flex;justify-content: space-between;margin:10px 0 20px;font-size: 12px;}
    .swiper-slide ul{display:flex;justify-content:space-between}
    .swiper-slide ul>li{margin: 0 3px 0;}
    .swiper-slide p{font-size:14px;line-height:29px}
    .swiper-container {
        width:1200px;
        /* height:329px;  */
    }  
   
</style>
