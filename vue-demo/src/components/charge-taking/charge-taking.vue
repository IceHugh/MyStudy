<template>
  <div class="card">
    <div class="card__left">
      <div class="card--title font-30">充电桩地址</div>
      <div class="card__location">{{orderTimeLocation.pickLocation}}</div>
      <div class="card__time text-1">{{orderTimeLocation.pickTime}}</div>
    </div>
    <div class="card__right">
      <img v-if="finishedStatus" class="card__iocn--complete" src="../../assets/images/complete.png">
      <butler-button v-else v-on:click.native="confirme">出发取车</butler-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './charge-taking.scss';
</style>
<script>
import ButlerButton from '../butler-button/butler-button.vue';
import { mapState } from 'vuex'
import { MessageBox } from 'mint-ui';
import Api from '@/api';
export default {
  name: 'charge-takinging',
  components: {
    ButlerButton,
  },
  props: {
    finishedStatus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  computed: mapState(['orderTimeLocation']),
  methods: {
    confirme() {
      MessageBox.confirm('是否出发取车').then(action => {
        Api.putStatus({ status: 'BUTLER_PICKING_CAR' }).then(res => {
          this.$store.dispatch({
            type: 'getOrder'
          });
        });
      }).catch(error => {
        console.log('cancel');
      });
    }
  }
}
</script>
