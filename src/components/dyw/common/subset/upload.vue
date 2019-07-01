<template>
  <div class="d1">
    <el-upload
  class="upload-demo"
  ref="upload"
  data={10}
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
export default {
    data() {
      return {
        fileList: [],
        a:'',
        uid:'',
      };
    },
    methods: {
  
      // submitUpload() {
      //   console.log(this.fileList);
      //   this.$refs.upload.submit(this.result);
      // },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      parentHandleclick() {
        this.uid=localStorage.getItem('uid');
         this.$refs.upload.submit()
      },
      //图片上传成功时的钩子函数
      success(){
        this.fileList=[];
        console.log(this.fileList);
      }
    }
  }
</script>

<style>
   
</style>
