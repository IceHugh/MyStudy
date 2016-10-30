var oUl = document.getElementById('ul');
var aLi_u = oUl.getElementsByTagName('li');
var oOl = document.getElementById('ol');
var aLi_o = oOl.getElementsByTagName('li');
var LiHeight = aLi_u[0].offsetHeight;

for (var i = 0; i < aLi_o.length; i++) {
    aLi_o[i].index = i;
    aLi_o[i].onmouseover = function() {
        for (var i = 0; i < aLi_o.length; i++) {
            aLi_o[i].className = '';
            startMove(oUl, { marginTop: -this.index * LiHeight });
            //有定位设置top值，没有定位采用marginTop值
        }
        this.className = 'active';
    };
}
