<template>
    <div class="head">
        <ul>
            <li>
                <img src="http://127.0.0.1:3000/img/15点17到巴黎.jpg" alt="">
            </li>
            <li class="head_detail">
                <h1>15点17到巴黎</h1>
                <p>
                    <span class="head_type">主演：</span>
                    <span>安东尼·乔丹/浩克/班纳</span>
                </p>
                <div>
                    <p><span class="head_type">类型：</span>惊悚</p>    
                    <p><span class="head_type">导演：</span>克林特</p>
                </div>  
                <div>
                    <p><span class="head_type">年份：</span>2018-02-07</p>       
                    <p><span class="head_type">时长：</span>94分钟</p>
                </div> 
                
                <p class="detail">
                    <span class="head_type">简介：</span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, porro laborum blanditiis dicta maiores odio tempora vitae autem quis rerum debitis iure, incidunt magnam necessitatibus ipsa accusantium deleniti neque aperiam vel ad aliquam? Possimus velit veniam doloremque, deserunt a assumenda perferendis magnam voluptates, aperiam ex voluptatum quos dolorum necessitatibus? Esse ea tempore tenetur fugit quis voluptatem, incidunt ab debitis. Quidem fugit deserunt dolorem enim, perferendis sit a est, consectetur ea voluptate harum soluta iusto nemo veniam necessitatibus esse earum aliquam quaerat exercitationem totam? Laborum consequuntur, non explicabo necessitatibus et natus. Corrupti, itaque repudiandae nisi deserunt aliquam id eligendi, blanditiis magni, maxime ut minima eos obcaecati ipsam ducimus assumenda eveniet quibusdam voluptatum provident repellat suscipit iure. Minus aliquam, illum totam cum nobis eligendi in impedit aperiam, quam maxime mollitia ullam ratione molestiae labore quos autem? Vitae dicta recusandae labore odit cumque distinctio unde, ducimus nisi quas debitis cum et nostrum eos aut? Veritatis modi ut repellendus officiis explicabo quisquam dolore, minima quam iusto illum id placeat culpa nam excepturi velit consectetur, temporibus maiores maxime. Dolores temporibus delectus earum ipsam tenetur magni, voluptatem quas, hic et odit ratione maxime, non cumque sunt! Cumque quos delectus quis minima ullam quae vero rem odio?
                </p>
                <button>立即播放</button>
            </li>
            <li>
                <img src="http://127.0.0.1:3000/img/15点17到巴黎.jpg" alt="">
                <img src="http://127.0.0.1:3000/img/15点17到巴黎.jpg" alt="">
                <img src="http://127.0.0.1:3000/img/15点17到巴黎.jpg" alt="">
                <img src="http://127.0.0.1:3000/img/15点17到巴黎.jpg" alt="">
                <img src="http://127.0.0.1:3000/img/15点17到巴黎.jpg" alt="">
                <img src="http://127.0.0.1:3000/img/15点17到巴黎.jpg" alt="">
                <img src="http://127.0.0.1:3000/img/15点17到巴黎.jpg" alt="">
                <img src="http://127.0.0.1:3000/img/15点17到巴黎.jpg" alt="">
                <img src="http://127.0.0.1:3000/img/15点17到巴黎.jpg" alt="">
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            movies:[],
            moviess:[],
            mclass:[],
            pImg:""
        }
    },
    created() {
        // 获取电影详细信息
        this.axios.get("http://127.0.0.1:3000/movie/selmovie")
            .then(result=>{
                // 显示在页面修改使用
                this.movies=result.data
                // 保存数据使用
                this.moviess=result.data
            });
        // 获取电影类型名
        this.axios.get("http://127.0.0.1:3000/movie/mclass")
            .then(result=>{
            this.mclass=result.data
        });
    },  
    watch:{

    }
}
</script>

<style>
    .head{
        background:url("http://127.0.0.1:3000/img/slide-bg.jpg") no-repeat;
        width:100%;
        height:500px;
    }
    .head>ul{
        padding: 5% 15%;
    }
    .head>ul::after{
        content: "";
        display: block;
        clear: both
    }
    .head>ul>li{
        float:left;
    }
    /* 详情部分 */
    .head_detail{
        text-align: left;
        margin-left: 70px;
        width: 45%;
        color: #bbb;
    }
    .head_detail>h1,.head_detail>p,.head_detail>div{
        padding-top:10px
    }
    .head_detail>h1{
        color:#ddd;
        font-size:2rem;
        margin-bottom:10px
    }
    .head_detail>div{
        display:flex;
    }
    .head_detail>div>p{
        width: 165px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .detail{   
         overflow: hidden;
        text-overflow: ellipsis;
        height: 95px;
        line-height: 24px;
    }
    .head_type{color:#888}
    /* 右侧图片 */
    .head>ul>li:last-child{
        float:right;
        width: 300px;
    }
    .head>ul>li:last-child>img{
        width: 26%;
    }
    /* 按钮 */
    button{
        width: 130px;
        height: 35px;
        margin-top: 20px;
        border-radius: 8px;
        background: #5c797b;
        color: #bbbbbb;
        font-size: 16px;
        border: 0;
        cursor: pointer;
        outline: none;
    }
    button:hover{
        background:#00be06;
        color:#fff;
    }
/*超大屏幕*/
@media screen  and (max-width:1550px) and (min-width:1200px){
    .head>ul{
        padding: 5% 3%;
    }
}
/*大屏*/
@media screen  and (max-width:1199px) and (min-width:996px){
    .head{
        height:420px;
    }
    .head>ul{
        padding: 5% 3%;
    }
    .head_detail {
        text-align: left;
        margin-left: 40px;
        width: 40%;
        color: #bbb;
    }
}
/*中屏*/
@media screen  and (max-width:995px) and (min-width:767px){
    .head{
        height:405px;
    }
    .head>ul{
        padding: 5% 8%;
    }
    /* 详情部分 */
    .head_detail{
        margin-left: 70px;
        width: 55%;
    }
    /* 右侧图片 */
    .head>ul>li:last-child{
        display: none
    }
}
@media screen  and (max-width:766px){
    .head{
        height:405px;
    }
    .head>ul{
        padding: 5% 8%;
    }
    /* 左侧图片宽高 */
    .head>ul>li {
        float: left;
        width:50%;
    }
    .head>ul>li>img{
        width: 100%;
    }
    /* 详情部分 */
    .head_detail{
        margin-left: 70px;
        width: 50%;
    }
    .head_detail>h1 {font-size: 1.6rem;}
    /* 右侧图片 */
    .head>ul>li:last-child{
        display: none
    }
}
</style>
