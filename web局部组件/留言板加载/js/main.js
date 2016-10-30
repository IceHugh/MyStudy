/**
 * Created by ygz on 2016/8/9.
 */
window.onload = function() {
  var oMeg = document.getElementById("message");
  var oTab = document.getElementById("tab");
  var firstTab = document.getElementById("firstTab");
  var nextTab = document.getElementById("nextTab");
  var prevTab = document.getElementById("prevTab");
  var lastTab = document.getElementById("lastTab");
  var num = 4;
  ajax("get",{url:"js/data.json"},function(obj){
    var data = JSON.parse(obj);
    var dlen = Math.ceil(data.length/num);
    var remain = data.length%num;
    var firstM = "";
    for(var z=0;z<num;z++){
      firstM += '<dl><dt><img src="images/'+data[z].src+'"></dt><dd>'+data[z].name+'</dd><dd>发表于 '+data[z].date+'</dd><dd>'+data[z].content+'</dd><dd>查看详情</dd></dl>';
    }
    oMeg.innerHTML = firstM;
    var liH = "";
    for(var s=0;s<dlen;s++){
      liH += "<li>"+(s+1)+"</li>"
    }
    oTab.innerHTML += liH;
    var oLi= oTab.getElementsByTagName("li");
    var len = oLi.length;
    for (var i = 0; i < len-1; i++) {
      oLi[i].setAttribute("id", "tab" + i);
      oLi[i].onclick = function () {
        var allM = "";
        var j = this.id.substring(3);
        for (var z = 0; z < num; z++) {
          allM += '<dl><dt><img src="images/'+data[z + j * num].src+'"></dt><dd>'+data[z + j * num].name+'</dd><dd>发表于 '+data[z + j * num].date+'</dd><dd>'+data[z + j * num].content+'</dd><dd>查看详情</dd></dl>';
        }
        oMeg.innerHTML = allM;
      }
    }
    if(remain === 0){
      remain = 5;
    }
    oLi[len-1].onclick = function(){
      var allM = "";
      var j = this.id.substring(3);
      for (var z = data.length-remain; z < data.length; z++) {
        allM += '<dl><dt><img src="images/'+data[z + j * num].src+'"></dt><dd>'+data[z + j * num].name+'</dd><dd>发表于 '+data[z + j * num].date+'</dd><dd>'+data[z + j * num].content+'</dd><dd>查看详情</dd></dl>';
      }
      oMeg.innerHTML = allM;
    }
  });
};