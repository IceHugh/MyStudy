//最普通的轮播图
window.onload = function() {   
    var oUl = document.getElementById('ul');   
    var aLi_u = oUl.getElementsByTagName('li');   
    var oOl = document.getElementById('ol');   
    var aLi_o = oOl.getElementsByTagName('li');   
    for (var i = 0, len = aLi_o.length; i < len; i++) {
        aLi_o[i].index = i;
        console.log(aLi_o[i].index);
        aLi_o[i].onmouseover=function () {
            for (var j = 0; j < len;j++) {
                aLi_u[j].style.display = "none";
                aLi_o[j].className = '';
            }
            this.className = "active";
            aLi_u[this.index].style.display = "block";
        }
    }
}
