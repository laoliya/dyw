<template>
    <el-carousel >
        <i></i>
        <el-carousel-item><!-- v-for="item in 4" :key="item" -->
                <img src="http://127.0.0.1:3000/img/banner1.jpg" alt="">
        </el-carousel-item>        
        <el-carousel-item><!-- v-for="item in 4" :key="item" -->
                <img src="http://127.0.0.1:3000/img/banner2.jpg" alt="">
        </el-carousel-item>        
        <el-carousel-item><!-- v-for="item in 4" :key="item" -->
                <img src="http://127.0.0.1:3000/img/banner3.jpg" alt="">
        </el-carousel-item>

    </el-carousel>
</template>

<script>
export default {
    data(){
        return{

        }
    },

}
</script>

<style>
.el-carousel__container{
    position: relative;
    height: 510px !important;
}
  .el-carousel__item img {
    width: 100%;
    height:100%;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  /* .el-carousel__indicators--horizontal */
  /* 左右切换按钮 */
.el-carousel__arrow {
    margin: 0 45px !important;
    -webkit-transition: .8s !important;
    transition: 1s;
    border-radius: 50%;
    background-color: rgba(31,45,61,.11);
    color: #FFF;
    position: absolute;
    top: 50%;
    z-index: 10;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    text-align: center;
    font-size: 54px !important;
}
/*  轮播指示符*/
.el-carousel__button {
    opacity: .48;
    width: 61px  !important;
    height: 3px  !important;
    background-color: #8c8c8c  !important;
}
@media screen and (min-width:1200px){
    .el-carousel__container{
    height: 510px !important;
    }
  /* .el-carousel__indicators--horizontal */
  /* 左右切换按钮 */
    .el-carousel__arrow {
        margin: 0 45px !important;   
        top: 50%;
        font-size: 54px !important;
    }
    /*  轮播指示符*/
    .el-carousel__button {
        width: 61px  !important;
        height: 3px  !important;
    }
}
@media screen and (min-width:996px) and (max-wdith:1200px){
    .el-carousel__container{
    height: 510px !important;
    }
  /* .el-carousel__indicators--horizontal */
  /* 左右切换按钮 */
    .el-carousel__arrow {
        margin: 0 45px !important;   
        top: 50%;
        font-size: 54px !important;
    }
    /*  轮播指示符*/
    .el-carousel__button {
        width: 61px  !important;
        height: 3px  !important;
    }
}
@media screen and (min-width:767px) and (max-width:995px){
    .el-carousel__container{
    height: 510px !important;
    }
  /* .el-carousel__indicators--horizontal */
  /* 左右切换按钮 */
    .el-carousel__arrow {
        margin: 0 45px !important;   
        top: 50%;
        font-size: 54px !important;
    }
    /*  轮播指示符*/
    .el-carousel__button {
        width: 61px  !important;
        height: 3px  !important;
    }
}
@media screen and (max-width:766px){
    .el-carousel__container{
    height: 245px !important;
    }
  /* .el-carousel__indicators--horizontal */
  /* 左右切换按钮 */
    .el-carousel__arrow {
        margin: 0 45px !important;   
        top: 50%;
        font-size: 54px !important;
    }
    /*  轮播指示符*/
    .el-carousel__button {
        width: 61px  !important;
        height: 3px  !important;
    }
    i{display:block;margin-top:70px}
    .el-carousel__arrow--right,.el-carousel__arrow--left{
        display:none !important
    }
}
</style>
