<template>
  <div class="wrapper">
    <el-card>
      <el-input placeholder="请输入用户账号" v-model="input3" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="用户账号" value="username"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="serchGet()"></el-button>
      </el-input>
      <!-- 搜索结果 -->
      <div v-if="flag">
        <el-divider content-position="left">搜索结果</el-divider>
        <el-table :data="serchData" border>
          <el-table-column fixed prop="username" label="账户" width="150"></el-table-column>
          <el-table-column prop="className" label="管理的班级" width="120"></el-table-column>
          <el-table-column prop="myclass" label="就读或就职的班级" width="300"></el-table-column>
          <el-table-column prop="role" label="角色" width="120">
            <template slot-scope="scope">{{scope.row.role == 'classManagement'?'班级管理员':scope.row.role == 'root'?'系统管理员':scope.row.role == 'ordinary'?'普通用户':'无'}}</template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="b(scope.row.username),handleClick(scope.row)" type="text" size="small">班级管理员</el-button>
              
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 班级管理员列表 -->
      <el-divider content-position="left">班级管理员列表</el-divider>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="账户" width="120">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column prop="className" label="管理的班级" width="300"></el-table-column>

        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              @click="a(scope.row.username),handleClick(scope.row)"
              type="text"
              size="small"
            >普通用户</el-button>
            <el-button
              @click="b(scope.row.username),handleClick(scope.row)"
              type="text"
              size="small"
            >班级管理员</el-button>
            <el-button
              @click="c(scope.row.username),handleClick(scope.row)"
              type="text"
              size="small"
            >系统管理员</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      multipleSelection: [],
      rowUserName: '',
      select: 'username',
      serchData: [],
      serch: '',
      input3: '',
      flag: false
    }
  },
  watch: {
    serchData: function() {
      if (JSON.stringify(this.serchData) !== '[]') {
        this.flag = true
        return
      }
      this.flag = false
      this.$message('无搜索结果，请查看是否输入有误')
    }
  },
  computed: {},
  methods: {
    serchGet() {
      var serch = this.input3
      var select = this.select
      var _this = this
      console.log(select)
      axios({
        url: 'serch',
        method: 'get',
        params: { serch: serch, select: select }
      })
        .then(res => {
          _this.serchData = res.data
          console.log(_this.serchData)
        })
        .catch(err => {
          console.log(err)
        })
    },
    //更改权限
    handleCommand(command) {
      this.$message('成功更改权限')
    },
    a(val) {
      this.select = 'ordinary'
      var role = this.select
      var username = val
      var self = this
      axios({
        url: 'modifyManageClass',
        method: 'post',
        params: { role: role, username: username }
      })
        .then(res => {
          self.$message({
            message: '成功更改权限',
            type: 'success'
          })
          setTimeout(2000)
          self.$router.go(0)
        })
        .catch(err => {
          console.log(err)
        })
    },
    b(val) {
      this.select = 'classManagement'
      var role = this.select
      var username = val
      var self = this
      axios({
        url: 'modifyManageClass',
        method: 'post',
        params: { role: role, username: username }
      })
        .then(res => {
          self.$message({
            message: '成功更改权限',
            type: 'success'
          })
          self.$router.go(0)
        })
        .catch(err => {
          console.log(err)
        })
    },
    c(val) {
      this.select = 'root'
      var role = this.select
      var username = val
      var self = this
      axios({
        url: 'modifyManageClass',
        method: 'post',
        params: { role: role, username: username }
      })
        .then(res => {
          self.$message({
            message: '成功更改权限',
            type: 'success'
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    test() {
      alert('test')
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleClick(row) {
      console.log(this.select)
    },
    //管理员列表
    getList() {
      axios({
        url: 'getManageClass',
        method: 'get'
      })
        .then(res => {
          console.log(res)
          this.tableData = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.getList()
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.wrapper {
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-card{
  height: 780px;
}
</style>