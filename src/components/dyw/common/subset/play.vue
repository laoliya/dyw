<template>
    <div class="parent" >
        <!-- <v-chart :options="option" :autoresize="true" v-loading="loading"></v-chart> -->
        <!-- 回首页 -->
        <div class="jumpIndex"><a href="">回首页</a></div>
        <div class="movieContent">
            <div class="leftMovie" >
                <!-- <video src="../../../../img/蜘蛛侠：英雄远征[预告片].mp4" controls autoplay  class="video" @click=" PlayToSuspend"  ></video>
                 -->
                 <video-player  class="video-player vjs-custom-skin"
                    ref="videoPlayer"
                    :playsinline="true"
                    :options="playerOptions"
                ></video-player>




            </div>
            <div class="rightContent">
                <div class="upContent">
                    <div class="dynameleft"><i class="iconfont icon-vip" ></i><a href="javascript:;">{{mname}}</a></div>
                    <div class="dynameright"><a href="javascript:;"><i class="iconfont icon-xin"></i></a></div>
                </div>
                <div class="downContent">
                    <div class="downUp">
                        <a href="javascript:;">
                            <i class="iconfont icon-wujiaoxing"></i>
                            <span>畅享活动 优惠续费VIP会员</span>
                            <span class="vipJK" style="font-size:12px">VIP季卡40元</span>
                        </a>
                        <!-- 二维码部分 -->
                        <div style="width:50px;">
                        <img src="../../../../assets/paly.png" alt="">
                        </div>
                    </div>
                    <div class="downDown">
                        <div class="downTitle">更多精彩电影推荐（{{listlength}}）<a @click="movelist" class="replace">更换一批</a></div>
                        <ul>
                            <li class="movieList" v-for='(item,index) of list' :key="index" @click="switchMovie(item.mid)">
                                <div>
                                    <img :src="'http://127.0.0.1:3000/img/'+item.mimg" >
                                    <div>
                                        <span>{{item.mlength}}</span>
                                    </div> 
                                </div>
                                <div class="listFont">
                                    <span>
                                        {{item.mdetail}}
                                    </span>
                                    <span style="text-align:left;" >{{item.aprotagonist}}</span>
                                    <div>
                                        <i class="iconfont icon-bofang"></i>
                                        <span>{{item.time}}</span>
                                    </div>
                                </div>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- 视频下方 -->
        <div class="videoBelow">
            <!-- 下方左侧 -->
            <div class="videoBelowLeft">
                <h1>{{mname}}</h1>
                <span class="sp1">{{mgrade1}}.</span>
                <span class="sp2">{{mgrade2}}</span>
                <span class="sp3">{{aprotagonist}}</span>

                <el-switch
                 v-model="value"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                    </el-switch>

            </div>
            <!-- 下方右侧 -->
            <div class="videoBelowRight">
                <div class="block">
                    <el-carousel indicator-position="none" height="80px !important">
                      <el-carousel-item >
                        <img src="../../../../img/0.jpg" alt="">
                      </el-carousel-item>
                      <el-carousel-item >
                        <img src="../../../../img/1.jpg" alt="">
                      </el-carousel-item>
                      <el-carousel-item >
                        <img src="../../../../img/2.jpg" alt="">
                      </el-carousel-item>
                      <el-carousel-item >
                        <img src="../../../../img/3.jpg" alt="">
                      </el-carousel-item>
                    </el-carousel>
                  </div>
            </div>
        </div>
         
    </div>
</template>
<script>
export default {
    data(){
        return{
             // 视频播放
            playerOptions : {
            playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
            autoplay: false, //如果true,浏览器准备好时开始回放。
            muted: false, // 默认情况下将会消除任何音频。
            loop: false, // 导致视频一结束就重新开始。
            preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
            language: 'zh-CN',
             aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
            fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
            sources: [{
            src: 'http://127.0.0.1:3000/video/1.mp4',  // 路径
            type: 'video/mp4'  // 类型
            }, {
            src: '//path/to/video.webm',
            type: 'video/webm'
            }],
            // poster: "../../static/images/test.jpg", //你的封面地址
            poster: "http://127.0.0.1:3000/img/1.mp4", //你的封面地址
            // width: document.documentElement.clientWidth,
            notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
            controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true  //全屏按钮
            }},




            list:[],
            listlength:0,
            mname:'',
            mgrade1:'',
            mgrade2:'',
            mdetail:'',
            aprotagonist:'',
             value: true,
        }
    },
    created(){
        this.load();
        //刷新时调用localstorage回话
        this.mname=localStorage.getItem('mname');
        this.mgrade1=localStorage.getItem('mgrade1');
        this.mgrade2=localStorage.getItem('mgrade2');
        this.mdetail=localStorage.getItem('mdetail');       
        this.aprotagonist=localStorage.getItem('aprotagonist');  
            //空格键加载暂停数据的执行
            document.onkeyup = (e)=>{
                var key = window.event.keyCode;
                if(key == 32){
                    this.PlayToSuspend();
                }
            }
            // console.log(this.$route.query.movie.mid)
        this.selectMid(localStorage.getItem('mid'));
    },
    methods:{
        //右侧列表点击切换电影
        switchMovie(mid){
            this.selectMid(mid);
        },
        //播放暂停切换
        PlayToSuspend(){
            //获取video
            var video=document.querySelector('.leftMovie>video');
            //根据是否正在播放播放与暂停
            if(video.paused){
                video.play();
            }else{
                video.pause();
            }
        },
        //首先要判断是否登录
        load(){
            var url="user/myload"
            // var obj={ids:-1}
            this.axios.get(url,{
                params:{is:0}
            }).then(result=>{
                this.code=result.data.code;
                //登录状态
                if(this.code==1){
                    // this.name= result.data.data[0].mname;
                    // this.name="欢迎你"+this.name;
                    this.movelist();
                }else{
                    this.$alert("请先登录");
                    
                    this.$router.push("/regandlogin")
                    this.show=true;
                }
            })
        },
        //电影列表
        movelist(){
            var url="list/movelist"
            // var obj={ids:-1}
            this.axios.get(url).then(result=>{
               this.list= result.data;
               this.listlength= this.list.length;
               //模拟播放数据的产生
                for(var i=0;i<this.list.length;i++){
                    var j='';
                    if(i%2==0){
                        j=((Math.random()*10+89.9999)).toFixed(1);
                        j+='万';
                        this.list[i].time=j;
                    }else{
                        j=((Math.random()*10+59.99999)).toFixed(1);
                        j+='万';
                        this.list[i].time=j;
                    }
                }
            })
        },
        //通过传递的参数插叙mid所在的电影。
        selectMid(mid){
            var list;
          var  url="list/midSelect";
           // var obj={ids:-1}
            this.axios.get(url,{
                params:{mid:mid}
            }).then(result=>{
                var data=result.data[0];
                this.mname=data.mname;
                localStorage.setItem('mname',data.mname);   //如果页面刷新无法保存数据使用localstroge
                //分割评分strat
               
                var str=data.mgrade+'';
              
                var arr=str.split('.');
               
                if(arr.length>1){
                    this.mgrade1=arr[0];
                    this.mgrade2=arr[1];
                    localStorage.setItem('mgrade1',arr[0]);
                    localStorage.setItem('mgrade2',arr[1]);
                }else{
                    this.mgrade1=arr[0];
                    this.mgrade2=0;
                    localStorage.setItem('mgrade1',arr[0]);
                    localStorage.setItem('mgrade2',0);
                }
                  
                  //分割评分end
                this.mdetail=data.mdetail;
                 localStorage.setItem('mdetail',data.mdetail); 
                this.aprotagonist=data.aprotagonist
                 localStorage.setItem('aprotagonist',data.aprotagonist); 
            })
        }
    },

}
</script>
<style scoped>
    .parent {
        width: 100%;
        height: 1080px;
        background-color: #2E2E36;
        color: #ccc;
        padding-top: 50px;
    }
    .jumpIndex {
        position: absolute;
        top: 5px;
        left: 50%;
        width: 200px;
        height: 40px;
        background-color: red;
        line-height: 40px;
        border-radius: 5px;
        cursor: pointer;
        
    }
    .jumpIndex:hover {
        background-color: #eb3643;
    }
    .jumpIndex>a {
        width: 100%;
        color: white;
    }
    /* 左侧电影播放 */
    .movieContent {
        width: 1200px;
        height: 830px;
        display: flex;
        margin: 0 auto;
    }
    .leftMovie {
        width: 800px;
        background-color: #000000;
        display: flex;
    }
    .rightContent {
        width: 400px;
        background-color: #26262B;
    }
    /* 视频 */
    .video {
        width: 100%;
    }
    /* 右侧列表 */
    /* 列表上内容 */
    .upContent {
        width: 100%;
        height: 7%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 25px;
        font-weight: 500;
        color: white !important;
    }
    .dynameleft {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
     .dynameleft>i {
        font-size: 40px;
        color: red;
        margin-top: 1px;
    }
    .dynameleft>a {
        color: #fff;
        margin-left: 1px;
    }
    .dynameleft>a:hover {
        color: #ff6428;
    }
    .dynameright>a {
        display: block;
        width: 46px;
        height: 32px;
        border: 1px solid #36363e;
        border-radius: 16px;
    }
    .dynameright>a:hover {
        background-color: #ff6428;
    }
    .dynameright>a>i {
        color: #ff920b;
        line-height: 32px;
    }
    .dynameright>a:hover i {
        color: white;
    }
    /* 右侧下方内容 */
    .downContent {
        height: 93%;
        overflow: auto;
        /* overflow: scroll; */
    }
    .downUp {
        height: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .downUp a {
        color: #fff;
        background-color: #eb3643;
        border-radius:20px;
        width: 62%;
        height: 40px;
        line-height: 40px;
        margin-right: 23px;
        position: relative;
    }
    .downUp>a:hover {
        background-color: #BC2B36;
    }
    .downUp img {
        width: 100%;

    }
    .downUp>a>i{
        margin-right: 8px;
        font-size: 22px;
    }
    .downUp>a>span {
        font-size: 14px;
    }
    .vipJK {
        font-size: 12px;
        background-color: #F4D189;
        width: 110px;
        height: 18px;
        color: black;
        position: absolute;
        top: -10px;
        right: 10px;
        line-height: 20px;
        border-radius: 38px 19px 0px 0px;
    }
    /* 二维码下方 */
    .downTitle {
        font-size: 16px;
        margin-top: 15px;
    }
    /* 电影列表 */
    .movieList {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 10px 25px;
        cursor:pointer;
    }
    .movieList>div:first-child{
        width: 50%;
        height: 80px;
        overflow: hidden;
        position: relative;
        border-radius: 2px;
    }
    .replace {
        color: white;
        padding: 5px;
        border: 1px solid #eb3643;
        border-radius: 19px;
        cursor: pointer;
    }
    .replace:hover {
        background-color:  #FF6428
    }
    .movieList>div:first-child>div{
        /* width: 30%; */
        height: 24%;
        top: 60%;
        left: 4%;
        background-color: rgba(17,17,17,.8);
        font-size: 12px;
        line-height: 23px;
        padding: 3px 8px;
        color: #fff;
        position: absolute;
        
    }
    .movieList>div:last-child{
        width: 50%;
    }
    .movieList>div:first-child>img {
        position: absolute;
        max-width: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto; 
    }
    .listFont {
        height: 80px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        margin-left: 5px;
    }
    .listFont>span{
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 14px;
    }
    .movieList:hover .listFont>span {
         color: #ff6428;
    }
    .listFont>div {
        font-size: 12px;
    }
    .listFont>div>i {
        font-size: 12px;
    }
    /* 视频下方内容 */
    .videoBelow {
        width: 1200px;
        margin: 0 auto;
        display: flex;
    }
    .videoBelowLeft {
        width: 800px;
        padding:25px 0;
        display: flex;
        justify-content: flex-start;
    }
    .videoBelowLeft h1 {
        font-size: 26px;
    }
    .sp1 {
            font-size: 32px;
            margin-left: 30px;
            color: #ff6428;
    }
    .sp2 {
        color: #ff6428;
        font-size: 26px;
        padding-top: 4px;
         /* text-align: end; */
    }
    .sp3 {
        width: 60%;
        font-size: 20px;
        margin-left: 30px;
        line-height: 38px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .videoBelowRight {
        width: 400px;
        padding-top: 10px;

    }
    .block img {
        width: 100%;
    }
    .leftMovie {
        line-height: 830px;
    }
    .video-player{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .vjs-control-bar {
        position: absolute;
        top: 0px;
    }
    /*定义播放按钮的形状和位置 .video-js .vjs-big-play-button{} */
</style>
