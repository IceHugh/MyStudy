/**
 * Created by ygz on 2016/7/30.
 */
window.onload=function(){
  waterFall('main','box');
  //自定义的JSON数据；实际是有后台传输过来
  var dataInt = {'data':[{'src':'1.jpg'},{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'},{'src':'5.jpg'},{'src':'6.jpg'},{'src':'7.jpg'},{'src':'8.jpg'},{'src':'9.jpg'},{'src':'10.jpg'},{'src':'11.jpg'}]};
  window.onscroll=function() {
    if (checkScrollSlide()) {
      var oParent = document.getElementById('main');
      for (var i = 0; i < dataInt.data.length; i++) {
        var oBox = document.createElement('div');
        oBox.className = 'box';
        oParent.appendChild(oBox);
        var oPic = document.createElement('div');
        oPic.classname = 'pic';
        oBox.appendChild(oPic);
        var oImg = document.createElement('img');
        oImg.src = 'images/' + dataInt.data[i].src;
        oPic.appendChild(oImg);
      }
      waterFall('main','box');
    }
  }
};
function waterFall(parent,box){
  //取出main下的所有clss为box的元素
  var oParent = document.getElementById(parent);
  var oBoxs = getElementsByClass(oParent,box);
  //计算整个页面显示的高度
  var oBoxW = oBoxs[0].offsetWidth;
  var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
  oParent.style.cssText='width:'+cols*oBoxW+'px;margin:0 auto';
  var hArr = [];  //存储每一列的高度
  for(var i=0;i<oBoxs.length;i++){
    if(i<cols){
      hArr.push(oBoxs[i].offsetHeight);
    }else{
      var minH = Math.min.apply(null,hArr);
      var index = getMinhIndex(hArr,minH);
      oBoxs[i].style.position = 'absolute';
      oBoxs[i].style.top = minH+'px';
      //hArr[i].style.left = oBoxW*index;
      oBoxs[i].style.left = oBoxs[index].offsetLeft+'px';
      hArr[index] += oBoxs[i].offsetHeight;
    }
  }
}
//取出class
function getElementsByClass(parent,clasName){
  var boxArr = [],                                //用来存储获取的class为box的元素
    oElements = parent.getElementsByTagName('*');
  for(var i=0;i<oElements.length;i++){
    if(oElements[i].className == clasName){
      boxArr.push(oElements[i]);
    }
  }
  return boxArr;
}
//取出最小值的索引
function getMinhIndex(arr,val){
  for(var i=0;i<arr.length;i++){
    if(arr[i] == val){
      return i;
    }
  }
}
//检测是否具备滚动添加数据块的条件
function checkScrollSlide(){
  var oParent = document.getElementById('main');
  var oBoxs = getElementsByClass(oParent,'box');
  var lastBoxH = oBoxs[oBoxs.length-1].offsetTop+oBoxs[oBoxs.length-1].offsetHeight/2;
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.body.clientHeight|| document.documentElement.clientHeight;
  return (scrollTop+height>lastBoxH)
}