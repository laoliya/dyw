<template>
    <!-- 首页导航 -->
    <div >
        <div class="navbar">
            <div class="content">
                <!-- 左侧图片sss-->
                <div class="leftContent">图片占位</div>
                <!-- 右侧图片 -->
                <ul class="rightContent">
                    <li class="dot">首页<div class="hover"></div></li>
                    <li class="dot">电影<div class="hover"></div></li>
                    <li class="dot">系列<div class="hover"></div></li>
                    <li class="mylogin">我的 <i class="iconfont icon-Group-"></i> 
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
                    <li><i class="iconfont icon-sousuo"> </i> </li>
                    <li><i class="iconfont icon-lingdang"> </i></li>
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
        // play(){
        //     this.$router.push("/play")
        // },
        login(){
            console.log(1);
            this.$router.push("/regandlogin")
        },
        // 加载个人信息,判断是否登录
        load(){
            var url="user/myload"
            // var obj={ids:-1}
            this.axios.get(url,{
                // params:obj
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
                }else{
                    navbar.classList.remove("bg")
                }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll)
    },


}
</script>
<style scoped>
    .bg{background:rgba(0,0,0,0.4)}
    .navbar {
        position:fixed;
        top: 0;
        width: 100%;
        height: 70px;
        align-content: center;
        z-index: 1000;
    }
    .content {
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        font-family: "微软雅黑";
        color: #969698;
        font-size: 20px;
        align-items: center;
        display: flex;
        justify-content: space-between
    }
    /* .leftContent {
        /* display: flex; */
        /* font-size: 25px; */
       
    
    .rightContent {
        float: left;
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
        margin-top: 3px;
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