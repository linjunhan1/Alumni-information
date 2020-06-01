<template>
  <div class="wrapper">
    <el-card>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column fixed prop="time" label="日期" width="120"  :formatter="forDate"></el-table-column>
        <el-table-column prop="text" label="内容"></el-table-column>
        <el-table-column prop="img" label="图片">
          <template slot-scope="scope">
            <el-image style="width: 100px; height: 100px" :src="scope.row.img" :fit="fit"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-button type="danger" v-if="multipleSelectionFlag" @click="popDelete">批量删除</el-button>
      <el-dialog :visible.sync="multiDeleteVisible" title="提示" width="30%">
        <span>确定要删除吗</span>
        <span slot="footer">
          <el-button type="primary" @click="multiDelete">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
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
      //批量删除
      multipleSelectionFlag: false,
      multiDeleteVisible: false,
      multipleSelection: '' //删除的信息
    }
  },
  watch: {},
  computed: {},
  methods: {
    // 删除
    multiDelete() {
      this.multiDeleteVisible = false
      let checkArr = this.multipleSelection // multipleSelection存储了勾选到的数据
      let params = []
      const self = this
      let classId = this.multipleSelection[0].classId
      checkArr.forEach(function(item) {
        params.push(item.id) // 添加所有需要删除数据的id到一个数组，post提交过去
      })

      //  $http即是axios，可以在main.js里面设置 Vue.prototype.$http = axios;
      //请求
      axios({
        url: 'deleteMessage',
        method: 'get',
        // data: fd,
        params: { id: params + '', classId: classId }
      })
        .then(res => {
          console.log(res)
          self.$message({
            message: '成功删除',
            type: 'success'
          })
          self.$router.go(0)
        })
        .catch(error => {
          console.log(error)
          self.$message.error(`删除失败：错误信息:${error}`)
        })
    },

    //点击全选按钮
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
      this.multipleSelectionFlag = true
      if (this.multipleSelection.length == 0) {
        // 如不进行判断则勾选完毕后批量删除按钮还是会在
        this.multipleSelectionFlag = false
      }
    },
    popDelete() {
      this.multiDeleteVisible = !this.multiDeleteVisible
    },

    //点击删除
    handleClick(data) {
      let classId = data.classId
      let id = data.id
      const self = this
      //请求
      axios({
        url: 'deleteMessage',
        method: 'get',
        // data: fd,
        params: { id: id, classId: classId }
      })
        .then(res => {
          console.log(res)
          self.$message({
            message: '恭喜你，删除成功',
            type: 'success'
          })
          self.$router.go(0)
        })
        .catch(error => {
          console.log(error)
          self.$message.error(`删除失败：错误信息:${error}`)
        })
      console.log(data)
      
    },
    //获取留言数据
    getPost() {
      var userId = this.$store.userId
      // console.log(this.$store.userId)
      //请求
      axios({
        url: 'manageMessageBoard',
        method: 'get',
        // data: fd,
        params: { userId: userId }
      })
        .then(res => {
          console.log(res)
          this.tableData = res.data
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
.el-card{
  height: 780px;
}
</style>