
<template>
<!-- 首页第二个轮播 -->
    <div class="secondbanner">
            <!-- 标题 -->
        <div class="topTitle">
            <div class="title">
                <div class="leftTitle">
                    <h3>
                        最近流行的
                    </h3>
                </div>
                <div class="rightTitle">
                    <ul>
                        <li>
                            系列
                        </li>
                        <li>
                            原创
                        </li>
                        <li>
                            搜索
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
            <!-- Swiper -->
      <!-- Swiper -->
        <div class="swiper-container">
            <div class="swiper-wrapper" v-if="movies">
                <div class="swiper-slide" v-for="(item,index) of myMovies" :key="index">
                    <img :src="'http://127.0.0.1:3000/img/'+item.mimg" alt="">
                </div>

            </div>  
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
            <!-- Add Arrows -->
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
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

            var swiper = new Swiper('.swiper-container', {
                slidesPerView: 6,
                spaceBetween: 20,
                slidesPerGroup: 5,
                loop: true,
                loopedSlides: 47,
                loopFillGroupWithBlank: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
               
                observer: true, // 启动动态检查器(OB/观众/观看者)
                observeParents: true // 修改swiper的父元素时，自动初始化swiper
            });
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
        selectiveType(){}
    },
    mounted(){

  
    },
}
</script>

<style scoped>
/*轮播*/
.swiper-container{
    margin-top:40px;
}
   .swiper-slide{
       width:183px; 
        border-radius:4px;
   }
   .swiper-slide img{width:100%}
    /* 轮播结束 */
    .secondbanner{
        width:1200px;margin:0 auto;
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
    .rightTitle>ul{
        display:flex;justify-content:space-around;color:#65656D;font-size:14px;   } 
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


</style>
