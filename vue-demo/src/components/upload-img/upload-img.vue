<template>
  <div>
    <butler-preview :img-arr="previewList"></butler-preview>
    <div class="img__box">
      <input id="file" type="file" multiple @change="handleChange">
      <label for="file" class="img__btn"></label>
    </div>
    <!-- <button @click="submitImg">提交</button> -->
  </div>
</template>
<style lang="scss" scoped>

@import './upload-img.scss';
</style>
<script>
import compressImg from '@/common/compressImg';
import ButlerPreview from '@/components/butler-preview/butler-preview.vue'
import util from '@/common/util';
import axios from 'axios';
export default {
  name: 'upload-img',
  data() {
    return {
      previewList: [],
      blobList: [],
    }
  },
  components: {
    ButlerPreview
  },
  methods: {
    async handleChange(e) {
      let imgFiles = e.target.files;
      let imgList = [];
      let previewList = [];
      let blobList = [];
      for (let key in imgFiles) {
        if (imgFiles.hasOwnProperty(key)) {
          let imgItem = imgFiles[key];
          let imgData = await compressImg(imgItem);
          imgList.push(imgData);
        }
      }
      previewList = imgList.map((val, index) => {
        return val.imgBase
      });
      blobList = imgList.map((val, index) => {
        return val.blob
      });

      this.previewList = [...this.previewList, ...previewList]
      this.blobList = [...this.blobList, ...blobList]
    },
    submitImg() {
      let fd = new FormData();
      // this.blobList.forEach((val,index) => {
      //   fd.append('files' , val, util.createHashName() + '.jpeg');
      // });
      fd.append('files', this.blobList, util.createHashName() + '.jpeg');
      // fd.append('files', this.blobList,)
      console.log(fd.get('files'));
      // console.log(fd.get('file1'));
      axios({
        baseURL: "https://devops-support-incu.daimler.com.cn:7999/api",
        url: '/upload/keyButlerOrderCharging',
        method: 'post',
        headers: {
          'content-type': 'multipart/form-data',
          "Accept": '*/*',
          'Authorization': 'Bearer ' + this.$store.state.token
        },
        data: fd
      }).then(res => {
        console.log(res);
      })
    },
  }
}
</script>

