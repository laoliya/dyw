<template>
    <div class="catena">
        <!--头部 -->
        <div class="title">
            <div class="leftTitle">
                <h3>
                    <i class="iconfont icon-bofang-"></i>
                    电影系列
                </h3>
            </div>
            <div class="rightTitle">
                <ul>
                    <li>
                        <i class="iconfont icon-bofang-"></i>
                        <span>系列</span>
                    </li>
                    <li>
                        <i class="iconfont icon-duihao"></i>
                        <span>原创</span>
                    </li>
                    <li>
                        <i class="iconfont icon-sousuo"></i>
                         <span>搜索</span>   
                    </li>
                </ul>
            </div>
        </div>
        <div class="D_hr"></div>
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
                    <i  class="iconfont icon-pingfen-"></i>
                    <div>评分</div>
                    <span>5.0</span>
                </div>
            </div>
        </div>
        <!--电影  -->
        <div class="catena_content"> 

            <ul @click="GotoMDetail">
                <li  v-for="(movie,index) of this.showMovies" :key=index @click="jumpvideo(movie.mid)">
                    <!-- <router-link tag="a" :to="{path:'/play',query:{movie:movie}}"> -->
                        <img :src="'http://127.0.0.1:3000/img/'+movie.mimg" alt="">                   
                        <!--电影名称-->
                        <h4>{{movie.mname}}</h4> 
                    <!-- </router-link>     -->
                        <div> <!--上映时间-->
                            <p>{{movie.myear}}</p>
                            <!--收藏  浏览  评分-->
                            <div>
                                <ul>
                                    <li  class="iconfont icon-xin1"></li>
                                    <li  class="iconfont icon-yan"></li>
                                    <li  class="iconfont icon-WatchEvent"></li>
                                    <li>{{movie.mgrade}}</li>
                                </ul>
                            </div>
                        </div>
                   
                </li>
    <!-- ul结束 -->
            </ul>
        </div>      
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
    }},
    // 在加载之前向服务器发送ajax请求
    created(){
        // 获取电影详细信息
        this.axios.get("http://127.0.0.1:3000/movie/selmovie")
            .then(result=>{
                // 显示在页面修改使用
                this.movies=result.data
                // 保存数据使用
                this.moviess=result.data
                // 页面分页显示初始化  this.showMovies
                for(var i=this.page-1;i<12;i++){
                    this.showMovies[this.showMovies.length]=this.movies[i]
                }
                // 获取年份数组
                for(var i of this.moviess){
                    this.values[this.values.length]=i.myear.slice(0,4)
                }
                //ES6新语法去重 获取所有电影所包含的时间年份
                var x = new Set(this.values.sort());
                this.values=x


            })
            // 获取电影类型名
        this.axios.get("http://127.0.0.1:3000/movie/mclass")
            .then(result=>{
                this.mclass=result.data
                
        })

    
    
    },
    mounted() {

    },   
    methods: {
        //添加点击列表跳转二级页面lzy
        jumpvideo(mid){
            localStorage.setItem('mid',mid);
            this.$router.push("/play")
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
                if(this.selectedMovie.length>12){
                    for(var newm=0;newm<12;newm++){                       
                        this.showMovies[this.showMovies.length]=this.selectedMovie[newm]
                    }
                }else if(this.selectedMovie.length<12 && this.selectedMovie.length>=0){
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
                        if(this.movies.length>12){                            
                            for(var newm=0;newm<12;newm++){   
                                this.showMovies[this.showMovies.length]=this.movies[newm]
                            }                           
                        }else if(this.movies.length<12 && this.showMovies.length>=0){
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
                        if(this.movies.length>12){                                                      
                            for(var newm=0;newm<12;newm++){   
                                this.showMovies[this.showMovies.length]=this.movies[newm]
                            }                           
                        }else if(this.movies.length<12 && this.showMovies.length>=0){
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
            if(this.movies.length>12){
                for(var newm=0;newm<12;newm++){                       
                    this.showMovies[this.showMovies.length]=this.movies[newm]
                }
            }else if(this.movies.length<12 && this.movies.length>=0){
                for(var newm=0;newm<this.movies.length;newm++){                       
                    this.showMovies[this.showMovies.length]=this.movies[newm]
                }
            } 

        },
        // 分页查询按钮
        sort(e){
            // 获取总页数sum
            var sum=(Math.ceil(this.movies.length/12))
            if(e.target.innerHTML=="首页"){
                this.page=1;
                this.showMovies.splice(0,this.showMovies.length)
                var a=0;
                if(this.movies.length<12){a=this.movies.length}else{a=12}
                for(var i=0;i<a;i++){
                    this.showMovies[this.showMovies.length]=this.movies[i]
                }
            }else if(e.target.innerHTML=="末页"){
                //input显示内容修改为最后一页
                this.page=(Math.ceil(this.movies.length/12))
                //末页开始插入的下标
                var page=(this.page-1)*12
                this.showMovies.splice(0,this.showMovies.length)
                // 循环在哪里开始page   循环至结尾
                for(var i=page;i<this.movies.length;i++){
                    this.showMovies[this.showMovies.length]=this.movies[i]
                }
            }else if(e.target.innerHTML=="上一页"){
                // 从哪里开始查询  
                if(this.page>2){
                    this.page=this.page-1         
                    var page=(this.page-1)*12-1     
                }
                else{
                    if(this.page!=1){
                        this.page=this.page-1
                    }   
                    var page=0
                }                
                var a=page+12   //循环page+12次     
                this.showMovies.splice(0,this.showMovies.length)
                // // 循环在page开始   循环12个  非末页内容是装满的
                for(var i=page;i<a;i++){
                    this.showMovies[this.showMovies.length]=this.movies[i];
                }
            }else if(e.target.innerHTML=="下一页"){
                //点击按钮时当前页数不是末页才执行            
                if(this.page<sum){
                    this.page=this.page+1;               
                    var page=(this.page-1)*12-1;                     
                    var a=page+12
                    // 如果要切换到的是最后一页                    
                    if(this.page==sum){
                        if(this.movies.length%12!=0){
                            var a=this.movies.length%12+page
                        }else{
                            var a=page+12      
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
                            var page=11
                        }else{
                            var page=(this.page-1)*12-1;
                        }                        
                    }
                    // 如果选择的是最后一页
                    if(this.page==sum){
                        if(this.movies.length%12!=0){
                            var a=page+(this.movies.length%12)
                        }else{
                            var a=page+12
                        }
                    }else{var a=page+12}
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
                // this.$router.push({path:"/details",query{arry:}})
            }
        }
    },
    

}

</script>

<style scoped>
    .catena{
        width:1200px;
        margin:0 auto;
        padding:0 20px 40px;
    }
    /* 标题部分 */
    .title{
        display:flex;
        justify-content: space-between;
        padding-top:20px;
        height:80px;
        line-height: 80px;
    }
    .leftTitle>h3{
        color:#fff;
        font-size:18px;
        font-weight:0
    }
    .leftTitle i{
        margin-right:5px
    }
    .rightTitle>ul{display:flex;justify-content:space-around;color:#65656D;font-size:14px;   } 
    .rightTitle>ul>li{
         margin-right:30px;
         cursor: pointer;
    }
    .rightTitle span{font-size:15px}
    .rightTitle i{font-size:20px;margin-right:5px}
    .D_hr{
        width:100%;
        height:2px;
        background:#292931
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
        background:#1E1D23;
        border-radius:50px;
        line-height: 34px;
        cursor:pointer;
    }
    /* 动态添加的点击与否按钮样式 */
    .addclass{background:#DA1622 !important;}        
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
    .left_option>ul>li{
        margin-left: 20px;
        width: 90px;
        
        font-size: 14px;
        background: #1E1D23;
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
       transition: all 1s linear;
    }
    .disblock{
        height:233px !important        
    }

    .cyear>ul>li{background: rgba(0,0,0,0.9);padding: 5px 20px;height: 28px;}
    .cyear>ul>li:hover{color:#FFFF58}
    .cyear>ul>li +li{border-top:1px solid #444}
    .cyear>ul>li:first-child{    border-radius:8px 8px 0px 0;}
    .cyear>ul>li:last-child{    border-radius: 0px 0 8px 8px;}
    /* 电影内容部分 */
    /*  照片宽高220x308 */
    .catena_content{
        width:100%;
        display:flex;
        justify-content: space-between;
        margin-top:40px
    }
    .catena_content>ul::before{content:"";display: block;clear: both}
    .catena_content>ul>li{width:180px;float:left;margin-right:20px;cursor:pointer;}
    .catena_content>ul>li img{width:100%;border-radius:10px;transition: all 0.8s}
    .catena_content>ul>li img:hover{transform:scale(1.1)}
    .catena_content>ul>li h4{color:#fff;margin:15px 0 10px;text-align: left;font-family:"宋体"}
    .catena_content>ul>li h4:hover{color:#FFFF58}
    .catena_content>ul>li>div{display:flex;justify-content: space-between;margin:10px 0 20px;font-size: 12px;}
    .catena_content>ul>li>div p{font-size:14px}
    .catena_content>ul>li>div ul{display:flex;justify-content:space-between}
    .catena_content>ul>li>div ul>li{margin: 0 3px 0;font-size:16px}
    .catena_content>ul>li>div ul>li.icon-yan{color:#E1121F}
    .catena_content>ul>li>div ul>li.icon-WatchEvent{color:#FFB102;}
    .sort{width:25%;margin:40px auto 0;text-align:center;display:flex;justify-content: space-between;cursor:pointer;}
    .sort input{width: 20px;color: #fff;background: #16151b;text-align: center;cursor:text;outline: none}
    .sort input:hover{border:1px solid #2c3e50;}
</style>
