<template>
  <div class="wrapper">
    <el-card>
      <el-cascader
        :props="props"
        v-model="val"
        placeholder="试试搜索：软件工程1班"
        :options="options"
        filterable
        @change="handleItemChange"
      ></el-cascader>
      <el-button type="primary" icon="el-icon-search" @click="serch"></el-button>

      <el-table :data="tableData" border style="width: 100%" id="myTable">
        <el-table-column prop="studentid" label="学号" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="90"></el-table-column>
        <el-table-column prop="nj" label="年级" width="90"></el-table-column>
        <el-table-column prop="bj" label="班级" width="180"></el-table-column>
        <el-table-column prop="wechat" label="微信" width="180"></el-table-column>
        <el-table-column prop="phoneNum" label="手机号码" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="livingCity" label="现居住城市" width="90"></el-table-column>
        <el-table-column prop="nowPosition" label="现职位" width="180"></el-table-column>
        <el-table-column prop="graduationToWhere" label="毕业去向" width="90"></el-table-column>
        <el-table-column prop="threeYearsAfterGraduation" label="毕业第三年后职位"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row);dialogVisible=true"
              type="text"
              size="small"
            >修改</el-button>
            <el-button type="text" size="small" @click="sc(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 确定删除？弹框 -->
      <el-dialog
        title="确定删除该学生信息吗？"
        :visible.sync="ifdelate"
        width="30%"
        :before-close="handleClose"
      >
        <span slot="footer" class="dialog-footer">
          您要删除的学生是{{ruleForm.name}}
          <el-button type="primary" @click="delate">确定删除</el-button>
          <el-button @click="ifdelate = false">取消</el-button>
        </span>
      </el-dialog>
      <!-- 弹框 -->
      <el-dialog
        title="修改学生信息"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <span slot="footer" class="dialog-footer">
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
                placeholder="试试搜索：软件工程"
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
              <el-button type="primary" @click="updata">立即修改</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </span>
      </el-dialog>
      <el-button @click="exportToExcel">下载学生信息</el-button>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      props: { multiple: true },
      select: '',
      input3: '',
      ifdelate: false,
      vals: [],
      val: [],
      options: [],
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
      dialogVisible: false,
      tableData: []
    }
  },
  watch: {},
  computed: {},
  methods: {
    serch() {
      var _this = this
      console.log(this.val.toString())

      // console.log(a)
      axios({
        url: 'ss',
        method: 'post',
        params: { data: _this.val.toString() }
      })
        .then(res => {
          console.log(res)
          this.tableData = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    delate() {
      var _this = this
      this.ifdelate = false

      axios({
        url: 'scxs',
        method: 'post',
        params: _this.ruleForm
      })
        .then(res => {
          console.log(res)
          _this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
        .catch(err => {
          console.log(err)
        })

      setTimeout(() => {
        _this.$router.go(0)
      }, 2000)
    },
    sc(res) {
      this.ifdelate = true
      this.ruleForm.name = res.name
      this.ruleForm.studentid = res.studentid
    },
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
      console.log(this.val)
      this.vals = this.$options.methods.getCascaderObj(this.val, this.options)
      this.form.ruleForm.bj = this.vals
    },
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
          '学生信息.xlsx'
        ) //trade-publish.xlsx 为导出的文件名
      } catch (e) {
        console.log(e, etout)
      }
      return etout
    },
    getdata() {
      axios({
        url: 'xswh',
        method: 'get'
        // params: _this.form
      })
        .then(res => {
          console.log(res)
          this.tableData = res.data
        })
        .catch(err => {
          console.log(err)
        })
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
    handleClick(data) {
      this.ruleForm.studentid = data.studentid
      this.ruleForm.name = data.name
      this.ruleForm.wechat = data.wechat
      this.ruleForm.phoneNum = data.phoneNum
      this.ruleForm.email = data.email
      this.ruleForm.livingCity = data.livingCity
      this.ruleForm.nowPosition = data.nowPosition
      this.ruleForm.graduationToWhere = data.graduationToWhere
      this.ruleForm.threeYearsAfterGraduation = data.threeYearsAfterGraduation
      this.ruleForm.classId = data.classId
      this.ruleForm.userId = data.userId
    },
    updata() {
      var _this = this
      axios({
        url: 'xgxs',
        method: 'post',
        params: { bj: _this.val, xx: _this.ruleForm }
      })
        .then(res => {
          console.log(res)
          if (res.data == '修改成功') {
            _this.$message({
              message: '恭喜你，修改成功',
              type: 'success'
            })
            return
          }
          _this.$message('修改失败')
        })
        .catch(err => {
          console.log(err)
        })

      this.dialogVisible = false
      setTimeout(() => {
        _this.$router.go(0)
      }, 2000)
    }
  },
  created() {
    this.getdata()
    this.hdxlk()
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.wrapper {
}
</style>