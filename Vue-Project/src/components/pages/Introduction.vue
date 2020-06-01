<template>
  <div class="wrapper">
    <div id="main"></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Introduction',
  components: {},
  props: {},
  data() {
    return {
      data:[]
    }
  },
  watch: {},
  computed: {},
  methods: {
   async getdata() {
      axios({
        url: 'data',
        method: 'get',
        
      })
        .then(res => {
          // console.log(res)
          this.data = res.data
          // console.log(this.data)
          this.$chart.line1('main', this.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {},
  mounted() {
    
    this.getdata()
    
    
  }
}
</script>
<style  scoped>
#main {
  width: 100%;
  height: 900px;
  background-color: #409eff;
}
</style>