<template>
    <div class="none">
        <div class="uptitle">最近更新</div>
        <div class="upcart">
            <ul>
                <li v-for="(item,index) of this.newListArr" :key="index">
                        <span>{{index+1}}</span>
                        <div>
                            <span>{{item.mname}}</span>
                            <span>{{item.mdetail}}</span>
                        </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            newListArr:[1,2]
        }
    },
    props:['movieList'],
    watch:{
        movieList(){
            this.newListArr.splice(0,this.newListArr.length)
            for (let i=8;i<16;i++) {
                  this.newListArr.push(this.movieList[i]); 
            }
        }
    }
}
</script>
<style scoped>
    .uptitle {
        padding-top: 20px;
        margin-bottom: 30px;
        text-align: start;
        font-size: 30px;
        font-weight: 400;
        
    }
    .upcart {
        width: 380px;
        height: 720px;
        background-color: #F8F8F8;
    }
    /* 卡片的编写 */
    .upcart>ul {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-shadow: 5px 5px 15px rgba(25,24,40,.35);
    }
    .upcart>ul>li {
        padding: 20px;
        border-bottom:1px solid #ccc;
        display: flex;
        cursor: pointer;
    }
    .upcart>ul>li>span {
        /* 字体的线性颜色变化 */
        background-image: linear-gradient(180deg,#ffb821 0,#ff5c38 45%,#ff1459); 
        -webkit-background-clip:text; 
        -webkit-text-fill-color:transparent; 
        color: #ff183e;
        font-size: 28px;
    }

    .upcart>ul>li>div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        margin-left: 20px;
          
    }
    .upcart>ul>li>div>span:first-child {
        color: #111;
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 5px;
    }
    .upcart>ul>li>div>span:last-child {
        width: 300px;
        color: #999;
        font-size: 13px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    /* 写媒体查询完成响应式 */
    @media screen and (max-width: 1199px) {
        .none{
            display: none;
        }
    }
</style>

