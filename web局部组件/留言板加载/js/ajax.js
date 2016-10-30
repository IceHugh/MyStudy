/**
 * Created by ygz on 2016/8/8.
 */
var ajax = function(method,urlObj,successFn,failFn){
  var oAjax;
  if(window.XMLHttpRequest){
    oAjax = new XMLHttpRequest();
  }else{
    oAjax = new ActiveXObject("microsoft.xmlhtto");
  }
  oAjax.onreadystatechange = function(){
    if(oAjax.readyState == 4){
      if(oAjax.status>=200 && oAjax.status < 300 || oAjax.status == 304){
        successFn(oAjax.responseText);
      }else{
        if(failFn){
          failFn(oAjax.status);
        }
      }
    }
  };
  function addURLParam(obj){
    obj.url +=(obj.url.indexOf("?") == -1?"?":"&");
    obj.url +=encodeURIComponent(obj.name) + "=" + encodeURIComponent(obj.value);
    return obj.url;
  }
  var newurl = urlObj;
  newurl = addURLParam(newurl);
  oAjax.open("get",newurl,true);
  oAjax.setRequestHeader("MyHeader","MyValue");
  oAjax.send(null);
};
