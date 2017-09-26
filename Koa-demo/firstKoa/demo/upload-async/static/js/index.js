(function () {
  console.log('js is ready')
  let btn = document.getElementById('J_UploadPictureBtn');
  let progressElem = document.getElementById('J_UploadProgress');
  let previewElem = document.getElementById('J_PicturePreview');
  btn.addEventListener('click', function() {
    console.log('---')
    uploadAction({
      success: (result) =>{
        if(result.data && result.data.pictureUrl) {
          previewElem.innerHTML = `<img src="${result.data.pictureUrl}" style="max-width: 100%"/>`
        }
      },
      progress: (data) => {
        if(data && data * 1 > 0) {
          progressElem.innerText = data;
        }
      }
    })
  });
})();

let utilType = {
  isPrototype: (data) => {
    return Object.prototype.toString.call(data).toLowerCase();
  },
  isJSON: function (data) {
    console.log(this);
    return this.isPrototype(data) === '[object object]';
  },
  isFunction: function (data) {
    return this.isPrototype(data) === '[object function]';
  }
}

function requestEvent(options) {
  try {
    let formData = options.formData;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4 && xhr.status === 200) {
        options.success(JSON.parse(xhr.responseText));
      }
    }
    xhr.upload.onprogress = (event) => {
      let loaded = event.loaded;
      let tol = event.total;
      let per = Math.floor( 100 * loaded / tol );
      options.progress(per);
    }
    xhr.open('post', '/api/picture/upload.json');
    xhr.send(formData);
  } catch (error) {
    options.fail(error);
  }
}

function uploadEvent(options) {
  let file;
  let formData = new FormData;
  let input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('name', 'files');
  input.click();
  input.onchange = (e) => {
    file = input.files[0];
    formData.append('files',file);
    requestEvent({
      formData,
      success: options.success,
      progress: options.progress,
      fail: options.fail,
    })
  }
}

function uploadAction(options) {
  if (!utilType.isJSON(options)){
    console.log('options is null');
    return;
  }
  let _options = {};
  _options.success = utilType.isFunction(options.success) ? options.success : function(){};
  _options.fail = utilType.isFunction(options.fail) ? options.fail : function(){};
  _options.progress = utilType.isFunction(options.progress) ? options.progress : function(){};
  uploadEvent(_options);
}