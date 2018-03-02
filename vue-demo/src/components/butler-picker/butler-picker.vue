<template>
  <div class="picker__container">
    <div class="picker--show" @click="showPicker">
      <slot></slot>
    </div>
    <div v-show="pickerStatus" class="picker__mask">
      <mt-picker @change="onValuesChange" :slots="slots" :showToolbar="showToolbar" class="picker-electric">
        <div class="picker__tool">
          <div class="picker__tool--btn" @click="cancel">取消</div>
          <div class="picker__tool--btn" @click="confirm">确定</div>
        </div>
      </mt-picker>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import './butler-picker.scss';
</style>
<script>
export default {
  name: 'butler-picker',
  data() {
    return {
      pickerStatus: false,
      selectValues: 0
    }
  },
  props: {
    slots: {
      type: Array,
    },
    showToolbar: {
      type: Boolean,
    }
  },
  methods: {
    showPicker() {
      this.pickerStatus = true;
    },
    confirm() {
      let selectValues = this.selectValues;
      if(selectValues === undefined) {
        selectValues = this.slots[0].values[2]
      }
      this.$emit('confirm', selectValues);
    },
    cancel() {
      this.pickerStatus = false;
    },
    onValuesChange(picker, values) {
      this.selectValues = values[0];
    }
  }

}
</script>
