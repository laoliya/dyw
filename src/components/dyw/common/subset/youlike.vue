<template>
    <!-- 猜你喜欢 -->
    <div class="container">
        <!-- 内容区域 -->
        <div class="content">
            <!-- 猜你喜欢 -->
            <div class="cailike">
                <h3>猜你喜欢</h3>
                <div>
                    <a href="javascript:;">换一换</a>
                </div>
            </div>
            <ul class="cartul">
               <li style="width:220px;"  v-for="(item,index) of this.newListArr" :key="index">
                   <div class="cartcontainer">
                       <div class="leftpoto">
                           <img  width="100%" :src="'http://127.0.0.1:3000/img/'+item.mimg" alt="">
                           <div >
                               <span><i class="iconfont iconvip" ></i></span>
                               <span>{{item.mlength}}</span>
                               <span>{{item.mgrade}}</span>
                           </div>
                           <!-- hover时显示的卡片 start-->
                           <div class="flaotcat">
                               <div>
                                   <img  :src="'http://127.0.0.1:3000/img/'+item.mimg" alt="">
                               </div>
                               <div>
                                   <span>{{item.mname}}</span>
                                   <span class="span2">{{item.aprotagonist}}</span>
                                   <!-- <span>简介</span> -->
                                   <div>
                                       <a href="javascript:;">立即观看</a>
                                       <div>
                                           <i title="收藏" class="iconfont iconicon-test"></i>
                                           <i title="下载" class="iconfont iconxiazai"></i>
                                       </div>
                                   </div>
                               </div>
                           </div>
                           <!-- hover时显示的卡片 end-->
                       </div>
                       <div class="bottomfont">
                           <span>{{item.mname}}</span>
                           <span>{{item.mdetail}}</span>
                       </div>
                   </div>
               </li>
               
            </ul>
        </div>
    </div>
    
</template>
<script>
export default {
    data(){
        return {
            newListArr:[1,2] 
        }
    },
    props:["movieList"],
    watch:{
        movieList(){
            this.newListArr.splice(0,this.newListArr.length)
            for (let i=0;i<6;i++) {
                  this.newListArr.push(this.movieList[i]); 
                console.log("在此处打印")
                console.log(this.newListArr)
            }
        }
        
    },
}
</script>
<style scoped>
    .container {
        width: 100%;
        height: 100%;
        background-color: #FFFFFF;
    }
    /* 内容区域 */
    .content {
        width: 800px;
    }
    /* 猜你喜欢 */
    .cailike {
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
        margin-bottom: 20px;
    }
    .cailike>h3 {
        color: #111;
        font-size: 20px;
        font-weight: 600;
    }
    .cartul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .cartul>li {
        width: 20px;
        margin-right: 20px;
        margin-top: 20px;
    }
    /* 编写卡片 */
    /* 上侧卡片功能 */
    .cartcontainer{
        display: flex;
        flex-direction: column;
    }
    /* 鼠标放上显示flaotcat */
    .cartcontainer:hover .flaotcat{
       opacity:1;
       transform: scale(1)
    } 
    .leftpoto {
        position: relative;
    }
    .leftpoto>div>span:first-child{
        position: absolute;
        color: red;
        top: 0;
        right: 0;
    }
     .leftpoto>div>span:first-child>i{
        font-size: 30px;
    }
    .leftpoto>div>span:nth-child(2){
        position: absolute;
        left: 4%;
        bottom: 2.5%;
        color: #fff;
        font-size: 13px;
    }
    .leftpoto>div>span:last-child{
        position: absolute;
        right: 4%;
        bottom: 2.5%;
        font-size: 25px;
        font-weight: 400;
        color: #ff5c38;
    }
    /* 图片下方 */
    .bottomfont {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 10px;
    }
    .bottomfont>span {
        color: #111;
        font-size: 13px;
    }
    .bottomfont>span:last-child {
        width: 100%;
        margin-top: 10px;
        color: #888;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    /* hover时显示卡片start */
    .flaotcat {
        position: absolute;
        top: -2%;
        left: -5%;
        width: 240px;
        height: 350px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-shadow: 0 28px 50px rgba(25,24,40,.35);
        background-color: #FFFFFF;
        border-bottom-left-radius:8px;
        border-bottom-right-radius:8px;
        opacity:0;
        transition: all 0.8s;
        transform:scale(0.5);
    }
    .flaotcat>div:first-child {
        height: 50%;
        overflow: hidden;
        position: relative;
        border-top-left-radius:8px;
        border-top-right-radius:8px;
    }
     .flaotcat>div:first-child img{
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto; 
    }
     .flaotcat>div:last-child {
         height: 40%;
         display: flex;
         flex-direction: column;
         justify-content: space-between;
         align-items: flex-start;
         padding: 8px;
         margin-top: 10px;
     }
      .flaotcat>div:last-child>span{
          color: #999;
          font-weight: 400;
      }
     .flaotcat>div:last-child>span:first-child {
         color: #111;
         font-weight: 900;
         font-size: 25px;
     }
     .span2 {
         width: 100%;
        overflow: hidden;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
     }
     .flaotcat>div:last-child>div {
         width: 220px;
         display: flex;
         justify-content: space-between;
         line-height: 35px;
     }
     .flaotcat>div:last-child>div>a{
         width: 100px;
         height: 33px;
         line-height: 33px;
         background-color: #FF6319;
         color: white;
         border-radius: 20px;
         font-size: 15px;
     }
    .flaotcat>div:last-child>div>a:hover {
        background-color: #FF183E;
    }
     .flaotcat>div:last-child div>div>i {
         cursor: pointer;
         /* font-size: 20px; */
         font-weight: 1000;
         color: #cccccc;
     }
     .flaotcat>div:last-child div>div>i:hover {
        color: #ff5c38;
     }
     .flaotcat>div:last-child div>div>i:first-child {
         margin-right: 15px;
     }
     /* hover时显示卡片end */

     /* 写媒体查询完成响应式 */
    @media screen and (max-width: 1199px) {
        .content {
            width: 100%;
        }
    }
    /* 写媒体查询完成响应式 */
    @media screen and (max-width: 606px) {
        .cartul>li {
            margin: 0 auto;
    }
    }
</style>
