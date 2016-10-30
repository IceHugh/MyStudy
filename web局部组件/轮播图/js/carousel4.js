window.onload = function() {
    var oBox = document.getElementById('box');
    var oUl = document.getElementById('ul');
    var aLi_u = oUl.getElementsByTagName('li');
    var oOl = document.getElementById('ol');
    var aLi_o = oOl.getElementsByTagName('li');
    var LiHeight = aLi_u[0].offsetHeight;
    var len = aLi_o.length;
    var iNow1 = 0; //当前索引
    var iNow2 = 0; //当前索引
    var timer = null; //定时器

    for (var i = 0; i < len; i++) {
        aLi_o[i].index = i;
        aLi_o[i].onmouseover = function() {
            for (var i = 0; i < len; i++) {
                aLi_o[i].className = '';
            }
            this.className = 'active';
            //建立关系：很重要
            iNow1 = this.index;
            iNow2 = this.index;
            startMove(oUl, { top: -this.index * LiHeight });
        }
    };
    //开定时器
    timer = setInterval(toRun, 2000);

    oBox.onmouseover = function() {
        clearInterval(timer);
    };
    oBox.onmouseout = function() {
        timer = setInterval(toRun, 2000);
    };
    //定时函数
    function toRun() {
        if(iNow1 === 0){
            aLi_u[0].style.position = "static";
            aLi_u[0].style.top = 0;
            oUl.style.top = 0;
            iNow2 =0;
        }
        if (iNow1 === len - 1) {
            aLi_u[0].style.position = "relative";
            aLi_u[0].style.top = len*LiHeight +"px";
            iNow1 = 0;
        } else {
            iNow1++;
        }
        iNow2++
        for (var i = 0; i < aLi_o.length; i++) {
            aLi_o[i].className = '';
        }
        aLi_o[iNow1].className = 'active';
        startMove(oUl, { top: -iNow2 * LiHeight });
    }
};
