<template>
    <!-- 首页导航 -->
    <div >
        <div class="navbar">
            <div class="content">
                <!-- 左侧图片sss-->
                <div class="leftContent">
                    <img src="http://www.iqiyipic.com/common/fix/site-v4/sprite-headLogo-index.png" alt="">
                </div>
                <!-- 搜索框 -->
                <div class="search">
                    <div class="search-input">
                        <input type="text" placeholder="西游记">
                    </div>
                    <div class="search-ReSou">
                        <span>热搜榜</span>
                    </div>
                    <div class="search-btn">
                        <i class="iconfont icon-sousuo"></i>
                        <div>搜一下</div>
                    </div>
                </div>
                <!-- 右侧图片 -->
                <ul class="rightContent">
                    <li class="dot">VIP<div class="hover"></div></li>
                    <li class="dot">历史<div class="hover"></div></li>
                    <li class="dot">收藏<div class="hover"></div></li>
                    <li class="mylogin">我的 <i class="iconfont iconxia"></i> 
                    <!-- 下拉选二选一进行显示 -->
                        <div class="dropDown" v-if="code==-1"> 
                            <a  @click="login">请先登录</a>
                        </div>
                        <div  class="dropDown" v-else-if="code==1">
                            <a>{{name}}</a>
                            <a>我的收藏</a>
                            <a>我的余额</a>
                            <a @click="outlogin">退出登录</a>
                        </div>
                    </li>
               
                </ul>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data(){
        return{
            //判断用户是否登录
            code:0,
            name:'',
            coll:'',

        }
    },
    created(){
        this.load();
    },
    methods:{
        login(){
            this.$router.push("/regandlogin")
        },
        // 加载个人信息,判断是否登录
        load(){
            var url="user/myload"
            this.axios.get(url,{
            }).then(result=>{
                this.code=result.data.code;
                if(this.code==1){
                    this.name= result.data.data[0].mname;
                    this.name="欢迎你"+this.name;
                }
            })

            
        },
        outlogin(){
            var url="user/outlogin"
            this.axios.get(url,{
                
            }).then(result=>{
                
            })
            location.reload();
        },
        // 绑定鼠标滚轮事件
        handleScroll () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            var navbar=document.querySelector(".navbar")
                if(scrollTop>200){               
                    navbar.classList.add("bg")
                    console.log("添加样式")
                }else{
                    navbar.classList.remove("bg")
                }
        }
    },
    mounted() {
        // 绑定window监听滚轮事件
        window.addEventListener('scroll', this.handleScroll)
    },


}
</script>
<style scoped>

/*搜索部分*/
    .search{
        display: flex;
        height: 41px;
        font-size: 16px;
    }
    /* 输入框 */
    .search-input{width:372px;}
    .search:hover input{
        background:#444444;
        color:#ccc
    }
    .search:hover .search-ReSou{
        background:#444444;  
    }
    .search-ReSou:hover{
        color:#00BE06
    }
    .search-input>input{
        width: 100%;
        height:100%;
        border: 0;
        outline: 0;
        box-sizing:border-box;
        padding: 11px 0;
        border-radius: 21px 0 0 21px;
        background-color:#333;
        padding: 10px 5px 10px 26px;
        color: #999;
        font-family: Microsoft Yahei;
    }
    /* 热搜榜 */
    .search-ReSou{
        background-color:#333;
        cursor: pointer;
        font-size: 14px;
    }
    .search-ReSou>span{
        line-height: 41px;
        box-sizing:border-box;
        padding: 10px;
    }
    /* 搜索按钮 */
    .search-btn{
        width: 96px;
        background:#00be06 !important;
        display: flex;
        color:#fff;
        border-radius:0 21px 21px 0;
        text-indent: 5px;
    }
    .search-btn>div{
        color: #fff;
        line-height: 39px;
        font-size: 16px;
        cursor: pointer;
        margin-left: -6px;
    }
    .search-btn>i{
        font-size: 24px;
        line-height: 44px;
        color: #fff;
        text-indent: 10px;
        cursor: pointer;
    }
   













    .bg{background:#232325 !important}
    .navbar {
        position:fixed;
        top: 0;
        width: 100%;
        height: 70px;
        align-content: center;
        z-index: 1000;
        background:rgba(255,255,255,.14);
        box-shadow: 0 0 0 0 #000;
    }
    .content {
        width:100%;
        height: 100%;
        margin: 0 auto;
        font-family: "微软雅黑";
        color: #969698;
        font-size: 20px;
        align-items: center;
        display: flex;
        justify-content: space-between
    }
    .leftContent{margin-left: 100px;}
    .leftContent img{width:110px}
    .rightContent {
        float: left;
        height: 35px;
        margin-top: 10px;
        margin-right: 20px;
    }
    .rightContent::before{
        content:"";
        display:block;
        clear: both;
    }
    .rightContent li {
        cursor:pointer;
        float:left;
        margin-right:30px
    }

    /* 搜索按钮区域 */
    /* .search-btn{} */




    .hover {
        height:10px;
        width:10px;
        background-color: #D91923;
        border-radius: 50%;
        margin-top: 5px;
        display: none;    
    }
    .dot:hover{
        color: white;
    }
    .dot:hover .hover{
        display: inline-block;
    }
    .rightContent .dot {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    /* 登录下拉菜单 */
    .dropDown {
        background-color: #0D0D0F;
        width:150px;
        position: absolute;
        right: -67%;
        top: 60%;
        margin-top: 10px;
        display: none;

    }
    .mylogin {
        position: relative;
        display: flex;
    }
    /* 登陆下拉选 */
    .mylogin:hover{
        color: white;
    }
    .mylogin:hover .dropDown{
        display: block;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 5px;
    }
    .dropDown a {
        width: 100%;
        padding-top:10px; 
    }
    .dropDown :last-child{
        padding-bottom:10px;
    }
    .dropDown a:hover{
        color: white;
    }



</style>