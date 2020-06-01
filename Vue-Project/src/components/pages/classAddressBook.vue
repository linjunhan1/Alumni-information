<template>
  <div class="wrapper">
    <bread name="我的班级" nameChirend="班级通讯录"></bread>
    <el-card>
      <el-tabs value="first">
        <el-tab-pane label="编辑通讯录" name="first">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="微信" prop="wechat">
              <el-input v-model="ruleForm.wechat"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phoneNum">
              <el-input v-model="ruleForm.phoneNum" maxlength="11"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="现居住城市" prop="livingCity">
              <el-input v-model="ruleForm.livingCity"></el-input>
            </el-form-item>
            <el-form-item label="现职位" prop="nowPosition">
              <el-input v-model="ruleForm.nowPosition"></el-input>
            </el-form-item>
            <el-form-item label="毕业去向" prop="graduationToWhere">
              <el-input v-model="ruleForm.graduationToWhere"></el-input>
            </el-form-item>
            <el-form-item label="毕业第三年后职位" prop="threeYearsAfterGraduation">
              <el-input v-model="ruleForm.threeYearsAfterGraduation"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="查看通讯录" name="second">
          <el-table :data="tableData" height="600" border style="width: 100%" id="myTable">
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="wechat" label="微信" width="180"></el-table-column>
            <el-table-column prop="phoneNum" label="手机号码" width="180"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
            <el-table-column prop="livingCity" label="现居住城市" width="180"></el-table-column>
            <el-table-column prop="nowPosition" label="现职位" width="180"></el-table-column>
            <el-table-column prop="graduationToWhere" label="毕业去向" width="180"></el-table-column>
            <el-table-column prop="threeYearsAfterGraduation" label="毕业第三年后职位"></el-table-column>
          </el-table>
          <el-button @click="exportToExcel">下载通讯录</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import bread from '../CustomComponent/breadCrumb'
import axios from 'axios'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  name: '',
  components: { bread },
  props: {},
  data() {
    return {
      ruleForm: {
        name: '',
        wechat: '',
        phoneNum: '',
        email: '',
        livingCity: '',
        nowPosition: '',
        graduationToWhere: '',
        threeYearsAfterGraduation: '',
        classId: '',
        userId: ''
      },
      rules: {
        name: [
          { required: false, message: '请输入姓名', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ],
        wechat: [
          { required: false, message: '请输入微信号', trigger: 'blur' },
          {
            min: 6,
            message: '微信号通常大于等于6个字符，请认真输入哦',
            trigger: 'blur'
          }
        ],
        phoneNum: [
          { required: false, message: '请输入手机号', trigger: 'blur' },
          {
            min: 11,
            max: 11,

            message: '手机号有11位数哦',
            trigger: 'blur'
          }
        ],
        email: [
          { required: false, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ],
        livingCity: [
          { required: false, message: '请输入现居住城市', trigger: 'blur' },
          {
            trigger: 'blur'
          }
        ],

        nowPosition: [
          { required: false, message: '请输入现职位', trigger: 'blur' }
        ],
        graduationToWhere: [
          { required: false, message: '请输入毕业去向', trigger: 'blur' }
        ],
        threeYearsAfterGraduation: [
          {
            required: false,
            message: '请输入毕业第三年后职位',
            trigger: 'blur'
          }
        ]
      },
      //通讯录
      tableData: []
    }
  },
  watch: {},
  computed: {},
  methods: {
    //导出Excel
    exportToExcel() {
      let et = XLSX.utils.table_to_book(document.querySelector('#myTable')) //此处传入table的DOM节点
      console.log(11, et)
      let etout = XLSX.write(et, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          new Blob([etout], {
            type: 'application/octet-stream'
          }),
          '班级通讯录.xlsx'
        ) //trade-publish.xlsx 为导出的文件名
      } catch (e) {
        console.log(e, etout)
      }
      return etout
    },
    //通讯录加载
    getClassAddressBook() {
      var classId = this.$store.classId
      axios({
        url: 'getClassAddressBook',
        method: 'get',
        params: { classId: classId }
      })
        .then(res => {
          console.log(res)
          this.tableData = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({
            message: '成功添加入通讯录',
            type: 'success'
          })
          this.$router.go(0)

          this.postFrom()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    postFrom() {
      this.ruleForm.classId = this.$store.classId
      this.ruleForm.userId = this.$store.userId
      axios({
        url: 'postClassAddressBook',
        method: 'post',
        params: this.ruleForm
      })
        .then(res => {})
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    //通讯录加载
    this.getClassAddressBook()
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.wrapper {
}
</style>