<template>
  <div class="wrapper">
    <!-- 头部面包屑 -->
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Introduction' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>公共模块</el-breadcrumb-item>
        <el-breadcrumb-item>校友论坛</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 主体 -->
    <div class="main">
      <!-- <chatLeftMune></chatLeftMune> -->
      <div class="left">
        <ul>
          <li @click="routea('/chat/chatInfo') ;changeFlag()">
            <el-avatar icon="el-icon-chat-dot-round"></el-avatar>
          </li>
          <li @click="routea('/chat/contact');changeFlagA()">
            <el-avatar icon="el-icon-s-custom"></el-avatar>
          </li>
        </ul>
      </div>
      <div class="list" v-if=" flag||flagA">
        <router-view></router-view>
      </div>

      <!-- <div class="bobyChat"><router-view></router-view></div> -->
    </div>
  </div>
</template>

<script>
// import chatLeftMune from '../pages/chatLeftMune'
export default {
  name: '',
  components: {
    // chatLeftMune
  },
  props: {},
  data() {
    return {
      //决定聊天和帖子列表是否显示
      flag: false,
      flagA: false
    }
  },
  watch: {},
  computed: {},
  methods: {
    //路由切换
    routea(path) {
      //  this.$router.push('/chat/chatInfo')
      this.$router.push(path)
    },
    //改变flag  和flagA的值
    changeFlag() {
      this.flag = !this.flag
      this.flagA = false
      // console.log('flag is' + this.flag)
      // console.log('flagA is' + this.flagA)
    },
    changeFlagA() {
      this.flagA = !this.flagA
      this.flag = false
      // console.log('flag is' + this.flag)
      // console.log('flagA is' + this.flagA)
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
.wrapper {
}
// 主体
.main {
  height: 780px;
  background: #f0f0f0;
  display: flex;
  .list {
    background: #e4e7ed;
    width: 30%;
  }
}

.left {
  background: #45a6db;
  width: 7%;
  min-width: 100px;
  height: 100%;
}
ul {
  padding: 20px;
}

li {
  width: 100px;
  height: 100px;
}
.list {
  overflow: scroll;
}
.bobyChat {
  height: 100%;
  background: #dcdfe6;
  flex-grow: 1;
}
</style>