<template>
  <div class="login-div">
    <div class="title">校友信息系统</div>
    <div class="login-main">
      <!-- 头像部分 -->
      <div class="login-avatar">
        <img :src="avatarurl" />
      </div>
      <!-- //表单部分 -->
      <div class="from">
        <el-form label-width="80px" :model="loginForm" :rules="loginRules" ref="loginfrom">
          <el-form-item label="账号" prop="userId">
            <el-input
              placeholder="请输入账号"
              v-model="loginForm.userId"
              suffix-icon="el-icon-user-solid"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              placeholder="请输入密码"
              v-model="loginForm.password"
              type="password"
              suffix-icon="el-icon-lock"
              auto-complete="new-password"
              @keyup.enter.native="searchEnterFun"
            ></el-input>
          </el-form-item>
          <div class="loginbox">
            <el-button type="primary" @click="loginValidation" id="login">登录</el-button>
            <el-button type="info" @click="resiterFrom">重置</el-button>

            <el-button type="info" @click="goToRegiter">注册账号</el-button>
            <el-button type="info" @click="Visitorslogin">游客登录</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'login',
  components: {},
  props: {},
  data() {
    return {
      avatarurl: require('../../assets/.png/man.png'),
      loginForm: {
        userId: '',
        password: ''
      },
      //   表单验证规则
      loginRules: {
        // 账号
        userId: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' }
        ],
        // 密码
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    //回车时
    searchEnterFun(e) {
      var keyCode = window.event ? e.keyCode : e.which
      // console.log('回车搜索',keyCode,e);
      if (keyCode === 13) {
        this.$options.methods.loginValidation()
        // document.getElementById("login").onclick()
      }
    },
    test(){
alert("123")
    },
    //游客登录
    Visitorslogin() {
      this.$router.push('/main')
    },
    resiterFrom() {
      this.$refs.loginfrom.resetFields()
    },
    // 登录提示框
    succcessPro() {
      this.$message({
        showClose: true,
        message: '成功登陆',
        type: 'success'
      })
    },
    failurePro() {
      this.$message({
        showClose: true,
        message: '密码账号不匹配',
        type: 'warning'
      })
    },
    errPro() {
      this.$message({
        showClose: true,
        message: '请求错误',
        type: 'error'
      })
    },
    // 表单预验证
    loginValidation() {
      this.$refs.loginfrom.validate(async vaid => {
        if (vaid === true) {
          console.log('表单验证成功')
          var logindata = this.loginForm

          axios
            .post('login', logindata)
            .then(response => {
              console.log(response)
              if (response.data.msg == '登录失败') {
                this.failurePro()
                return
              }
              //  console.log(this.$message);
              if (response.status === 200 && response.data.msg != '登录失败') {
                this.succcessPro()
                // token缓存到sessionStorage
                window.sessionStorage.setItem('token', response.data.token)
                // role缓存到sessionStorage
                window.sessionStorage.setItem('role', response.data.role)
                // userId缓存到sessionStorage
                window.sessionStorage.setItem('userId', response.data.userId)
                // classId缓存到sessionStorage
                window.sessionStorage.setItem('classId', response.data.classId)
                this.$router.push('/main')
                console.log('成功跳转到main页面')
                return
              }
              this.errPro()
              return
            })
            .catch(function(error) {
              console.log(error)
              this.$message('这是一条消息提示')
            })
        } else {
          console.log('表单验证失败')
          this.failurePro()
        }
      })
    },
    goToRegiter() {
      this.$router.push('/registered')
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
.login-div {
  background: #409eff;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-image: url('../../assets/.png/bg.jpg');
  align-items: center;
}
.login-main {
  height: 60%;
  width: 30%;
  background: #dcdfe6;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  box-shadow: 0px 0px 10px black;
  transform: translateY(30%);
}
.login-avatar {
  width: 25%;
  height: 25%;
  border: 2px solid #409eff;
  padding: 3%;
  border-radius: 50%;
  background: #ebeef5;
  box-shadow: 0px 0px 10px black;
  transform: translateY(-50%);
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #409eff;
  }
}
.from {
  width: 80%;
  height: 70%;
  background-color: #ebeef5;
  transform: translateY(-15%);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 10%;
  padding-right: 10%;
  padding-bottom: 15px;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px black;
}
.loginbox {
  display: flex;
  justify-content: flex-end;
}
// .login-button {
// }
.title {
  font-size: 60px;
  color: white;
}
</style>
