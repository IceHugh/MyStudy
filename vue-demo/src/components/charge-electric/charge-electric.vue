<template>
  <div class="card flex-center">
    <div class="card__left">
      <div class="card--title">起始电量</div>
      <div class="card__box--btn">
        <div v-if="fillStartElectric" class="card--electtic">{{startElectric + '%'}}</div>
        <buter-picker v-else :slots="startSlots" :showToolbar="true" v-on:confirm="confirmStartElectric">
           <butler-button class="card__btn">填写</butler-button>
        </buter-picker>
      </div>
      <div class="card--hint text-1">
        <div v-show="!fillStartElectric">请在开始充电时填写</div>
      </div>
    </div>
    <div class="card__middle"></div>
    <div class="card__right">
      <div class="card--title">完成电量</div>
      <div class="card__box--btn">
        <div v-if="fillFinishElectric" class="card--electtic">{{finishElectric + '%'}}</div>
        <buter-picker v-else :slots="finishSlots" :showToolbar="true" v-on:confirm="confirmFinishElectric">
           <butler-button class="card__btn">填写</butler-button>
        </buter-picker>
      </div>
      <div class="card--hint text-1">
        <div v-show="!fillFinishElectric">请在开始充电时填写</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './charge-electric.scss';
</style>
<script>
import ButlerButton from '../butler-button/butler-button.vue';
import ButerPicker from '../butler-picker/butler-picker.vue';
import util from '@/common/util';
import Api from '@/api';
export default {
  name: 'charge-electric',
  components: {
    ButlerButton,
    ButerPicker,
  },
  props: {
    startElectric: {
    },
    finishElectric: {
    }
  },
  data() {
    return {
      startSlots: [{ values: util.getRangeArr(0, 100, false)}],
      finishSlots: [{ values: util.getRangeArr(0, 100, true) }],
      selectValues: 0,
      pickerStatus: true
    }
  },
  computed: {
    fillStartElectric() {
      if (typeof this.startElectric === 'number' && this.startElectric >= 0) {
        return true
      } else {
        return false;
      }
    },
    fillFinishElectric() {
      if (typeof this.finishElectric === 'number' && this.finishElectric >= 0) {
        return true
      } else {
        return false;
      }
    }
  },
  methods: {
    confirmStartElectric(value){
      console.log(value)
      Api.putStartElectric({
        electricityRemaining: value
      }).then(res => {
        this.$store.dispatch({
            type: 'getOrder'
        });
      });
    },
    confirmFinishElectric(value){
      console.log(value)
      Api.putFinsihedElectric({
        electricityFinished: value
      }).then(res => {
        this.$store.dispatch({
            type: 'getOrder'
        });
      });
    },
    hidePicker() {
      this.pickerStatus = false;
    },
  }
}
</script>
