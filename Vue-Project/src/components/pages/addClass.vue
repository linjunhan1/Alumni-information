<template>
  <div class="wrapper">
    <el-card>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="班级名称">
          <el-input v-model="form.bj" placeholder="如：软件工程1班"></el-input>
        </el-form-item>
        <el-form-item label="所在年级">
          <el-select v-model="form.nj" placeholder="请选择年级">
            <!-- <el-option label="2010级" value="2010"></el-option> -->
            <el-option v-for="item in piles" :label="item.nj" :value="item.nj" :key="item.index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="班级描述">
          <el-input type="textarea" v-model="form.bjms"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即添加</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'addClass',
  components: {},
  props: {},
  data() {
    return {
      piles: [],
      form: {
        bj: '',
        nj: '',
        bjms: ''
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    xialakuan() {
      axios
        .get('njxlk')
        .then(res => {
          console.log(res)
          this.piles = res.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    onSubmit() {
      var _this = this
      axios({
        url: 'tjbj',
        method: 'post',
        params: _this.form
      })
        .then(res => {
          console.log(res)
          if (res.data == '存在') {
            _this.$message('班级已经存在，请不要重复添加')
            return
          }
          _this.$message({
            message: '添加成功',
            type: 'success'
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.xialakuan()
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.wrapper {
}
.el-card {
  height: 800px;
}
</style>