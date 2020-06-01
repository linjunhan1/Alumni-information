<template>
  <div class="hello">
    <el-row>
      <el-col :span="20">
        <el-menu
          :default-active="$route.path"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#409EFF"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/" class="zydhk">主页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">公共模块</template>
            <el-menu-item index="/news">校园新闻</el-menu-item>
            <el-menu-item index="2-2">校友风采</el-menu-item>
            <el-menu-item index="2-3">校友留言</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">校友论坛</template>
            <el-menu-item index="2-1">帖子</el-menu-item>
            <el-menu-item index="2-2">聊天</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">班级管理员</template>
            <el-menu-item index="2-1">管理相册</el-menu-item>
            <el-menu-item index="2-2">管理班级留言板</el-menu-item>
            <el-menu-item index="2-2">管理班级公告和资源</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">我的班级</template>
            <el-menu-item index="2-1">班级留言板</el-menu-item>
            <el-menu-item index="2-2">班级相册</el-menu-item>
            <el-menu-item index="2-3">班级公告和班级文件</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="4">
        <div class="tx">
          <el-button type="info" icon="el-icon-circle-close" circle @click="loginout()"></el-button>
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <Introduction></Introduction>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Introduction from '../pages/Introduction'
export default {
  components: { Introduction },
  name: 'mainvue',
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    // 退出登录状态并返回到主页面
    loginout() {
      window.sessionStorage.clear()
      this.$router.push('/main')
      console.log('退出登录状态--成功')
    }
  }
}
</script>

<style scoped>
.hello {
  margin: 0%;
  padding: 0;
}
.zydhk {
  margin-left: 32%;
}
.tx {
  background: #409eff;
  height: 61px;
  border-bottom: solid 3px #ffffff;
}
</style>
