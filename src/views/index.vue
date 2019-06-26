<template>
<div>
<!-- 轮播图 -->
    <banner
        :movies=movies 
        :mclass=mclass
    ></banner>
<!-- 最近流行的 -->
    <!-- <secondBanner 
        :movies=movies 
        :mclass=mclass
    ></secondBanner> -->
    <!-- 广告位 植入广告 -->
    <a class="Gg" href="http://www.iqiyi.com/iframe/loginreg?show_back=1&agenttype=39&from_url=http%3A%2F%2Fplaygame.iqiyi.com%2Flogin%2Fiframe_page_web%2Ftop%3Fgame_id%3D6176%26server_order%3D525%26cf%3Ddating%26time%3D1561169770&t=14304"  target="_Blank">
        <img src="http://static-s.iqiyi.com/common/20181226/cupid/92/88/738688db-f7c1-4d97-8eed-f50b5751f720.jpg" alt="">
        <p>广告</p>
    </a>
<!-- 电影系列 -->
    <catena
        :ms=movies 
        :mcs=mclass
    ></catena>

</div>
</template>

<script>
    import catena from "@/components/dyw/common/subset/catena";
    import secondBanner from "@/components/dyw/common/subset/secondBanner";
    import banner from "@/components/dyw/common/subset/banner";
    export default {
    data(){
        return{
            movies:[],
            moviess:[],
            mclass:[],//保存 存在的电影类型
        }
    },
    components:{catena,secondBanner,banner},
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

            /* 广告样式 */
        .Gg{position: relative;width:1200px;overflow: hidden;}
        .Gg>img{width:1200px;margin-top:40px;height: 90px;}
        .Gg>p{    
            background: rgba(0,0,0,0.5);
            color: #fff;
            box-sizing: border-box;
            padding: 3px;
            font-size: 12px;
            position: absolute;
            top: -74px;
            right: 0;
            z-index: 99;
        }
    
    @media screen  and (max-width:1199px) and (min-width:996px){
            /* 广告样式 */
        .Gg>img {
            width: 996px;
            margin-top: 40px;
            height: 84px;
        }       
    }
    @media screen  and (max-width:995px) and (min-width:767px){
            /* 广告样式 */
        .Gg>img {
            width: 767px;
            margin-top: 40px;
            height: 73px;
        }       
    }
    @media screen  and (max-width:766px){
            /* 广告样式 */
        .Gg>img {
            width: 90%;
            margin-top: 40px;
            height: 60px;
        }    
        .Gg>p {
            background: rgba(0,0,0,0.5);
            color: #fff;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            padding: 3px;
            font-size: 12px;
            position: absolute;
            top: -45px;
            right: 0;
            z-index: 99;
        }   
    }
</style>
