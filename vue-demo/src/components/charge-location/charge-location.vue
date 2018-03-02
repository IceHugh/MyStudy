<template>
  <div class="card">
    <div class="card__left">
      <div class="card--title font-30">充电桩地址</div>
      <div class="card--hint text-1">
        <div v-show="!chargeLocationStatus">请在抵达充电桩时填写</div>
      </div>
      <div v-if="chargeLocationStatus" class="charge-location">{{chargingStation}}</div>
      <input v-else v-model.trim="inputChargeLocation" type="text" class="input-charge-location" placeholder="请填写充电桩地址" />
    </div>
    <div class="card__right">
      <img v-if="chargeLocationStatus" class="card__iocn--complete" src="../../assets/images/complete.png">
      <butler-button v-else v-on:click.native="confirme">确认</butler-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './charge-location.scss';
</style>
<script>
import ButlerButton from '../butler-button/butler-button.vue';
import { required } from 'vuelidate/lib/validators';
import { mapState } from 'vuex'
import { MessageBox } from 'mint-ui';
import Api from '@/api';
export default {
  name: 'charge-location',
  components: {
    ButlerButton,
  },
  props: {
    chargeLocationStatus: {
      type: Boolean,
      defalut: false
    }
  },
  data() {
    return {
      inputChargeLocation: '',
    }
  },
  validations: {
    inputChargeLocation: {
      required,
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
      if( !this.$v.inputChargeLocation.required) return;
      MessageBox.confirm('是否确认充电桩地址').then(action => {
        Api.putChargeLocation({ chargingStation: this.inputChargeLocation }).then(res => {
          Api.putStatus({ status: 'BUTLER_ARRIVE_CHARGING_STATION' }).then(res => {
            this.$store.dispatch({
              type: 'getOrder'
            });
          });
        });
      }).catch(error => {
        console.log('cancel');
      });
    }
  }
}
</script>
