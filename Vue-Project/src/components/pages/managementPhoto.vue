<template>
  <div class="wrapper">
    <!-- 面包屑 -->
    <breadCrumb name="班级管理员" nameChirend="管理相册"></breadCrumb>

    <!-- 管理图片 -->
    <el-card class="box">
      <el-upload
        action="#"
        :limit="5"
        ref="upload"
        :multiple="true"
        :auto-upload="false"
        :file-list="fileList"
        list-type="picture-card"
        :on-exceed="handleExceed"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <div slot="tip" class="el-upload__tip">上传图片大小不超过500kb</div>
      </el-upload>
      <el-button type="primary" @click="submitUpload">立即上传</el-button>
      <el-button @click="resetForm('form')">重置</el-button>
    </el-card>
  </div>
</template>

<script>
import breadCrumb from '../CustomComponent/breadCrumb'
import axios from 'axios'
export default {
  name: '',
  components: {
    breadCrumb
  },
  props: {},
  data() {
    return {}
  },
  watch: {},
  computed: {},
  methods: {
    //只能上传5张
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 5 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    submitUpload() {
      // 获取到 上传的所有文件，它是一个数组
      const fileArray = this.$refs.upload.uploadFiles
      // console.log(fileArray)
      // 实例化FormData对象
      const fd = new FormData()
      // 遍历文件数组，将所有文件存入fd中
      for (let i = 0; i < fileArray.length; i++) {
        // 在这里数组每一项的.raw才是你需要的文件，有疑惑的可以打印到控制台看一下就清楚了
        fd.append('avatar', fileArray[i].raw)
      }
      console.log(fd)
      // 发送HTTP请求，发送数据
      var userId = this.$store.userId
      // console.log(this.$store.userId)

      axios({
        url: 'managementPhoto',
        method: 'post',
        data: fd,
        params: { userId: userId }
      }).then(res => {
        console.log(res.data)
        this.$message({
          message: '恭喜你，成功上传',
          type: 'success'
        })
      })
      // //刷新
      // this.$router.go(0)
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
.wrapper {
}
// 卡片
.box {
  height: 780px;
}
</style>