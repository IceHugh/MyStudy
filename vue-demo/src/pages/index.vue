<template>
  <div class="page">
    <butler-header :header-title="title"></butler-header>
    <order-header></order-header>
    <div class="process-card">
      <charge-taking v-show="showStatus(orderStatus,'DISPATCHED')" :finished-status="showStatus(orderStatus,'BUTLER_PICKING_CAR')"></charge-taking>
      <charge-taked v-show="showStatus(orderStatus,'BUTLER_PICKING_CAR')" :finished-status="showStatus(orderStatus,'BUTLER_ARRIVE_TO_PICK_CAR')"></charge-taked>
      <charge-pickedcar v-show="showStatus(orderStatus,'BUTLER_ARRIVE_TO_PICK_CAR')" :finished-status="showStatus(orderStatus,'BUTLER_DRIVING_CAR_TO_CHARGE')"></charge-pickedcar>
      <charge-location v-show="showStatus(orderStatus,'BUTLER_DRIVING_CAR_TO_CHARGE')" :charge-location-status="showStatus(orderStatus,'BUTLER_ARRIVE_CHARGING_STATION')"></charge-location>
      <charge-electric v-show="showStatus(orderStatus,'BUTLER_ARRIVE_CHARGING_STATION')" :start-electric="orderInfo.electricityRemaining" :finish-electric="orderInfo.electricityFinished"></charge-electric>
      <charge-bill v-show="showStatus(orderStatus,'BUTLER_FINISHED_CHARGING')" :electric-charge="payment.electricCharge" :toll-charge="payment.tollCharge" :charging-quantity="payment.butlerChargingQuantity"></charge-bill>
      <charge-returning v-show="payment.tollCharge" :finished-status="showStatus(orderStatus,'BUTLER_RETURNING_CAR')"></charge-returning>
      <charge-returned v-show="showStatus(orderStatus,'BUTLER_RETURNING_CAR')" :finished-status="showStatus(orderStatus,'BUTLER_ARRIVE_TO_RETURN')"></charge-returned>
    </div>
    <order-footer :finished="showStatus(orderStatus,'BUTLER_ARRIVE_TO_RETURN')" v-on:confirm="finishedService">完成服务</order-footer>
  </div>
</template>
<style lang="scss" scoped>
@import '../style/pages/index.scss';
</style>

<script>

import orderStatusArr from '../common/orderStatus';
import ButlerHeader from '../components/butler-header/butler-header.vue';
import OrderHeader from '../components/order-header/order-header.vue';
import ChargeTaking from '../components/charge-taking/charge-taking.vue';
import ChargeTaked from '../components/charge-taked/charge-taked.vue';
import ChargePickedcar from '../components/charge-pickedcar/charge-pickedcar.vue';
import ChargeLocation from '../components/charge-location/charge-location.vue';
import ChargeElectric from '../components/charge-electric/charge-electric.vue';
import ChargeBill from '../components/charge-bill/charge-bill.vue';
import ChargeReturning from '../components/charge-returning/charge-returning.vue';
import ChargeReturned from '../components/charge-returned/charge-returned.vue';
import OrderFooter from '../components/order-footer/order-footer.vue';
import io from 'socket.io-client';
import { mapState } from 'vuex';
import Api from '@/api';
export default {
  name: 'Index',
  components: {
    ButlerHeader,
    OrderHeader,
    ChargeTaking,
    ChargeTaked,
    ChargePickedcar,
    ChargeLocation,
    ChargeElectric,
    ChargeBill,
    ChargeReturning,
    ChargeReturned,
    OrderFooter,
  },
  data() {
    return {
      title: '充电英雄'
    }
  },
  methods: {
    showStatus(orderStatus, showStatus ) {
      let orderStatusIndex = orderStatusArr.indexOf(orderStatus);
      let showStatusIndex = orderStatusArr.indexOf(showStatus);
      return orderStatusIndex >= showStatusIndex
    },
    finishedService() {
      Api.putStatus({ status: 'BUTLER_FINISHED' }).then(res => {
      });
    }
  },
  computed: {
    orderStatus() {
      return this.$store.state.status;
    },
    ...mapState(['orderInfo','payment'])
  },
  beforeCreate() {
    this.$store.dispatch({
      type: 'getOrder'
    });
  },
  created() {

  }
}
</script>
