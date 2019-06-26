<template>
    <div class="footer">
        <div class="firstDiv"></div>
        
        <div class="secondDiv">
            <i></i>
            <!-- 友情链接 -->
            <ul>
                <li>友情链接：</li>
                <li>
                    <a href="https://www.iqiyi.com/" target="_Blank">爱奇艺</a>
                    <a href="https://v.qq.com/" target="_Blank">腾讯视频</a>
                    <a href="http://qpgyy.com/" target="_Blank">青苹果影视</a>
                    <a href="http://www.yy6080.cn/" target="_Blank">新视觉影视</a>
                    <a href="http://www.zz5x.com/" target="_Blank">看吧影院</a>  
                </li>
            </ul>
            <p>
                免责声明：本站所有视频均来自互联网收集而来，版权归原著所有!如果侵犯了您的权益，请通知我们会及时删除，谢谢合作。
            </p>    
            <p>
                版权投诉邮箱：2663272622#qq.com(请将#修改为@)
            </p>
            <p>
                Copyright©济南开发者联盟
            </p>
        </div>
    </div>
</template>

<script>
export default {
        data() {
            return {
                
            }
        },
}
</script>

<style scoped>
    .footer{background:blueviolet}
    .secondDiv{
        position:fixed;
        width:100%;
        bottom:0;
        z-index:-1;
        background:#ccc;
    }
    .secondDiv>i{
        display:block;
        height:2px;
        width:100%;
        background:#9E9E9E;
    }   
    /* 友情链接部分 */
    .secondDiv>ul{
        display: flex;
        width: 600px;
        margin:0 auto;
        padding: 15px 0;
    }
    .secondDiv>ul>li{}
    .secondDiv>ul>li>a{
        margin: 0 16px;
        color:#000
    }
    .secondDiv>ul>li>a:hover{color:#00be06}
    /* 版权部分 */
    .secondDiv>p{
        padding: 10px 0;;
        color:#000
    }
    .firstDiv{margin-bottom:156px}

@media screen and (max-width:996px) and (min-width:776px){
    .firstDiv{margin-bottom:150px}
    .secondDiv>ul{width: 470px;}
    .secondDiv>ul>li>a{    
        font-size: 14px;
        margin: 0 9px;
        color: #000;
    }
    .secondDiv>p{font-size: 14px;}
    
}

@media screen and (max-width:775px){
    .footer{display:none}
}

</style>
