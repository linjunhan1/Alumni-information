<template>
  <div class="wrapper">
    <el-card>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="学号" prop="studentid">
          <el-input v-model="ruleForm.studentid"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="微信" prop="wechat">
          <el-input v-model="ruleForm.wechat"></el-input>
        </el-form-item>
        <el-form-item label="所在班级" prop="val">
          <el-cascader
            v-model="val"
            placeholder="试试搜索：软件工程1班"
            :options="options"
            filterable
            @change="handleItemChange"
          ></el-cascader>
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
          <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
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
      vals: [],
      val: [],
      options: [
        
      ],
      ruleForm: {
        studentid: '',
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
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    getCascaderObj(val, opt) {
      return val.map(function(value, index, array) {
        for (var itm of opt) {
          if (itm.value == value) {
            opt = itm.children
            return itm
          }
        }
        return null
      })
    },
    handleItemChange() {
      this.vals = this.$options.methods.getCascaderObj(this.val, this.options)
      this.form.ruleForm.bj = this.vals
      console.log(this.vals)
    },
    hdxlk() {
      axios({
        url: 'xsjl',
        method: 'get'
        // params: this.val[0]
      })
        .then(res => {
          console.log()
          this.options = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    submitForm() {
      var _this = this
      axios({
        url: 'tjxs',
        method: 'post',
        params: { bj: _this.val, xx: _this.ruleForm }
      })
        .then(res => {
          console.log(res)
          if (res.data == '存在') {
            _this.$message('该学生已经存在，请不要重复添加')
            return
          }
          _this.$message({
            message: '恭喜你，添加成功',
            type: 'success'
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },

  created() {
    this.hdxlk()
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.wrapper {
}
</style>