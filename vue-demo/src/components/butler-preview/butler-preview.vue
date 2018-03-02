<template>
  <div class="container">
    <div v-for="(value, index) in imgArr" :key="index" @click="previewImg(index)" class="preview__item--box">
      <img :src="value">
    </div>
    <div v-if="previewStatus" class="preview__screen" @click="hidePreview">
      <img :src="currentImg">
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import './butler-preview.scss';
</style>

<script>
export default {
  name: 'butler-preview',
  props: {
    imgArr: {
      // type: Array,
      default: [],
    }
  },
  data() {
    return {
      currentImg: -1,
      previewStatus: false,
    }
  },
  methods: {
    previewImg(index) {
      this.currentImg = this.imgArr[index];
      this.previewStatus = true;
    },
    hidePreview(){
      this.previewStatus = false;
    }
  },
  created() {
    // console.log(this.imgArr)
  }
}
</script>
