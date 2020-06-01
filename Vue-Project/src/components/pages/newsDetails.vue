<template>
  <div class="wrapper">
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Introduction' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/news' }">校园新闻</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card shadow="always">
          <h3>{{title}}</h3>
          <p>
              <span>{{date|dateFilter}}</span> &nbsp; &nbsp; &nbsp; &nbsp;
              点赞数：{{goodnum}}
          </p>
          
          <div>{{text}}</div>
          
          
          </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      id: '',
      text: '',
      date: '',
      goodnum: '',
      title: ''
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {
    this.id = this.$route.params.scope.row.id
    this.text = this.$route.params.scope.row.text
    this.date = this.$route.params.scope.row.date
    this.goodnum = this.$route.params.scope.row.goodnum
    this.title = this.$route.params.scope.row.title
  }
}
</script>
<style lang="less" scoped>
.wrapper {
}
.el-card{
  height: 780px;
}
</style>