<template>
<div class="backgroundImg">
    
    <div class="content">
        <h2>登录表单</h2>
        <div class="container">
            <div class="leftContainer">
                <h2>登录</h2>
                <input type="text" placeholder="用户名" v-model="loginuname"  autofocus>
                <input type="text" placeholder="密码" v-model="loginupwd">
                <a href="javascript:;" @click="login">登录</a>
                <p>其他方式登录</p>
                <div>
                    <img src="" alt=""><span>QQ</span>
                    <img src="" alt=""><span>微信</span>
                    <img src="" alt=""><span>微博</span>
                </div>
            </div>
            <div class="rightContainer">
                <h2>注册</h2>
                <input type="text" :placeholder="accountPlaceholder" v-model="reguname" @focus="focushint" @blur="validation">
                <input type="password" placeholder="密码" v-model="regupwd"  @focus="focushint">
                <input type="text" placeholder="邮箱" v-model="regmail">
                <input type="text" placeholder="手机号" v-model="regphone">
                <a href="javascript:;" @click="reg">注册</a>
            </div>
        </div>
        <p style="margin-top:100px;color:#CCC;">Copyright © 济南F4</p>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            accountPlaceholder:'用户名',
            reguname:'',
            isuname:false,
            regupwd:'',
            regmail:'',
            regphone:'',
            //登录数据
            loginuname:'',
            loginupwd:''
        }
    },
    methods:{
        //用户名验证
        validation(){
                var nreg=/^[a-zA-Z0-9]{3,10}$/
                var preg=/^[a-zA-z0-9]{3,8}$/
                if(!nreg.test(this.reguname)){
                    this.$alert("用户名格式不正确，请检查输入");
                    return;
                }else{
                var url="user/userreg";
                 var data={reguname:this.reguname}
                this.axios.post(url,this.qs.stringify(data)).then(result=>{
                    if(result.data.code==-1){
                          this.$alert("已存在的用户名");
                          this.isuname=false;
                         return;
                    }else{
                    this.isuname=true;
                    }
                })
            }
        },
        //注册
        reg(){
            if(!this.isuname){
                this.$alert("请重新输入用户名");
                return;
            }
            if(!this.reguname){
                this.$alert("用户名不可为空");
                return;
            }
            else if(!this.regupwd){
                this.$alert("密码不可为空");
                return;
            }else if(!this.regmail){
                this.$alert("邮箱不可为空");
                return;
            }else if(!this.regphone){
                this.$alert("手机号不可为空");
                return;
            }
            var url="user/reg";
            var data={
                reguname:this.reguname,
                regupwd:this.regupwd,
                regmail:this.regmail,
                regphone:this.regphone
                }
            this.axios.post(url,this.qs.stringify(data)).then(result=>{
                this.$alert(result.data.msg);
                location.reload();
            });
        },
        //提示用户输入正确的用户名
        focushint(){
            this.accountPlaceholder="最少3位最大10位的合法字母或者数字";
        },
        //登录
        login(){
            // //登录数据
            // loginuname:'',
            // loginupwd:''
            ///111
            if(!this.loginuname){
                this.$alert("用户名不可为空");
                return;
            }
            else if(!this.loginupwd){
                this.$alert("密码不可为空");
                return;
            }
            var url="user/login";
            var data={loginuname:this.loginuname,loginupwd:this.loginupwd};
            this.axios.post(url,this.qs.stringify(data)).then(result=>{
                // alert(result.data.msg);
                // if()
                // this.$router.push("/header")
                if(result.data.code==1){
                   
                    if(result.data.is==0){
                        this.$router.push("/play")
                    }else {
                        this.$router.push("/")
                    }
                    
                }else{
                    this.$alert("登录失败请重新输入");
                }
            })
        }

    }
}
</script>
<style scoped>
    h2 {
        font-size: 45px;
        font-weight: 500;
    }
    .backgroundImg {
        background-image: url("../../../../assets/background.jpg");
        background-size: 100% 100%;
        height: 100%;
        position: fixed;
        width: 100%;
        z-index: -1; 
    } 
   .content {
        color: white;
        padding-top:5%; 
        text-align: center;
   }
   .content>h2 {
       padding-bottom:5%; 
   }
   .container {
       width: 50%;
       margin: 0 auto;
       display: flex;
       justify-content: space-between;
       padding: 40px;
       background-color: rgba(10, 10, 10, 0.77);
       border: 2px ridge rgba(238, 238, 238, 0.13);
       border-radius: 5px;
       box-shadow: 0 -5px 10px 1px rgba(16, 16, 16, 0.57);
       border-bottom: none;
   }
   .container h2 {
       font-size: 35px;
       color: #ffffff;
       font-weight: 100;
       margin-bottom: 20px;
   }
   .container input {
       width: 93.4%;
       margin-bottom: 20px;
       padding: 10px;
       margin-bottom: 20px;
       font-size: 15px;
       outline: none; 
       background-color:transparent;
       border:0;
       color: #fff;
       border-bottom: 1px solid rgba(238, 238, 238, 0.41);
   }
   input::placeholder,.rightContainer {
        color:#CCCCCC;
    }
   .leftContainer,.rightContainer {
       width: 50%;
       display: flex;
       flex-direction: column;
       justify-content: space-between;
       align-items: flex-start;
       padding-right: 40px; 

   }
   .container a {
       width: 60%;
       padding: 15px 0;
       font-weight: 100;
       border: 1px solid rgba(238, 238, 238, 0.41);
       transition: 0.5s all;
       color: #CCCCCC;
   }
   .container a:hover {
       border: 1px solid white;
   }
   .rightContainer {
       border-left: 1px solid #DDD;
       padding-left: 40px;
       padding-right: 0;
   }
    
</style>
