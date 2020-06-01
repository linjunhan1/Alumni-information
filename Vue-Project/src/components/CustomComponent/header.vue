<template>
  <div class="wrapper">333
    <el-row :gutter="20">
      <el-col :span="6">
        <span class="title">校友信息管理系统</span>
      </el-col>
      <el-col :span="2" :offset="16">
        <!-- <el-button type="info" icon="el-icon-circle-close" circle @click="loginout()"></el-button> -->
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        
        ></el-avatar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {}
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
.wrapper {
  background: red;
  padding-bottom: 10px;
}
//标题字体样式
.title {
  font-size: 25px;
  line-height: 1.7;
  color: white;
}
</style>