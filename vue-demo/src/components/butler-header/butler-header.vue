<template>
  <div class="header flex-center">
    <div class="header__back flex-center" @click="historyBack"><
    </div>
    <div class="header__title">{{headerTitle}}</div>
  </div>
</template>

<style lang="scss" scoped>
@import './butler-header.scss';
</style>

<script>
export default {
  name: 'butler-header',
  props: {
    headerTitle: {
      type: String,
      default: '充电英雄',
    }
  },
  data() {
    return {
    }
  },
  methods: {
    historyBack() {
      this.$router.go(-1);
    }
  }
}
</script>
