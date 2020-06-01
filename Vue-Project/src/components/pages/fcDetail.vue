<template>
  <div class="wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Introduction' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/fc' }">校友风采</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/fc' }">校友详情</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
          <h3>{{data.title}}</h3>
          <h5>{{data.time|dateFilter}}</h5>
          <img :src="data.img"/>
          <div>{{data.text}}</div>

      </el-card>
  </div>
</template>

<script>
export default {
name:'',
  components: {},
  props: {},
  data() {
    return {
        data:''
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {
      this.data = this.$route.params
    //   console.log(this.$route.params) 
  }
};
</script>
<style lang="less" scoped>
.wrapper{}
</style>