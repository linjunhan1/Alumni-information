<template>
  <div class="wrapper">
    <el-card>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="1月2号组织大家春游" name="1">
          <div>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</div>
          <div>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</div>
        </el-collapse-item>
        <el-collapse-item title="1月3号组织大家等泰山" name="2">
          <div>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</div>
          <div>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</div>
        </el-collapse-item>
        <el-collapse-item title="1月4号组织大家广州一日游" name="3">
          <div>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</div>
          <div>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</div>
          <div>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</div>
        </el-collapse-item>
        <el-collapse-item title="1月5号组织大家献血" name="4">
          <div>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</div>
          <div>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
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
}
.el-card{
  height: 900px;
}
</style>