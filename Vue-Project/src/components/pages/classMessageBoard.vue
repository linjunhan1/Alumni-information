<template>
  <div class="wrapper">
    <el-card shadow="hover">
      <!-- 面包屑 -->
      <breadCrumb name="我的班级" nameChirend="班级留言板"></breadCrumb>
      <!-- 搜索框 -->
      <el-row>
        <el-col :span="6">
          <div class="serch">
            <el-input placeholder="搜索关键字">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-col>
      </el-row>
      <el-divider content-position="left">头上一片晴天，心中一个想念</el-divider>
      <el-table :data="post" style="width: 100%" :show-header="false">
        <el-table-column prop="time" label="日期" width="180" :formatter="forDate"></el-table-column>
        <el-table-column prop="text" label="留言"></el-table-column>
        <el-table-column prop="img" label="图片">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.img"
              :fit="fit"
              @click="dialogVisible = true"
            ></el-image>

            <el-dialog :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
              <img :src="scope.row.img" />
              >
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
      <!-- 留言 -->
      <el-row>
        <el-form :model="goodinfo" ref="form" label-width="100px" class="demo-ruleForm">
          <el-col :span="20">
            <el-form-item label="留言">
              <el-input v-model="form.text"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="20">
            <el-form-item>
              <el-upload
                action="#"
                :limit="1"
                ref="upload"
                :multiple="true"
                :auto-upload="false"
                :file-list="fileList"
                list-type="picture-card"
                :on-exceed="handleExceed"
              >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">上传图片大小不超过500kb并且只能上传一张图片哦</div>
              </el-upload>
            </el-form-item>
          </el-col>

          <el-col :span="20">
            <el-form-item>
              <el-button type="primary" @click="submitUpload">立即创建</el-button>
              <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>>
    </el-card>
  </div>
</template>

<script>
import breadCrumb from '../CustomComponent/breadCrumb'
import axios from 'axios'
export default {
  name: '',
  components: { breadCrumb },
  props: {},
  data() {
    return {
      post: [],
      dialogVisible: false,
      form: {
        text: '',
        classId: '',
        userId:''
      },
      fileList: []
    }
  },
  watch: {},
  computed: {},
  methods: {
    //只能上传1张
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    submitUpload() {
      //classid
      this.form.classId = this.$store.classId
      this.form.userId = this.$store.userId
      // 获取到 上传的所有文件，它是一个数组
      const fileArray = this.$refs.upload.uploadFiles
      console.log(fileArray)
      // 实例化FormData对象
      const fd = new FormData()
      // 遍历文件数组，将所有文件存入fd中
      for (let i = 0; i < fileArray.length; i++) {
        // 在这里数组每一项的.raw才是你需要的文件，有疑惑的可以打印到控制台看一下就清楚了
        fd.append('avatar', fileArray[i].raw)
      }
      console.log(this.form)
      // 发送HTTP请求，发送数据
      axios({
        url: 'postClassMessageBoard',
        method: 'post',
        data: fd,
        params: this.form
      }).then(res => {
        console.log(res)
      })
      // //刷新
      this.$router.go(0)
    },

    //获取留言数据
    getPost() {
      var userId = this.$store.userId
      // console.log(this.$store.userId)
      //请求
      axios({
        url: 'classMessageBoard',
        method: 'get',
        // data: fd,
        params: { userId: userId }
      })
        .then(res => {
          console.log(res)
          this.post = res.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created() {
    this.getPost()
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.wrapper {
}
.el-row {
  margin-top: 20px;
}
</style>