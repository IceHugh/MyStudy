<template>
  <div class='container'>
    <button class="footer__btn" v-bind:class="{'footer__btn--true': finished}" @click="confirm">
      <slot>
        确定
      </slot>
    </button>
  </div>
</template>
<style lang="scss" scoped>
@import './order-footer.scss';
</style>
<script>
import { mapState } from 'vuex'
export default {
  name: 'order-footer',
  props: {
    finished: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {

    }
  },
  methods: {
    confirm(){
      if(!this.finished) return;
      this.$emit('confirm');
    }
  }

}
</script>
