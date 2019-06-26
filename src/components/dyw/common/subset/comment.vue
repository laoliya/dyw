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
            <div>说两句吧~</div>
            <div>
                <div>
                   <textarea name="" id="" cols="3" rows="10" class="inputtext" placeholder="说两句吧~"></textarea> 
                   
                </div>
                <div class="imgandcomments">
                    <div>
                        <i class="iconfont icontupian"></i>
                        <p>图片</p>
                    </div>
                    <a href="javascript:;">发表评论</a>
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
            <li>
                <img class="comments-left" src="http://127.0.0.1:3000/img/白蛇缘起.jpg" alt="">
                <div class="comments-right">
                    <p>
                        <a href="javascript:;">AA嘉鸿</a>
                        <span><i class="iconfont iconvip"></i></span>
                        <span>43分钟前</span>
                    </p>
                    <div>看电影之前先看评论的这里集合</div>
                    <div>
                        <span><i class="iconfont iconzan"></i>赞2</span>
                        <span><i class="iconfont iconhuifu"></i>回复</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{}
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
        display: none;
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
        padding: 0 0 32px 0;
        border-top:1px solid #f0f0f0;
        border-bottom:1px solid #f0f0f0;
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
    }
</style>

