<template>
  <div class="wrapper">
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <!-- <el-table-column fixed prop="num" label="序号" width="150"></el-table-column> -->
        <el-table-column prop="bj" label="班级" width="120"></el-table-column>
        <el-table-column prop="nj" label="所在年级" width="120" :formatter="nj"></el-table-column>
        <el-table-column prop="bjms" label="班级备注">
          <template slot-scope="{row}">{{ row.bjms || '无备注' }}</template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row);dialogVisible=true;getnj()"
              type="text"
              size="small"
            >修改</el-button>
            <el-button type="text" size="small" @click="sc(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 弹框 -->
      <el-dialog title="修改班级" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <span slot="footer" class="dialog-footer">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="班级">
              <el-input v-model="form.bj" placeholder="如：2020" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="所在年级">
              <el-select v-model="form.nj" placeholder="请选择年级" :disabled="true">
                <el-option v-for="item in njdata" :label="item.nj" :value="item.nj" :key="item.index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="班级描述" >
              <el-input type="textarea" v-model="form.bjms"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updata">确定修改</el-button>
              <el-button @click="dialogVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </span>
      </el-dialog>

      <!-- 确定删除？弹框 -->
      <el-dialog title="确定删除该班级吗？" :visible.sync="ifdelate" width="30%" :before-close="handleClose">
        <span slot="footer" class="dialog-footer">
          您要删除的班级是{{form.bj}}
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
      njdata: [],
      tableData: [],
      dialogVisible: false,
      form: {
        bj: '',
        bjms: '',
        nj: ''
      },
      ifdelate: false
    }
  },
  watch: {},
  computed: {},
  methods: {
    getnj() {
      axios({
        url: 'njxlk',
        method: 'get'
        // params: _this.form
      })
        .then(res => {
          console.log(res)
          this.njdata = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    sc(res) {
      this.ifdelate = true
      this.form.bj = res.bj
      this.form.nj = res.nj
    },
    handleClick(data) {
      this.form.bj = data.bj
      this.form.bjms = data.bjms
      this.form.nj = data.nj
    },
    getdata() {
      axios({
        url: 'bjwh',
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
        url: 'scbj',
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
        url: 'xgbj',
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