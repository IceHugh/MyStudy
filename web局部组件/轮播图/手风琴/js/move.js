/**
 * Created by ygz on 2016/8/10.
 */
function startMove(obj,json,ratio,fn){
  var ratio = Math.ceil(ratio/265) ||4 ;
  var flag = true;                        //设置所有属性未达到目标值的清除定时器开关
  clearInterval(obj.timer);
  obj.timer = setInterval(function(){
    for(var attr in json) {              //遍历对象所有属性
      var icur = 0;                         //设置当前目标值
      if (attr == "opacity") {
        icur = Math.round(parseFloat(getStyle(obj, attr)) * 100);  //获取当前透明度值，
      } else {
        icur = parseInt(getStyle(obj, attr));   //获取普通属性当前值
      }
      var speed = (json[attr] - icur) / ratio;   //设置速度值，目标值比当前值大为正
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);  //速度大于0，向上取值，否则向下取值
      if (icur != json[attr]) flag = false;   //所有属性未达到目标值时开关关闭
      if (attr == "opacity") {
        obj.style.filter = 'alpha(opacity:' + icur + speed + ')'; //IE透明度
        obj.style.opacity = (icur + speed) / 100;      //透明度
      } else {
        obj.style[attr] = icur + speed + "px";
      }
      if(flag){            //所有属性达到目标值时开关开启
        clearInterval(obj.timer);
        if (fn) {
          fn();
        }
      }
    }
  },30)
}
function getStyle(obj,attr){    //获取对象CSS属性值
  if(obj.currentStyle){
    return obj.currentStyle[attr];    //ie
  }else{
    return getComputedStyle(obj,false)[attr];   //firefox
  }
}