<template>
    <div style="background-color:#FFFFFF;">
        <!-- 播放器部分 -->
        <play></play>
        <div class="likeandup">
            <youlike 
                :movieList=movieList
            ></youlike>
             <!-- 引入右侧最近更新 -->
            <recentupdates :movieList=movieList></recentupdates>
        </div>
    </div>
</template>

<script>
import play from "@/components/dyw/common/subset/play";
import youlike from "@/components/dyw/common/subset/youlike";
import recentupdates from "@/components/dyw/common/subset/recentupdates";
export default {
    data(){
        return{
            movieList:[]  //供我喜欢组件使用的数据
        }
    },
    components:{play,youlike,recentupdates},
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
    /* 写媒体查询完成响应式 */
    @media screen and (max-width: 1199px) {
        .likeandup{
        width: 80%;
        margin: 0 auto;
        
    }
    }
</style>