<template>
    <div>
        <!-- 播放器部分 -->
        <play></play>
        <youlike></youlike>
    </div>
</template>

<script>
import play from "@/components/dyw/common/subset/play";
import youlike from "@/components/dyw/common/subset/youlike"
export default {
    data(){
        return{
        }
    },
    components:{play,youlike}
}
</script>

<style scoped>
</style>