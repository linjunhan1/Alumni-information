<template>
   <!-- 头部面包屑 -->
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Introduction' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item >{{name}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{nameChirend}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
</template>

<script>
export default {
name:'',
  components: {},
  props: {},
  data() {
    return {
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {},
  props:[
    'name',
    'nameChirend'
  ]
};
</script>
<style lang="less" scoped>
.wrapper{}
</style>