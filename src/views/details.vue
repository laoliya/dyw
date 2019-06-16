<template>
    <div>
        <div>{{this.movie}}</div>
        <div>当前是详情页</div>
    </div>
</template>

<script>
export default {
    return(){
        data:{
            movie:""
        }
    },
    created(){
       this.movie=this.$route.query.movie
    }
}
</script>

<style>

</style>

