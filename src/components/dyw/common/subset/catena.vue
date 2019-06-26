<template>

    <div class="catena">
        <!--头部 -->
        <!--导航  -->  
        <div class="catena_nav">
            <ul class="nav" @click="selectiveType">
                <li v-for="(item,index) of mclass" :key=index>{{item.cname}}</li>
            </ul>
            <div class="catena_option">
                <div class="left_option">
                    <p>排序：</p>
                    <ul @click="msort">    
                        <li id="clearRed">最新</li>
                        <!-- 年份类型 -->
                        <li class="cyear">
                            年
                            <ul v-if="values" id="cyearList"  @click="getYear">
                                <li  v-for="(item,index) of values" :key=index>{{item}}</li>
                            </ul>
                        </li>

                    </ul>
                </div>
                <div class="right_option">
                    <!-- <i  class="iconfont icon-pingfen-"></i>
                    <div>评分</div>
                    <span>5.0</span> -->
                    <!-- <h2>TOP 10</h2> -->
                </div>
            </div>
        </div>
        <!--电影  -->
        <div class="catena_content"> 

            <ul @click="GotoMDetail">
                <li class="hoverHid" v-for="(movie,index) of this.showMovies" :key=index @click="jumpvideo(movie.mid)">
                    <div>
                        <div>
                            <img :src="'http://127.0.0.1:3000/img/'+movie.mimg" alt="">
                        </div>
                        <!--电影名称-->
                        <div class="movieName"> <!--上映时间-->
                            <h4>{{movie.mname}}</h4> 
                            <div>
                                <p>{{movie.myear}}</p>
                                <ul>
                                    <li>
                                        <p>{{movie.mgrade}}分</p>
                                    </li>
                                    <li class="iconfont iconicon-test"></li>
                                    <!-- iconxinaixin 切换 -->
                                </ul>
                                
                            </div>
                            <!-- 隐藏部分  hover后显示 -->
                        </div>
                    </div>

                </li>
    <!-- ul结束 -->
            </ul>
<!-- 右侧top10-->
            <div class="rightC">
                <ul>
                    <li v-for="(movie,index) of mTop" :key="index">
                        <h3>{{index+1}}</h3>
                        <div>
                            <h4>{{movie.mname}}</h4>
                            <span>{{movie.mdetail}}</span>
                        </div>
                        <p>{{movie.mgrade}}</p>
                    </li>
                </ul>
                <h1>
                    <i class="iconfont iconhuo"></i>
                    TOP 10</h1>
            </div>
        </div>    
          <!--分页部分  -->
        <ul class="sort" @click="sort">   
            <li >首页</li>
            <li>上一页</li>
            <li>下一页</li>
            <li>末页</li>
            <li>    
                第<input type="text" maxlength="2" v-model="page">页
            </li>
            <li>Go</li>
        </ul>
    </div>    
</template>

<script>
export default {
    data(){return{
        page:1, /*页数*/
        showMovies:[],//页面显示的
        movies:[],
        moviess:[],
        mclass:[],//保存 存在的电影类型
        sel:[],// 已选中按钮
        newest:[],//按照时间排序
        version:[],//保存在点击最新排序之前的内容
        values:[],//保存存在的年份
        yearSort:[],//保存为选中按钮的年份的电影
        selectedMovie:[],//保存当前已经通过上类型挑选按钮选中的电影
        mTop:[]//获取当前电影排行前十
    }},
    props:["mcs","ms"],
    // 监听获取父元素传来的变量
    watch: {
        ms(){
            //将父元素传进来的数组 遍历到data中
            this. movies.splice(0,this. movies.length)
            for(var m of this.ms){
                this. movies.push(m)
                this. moviess.push(m)
            }
 
            // TOP10内容
            this.mTop.splice(0,this. mTop.length)
            for(var top of this.ms){
                this.mTop.push(top)
            }
            this.mTop.sort((a,b)=>{return a.mgrade<b.mgrade?1:(a.mgrade>b.mgrade?-1:0)})
            this.mTop=this.mTop.slice(0,10)
            

            // 页面分页显示初始化 this.showMovies
            for(var i=this.page-1;i<8;i++){
                this.showMovies[this.showMovies.length]=this.movies[i]
            }
            // 获取年份数组
            for(var i of this.moviess){
                this.values[this.values.length]=i.myear.slice(0,4)
            }
            //ES6新语法去重 获取所有电影所包含的时间年份
            var x = new Set(this.values.sort());
            this.values=x

        },
        mcs(){
                // 将父元素传进来的数组 遍历到data中
                this.mclass.splice(0,this.mclass.length)
                for(var m of this.mcs){
                this.mclass.push(m)
            }
        }
    },
    mounted() {
        // 控制下拉菜单
        document.onclick=function(e){
        if(e.target.className!="cyear"){
            document.getElementById("cyearList").classList.remove("disblock");
        }}
    },   
    methods: {
        //添加点击列表跳转二级页面lzy
        jumpvideo(mid){
            localStorage.setItem('mid',mid);
            this.$router.push("/details")
        },
        // 点击类型按钮触发事件
        selectiveType(e){
            // var sel=new Array();
            if(e.target.nodeName.toLowerCase()==="li"){
                
                this.page=1;
                this.showMovies.splice(0,this.showMovies.length)

                if(e.target.classList.value!="addclass"){
                  
                    if(this.sel.length<2){                       
                        // 点击按钮后为其添加按扭样式
                        e.target.classList.add("addclass")  
                        // 将所点击的按钮插入到sel/*已选中*/数组中
                        this.sel[this.sel.length]=e.target
                        // 循环获取所选中的类型
                        for(var cla in this.mclass){
                            if(this.mclass[cla].cname==e.target.innerHTML){
                                //获取所点击按钮值对应的编号
                                var cid=this.mclass[cla].cid
                                var movie=[]
                                for(var item of this.moviess){
                                    // 将类型编号转为数组
                                    var arr=new Array(item.adept.split(","))                      //循环将与该类型对应的对象插入到页面当中    
                                    for(var i=0;i<arr[0].length;i++){
                                        if(arr[0][i]==cid){
                                        movie[movie.length]=item                                  
                                }}}
                            }
                        }
                        // 判断已选中按钮个数再挂载
                        if(this.sel.length!=2){
                            this.movies=movie
                        }else{
                            // 声明变量保存拥有两个类型共同存在的电影
                            var movie2=[]
                            // 循环获取所选中的类型的编号
                            for(var cla in this.mclass){
                                if(this.mclass[cla].cname==this.sel[0].innerHTML){
                                   cid=this.mclass[cla].cid
                                }
                            }
                            // 遍历所选第一个按钮的内容
                            for(var m of movie){
                                var arrs=new Array(m.adept.split(","))
                                // 遍历第一个按钮所选内容的电影类型
                                for(var arr of arrs){
                                    // 遍历查找存在相同类型的电影
                                    for(var a of arr){
                                        if(a==cid){
                                            movie2[movie2.length]=m
                                        }
                                    }
                                }
                            }
                            this.movies=movie2
                        }
                        //当所选按钮大于2执行
                    }else{this.$alert("最多选中两个类型哦")}
                    // 取消按钮后执行
                }else{
                    e.target.classList.remove("addclass");
                    for(var i in this.sel){
                        if(this.sel[i]==e.target){
                            this.sel.splice(i,1)
                        }
                    }
                    if(this.sel.length==0){
                        this.movies=this.moviess
                    }else if(this.sel.length==1){
                        // 循环获取所选中的类型
                        for(var cla in this.mclass){
                            if(this.mclass[cla].cname==this.sel[0].innerHTML){
                                //获取所点击按钮值对应的编号
                                var cid=this.mclass[cla].cid
                                var movie=[]
                                for(var item of this.moviess){
                                    // 将类型编号转为数组
                                    var arr=new Array(item.adept.split(","))                      //循环将与该类型对应的对象插入到页面当中    
                                    for(var i=0;i<arr[0].length;i++){
                                        if(arr[0][i]==cid){
                                        movie[movie.length]=item                                  
                                }}}
                                // 按照所点击到类型的值赋值给显示的movies
                                this.movies=movie
                        }}
                    }                    
                }                
                this.selectedMovie.length=0;
                // 保存现选中的按钮的电影
                for(var nm of this.movies){
                    this.selectedMovie[this.selectedMovie.length]=nm
                }

                // 将内容分页显示到页面当中
                if(this.selectedMovie.length>8){
                    for(var newm=0;newm<8;newm++){                       
                        this.showMovies[this.showMovies.length]=this.selectedMovie[newm]
                    }
                }else if(this.selectedMovie.length<8 && this.selectedMovie.length>=0){
                    for(var newm=0;newm<this.selectedMovie.length;newm++){                       
                        this.showMovies[this.showMovies.length]=this.selectedMovie[newm]
                    }
                }               
            }               
        },
        // 点击 最新 年 .. 触发
        msort(e){           
            if(e.target.nodeName.toLowerCase()=="li"){                
                // 最新按钮
                if(e.target.innerHTML=="最新"){                  
                    if(e.target.classList.value!="addclass"){
                        e.target.classList.add("addclass")
                        // 将在点击最新排序之前的内容保存
                        this.version=this.movies 
                        // 创建数组保存转换后的毫秒数
                        var years=new Array()
                        for(var year in this.movies){
                            years[years.length]=Date.parse(this.movies[year].myear)
                        }
                        // 清空newest/*按照时间排序 生成数组*/中的内容
                        this.newest.splice(0,this.newest.length);                    
                        // 将时间降序排列
                        years.sort(function(a,b){return b-a})
                        // 遍历按照时间排序好的数组和页面显示的电影内容对比，将对应内容逐个插入
                        for(var y of years){
                            for(var m of this.movies){
                                // 遍历现页面显示的电影内容 按照时间降序排列
                                if(Date.parse(m.myear)==y){
                                    this.newest[this.newest.length]=m
                                    // 遍历当前排序好的数组通过Mid去重
                                    for(var a in this.newest){
                                        for(var i=0;i<this.newest.length;i++){
                                            if(this.newest[a].mid==this.newest[i].mid && a!=i){
                                                this.newest.splice(i,1)                                                
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        // 将电影按照最新排序
                        this.movies=this.newest

                        this.showMovies.splice(0,this.showMovies.length)
                        // 将按照最新排序的电影分页显示
                        if(this.movies.length>8){                            
                            for(var newm=0;newm<8;newm++){   
                                this.showMovies[this.showMovies.length]=this.movies[newm]
                            }                           
                        }else if(this.movies.length<8 && this.showMovies.length>=0){
                            for(var newm=0;newm<this.movies.length;newm++){   
                                console.log(this.showMovies.length)                    
                                this.showMovies[this.showMovies.length]=this.movies[newm]
                            }   
                        }
                    }else{
                        //如果已选中
                        e.target.classList.remove("addclass")
                        //取消选中后按照默认排序
                        this.movies=this.version
                        this.showMovies.splice(0,this.showMovies.length)
                        // 将按照最新排序的电影分页显示
                        if(this.movies.length>8){                                                      
                            for(var newm=0;newm<8;newm++){   
                                this.showMovies[this.showMovies.length]=this.movies[newm]
                            }                           
                        }else if(this.movies.length<8 && this.showMovies.length>=0){
                            for(var newm=0;newm<this.movies.length;newm++){   
                                console.log(this.showMovies.length)                    
                                this.showMovies[this.showMovies.length]=this.movies[newm]
                            }   
                        }

                    }
                }
                // 实现年份下拉菜单
                if(e.target.innerHTML!=="最新" && e.target.innerHTML!=="A-Z"){ 
                    // 获取最新按钮如果已选中清除其样式
                    var clearRed=document.getElementById("clearRed")
                    if(clearRed.className=="addclass"){
                        clearRed.classList.remove("addclass")
                    }
                    var cyearList=document.getElementById("cyearList")
                    if(cyearList.className!="disblock"){
                        cyearList.classList.add("disblock")
                    }else{
                        cyearList.classList.remove("disblock") 
                    }
                }
                
            }
        }, 
        //点击年份按照所给出的年份值排序  
        getYear(e){

            this.yearSort.splice(0,this.yearSort.length)
            // 如果已经挑选类型 则按照已选择类型的电影 排序
            if(this.selectedMovie.length!=0){
                for(var m of this.selectedMovie){
                    if(m.myear.slice(0,4)==e.target.innerHTML){
                        this.yearSort[this.yearSort.length]=m
                    }
                }
            }else{
                // 如果没选择类型  默认按照原显示的详情显示到页面
                for(var m of this.moviess){
                    if(m.myear.slice(0,4)==e.target.innerHTML){
                        this.yearSort[this.yearSort.length]=m
                    }
                }
            }
            this.movies=this.yearSort

            
            this.showMovies.splice(0,this.showMovies.length)
            // 将内容分页显示到页面当中
            if(this.movies.length>8){
                for(var newm=0;newm<8;newm++){                       
                    this.showMovies[this.showMovies.length]=this.movies[newm]
                }
            }else if(this.movies.length<8 && this.movies.length>=0){
                for(var newm=0;newm<this.movies.length;newm++){                       
                    this.showMovies[this.showMovies.length]=this.movies[newm]
                }
            } 

        },
        // 分页查询按钮
        sort(e){
            // 获取总页数sum
            var sum=(Math.ceil(this.movies.length/8))
            if(e.target.innerHTML=="首页"){
                this.page=1;
                this.showMovies.splice(0,this.showMovies.length)
                var a=0;
                if(this.movies.length<8){a=this.movies.length}else{a=8}
                for(var i=0;i<a;i++){
                    this.showMovies[this.showMovies.length]=this.movies[i]
                }
            }else if(e.target.innerHTML=="末页"){
                //input显示内容修改为最后一页
                this.page=(Math.ceil(this.movies.length/8))
                //末页开始插入的下标
                var page=(this.page-1)*8
                this.showMovies.splice(0,this.showMovies.length)
                // 循环在哪里开始page   循环至结尾
                for(var i=page;i<this.movies.length;i++){
                    this.showMovies[this.showMovies.length]=this.movies[i]
                }
            }else if(e.target.innerHTML=="上一页"){
                // 从哪里开始查询  
                if(this.page>2){
                    this.page=this.page-1         
                    var page=(this.page-1)*8-1     
                }
                else{
                    if(this.page!=1){
                        this.page=this.page-1
                    }   
                    var page=0
                }                
                var a=page+8   //循环page+12次     
                this.showMovies.splice(0,this.showMovies.length)
                // // 循环在page开始   循环12个  非末页内容是装满的
                for(var i=page;i<a;i++){
                    this.showMovies[this.showMovies.length]=this.movies[i];
                }
            }else if(e.target.innerHTML=="下一页"){
                //点击按钮时当前页数不是末页才执行            
                if(this.page<sum){
                    this.page=this.page+1;               
                    var page=(this.page-1)*8-1;                     
                    var a=page+8
                    // 如果要切换到的是最后一页                    
                    if(this.page==sum){
                        if(this.movies.length%8!=0){
                            var a=this.movies.length%8+page
                        }else{
                            var a=page+8      
                        }  
                    }
                    this.showMovies.splice(0,this.showMovies.length)
                    for(var i=page;i<a;i++){
                        this.showMovies[this.showMovies.length]=this.movies[i];
                    }  
                }else if(this.page==sum){
                    console.log("当前已经是最后一页")
                }               
            }else if(e.target.innerHTML=="Go"){
                console.log(sum)

                if(this.page<=sum && this.page>0){
                    
                    if(this.page==1){
                        var page=0
                    }else{
                        if(this.page==2){
                            var page=7
                        }else{
                            var page=(this.page-1)*8-1;
                        }                        
                    }
                    // 如果选择的是最后一页
                    if(this.page==sum){
                        if(this.movies.length%8!=0){
                            var a=page+(this.movies.length%8)
                        }else{
                            var a=page+8
                        }
                    }else{var a=page+8}
                    this.showMovies.splice(0,this.showMovies.length)
                    for(var i=page;i<a;i++){
                        this.showMovies[this.showMovies.length]=this.movies[i];
                    }  
                }else{
                    console.log("输入无效！请输入：0-"+sum+"的有效值")
                    console.log(this.page)
                }
            }
        },
        GotoMDetail(e){
            if(e.target.nodeName.toLowerCase()=="img" || e.target.nodeName.toLowerCase()=="h4"){
                console.log(this.movie.mimg)
            }
        }
    }, 
}

</script>

<style scoped>
.catena{    padding-bottom: 20px;}
/* 实现自适应样式 */
@media screen and (min-width:1200px){
    .catena{
        width:1200px;
        margin:0 auto;
    }


    /*导航部分*/
    .catena_nav{margin-top:40px;}
    .catena_nav .nav{
        display:flex;
        justify-content:space-around;
        width:100%
    }
    .catena_nav .nav>li{
        width:120px;
        height:35px;
        color:#fff;
        background: #00be06;
        border-radius:50px;
        line-height: 34px;
        cursor:pointer;
    }
    /* 动态添加的点击与否按钮样式 */
    .addclass{box-shadow: 0 0 15px 1px;background:#00be06 !important} 

        /* 导航下部分 */
    .catena_option{
        margin-top:30px;
        height:30px;
        line-height:28px;
    }
    .catena_option,.left_option,.right_option,.left_option>ul{
        display:flex;
        justify-content:space-between;
    }
    .left_option>P{margin-left:30px;color: #969698;}
    .left_option>ul>li{
        margin-left: 20px;
        width: 90px;
        font-size: 14px;
        background: #183a19;
                /* 未选中状态#1E1D23 */
        color: #fff;
        border-radius: 50px;
        cursor: pointer;
    }
    /* 下拉菜单 */
    .cyear{position:relative}
    #cyearList{
        position: absolute;
        top: 31px;
        left:8px;
        max-height:233px;
        z-index:1000;
        overflow:auto;
        height:0;
       transition: all .5s linear;
    }
    .disblock{
        height:233px !important        
    }
    .cyear>ul>li{background: rgba(0,0,0,0.9);padding: 5px 20px;height: 28px;}
    .cyear>ul>li:hover{color:#FFFF58}
    .cyear>ul>li +li{border-top:1px solid #444}
    .cyear>ul>li:first-child{border-radius:8px 8px 0px 0;}
    .cyear>ul>li:last-child{border-radius: 0px 0 8px 8px;}
    /* 电影内容部分 */
    /*  照片宽高220x308 */
    .catena_content{
        width:1200px;
        display:flex;
        justify-content: space-between;
        margin-top:40px;
        padding:0 20px 40px;

    }
    .catena_content>ul{width:800px}
    .catena_content>ul::after{content:"";display: block;clear: both}
    .catena_content>ul>li{width:180px;float:left;margin-right:20px;cursor:pointer;}
    .catena_content>ul>li img{width:180px;border-radius:2px;transition: all 0.8s}
    .catena_content>ul>li img:hover{transform:scale(1.1)}
    .catena_content>ul>li>div p{font-size:14px}
    .catena_content>ul>li>div ul{display:flex;justify-content:space-between}
    .catena_content>ul>li>div ul>li{margin: 0 3px 0;font-size:16px}
    /* 控制左侧电影详情显示隐藏 */
    .hoverHid{position:relative}
    .hid{display:none;
        color:#fff;
        position: absolute;
        top:0;
        width: 180px;
        height: 100%;
        border-radius: 2px;
        -webkit-transition: all 0.8s;
        transition: all 0.8s;
        
    }
    /* 使用伪类添加高斯模糊以防作用到子元素中 */
    .hid::before{
        content:"";
        background:rgb(0,0,0);
        filter: blur(60px);
        position:absolute;
        left:0;
        right:0;
        bottom:0;
        top:0;
    }
   /*右侧TOP10部分样式*/
    .rightC{   
        width:400px;
        position:relative;
    }
    .rightC>h1{
        position:absolute;
        top: -28px;
        left: 20px;
        font-family: "宋体";
        font-weight: 900;
        font-size: 25px;
        color: #d2cccb;
    }
    .rightC>ul{
        /* border-radius: 15px; */
        height: 550px;
        margin-top: 12px;
    }
    .rightC>ul>li{
        height: 10%;
        cursor: pointer;
    }
    .rightC>ul>li+li{border-top: 1px solid #6e686838}
    /* 排名序号 */
    .rightC>ul>li>h3{    
        float: left;
        font-size: 27px;
        width: 68px;
        height: 100%;
        line-height: 55px;
        color:#cccccc59;
        font-weight: 500;
    }
    .rightC>ul>li:nth-child(1)>h3,
    .rightC>ul>li:nth-child(2)>h3,
    .rightC>ul>li:nth-child(3)>h3
        {   
        font-size: 27px;
        font-weight: 700;
        background-image: -webkit-linear-gradient(bottom,red,#fd8403,yellow);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    /* 电影名称及简介 */
    .rightC>ul>li>div{
        float: left;
        width:60%;
    }
    .rightC>ul>li>div:hover>h4{
        color:#00be06 !important;
    }
    .rightC>ul>li>div>h4{
        color:#a1b9a7;
        text-indent: 8px;
        padding-top: 7px;
        text-align: left;
        font-size: 18px;
        font-weight: 500;
    }
    .rightC>ul>li:nth-child(1)>div>h4,
    .rightC>ul>li:nth-child(2)>div>h4,
    .rightC>ul>li:nth-child(3)>div>h4{
        font-weight:700;
        font-size: 23px;
    }
    .rightC>ul>li>div>span{
        color:#f3f7f38f;
        display: block;
        font-size: 13px;
        margin-top: 6px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .rightC>ul>li>p{ 
        color:#c5a21fe0  ;
        float: right;
        height: 100%;
        line-height: 55px;
        margin-right: 20px;
    }
    .rightC>ul>li>p:hover{
        color:#ffd400
    }
    .movieName{
        font-size: 16px;
    }
    .movieName>div{
        display:flex;justify-content: space-between;margin:10px 0 20px;
    }
    /* 左侧电影名称 */
    .movieName h4{
        color:#dfeae2;font-family:"宋体";text-overflow: ellipsis;text-align:left;
    }
    .movieName h4:hover{color:#00be06}
    .movieName>div{color: #f3f7f38f;}
   /*分页查询*/
    .sort{
        width:25%;
        margin:40px auto 0;
        text-align:center;
        display:flex;
        justify-content: space-between;
        cursor:pointer;
        color: #f3f7f38f;
    }
    .sort input{
        width: 20px;
        color: #fff;
        background: #16151b;
        text-align: center;
        cursor:text;
        outline: none
    }
    .sort input:hover{border:1px solid #2c3e50;}
};
@media screen and (max-width:1199px) and (min-width:996px){
      .catena{
        width:100%;
        margin:0 auto;
    }
    /*导航部分*/
    .catena_nav{margin-top:40px;}
    .catena_nav .nav{
        display:flex;
        width:100%;
        justify-content: space-around;
    }
    .catena_nav .nav>li{
        width:103px;
        height:35px;
        margin: 0 13px;
        color:#fff;
        background: #00be06;
        border-radius:50px;
        line-height: 34px;
        cursor:pointer;
    }
    /* 动态添加的点击与否按钮样式 */
    .addclass{box-shadow: 0 0 15px 1px;background:#00be06 !important} 

        /* 导航下部分 */
    .catena_option{
        margin-top:30px;
        height:30px;
        line-height:28px;
    }
    .catena_option,.left_option,.right_option,.left_option>ul{
        display:flex;
        justify-content:space-between;
    }
    .left_option>P{margin-left:30px;color: #969698;}
    .left_option>ul>li{
        margin-left: 20px;
        width: 90px;
        font-size: 14px;
        background: #183a19;
                /* 未选中状态#1E1D23 */
        color: #fff;
        border-radius: 50px;
        cursor: pointer;
    }

    /* 下拉菜单 */
    .cyear{position:relative}
    #cyearList{
        position: absolute;
        top: 31px;
        left:8px;
        max-height:233px;
        z-index:1000;
        overflow:auto;
        height:0;
       transition: all .5s linear;
    }
    .disblock{
        height:233px !important        
    }
    .cyear>ul>li{background: rgba(0,0,0,0.9);padding: 5px 20px;height: 28px;}
    .cyear>ul>li:hover{color:#FFFF58}
    .cyear>ul>li +li{border-top:1px solid #444}
    .cyear>ul>li:first-child{border-radius:8px 8px 0px 0;}
    .cyear>ul>li:last-child{border-radius: 0px 0 8px 8px;}
    /* 电影内容部分 */
    /*  照片宽高220x308 */
    .catena_content{
        width: 960px;
        margin:0 auto;
        display: flex;
        justify-content: space-between;
        margin-top: 40px;
        padding: 0 16px;
    }
    .catena_content>ul{width:740px}
    .catena_content>ul::after{content:"";display: block;clear: both}
    .catena_content>ul>li{width:165px;float:left;margin-right:20px;cursor:pointer;}
    .catena_content>ul>li img{width:165px;border-radius:2px;transition: all 0.8s}
    .catena_content>ul>li img:hover{transform:scale(1.1)}
    .catena_content>ul>li>div p{font-size:14px}
    .catena_content>ul>li>div ul{display:flex;justify-content:space-between}
    .catena_content>ul>li>div ul>li{margin: 0 3px 0;font-size:16px}
    /* 控制左侧电影详情显示隐藏 */
    .hoverHid{position:relative}
    .hid{display:none;
        color:#fff;
        position: absolute;
        top:0;
        width: 180px;
        height: 100%;
        border-radius: 2px;
        -webkit-transition: all 0.8s;
        transition: all 0.8s;
        
    }

   /*右侧TOP10部分样式*/
    .rightC{    
        width: 220px;
        position: relative;
    }
    .rightC>h1{
        position:absolute;
        top: -28px;
        left: 20px;
        font-family: "宋体";
        font-weight: 900;
        font-size: 25px;
        color: #d2cccb;
    }
    .rightC>ul{
        /* border-radius: 15px; */
        height: 550px;
        margin-top: 12px;
    }
    .rightC>ul>li{
        height: 10%;
        cursor: pointer;
    }
    .rightC>ul>li+li{border-top: 1px solid #6e686838}
    /* 排名序号 */
    .rightC>ul>li>h3{    
        float: left;
        font-size: 27px;
        width: 35px;
        height: 100%;
        line-height: 55px;
        color:#cccccc59;
        font-weight: 500;
    }
    .rightC>ul>li:nth-child(1)>h3,
    .rightC>ul>li:nth-child(2)>h3,
    .rightC>ul>li:nth-child(3)>h3
    {   
        font-size: 27px;
        font-weight: 700;
        background-image: -webkit-linear-gradient(bottom,red,#fd8403,yellow);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    /* 电影名称及简介 */
    .rightC>ul>li>div{
        float: left;
        width:60%;
    }
    .rightC>ul>li>div:hover>h4{
        color:#00be06 !important;
    }
    .rightC>ul>li>div>h4{
        color:#a1b9a7;
        text-indent: 8px;
        padding-top: 7px;
        text-align: left;
        font-size: 18px;
        font-weight: 500;
    }
    .rightC>ul>li:nth-child(1)>div>h4,
    .rightC>ul>li:nth-child(2)>div>h4,
    .rightC>ul>li:nth-child(3)>div>h4{
        font-weight: 600;
        font-size: 15px;
    }
    .rightC>ul>li>div>span{
        color:#f3f7f38f;
        display: block;
        font-size: 13px;
        margin-top: 6px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .rightC>ul>li>p{ 
        color:#c5a21fe0  ;
        float: right;
        height: 100%;
        line-height: 55px;
        margin-right: 20px;
    }
    .rightC>ul>li>p:hover{
        color:#ffd400
    }
    .movieName{
        font-size: 16px;
    }
    .movieName>div{
        display:flex;justify-content: space-between;margin:10px 0 20px;
    }
    /* 左侧电影名称 */
    .movieName h4{
        color:#dfeae2;font-family:"宋体";text-overflow: ellipsis;text-align:left;
    }
    .movieName h4:hover{color:#00be06}
    .movieName>div{color: #f3f7f38f;}
   /*分页查询*/
    .sort{
        width:350px;
        margin:40px auto 0;
        text-align:center;
        display:flex;
        justify-content: space-between;
        cursor:pointer;
        color: #f3f7f38f;
    }
    .sort input{
        width: 20px;
        color: #fff;
        background: #16151b;
        text-align: center;
        cursor:text;
        outline: none
    }
    .sort input:hover{border:1px solid #2c3e50;}  
}
/* 中屏 */
@media screen and (max-width:995px) and (min-width:768px){
    .catena{
        width:100%;
        margin:0 auto;
    }
    /*导航部分*/
    .catena_nav{margin-top:40px;}
    .catena_nav .nav{
        display:flex;
        width:100%;
        justify-content: space-around;
    }
    .catena_nav .nav>li{
        width:103px;
        height:35px;
        margin: 0 13px;
        color:#fff;
        background: #00be06;
        border-radius:50px;
        line-height: 34px;
        cursor:pointer;
    }
    /* 动态添加的点击与否按钮样式 */
    .addclass{box-shadow: 0 0 15px 1px;background:#00be06 !important} 

        /* 导航下部分 */
    .catena_option{
        margin-top:30px;
        height:30px;
        line-height:28px;
    }
    .catena_option,.left_option,.right_option,.left_option>ul{
        display:flex;
        justify-content:space-between;
    }
    .left_option>P{margin-left:30px;color: #969698;}
    .left_option>ul>li{
        margin-left: 20px;
        width: 90px;
        font-size: 14px;
        background: #183a19;
                /* 未选中状态#1E1D23 */
        color: #fff;
        border-radius: 50px;
        cursor: pointer;
    }

    /* 下拉菜单 */
    .cyear{position:relative}
    #cyearList{
        position: absolute;
        top: 31px;
        left:8px;
        max-height:233px;
        z-index:1000;
        overflow:auto;
        height:0;
       transition: all .5s linear;
    }
    .disblock{
        height:233px !important        
    }
    .cyear>ul>li{background: rgba(0,0,0,0.9);padding: 5px 20px;height: 28px;}
    .cyear>ul>li:hover{color:#FFFF58}
    .cyear>ul>li +li{border-top:1px solid #444}
    .cyear>ul>li:first-child{border-radius:8px 8px 0px 0;}
    .cyear>ul>li:last-child{border-radius: 0px 0 8px 8px;}
    /* 电影内容部分 */
    /*  照片宽高220x308 */
    .catena_content{
        width: 768px;
        margin:0 auto;
        display: flex;
        justify-content: space-between;
        margin-top: 40px;
        padding: 0 16px;
    }
    .catena_content>ul{width:768px}
    .catena_content>ul::after{content:"";display: block;clear: both}
    .catena_content>ul>li{width:165px;float:left;margin-right:20px;cursor:pointer;}
    .catena_content>ul>li img{width:165px;border-radius:2px;transition: all 0.8s}
    .catena_content>ul>li img:hover{transform:scale(1.1)}
    .catena_content>ul>li>div p{font-size:14px}
    .catena_content>ul>li>div ul{display:flex;justify-content:space-between}
    .catena_content>ul>li>div ul>li{margin: 0 3px 0;font-size:16px}
    /* 控制左侧电影详情显示隐藏 */
    .hoverHid{position:relative}
    .hid{display:none;
        color:#fff;
        position: absolute;
        top:0;
        width: 180px;
        height: 100%;
        border-radius: 2px;
        -webkit-transition: all 0.8s;
        transition: all 0.8s;
        
    }
    /* 左侧top10隐藏 */
    .rightC{display:none}
    .movieName{
        font-size: 16px;
    }
    .movieName>div{
        display:flex;justify-content: space-between;margin:10px 0 20px;
    }
    /* 左侧电影名称 */
    .movieName h4{
        color:#dfeae2;font-family:"宋体";text-overflow: ellipsis;text-align:left;
    }
    .movieName h4:hover{color:#00be06}
    .movieName>div{color: #f3f7f38f;}
   /*分页查询*/
    .sort{
        width:350px;
        margin:40px auto 0;
        text-align:center;
        display:flex;
        justify-content: space-between;
        cursor:pointer;
        color: #f3f7f38f;
    }
    .sort input{
        width: 20px;
        color: #fff;
        background: #16151b;
        text-align: center;
        cursor:text;
        outline: none
    }
    .sort input:hover{border:1px solid #2c3e50;}  
}
/* 小屏 */
@media screen and (max-width:767px){
    .catena{
        width:100%;
        margin:0 auto;
    }
    /*导航部分*/
    .catena_nav{margin-top:40px;}
    .catena_nav .nav{
        width:100%;
    }
    .nav::after{content:"";display: block;clear: both;}
    .catena_nav .nav>li{
        width: 18%;
        float: left;
        height: 35px;
        margin: 3px 13px;
        color: #fff;
        background: #00be06;
        border-radius: 50px;
        line-height: 34px;
        cursor: pointer;
    }
    /* 动态添加的点击与否按钮样式 */
    .addclass{box-shadow: 0 0 15px 1px;background:#00be06 !important} 

        /* 导航下部分 */
    .catena_option{
        margin-top:10px;
        height:30px;
        line-height:28px;
    }
    .catena_option,.left_option,.right_option,.left_option>ul{
        display:flex;
        justify-content:space-between;
    }
    .left_option>P{    margin-left: 18px;color: #969698;}
    .left_option>ul>li{
        margin-left: 10px;
        width: 60px;
        font-size: 14px;
        background: #183a19;
        /* 未选中状态#1E1D23 */
        color: #fff;
        border-radius: 50px;
        cursor: pointer;
    }

    /* 下拉菜单 */
    .cyear{position:relative}
    #cyearList{
        position: absolute;
        top: 31px;
        left:8px;
        max-height:233px;
        z-index:1000;
        overflow:auto;
        height:0;
       transition: all .5s linear;
    }
    .disblock{
        height:233px !important        
    }
    .cyear>ul>li{background: rgba(0,0,0,0.9);padding: 5px 20px;height: 28px;}
    .cyear>ul>li:hover{color:#FFFF58}
    .cyear>ul>li +li{border-top:1px solid #444}
    .cyear>ul>li:first-child{border-radius:8px 8px 0px 0;}
    .cyear>ul>li:last-child{border-radius: 0px 0 8px 8px;}
    /* 电影内容部分 */
    /*  照片宽高220x308 */
    .catena_content{
        width: 100%;
        margin:0 auto;
        margin-top: 20px;
        padding: 0 16px;
    }
    .catena_content>ul{
        width:100%;        
    }
    .catena_content>ul::after{content:"";display: block;clear: both}
    .catena_content>ul>li{width:43%;float:left;margin-right:20px;cursor:pointer;overflow:hidden}
    .catena_content>ul>li img{width:100%;border-radius:2px;transition: all 0.8s}
    .catena_content>ul>li img:hover{transform:scale(1.1)}
    .catena_content>ul>li>div p{font-size:14px}
    .catena_content>ul>li>div ul{display:flex;justify-content:space-between}
    .catena_content>ul>li>div ul>li{margin: 0 3px 0;font-size:16px}
    /* 控制左侧电影详情显示隐藏 */
    .hoverHid{position:relative;width:45%;}
    .hoverHid>div{width:100%;margin: 0 auto;}    
    /* 左侧top10隐藏 */
    .rightC{display:none}
    .movieName{
        font-size: 16px;
    }
    .movieName>div{
        display:flex;justify-content: space-between;margin:10px 0 20px;
    }
    /* 左侧电影名称 */
    .movieName h4{
        color:#dfeae2;font-family:"宋体";text-overflow: ellipsis;text-align:left;
    }
    .movieName h4:hover{color:#00be06}
    .movieName>div{color: #f3f7f38f;}
   /*分页查询*/
    .sort{
        width:350px;
        margin:40px auto 0;
        text-align:center;
        display:flex;
        justify-content: space-between;
        cursor:pointer;
        color: #f3f7f38f;
    }
    .sort input{
        width: 20px;
        color: #fff;
        background: #16151b;
        text-align: center;
        cursor:text;
        outline: none
    }
    .sort input:hover{border:1px solid #2c3e50;}  
}
 .iconhuo{
    font-size: 24px;
    color: #fe6702;
    margin-right: -8px;
 }
</style>
