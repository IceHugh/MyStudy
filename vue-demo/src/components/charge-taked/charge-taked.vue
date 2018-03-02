<template>
  <div class="card">
    <div class="card__left">
      <div>
        <div class="card__title">客户到达取车点</div>
        <div class="card--hint text-1" v-if="!finishedStatus">完成后请点击确认就位</div>
      </div>
    </div>
    <div class="card__right">
      <img v-if="finishedStatus" class="card__iocn--complete" src="../../assets/images/complete.png">
      <butler-button v-else v-on:click.native="confirme">确认就位</butler-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './charge-taked.scss';
</style>
<script>
import ButlerButton from '../butler-button/butler-button.vue';
import { MessageBox } from 'mint-ui';
import Api from '@/api';
export default {
  name: 'charge-taked',
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
  computed: {
    chargingStation() {
      let chargingStation = this.$store.state.orderInfo.chargingStation;
      return chargingStation;
    }
  },
  methods: {
    confirme() {
      MessageBox.confirm('是否出发取车').then(action => {
        Api.putStatus({ status: 'BUTLER_ARRIVE_TO_PICK_CAR' }).then(res => {
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
