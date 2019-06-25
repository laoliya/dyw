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
                <div></div>
            </div>
        </div>
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
        align-items: center; 
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
       height: 34px;
       border:0 2px 2px 2px solid #f0f0f0;
       
    }
   .inputtext {
       width: 100%;
       height: 100%;
       outline:none;
       border:none;
     
   }
</style>

