<template>
  <div class="card">
    <div class="card__top">
      <div class="card__left">
        <div class="card--title">充电费用</div>
        <div class="card__box--btn">
          <butler-button v-if="chargeBillStatus" class="card__btn" @click.native="toFillBill(fillChargeQuery)">填写</butler-button>
          <butler-button v-else class="card__btn" @click.native="toFillBill(lookChargeQuery)">查看</butler-button>
        </div>
      </div>
      <div class="card__middle"></div>
      <div class="card__right">
        <div class="card--title">停车费</div>
        <div class="card__box--btn">
          <butler-button v-if="tollBillStatus" class="card__btn" @click.native="toFillBill(fillTollQuery)">填写</butler-button>
          <butler-button v-else class="card__btn" @click.native="toFillBill(lookTollQuery)">查看</butler-button>
        </div>
      </div>
    </div>
    <div class="card__bottom flex-center">
      <div v-if="chargeBillStatus && tollBillStatus" class="card--hint text-1">请在完成充电后填写</div>
      <div v-else class="total__box">
        合计
        <span class="text-1">{{totalBill}}</span>元
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './charge-bill.scss';
</style>
<script>
import ButlerButton from '../butler-button/butler-button.vue';
import { mapState } from 'vuex';
import { Toast } from 'mint-ui';
export default {
  name: 'charge-bill',
  components: {
    ButlerButton,
  },
  props: {
    electricCharge: {
      type: [String, Number],
      default: null,
    },
    tollCharge: {
      type: [String, Number],
      default: null,
    },
    chargingQuantity: {
      type: [String, Number],
      default: null,
    }
  },
  data() {
    return {
      fillChargeQuery: {
        type: 'chargingBill',
        finished: false,
      },
      lookChargeQuery: {
        type: 'chargingBill',
        finished: true,
      },
      fillTollQuery: {
        type: 'tollBill',
        finished: false,
      },
      lookTollQuery: {
        type: 'tollBill',
        finished: true,
      }
    }
  },
  computed: {
    totalBill() {
      let electricCharge = this.electricCharge || 0;
      let tollCharge = this.tollCharge || 0;
      let totalBill = ((electricCharge - 0) + (tollCharge - 0)).toFixed(2);
      return totalBill;
    },
    chargeBillStatus() {
      return this.electricCharge !== null ? false : true;
    },
    tollBillStatus() {
      return this.tollCharge !== null ? false : true;
    },
  },
  methods: {
    toFillBill(query) {
      if (query.type === 'tollFill' && this.chargeBillStatus) {
        Toast({
          message: '请先填写充电费用',
          duration: 2000
        });
        return
      };
      this.$router.push({
        path: 'fillBill', query: {
          electricCharge: this.electricCharge || '',
          tollCharge: this.tollCharge || '',
          chargingQuantity: this.chargingQuantity || '',
          ...query
        }
      })
    }
  }
}
</script>
