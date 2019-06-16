<template>
    <div>
        <myheader></myheader>
        <!-- 轮播图 -->
        <banner></banner>
        <!-- 最近流行的 -->
        <secondBanner 
            :movies=movies 
            :mclass=mclass
        ></secondBanner>
        <!-- 电影系列 -->
        <catena></catena>  
    </div>
</template>

<script>
import catena from "@/components/dyw/common/subset/catena";
import secondBanner from "@/components/dyw/common/subset/secondBanner";
import myheader from "@/components/dyw/common/header";
import banner from "@/components/dyw/common/subset/banner";
export default {
    data(){
        return{
        movies:[],
        moviess:[],
        mclass:[],//保存 存在的电影类型
        }
    },
    components:{catena,secondBanner,myheader,banner},
    created() {
        // 获取电影详细信息
        this.axios.get("http://127.0.0.1:3000/movie/selmovie")
            .then(result=>{
                // 显示在页面修改使用
                this.movies=result.data
                // 保存数据使用
                this.moviess=result.data
            });
        // 获取电影类型名
        this.axios.get("http://127.0.0.1:3000/movie/mclass")
            .then(result=>{
                this.mclass=result.data
                
        })
    },
}
</script>

<style>

</style>