<template>
  <el-container>
    <el-header class="header" >
      <el-row :gutter="20">
        <el-col :span="6">
          <span class="title">校友信息管理系统</span>
        </el-col>
        <el-col :span="2" :offset="16">
          <!-- <el-button type="info" icon="el-icon-circle-close" circle @click="loginout()"></el-button> -->
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            class="avatar"
          ></el-avatar>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="15%" :width="isCollapse ? '65px':'282.3px'">
       <div class="pack-up" @click="packOrNo()" >
          {{pickOrNotText === false? "收起":"展开"}}
       </div>

        <el-menu
          background-color="#409eff"
          text-color="#fff"
          active-text-color="#ffd04b"
          class="nav"
          unique-opened
          :collapse ="isCollapse"
          collapse-transition
          :default-active = "pathActive"
          router
        >
        <el-menu-item index="/Introduction" @click="savePath('Introduction')">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span></span>
      </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-platform"></i>
              <span>公共模块</span>
            </template>
            <el-menu-item index="/news" @click="savePath('news')">
              <template slot="title">
                <i class="el-icon-s-comment
"></i>
                <span>校园新闻</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/fc" @click="savePath('fc')">
                 <template slot="title">
                <i class="el-icon-s-custom
"></i>
                <span>校友风采</span>
              </template>
                </el-menu-item>
            <el-menu-item index="/LeaveMessage"  @click="savePath('LeaveMessage')">
                <template slot="title">
                <i class="el-icon-edit-outline
"></i>
                <span>校友留言</span>
              </template>
                </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-coffee-cup"></i>
              <span>校友论坛</span>
            </template>
            <el-menu-item index="/post" @click="savePath('post')">
                <template slot="title">
                <i class="el-icon-files
"></i>
                <span>帖子</span>
              </template>
               </el-menu-item>
           
          </el-submenu>
          <!-- //v-if="this.$store.role == 'classManagement'" -->
          <el-submenu index="4">  
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>班级管理员</span>
            </template>
            <el-menu-item index="/managementPhoto" @click="savePath('managementPhoto')">
                <template slot="title">
                <i class="el-icon-picture-outline
"></i>
                <span>管理相册</span>
              </template></el-menu-item>
            <el-menu-item index="/manageMessageBoard" @click="savePath('manageMessageBoard')">
                <template slot="title">
                <i class="el-icon-s-order

"></i>
                <span>管理班级留言板</span>
              </template>
                </el-menu-item>
            <el-menu-item index="/classSrc" @click="savePath('classSrc')">
                <template slot="title">
                <i class="el-icon-folder
"></i>
                <span>管理班级公告和资源</span>
              </template></el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-s-home"></i>
              <span>我的班级</span>
            </template>
            <el-menu-item index="/classMessageBoard" @click="savePath('classMessageBoard')">
                <template slot="title">
                <i class="el-icon-chat-line-square"></i>
                <span>班级留言板</span>
              </template></el-menu-item>
            <el-menu-item index="/classPhotoAlbum" @click="savePath('classPhotoAlbum')">
                <template slot="title">
                <i class="el-icon-picture
"></i>
                <span>班级相册</span>
              </template></el-menu-item>
            <!-- <el-menu-item index="/myClassSrc" @click="savePath('myClassSrc')">
                <template slot="title">
                <i class="el-icon-s-opportunity
"></i>
                <span>班级公告和班级文件</span>
              </template></el-menu-item> -->
              
              <el-menu-item index="/classAddressBook" @click="savePath('classAddressBook')">
                <template slot="title">
                <i class="el-icon-s-management
"></i>
                <span>班级通讯录</span>
              </template></el-menu-item>



          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>系统管理员</span>
            </template>
            <el-menu-item index="/manageClassAdministrator" @click="savePath('manageClassAdministrator')">
                <template slot="title">
                <i class="el-icon-setting
"></i>
                <span>管理班级管理员</span>
              </template>
               </el-menu-item>
                <el-menu-item index="/tjnj" @click="savePath('tjnj')">
                <template slot="title">
                <i class="el-icon-plus
"></i>
                <span>添加年级</span>
              </template>
               </el-menu-item>
               <el-menu-item index="/njwh" @click="savePath('njwh')">
                <template slot="title">
                <i class="el-icon-s-flag

"></i>
                <span>年级维护</span>
              </template>
               </el-menu-item>
            <el-menu-item index="/addClass" @click="savePath('addClass')">
                <template slot="title">
                <i class="el-icon-s-grid

"></i>
                <span>添加班级</span>
              </template>
               </el-menu-item>
               <el-menu-item index="/banjiweihu" @click="savePath('banjiweihu')">
                <template slot="title">
                <i class="el-icon-d-caret"></i>
                <span>班级维护</span>
              </template>
               </el-menu-item>
              
               <el-menu-item index="/tjxs" @click="savePath('tjxs')">
                <template slot="title">
                <i class="el-icon-s-check
"></i>
                <span>添加学生信息</span>
              </template>
               </el-menu-item>
               <el-menu-item index="/xswh" @click="savePath('xswh')">
                <template slot="title">
                <i class="el-icon-news
"></i>
                <span>学生信息维护</span>
              </template>
               </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>

import axios from 'axios';
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
        isCollapse:false,
        pickOrNotText:false,
        //当前激活的菜单
        pathActive:''
    }
  },
  watch: {},
  computed: {},
  methods: {
    // 退出登录状态并返回到主页面
    loginout() {
      window.sessionStorage.clear()
      this.$router.push('/main')
      console.log('退出登录状态--成功')
    },


     getMenu(){
        // console.log('执行菜单获取函数中...')
         
         axios .get( 'meun')
          .then(function (response) {
    // console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  });  
            
    },
     //菜单张开或者收缩
  packOrNo(){
    this.isCollapse =!this.isCollapse
    console.log(this.isCollapse),
    this.pickOrNotText=!this.pickOrNotText
    
  },
  //把激活的菜单对应的值存到缓存中
  savePath(path){
      this.pathActive ='/'+ path;
    window.sessionStorage.setItem('menuPath',path)
    
}
},

  created() {
      //获取菜单数据
      this.getMenu(),
      //将meun缓存放到变量pathActive
        this.pathActive ='/'+ window.sessionStorage.getItem('menuPath')
        
        //将role从缓存放入vuex
        this.$store.role = window.sessionStorage.getItem('role')
        //将userId从缓存放入vuex
        this.$store.userId = window.sessionStorage.getItem('userId')
        //将classId从缓存放入vuex
        this.$store.classId = window.sessionStorage.getItem('classId')
        
  },
 
  mounted() {}
}
</script>
<style lang="less" scoped>
.wrapper {
}

.el-header {
  background: #409eff;
  padding-bottom: 10px
}
.el-aside {
  background: #409eff;
  overflow-x: hidden;
}
.el-main {
  background: rgb(121, 188, 255);
//   overflow: hidden;
}

.el-container {
  height: 100%;
  
}
//标题字体样式
.title {
  font-size: 25px;
  line-height: 1.7;
  color: white;
}
.el-row {
  height: 100%;
}
.el-col {
  height: 100%;
}

.nav {
  width: 100%;
}
//收起或张开
.pack-up{
   text-align: center;
    border:2px solid white ;
   line-height:  30px;
    font-size: 15px;
    color: white  ;
    cursor: pointer; 
}
</style>