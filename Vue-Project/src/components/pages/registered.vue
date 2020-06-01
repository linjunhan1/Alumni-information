<template>
  <div class="wrapper">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="6">
            <span class="title">校友信息管理系统</span>
          </el-col>
          <el-col :span="2" :offset="16">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-card class="box-card">
              <span>注册用户</span>

              <el-divider content-position="center">头上一片晴天，心中一个想念</el-divider>

              <!-- <ul>
                <li>
                  <span class="demonstration"></span>
                 
                </li>
                <li v-if="identity == 'student'">
                
                </li>
                <li>
                  <el-input type="text" placeholder="请输入您的全名" v-model="name" show-word-limit></el-input>
                </li>
              <!-- 如果是职工则显示如下的面框-->
              <!-- <li v-if="identity == 'woker'">
                  <el-input placeholder="请输入职工号" v-model="workerId" clearable></el-input>
                </li>
                <li v-if="identity == 'woker'">
                  <el-input placeholder="请输入您的姓名" v-model="workerName" clearable></el-input>
                </li>
              </ul>-->

              <el-form>
                <el-form-item label="您的身份：">
                  <el-radio v-model="identity" label="student">在读学生、已毕业学生</el-radio>
                  <el-radio v-model="identity" label="woker">教职工（包括已经离职的教职工）</el-radio>
                </el-form-item>
                <el-form-item label="入学年份" v-if="identity == 'student'">
                  <el-date-picker
                    v-model="studentRegisterData.admissionTime"
                    type="monthrange"
                    range-separator="至"
                    start-placeholder="开始月份"
                    end-placeholder="结束月份"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="学号" v-if="identity == 'student'">
                  <el-input placeholder="请输入学号" v-model="studentRegisterData.studentId" clearable></el-input>
                </el-form-item>
                <el-form-item label="学生姓名" v-if="identity == 'student'">
                  <el-input
                    type="text"
                    placeholder="请输入您的全名"
                    v-model="studentRegisterData.studentName"
                    show-word-limit
                  ></el-input>
                </el-form-item>
                <el-form-item label="职工号" v-if="identity == 'woker'">
                  <el-input placeholder="请输入职工号" v-model="workerRegisterData.workerId" clearable></el-input>
                </el-form-item>
                <el-form-item label="职工姓名" v-if="identity == 'woker'">
                  <el-input placeholder="请输入您的姓名" v-model="workerRegisterData.workerName" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码" v-if="identity == 'woker'">
                  <el-input
                    placeholder="请设置密码"
                    v-model="workerRegisterData.workerPassword"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="密码" v-if="identity == 'student'">
                  <el-input
                    placeholder="请设置密码"
                    v-model="studentRegisterData.studentPassword"
                    clearable
                    show-password
                  ></el-input>
                </el-form-item>
                <el-button type="primary" round @click="onSubmit">提交注册</el-button>
                <el-button type="primary" round @click="goLogin">返回登录界面</el-button>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      //身份
      identity: 'student',

      //职工注册信息
      workerRegisterData: {
        //职工号
        workerId: '',
        //职工姓名
        workerName: '',
        //密码
        workerPassword: ''
      },

      //学生注册信息
      studentRegisterData: {
        //入学年月
        admissionTime: '',
        //学号
        studentId: '',
        //姓名
        studentName: '',
        //密码
        studentPassword: ''
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    // l退回登录界面
    goLogin() {
      this.$router.go(-1)
    },

    //注册
    onSubmit() {
      // console.log('onSubmit')
      if (this.identity == 'student') {
        //当为学生时
        //  console.log('当为学生时')
        // console.log(this.studentRegisterData)
        axios
          .post('/stduntRegister', this.studentRegisterData)
          .then(response => {
            console.log(response)

            this.open(response.data)
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        //当为职工时
        axios
          .post('/workerRegister', this.workerRegisterData)
          .then(response => {
            console.log(response)
            this.open_worker(response.data)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    //学生注册失败
    open(res) {
      console.log(res)
      if (res == 3) {
        this.$message('注册失败！不存在这个学号。请检查学号是否写错')
        return
      }
      if (res == 2) {
        this.$message('注册失败！姓名与学号不匹配，请检查姓名是否正确！')
        return
      }

      this.$message({
        message: '恭喜你，注册成功! 即将进入登录界面',
        type: 'success'
      })

      setTimeout(this.goLogin, 3000)
      return
    },

    open_worker(res) {
      if (res == 3) {
        this.$message('系统没有此人信息。请检查职工号或姓名是否写错')
        return
      }
      if (res == 2) {
        this.$message('账号已存在，请直接登录')
        return
      }

      this.$message({
        message: '恭喜你，注册成功，即将进入登录界面',
        type: 'success'
      })
      setTimeout(this.goLogin, 3000)
      return
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
.wrapper {
  background-image: url('../../assets/.png/bg.jpg');
}
.el-header {
  background: #409eff;
  padding-bottom: 10px;
}
//标题字体样式
.title {
  font-size: 25px;
  line-height: 1.7;
  color: white;
}
//mian
.el-main {
  height: 820px;
}
//卡片
.el-card {
  height: 750px;
}
//row
.el-row {
  height: 80%;
}
//卡片内容间距
ul li {
  padding: 10px;
}
</style>