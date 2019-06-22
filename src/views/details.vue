<template>
    <div>
        <!-- 播放器部分 -->
        <play></play>
        <youlike 
        :movieList=movieList
        ></youlike>
    </div>
</template>

<script>
import play from "@/components/dyw/common/subset/play";
import youlike from "@/components/dyw/common/subset/youlike"
export default {
    data(){
        return{
            movieList:[]  //供我喜欢组件使用的数据
        }
    },
    components:{play,youlike},
    created(){
        let url='list/listall';
        this.axios.get(url).then(result=>{
            this.movieList = result.data
        })
    }
}
</script>

<style scoped>
</style>