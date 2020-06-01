<template>
  <div class="wrapper">
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <!-- <el-table-column fixed prop="num" label="序号" width="150"></el-table-column> -->
        <el-table-column prop="nj" label="年级" width="120" :formatter="nj"></el-table-column>
        <el-table-column prop="ms" label="年级备注">
          <template slot-scope="{row}">{{ row.ms || '无备注' }}</template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
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

      <!-- 弹框 -->
      <el-dialog title="修改年级" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <span slot="footer" class="dialog-footer">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="年级">
              <el-input v-model="form.nj" placeholder="如：2020" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="描述">
              <el-input type="textarea" v-model="form.ms"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updata">确定修改</el-button>
              <el-button @click="dialogVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </span>
      </el-dialog>

      <!-- 确定删除？弹框 -->
      <el-dialog title="确定删除该年级吗？" :visible.sync="ifdelate" width="30%" :before-close="handleClose">
        <span slot="footer" class="dialog-footer">
          您要删除的是{{form.nj}}级
          <el-button type="primary" @click="delate">确定删除</el-button>
          <el-button @click="ifdelate = false">取消</el-button>
        </span>
      </el-dialog>
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
      tableData: [],
      dialogVisible: false,
      form: {
        nj: '',
        ms: ''
      },
      ifdelate: false
    }
  },
  watch: {},
  computed: {},
  methods: {
    sc(res) {
      this.ifdelate = true
      this.form.nj = res.nj
    },
    handleClick(data) {
      this.form.nj = data.nj
      this.form.ms = data.ms
    },
    getdata() {
      axios({
        url: 'njwh',
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
    delate() {
      var _this = this
      this.ifdelate = false
      axios({
        url: 'scnj',
        method: 'post',
        params: _this.form
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
    updata() {
      var _this = this
      axios({
        url: 'xgnj',
        method: 'post',
        params: _this.form
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      this.dialogVisible = false
      this.$message({
        message: '修改成功',
        type: 'success'
      })
      setTimeout(() => {
        _this.$router.go(0)
      }, 2000)
    }
  },
  created() {
    this.getdata()
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.wrapper {
}
.el-card {
  height: 780px;
}
</style>