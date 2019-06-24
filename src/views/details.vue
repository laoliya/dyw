<template>
    <div style="background-color:#FFFFFF;">
        <!-- 播放器部分 -->
        <play></play>
        <div class="likeandup">
            <!-- 猜你喜欢 -->
            <youlike 
                :movieList=movieList
            ></youlike>
             <!-- 引入右侧最近更新 -->
            <recentupdates :movieList=movieList></recentupdates>
        </div>
        <comment></comment>
    </div>
</template>

<script>
// 播放
import play from "@/components/dyw/common/subset/play";
// 猜你喜欢
import youlike from "@/components/dyw/common/subset/youlike";
//最新
import recentupdates from "@/components/dyw/common/subset/recentupdates"; 
// 评论
import comment from "@/components/dyw/common/subset/comment";
export default {
    data(){
        return{
            movieList:[]  //供我喜欢组件使用的数据
        }
    },
    components:{play,youlike,recentupdates,comment},
    created(){
        let url='list/listall';
        this.axios.get(url).then(result=>{
            this.movieList = result.data
            // console.log(this.movieList);
        })
    }
}
</script>

<style scoped>
    .likeandup{
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
    }
    /* 写媒体查询完成猜你喜欢和右侧最新的响应式 */
    @media screen and (max-width: 1199px) {
        .likeandup{
        width: 80%;
        margin: 0 auto;
        
    }
    }
</style>