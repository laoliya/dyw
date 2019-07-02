<template>
  <div class="d1">
    <el-upload
  class="upload-demo"
  ref="upload"
  :headers="importHeaders"
  action="http://localhost:3000/up/upload"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  :auto-upload="false"
  :on-success='success'
  list-type="picture"
  >
  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
        </div>
    </template>

<script>
var mytoken =  localStorage.getItem('uid') // 要保证取到
export default {
    data() {
      return {
        fileList: [],
        a:'',
         importHeaders: {token: mytoken}
      };
    },
    methods: {
  
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      parentHandleclick() {
         this.$refs.upload.submit()
      },
      //图片上传成功时的钩子函数
      success(){
        this.fileList=[];
      }
    }
  }
</script>

<style>
   
</style>
