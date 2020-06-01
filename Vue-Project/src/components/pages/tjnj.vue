<template>
  <div class="wrapper">
    <el-card>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="年级">
          <el-input v-model="form.nj" placeholder="如：2020"></el-input>
        </el-form-item>

        <el-form-item label="描述">
          <el-input type="textarea" v-model="form.ms"></el-input>
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
  name: '',
  components: {},
  props: {},
  data() {
    return {
      form: {
        nj: '',
        ms: ''
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    onSubmit() {
      var _this = this
      axios({
        url: 'tjnj',
        method: 'post',
        params: _this.form
      })
        .then(res => {
          console.log(res)
          const data = res.data
          if (data == '存在') {
            _this.$message('该年级已经存在，请不要重复添加哦')
            return
          }
          if (data == '成功存入') {
            _this.$message({
              message: '添加年级成功',
              type: 'success'
            })
            return
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
.wrapper {
}
.el-card {
  height: 750px;
}
</style>