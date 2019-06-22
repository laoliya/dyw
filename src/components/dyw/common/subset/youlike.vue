<template>
    <!-- 猜你喜欢 -->
    <div class="container">
        <!-- 内容区域 -->
        <div class="content">
            <!-- 猜你喜欢 -->
            <div class="cailike">
                <h3>猜你喜欢</h3>
                <div>
                    <a href="javascript:;">换一换</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .container {
        width: 100%;
        height: 100%;
        background-color: #FFFFFF;
    }
    /* 内容区域 */
    .content {
        width: 1200px;
        margin: 0 auto;
    }
    /* 猜你喜欢 */
    .cailike {
        display: flex;
        justify-content: space-between;
        margin-bottom: 2px;
    }
</style>
