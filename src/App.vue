<template>
    <div id="app">
        <myheader></myheader>
        <router-view/>
        <!-- <mfooter></mfooter> -->
    </div>
</template>

<script>
// 引入全局脚
import myheader from "@/components/dyw/common/header";
// import mfooter from "./components/dyw/common/footer"
export default {
components:{myheader}
}
</script>


<style>
#app {
background:#16151B;
width:100%;
margin: 0 auto;
text-align: center;
color: #2c3e50;
}
#nav {
padding: 30px;
}

#nav a {
font-weight: bold;
color: #2c3e50;
}

#nav a.router-link-exact-active {
color: #42b983;
}
</style>