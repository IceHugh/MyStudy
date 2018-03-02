<template>
  <div class="page">
    <butler-header :header-title="title"></butler-header>
    <div class="fill__container">
      <div class="fill__container--input">
        <div v-if="type === 'chargingBill'" class="input__container">
          <div class="input__box">
            <div class="input__title">充电量</div>
            <div class="input__fill">
              <input v-model.trim.number="chargingQuantity" :disabled="finished" type="text" maxlength="5" class="input__detail" />
              <span>度</span>
            </div>
          </div>
          <div class="input__box">
            <div class="input__title">充电费用</div>
            <div class="input__fill">
              <input v-model.trim.number="electricCharge" :disabled="finished" type="text" maxlength="5" class="input__detail" />
              <span>元</span>
            </div>
          </div>
        </div>
        <div v-else class="input__container">
          <div class="input__box">
            <div class="input__box">
              <div class="input__title">停车费用</div>
              <div class="input__fill">
                <input v-model.trim.number="tollCharge" :disabled="finished" type="text" maxlength="5" class="input__detail" />
                <span>元</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fill__upload--box">
        <upload-img ref="upload"></upload-img>
      </div>
    </div>
    <order-footer v-if="finished" :finished="true" v-on:confirm="goBack">返回</order-footer>
    <order-footer v-else :finished="fillStatus" v-on:confirm="submitBill"></order-footer>
  </div>
</template>
<style lang="scss" scoped>
@import '../style/pages/fillBill.scss';
</style>
<script>
import ButlerHeader from '@/components/butler-header/butler-header.vue';
import OrderFooter from '@/components/order-footer/order-footer.vue';
import UploadImg from '@/components/upload-img/upload-img.vue';
import { required } from 'vuelidate/lib/validators';
import { Toast, MessageBox } from 'mint-ui';
import Api from '@/api';
export default {
  name: 'fill-bill',
  components: {
    ButlerHeader,
    OrderFooter,
    UploadImg,
  },
  data() {
    return {
      title: '充电英雄',
      chargingQuantity: '',
      electricCharge: '',
      tollCharge: '',
      type: 'chargingBill',
      finished: false,
    }
  },
  validations: {
    chargingQuantity: {
      required,
    },
    electricCharge: {
      required,
    },
    tollCharge: {
      required,
    }
  },
  created() {
    let { type, finished, chargingQuantity, electricCharge, tollCharge } = this.$route.query;
    this.type = type;
    this.finished = finished;
    this.chargingQuantity = chargingQuantity;
    this.electricCharge = electricCharge;
    this.tollCharge = tollCharge;
  },
  computed: {
    fillStatus() {
      let { chargingQuantity, electricCharge, tollCharge } = this.$v;
      return chargingQuantity.required && electricCharge.required || tollCharge.required
    }
  },
  methods: {
    submitBill() {
      let _upload = this.$refs.upload
      _upload.submitImg()
      return
      let { chargingQuantity, electricCharge, tollCharge, type } = this;
      let _v = this.$v;
      if (type === 'chargingBill' && typeof chargingQuantity !== 'number' && typeof electricCharge !== 'number') {
        Toast({
          message: '请输入数字',
          duration: 2000
        });
        return
      } else if (type === 'toll' && typeof tollCharge !== 'number') {
        Toast({
          message: '请输入数字',
          duration: 2000
        });
        return
      }
      let data = {}
      if (type === 'chargingBill') {
        data = { chargingQuantity, electricCharge }
      } else {
        data = { tollCharge }
      }
      MessageBox.confirm('是否提交').then(action => {
        Api.putBill(type, data).then(res => {
          this.goBack();
        })
      })
    },
    imageuploaded(a, e) {
      console.log('上传')
      console.log(a)
      console.log(e)
    },
    imagechanged(a, e) {
      console.log('改变')
      console.log(a)
      console.log(e)
    },
    imageuploading(a, e) {
      console.log('加载')
      console.log(a)
      console.log(e)
    },
    errorhandle(a, e) {
      console.log('错误')
      console.log(a)
      console.log(e)
    },
    goBack() {
      this.$router.replace('/');
    }
  }
}
</script>
