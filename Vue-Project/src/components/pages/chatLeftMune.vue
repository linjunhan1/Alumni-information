
<template>
  <div class="wrapper">
      <ul>
         
          <li  @click="route('chatInfo')"> <el-avatar icon="el-icon-chat-dot-round" ></el-avatar></li>
          <li><el-avatar icon="el-icon-s-custom" ></el-avatar></li>
      </ul>
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
  methods: {
    route(path){
      
      this.router.push(path)

    }
  },
  created() {},
  mounted() {
    
  }
};
</script>
<style lang="less" scoped>
.wrapper{
     background: #45A6DB;
    width: 5%;
    height:100%
}
ul{
   padding: 20px
   
}

li{
   width: 100px;
   height: 100px;
}



</style>