<template>
    <div  class="hugh" @click="btnClick">{{msg}}</div>
</template>
<script>
export default {
  data () {
    return {
      msg: '你好！'
    }
  },
  methods: {
    btnClick () {
      console.log('123')
    }
  }
}
</script>