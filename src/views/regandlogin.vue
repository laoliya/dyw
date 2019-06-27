<template>
<div class="backgroundImg">
    <!-- <el-button
    plain
    @click="open4">
    错误
  </el-button> -->
    <div class="content">
        <h2 style="color:#00c806"></h2>
        <div class="container">
            <div class="leftContainer">
                <h2>登录</h2>
                <!-- <el-input
                    placeholder="请输入内容"
                    v-model="loginuname" clearable>                      
                </el-input> -->
                <input type="text" placeholder="用户名" v-model="loginuname"  autofocus>
                <input type="password" placeholder="密码" v-model="loginupwd">
                <!-- <el-input placeholder="请输入密码" v-model="loginupwd" show-password></el-input> -->
                <a href="javascript:;" @click="login">登录</a>
                <!-- <p>其他方式登录</p>
                <div>
                    <img src="" alt=""><span>QQ</span>
                    <img src="" alt=""><span>微信</span>
                    <img src="" alt=""><span>微博</span>
                </div> -->
            </div>
            <div class="rightContainer">
                <h2>注册</h2>
                <input type="text" :placeholder="accountPlaceholder" v-model="reguname" @focus="focushint" @blur="validation">
                <input type="password" :placeholder="pwdPlaceholder" v-model="regupwd"  @focus="focushintpwd" @blur="validationpwd">
                <input type="text" placeholder="邮箱" @blur="validationemail" v-model="regmail">
                <input type="text" placeholder="手机号" v-model="regphone" @blur="validationephone">
                <a href="javascript:;" @click="reg">注册</a>
            </div>
        </div>
        <p style="margin-top:100px;color:#CCC;">Copyright © 济南</p>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            accountPlaceholder:'用户名',
            pwdPlaceholder:'密码',
            reguname:'',
            regupwd:'',
            regmail:'',
            regphone:'',
            //登录数据
            loginuname:'',
            loginupwd:'',
            isuname:false,
            ispwd:false,
            ismail:false,
            isphone:false
        }
    },
    methods:{
        
        open4(title,message) {
        this.$notify.error({
          title,
          message,
          offset:100,
          
        //   position:
        });
      } ,
   
        //用户名验证
        validation(){
            
                if(!this.reguname){
                   this.open4('请重新输入用户名','原因:用户名不可为空') 
                   return;
                }else {
                var nreg=/^[a-zA-Z0-9_]{4,16}$/  //用户名正则，4到16位（字母，数字，下划线，减号）
                
                if(!nreg.test(this.reguname)){
                 
                    this.open4('请重新输入用户名','原因:必须是4到16位（字母，数字，下划线）')
                    return;
                }else{
                var url="user/userreg";
                 var data={reguname:this.reguname}
                this.axios.post(url,this.qs.stringify(data)).then(result=>{
                    if(result.data.code==-1){
                        //   this.$alert("已存在的用户名");
                        this.open4('请重新输入用户名','原因:用户名已存在')
                          this.isuname=false;
                     
                         return;
                    }else{
                    this.isuname=true;
                    }
                })
            }
                }
        },
        //验证密码正则
        validationpwd(){
            var preg=/^[a-zA-Z]\w{5,11}$/ //以字母开头，长度在6-12之间，只能包含字符、数字和下划线。 
            if(!preg.test(this.regupwd)){
                    // this.$alert("密码格式不正确，请检查输入");
                    this.open4('请重新输入密码','原因:必须以字母开头，长度在6-12位之间')
                    return;
                }else{
                    this.ispwd=true;
                }
        },
        //验证邮箱
        validationemail(){
            var pemail=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/ 
            if(!pemail.test(this.regmail)){
                    this.open4('请重新输入邮箱','邮箱格式不正确')
                    return;
                }else{
                    this.ismail=true;
                }
        },
        //验证手机号
        validationephone(){
            var pphone=/^1[3-9][0-9]{9}$/  
            if(!pphone.test(this.regphone)){
                    this.open4('请重新输入手机号','原因:手机号格式不正确')
                    return;
                }else{
                    this.isphone=true;
                }
        },
        //注册
        reg(){
            if(!this.reguname){
                this.open4('请重新输入用户名','原因:用户名不可为空')
                return;
            }
            if(!this.isuname){
                this.open4('请重新输入用户名','原因:用户名格式不正确')
                return;
            }else if (!this.ispwd){
                 this.open4('请重新输入密码','原因:密码为空或格式不正确')
                return;
            }else if(!this.ismail){
                 this.open4('请重新输入邮箱','原因:邮箱为空或格式不正确')
                 return;
            }else if(!this.isphone){
                  this.open4('请重新输入手机号','原因:手机号为空或格式不正确')
                  return;
            }
            // if(!this.reguname){
            //     this.$alert("用户名不可为空");
            //     return;
            // }
            // else if(!this.regupwd){
            //     this.$alert("密码不可为空");
            //     return;
            // }else if(!this.regmail){
            //     this.$alert("邮箱不可为空");
            //     return;
            // }else if(!this.regphone){
            //     this.$alert("手机号不可为空");
            //     return;
            // }
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
            this.accountPlaceholder="4到16位（字母，数字，下划线）";
        },
        //密码提示
        focushintpwd(){
            this.pwdPlaceholder='以字母开头长度在6-12位之间';
        },
        //登录
        login(){
            // //登录数据
            // loginuname:'',
            // loginupwd:''
            ///111
            if(!this.loginuname){
                this.open4('请重新输入用户名','原因:用户名不可为空')
                return;
            }
            else if(!this.loginupwd){
                this.open4('请重新输入密码','原因:密码不可为空')
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
                        this.$router.push("/details")
                        location.reload();//解决登录后获取不到数据
                    }else {
                        this.$router.push("/")
                        location.reload();//解决登录后获取不到数据

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
        font-size:45px;
        font-weight: 500;
    }
    .backgroundImg {
        background-image: url("../assets/background.jpg"); 
        background-size: 100% 100%;
        height: 100%;
        background-color: #ccc;
        /* position: fixed; */
        width: 100%;
         padding-bottom:20%; 
        /* z-index: 1;  */
    }  
   .content {
        color: white;
        padding-top:5%; 
        text-align: center;
   }
   .content>h2 {
       padding-bottom:10%; 
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
       border: 1px solid #00c806;
       background-color: #00c806;
       color: white;
   }
   .rightContainer {
       border-left: 1px solid #DDD;
       padding-left: 40px;
       padding-right: 0;
   }
   @media screen and (min-width: 992px) {
       
   }
    @media screen and (max-width:991px){
        h2 {
            font-size: 30px;
        }
        .container{
            color: red;
            width: 60%;
            flex-direction: column;
            align-items: center;
        }
        .container h2 {
            font-size:  20px;
        }
        .container input {
            font-size:  10px;
        }
        .leftContainer {
            padding-right: 0;
            align-items: center;
        }
        .rightContainer {
            margin-top: 20px;
            border:0; 
            padding-left: 0;
            border-top: 1px solid #00c806;
            align-items: center;

        }
        .rightContainer h2 {
            margin-top: 30px;
        }
    }
</style>
