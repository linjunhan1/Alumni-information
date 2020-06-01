import Vue from 'vue'
import Router from 'vue-router'

import main from '@/components/pages/main'
import news from '@/components/pages/news'
import fc from '@/components/pages/fc'
import login from '@/components/pages/login'
import Introduction from '@/components/pages/Introduction'
import LeaveMessage from '@/components/pages/LeaveMessage'
import post from '@/components/pages/post'
import chat from '@/components/pages/chat'
import chatInfo from '@/components/pages/chatInfo'
import contact from '@/components/pages/contact'
import chatInfoDetal from '@/components/pages/chatInfoDetal'
import chatContactDetai from '@/components/pages/chatContactDetai'
import managementPhoto from '@/components/pages/managementPhoto'
import manageMessageBoard from '@/components/pages/manageMessageBoard'
import registered from '@/components/pages/registered'
import classSrc from '@/components/pages/classSrc'
import classMessageBoard from '@/components/pages/classMessageBoard'
import classPhotoAlbum from '@/components/pages/classPhotoAlbum'
import myClassSrc from '@/components/pages/myClassSrc'
import newsDetails from '@/components/pages/newsDetails'
import fcDetail from '@/components/pages/fcDetail'
import classAddressBook from '@/components/pages/classAddressBook'
import manageClassAdministrator from '@/components/pages/manageClassAdministrator'
import addClass from '@/components/pages/addClass'
import banjiweihu from '@/components/pages/banjiweihu'
import tjnj from '@/components/pages/tjnj'
import njwh from '@/components/pages/njwh'
import tjxs from '@/components/pages/tjxs'
import xswh from '@/components/pages/xswh'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'mainrouter',
      component: main,
      redirect: '/Introduction',
      children: [
        {
          path: '/Introduction',
          name: 'Introduction',
          component: Introduction
        },
        {
          path: '/news',
          name: 'news',
          component: news
        },
        //新闻详情

        {
          path: '/newsDetails',
          name: 'newsDetails',
          component: newsDetails
        },

        { path: '/fc', name: 'fc', component: fc },
        { path: '/fcDetail', name: 'fcDetail', component: fcDetail },
        {
          path: '/LeaveMessage',
          name: 'LeaveMessage',
          component: LeaveMessage
        },
        { path: '/post', name: 'post', component: post },
        //管理相册
        {
          path: '/managementPhoto',
          name: 'managementPhoto',
          component: managementPhoto
        },
        //管理留言板
        {
          path: '/manageMessageBoard',
          name: 'manageMessageBoard',
          component: manageMessageBoard
        },

        {
          path: '/chat',
          name: 'chat',
          component: chat,
          children: [
            // 聊天板块子路由
            { path: 'chatInfo', name: 'chatInfo', component: chatInfo },
            {
              path: 'chatInfoDetal',
              name: 'chatInfoDetal',
              component: chatInfoDetal
            },
            { path: 'contact', name: 'contact', component: contact },
            {
              path: 'chatContactDetai',
              name: 'chatContactDetai',
              component: chatContactDetai
            }
          ]
        },
        //管理班级资源
        { path: '/classSrc', name: 'classSrc', component: classSrc },
        //班级留言板
        {
          path: '/classMessageBoard',
          name: 'classMessageBoard',
          component: classMessageBoard
        },
        //班级相册
        {
          path: '/classPhotoAlbum',
          name: 'classPhotoAlbum',
          component: classPhotoAlbum
        },
        //我的班级公告和班级文件
        { path: '/myClassSrc', name: 'myClassSrc', component: myClassSrc },
        //班级通讯录
        { path: '/classAddressBook', name: 'classAddressBook', component: classAddressBook },
        { path: '/manageClassAdministrator', name: 'manageClassAdministrator', component: manageClassAdministrator },
        { path: '/addClass', name: 'addClass', component: addClass },
        { path: '/banjiweihu', name: 'banjiweihu', component: banjiweihu },
        { path: '/tjnj', name: 'tjnj', component: tjnj },
        { path: '/njwh', name: 'njwh', component: njwh },
        { path: '/tjxs', name: 'tjxs', component: tjxs },
        { path: '/xswh', name: 'tjxs', component: xswh },
      ]
    },

    // eslint-disable-next-line no-undef
    { path: '/fc', name: 'fc', component: fc },
    { path: '/login', name: 'login', component: login },
    // 重定向到login
    { path: '/', redirect: '/login' },
    //注册
    { path: '/registered', name: 'registered', component: registered }
  ]
})
