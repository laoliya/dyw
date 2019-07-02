<template>
    <!-- 用户评价界面 -->
    <div class="comment">
        <div class="header">
            <div>
                <h2>影评</h2>
                <p>(120)</p>
            </div>
            <a href="javascript:;">影评广场</a>
        </div>
        <!-- 头像和输入框 -->
        <div class="headeandin">
            <div><img src="http://127.0.0.1:3000/img/白蛇缘起.jpg" alt=""></div>
            <div v-show="isshow" @click="isshowdiv">说两句吧~</div>
            <div v-show="isshow1">
                <div>
                   <textarea id="inputId" autofocus class="inputtext" v-model="comment"   placeholder="说两句吧~"></textarea> 
                </div>
                <div class="imgandcomments">
                    <div class="uploaddiv">
                        <!-- <i class="iconfont icontupian"></i>
                        <p>图片</p> -->
                        <upload ref="mychild" class="upload"></upload>
                    </div>
                    <a href="javascript:;" @click="publis()">发表评论</a>
                </div>
            </div>
        </div>
        <!-- 深度解读 -->
        <div class="clear">
            <div class="Interpretation">
                <p>深度解读</p>
                <a href="javascript:;">写深度解读</a>
            </div>
            <p class="sharep">如果你对剧情/台词/人物角色或任何角度有你的深度思考和观点，可以与大家<a href="javascript:;">分享你的解读。</a></p>
        </div>
        <div class="comment-title">
            <p>全部短语</p>
            <p>
                <span >最新</span>
                 &nbsp;/&nbsp; 
                <span >最热</span>
            </p>
        </div>
        <!-- 评论内容区域 -->
        <ul class="comments">
            <li v-for="(item,index) of list" :key="index">
                <img class="comments-left" src="http://127.0.0.1:3000/img/白蛇缘起.jpg" alt="">
                <div class="comments-right">
                    <p>
                        <a href="javascript:;">AA嘉鸿</a>
                        <span><i class="iconfont iconvip"></i></span>
                        <span>43分钟前</span>
                    </p>
                    <div>看电影之前先看评论的这里集合</div>
                    <img style="height: 90px;margin-top: 20px;" src="http://127.0.0.1:3000/img/白蛇缘起.jpg" alt="">
                    <div>
                        <span><i class="iconfont iconzan"></i>赞2</span>
                        <span><i class="iconfont iconhuifu"></i>回复</span>
                    </div>
                </div>
                <div class="jubao"><i class="iconfont iconjinggao"></i><span>举报</span></div>
            </li>
        </ul>
        <!-- //查看更多评论 -->
        <div class="seemore">查看更多评论</div>
    </div>
</template>
<script>
import upload from "./upload.vue"

export default {
    data(){
        return{
            list:[], //测试评论
            isshow:true, //判断是否显示隐藏评论框
            isshow1:false,
            comment:''  //评论内容
        }
    },
    components:{upload},
    created(){
        mylist();
    },
    methods:{
        isshowdiv(){
           this.isshow=false; //判断是否显示隐藏评论框
           this.isshow1=true;
        },
        publis(){
           var url="up/comment"
             var comment=this.comment;
             var uid=localStorage.getItem('uid');
            this.axios.get(url,{
                params:{comment,uid}
            }).then(result=>{
                // this.code=result.data.code;
                // //登录状态
                // if(this.code==1){
                //     // this.name= result.data.data[0].mname;
                //     // this.name="欢迎你"+this.name;
                //     this.movelist();
                // }else{
                //     this.$alert("请先登录");
                    
                //     this.$router.push("/regandlogin")
                //     this.show=true;
                // }
            })
            // console.log();
            this.$refs.mychild.parentHandleclick();

        },
        mylist(){
            var url="up/list"
            this.axios.get(url).then(result=>{
                console.log(result);
            });
        }
    }
    
}
</script>

<style scoped>
    /* 清除浮动 */
    .clear:after{
 		display:block;
        content:"";
        clear:both;
    }
    
    /* 头部 */
    .comment {
        width: 1200px;
        margin: 0 auto;
    }
    .header {
        display: flex;
        justify-content: space-between;
        padding: 22px 0px;
    }
    .header>div {
        display: flex;
        align-items: center;
    }
    .header>a {
        font-size: 14px;
        color: #ff7900;
        line-height: 35px;
    }
    .header>div>h2 {
        font-size: 26px;
        color: #2a2a2a;
    }    
    .header>div>p {
        color: #adadad;
        margin-left: 20px;
    }
    /* 头像和评论框 */
    .headeandin{
        display: flex;
        align-items: flex-start; 
    }
    .headeandin>div:first-child {
        width: 10%;
    }
    .headeandin>div:first-child>img {
        width: 50px;
        height: 50px;
        display: flex;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }
    .headeandin>div:nth-child(2) {
        width: 90%;
        height: 46px;
        color: #999;
        font-size: 14px;
        line-height: 50px;
        padding-left: 14px;
        cursor: pointer;
        border: 2px solid #f0f0f0;
        text-align: left;
        
        /* display: none; */
    }
    .headeandin>div:last-child {
        width: 90%;
    }
    .headeandin>div:last-child>div {
       width: 100%;
       height: 104px;
       border: 2px solid #f0f0f0;
        padding: 15px;
        box-sizing: border-box;
    }
    .headeandin>div:last-child>div:last-child {
       border-top: 0;
       height: 56px;
       border:0 2px 2px 2px solid #f0f0f0;
       
    }
   .inputtext {
       width: 100%;
       height: 100%;
       outline:none;
       border:none;
   }
   .imgandcomments {
       display: flex;
       justify-content: space-between;
       align-items: center;
       position: relative;
   }
   .imgandcomments>div {
       display: flex;
       align-items: center;
       cursor: pointer;
        font-size: 12px;
        color: #aaa;
   }
   .imgandcomments>a{
       width: 100px;
       height: 34px;
       background-color: #ff7900;
       font-size: 14px;
       border-radius: 17px;
       color: white;
       line-height: 34px;
   }
   
   .imgandcomments>a:hover {
       background: #FF6428;
   }
    .Interpretation {
        display: flex;
        justify-content: space-between;
        margin-top: 48px;
        border-bottom: 1px solid #f0f0f0;
    }
    .Interpretation>p {
        font-size: 20px;
        color: #2a2a2a;
    }
    .Interpretation>a{
        color: #ff6428;
        font-size: 14px;
    }
    .sharep {
        font-size: 14px;
        color: #999;
        margin-top: 24px;
        float: left;
    }
    .sharep>a {
        color: #ff7900;
    } 
    .comment-title {
        margin-top: 48px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 20px;
        color: #2a2a2a;
    }
    .comment-title>p:last-child{
        cursor: pointer;
        color: #999;
        font-size: 14px;
    }
    /* 显示评论内容区域 */
    .comments {
        margin-top: 32px;
    }
    .comments>li {
        display: flex;
        align-items: flex-start;
        padding: 32px 0 32px 0;
        border-top:1px solid #f0f0f0;
    }
    .comments-left {
        width: 50px;
        height: 50px;
        display: flex;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }
    .comments-right {
        margin-left: 2%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 12px;
    }
    .comments-right>p{
        width: 100%;
        display: flex;
        align-items: flex-start;

    }
    .comments-right>p>a {
        color: #fd0404;
        font-weight: 600;
    }
    .comments-right>p>span{
        color:red;
    }
    .comments-right>p>span {
        margin-left: 20px;
    }
     .comments-right>p span:last-child{
         color: #999;
     }
    .comments-right>div:first-child {
        margin-top: 2px;
        font-size: 14px;
        color: #4b4b4b;
        line-height: 24px
    }    
    .comments-right>div:last-child {
        margin-top: 18px;
        font-size: 12px;
    }
    .comments-right>div:last-child>span{
        margin-right: 50px;
        cursor: pointer;
    }
    .comments-right>div:last-child>span:hover{
        color: #ff7900;
    }
    .comments-right>div:last-child>span>i {
         font-size: 12px;
    }
    .comments>li{
        position: relative;
    }
    .jubao{
        display: none;
        position: absolute;
        right: 20%;
        top: 20%;
        line-height: 14px;
        color: #adadad;
        font-size: 14px;
        padding-left: 18px;
        z-index: 1;
        cursor: pointer;
    }
    .jubao>i {
        font-size: 14px;
    }
    .comments>li:hover .jubao {
        display: block;
            /*  */
    }
    .jubao:hover{
        color: #ff7900;
    }
    .seemore {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: #f0f0f0;
        color: #adadad;
        font-size: 14px;
        cursor: pointer;
    }
    /* 上传图片组件的样式 */
    .upload {
        position: absolute;
         top: 10%;
    }
    .seemore:hover {
        background-color:#E6E5E5
    }
    /* 写媒体查询完成响应式 */
    @media screen and (max-width: 1199px) {
        .comment {
            width: 90%;
        }
        
    }
</style>

