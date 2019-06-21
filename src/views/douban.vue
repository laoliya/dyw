<template>
    <div>
       <button @click="qqq">789</button>
       <!-- <input type="text" v-model="searchMovie"> -->
       <button @click="search">搜索查找电影</button>
    </div>

</template>

<script>
export default {
    data() {
        return {
            searchMovie:""
        }
    },
    created(){
        
    },
    methods: {
        qqq(){
            this.axios.get("http://127.0.0.1:3000/movie/douban").then(result=>{
                console.log("OK")
            }) //失败返回
            .catch(error=>{
                console.log(error);
            })
        },
        search(){
            // var params={q:this.searchMovie}
            this.axios.get("http://127.0.0.1:3000/movie/search",).then(result=>{
                console.log(result.data)
            }) //失败返回
            .catch(error=>{
                console.log(error);
            })
        }
    },
}
</script>


<style>

</style>
