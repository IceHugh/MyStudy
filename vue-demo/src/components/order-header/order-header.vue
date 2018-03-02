<template>
  <div class='container'>
    <div class="container__top">
      <img class="user__avatar" :src="user.wechatAvatar" />
      <div class="user__nikname">{{user.lastName  + (user.firstName ? user.firstName : '') + '(' + user.plateNumber + ')'}}</div>
    </div>
    <div class='container__bottom'>
      <div class="pickinfo flex-space">
        <div>取车：{{orderTimeLocation.pickLocation}}</div>
        <div class="pickinfo-color">{{orderTimeLocation.pickTime}}</div>
      </div>
      <div class="pickinfo flex-space">
        <div>还车：{{orderTimeLocation.returnLocation}}</div>
        <div class="pickinfo-color">{{orderTimeLocation.returnTime}}</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import './order-header.scss';
</style>
<script>
import { mapState } from 'vuex'
export default {
  name: 'order-header',
  data() {
    return {
    }
  },
  computed: mapState(['user', 'orderTimeLocation'])
}
</script>
