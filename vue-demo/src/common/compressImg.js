export default function compressImg(img) {
  return new Promise((resolve,reject) => {
    let reader = new FileReader();
    let imgBase;
    let image = new Image();
    reader.readAsDataURL(img);
    reader.onload = (e) => {
      image.src = e.target.result;
      image.onload = function(){
        let imgWidth = this.width,
            imgHeight = this.height,
            canvas = document.createElement("canvas"),
            ctx = canvas.getContext('2d');
        canvas.width = imgWidth;
        canvas.height = imgHeight;
        ctx.drawImage(this, 0, 0, imgWidth, imgHeight);
        imgBase = canvas.toDataURL("image/jpeg", 0.8);
        canvas.toBlob((blob)=> {
          resolve({
            blob,imgBase,
          });
        }, 'image/jpeg', 0.6)

      }
    }
  })
}
