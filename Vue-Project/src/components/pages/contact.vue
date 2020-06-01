<template>
  <div class="wrapper">
    <ul>
      <li v-for=" item in contact">
        <img :src="item.userUrl" />
        {{item.name}}
        <el-divider></el-divider>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      contact: [
        // {
        //   name: '陈思慧',
        //   userId: '123',
        //   userUrl:
        //     'http://i3.hoopchina.com.cn/hupuapp/bbs/200582274070645/thread_200582274070645_20190510092718_s_54920_w_663_h_663_44283.jpg?x-oss-process=image/resize,w_800/format,jpg'
        // },
        // {
        //   name: '陈思慧',
        //   userId: '123',
        //   userUrl:
        //     'http://i3.hoopchina.com.cn/hupuapp/bbs/200582274070645/thread_200582274070645_20190510092718_s_54920_w_663_h_663_44283.jpg?x-oss-process=image/resize,w_800/format,jpg'
        // },

        // {
        //   name: '陈思慧',
        //   userId: '123',
        //   userUrl:
        //     'http://ww2.sinaimg.cn/large/9150e4e5gy1g9fsw282slj205i05idfn.jpg'
        // },
        // {
        //   name: '陈思慧',
        //   userId: '123',
        //   userUrl:
        //     'http://i3.hoopchina.com.cn/hupuapp/bbs/200582274070645/thread_200582274070645_20190510092718_s_54920_w_663_h_663_44283.jpg?x-oss-process=image/resize,w_800/format,jpg'
        // },
        // {
        //   name: '陈思慧',
        //   userId: '123',
        //   userUrl:
        //     'http://i3.hoopchina.com.cn/hupuapp/bbs/200582274070645/thread_200582274070645_20190510092718_s_54920_w_663_h_663_44283.jpg?x-oss-process=image/resize,w_800/format,jpg'
        // },

        // {
        //   name: '陈思慧',
        //   userId: '123',
        //   userUrl:
        //     'http://ww2.sinaimg.cn/large/9150e4e5gy1g9fsw282slj205i05idfn.jpg'
        // }
      ]
    }
  },
  watch: {},
  computed: {},
  methods: {
    getContactList() {
      axios
        .get('getContactList')
        .then((response)=> {
          // console.log(response)
          this.contact = response .data.contact
        })
        .catch((error) =>{
          console.log(error)
        })
    }
  },
  created() {
     this.getContactList()
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.wrapper {
}
//联系人列表样式
img {
  width: 50px;
  height: 50px;
}
.li {
  padding-bottom: 20px;
}
</style>