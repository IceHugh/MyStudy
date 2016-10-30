/**
 * Created by ygz on 2016/8/22.
 */
var window_width = 1024,
    window_height = 768,
    // radius = 8,
    margin_top = 60,
    margin_left = 30,
    curShowTimeSeconds = 0,
    balls = [];
const endTime = new Date(2016,7,24,11,24,35);
window.onload=function(){
    var window_width = document.body.clientWidth,
        window_height = document.body.clientHeight,
        radius = Math.round(window_width*4/5/108)-1,
        margin_top = Math.round(window_height/5),
        margin_left = Math.round(window_width/10);
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    canvas.width = window_width;
    canvas.height = window_height;
    curShowTimeSeconds = getCurrentShowTimeSeconds();
    setInterval(function(){
        render(context);
        update();
    },50);
    
    function getCurrentShowTimeSeconds(){
        var currentTime = new Date();
        var ret = endTime.getTime() - currentTime.getTime();
        ret = Math.round(ret/1000);
        return ret >= 0? ret: 0 ;
    }

    function update(){
        var nextShowTimeSeconds = getCurrentShowTimeSeconds(),
            nextHours = parseInt(nextShowTimeSeconds/3600),
            nextMinutes = parseInt((nextShowTimeSeconds -nextHours*3600)/60),
            nextSeconds = nextShowTimeSeconds%60,

            curHours = parseInt(curShowTimeSeconds/3600),
            curMinutes = parseInt((curShowTimeSeconds -curHours*3600)/60),
            curSeconds = curShowTimeSeconds%60;

        if(curSeconds != nextSeconds){
            if(parseInt(curHours/10 )!= parseInt(nextHours/10)){
                addBalls(margin_left,margin_top,parseInt(curHours/10));
            }
            if(parseInt(curHours%10) != parseInt(nextHours%10)){
                addBalls(margin_left + 15*(radius+1),margin_top,parseInt(curHours%10));
            }
            if(parseInt(curMinutes/10) != parseInt(nextMinutes/10)){
                addBalls(margin_left + 39*(radius+1),margin_top,parseInt(curMinutes/10));
            }
            if(parseInt(curMinutes%10) != parseInt(nextMinutes%10)){
                addBalls(margin_left + 54*(radius+1),margin_top,parseInt(curMinutes%10));
            }
            if(parseInt(curSeconds/10) != parseInt(nextSeconds/10)){
                addBalls(margin_left + 78*(radius+1),margin_top,parseInt(curSeconds/10));
            }
            if(parseInt(curSeconds%10) != parseInt(nextSeconds%10)){
                addBalls(margin_left + 93*(radius+1),margin_top,parseInt(curSeconds%10));
            }
            curShowTimeSeconds = nextShowTimeSeconds;
        }
        updateBalls();
        // console.log(balls.length)
    }
    function updateBalls(){
        for(var i=0;i<balls.length;i++){
            balls[i].x += balls[i].vx;
            balls[i].y += balls[i].vy;
            balls[i].vy += balls[i].g;
            if(balls[i].y >= window_height-radius){
                balls[i].y = window_height-radius;
                balls[i].vy = -balls[i].vy*.5;
            }

        }
        var cnt = 0;  //在屏幕中的小球
        for(var j=0;j<balls.length;j++){
            if(balls[j].x+radius > 0 && balls[j].x-radius <window_width){
                balls[cnt++] = balls[j];  //满足条件，推到数组的前面
            }
        }
        while(balls.length > Math.min(300,cnt)){
            balls.pop()
        }
    }
    function addBalls(x,y,num){
        for(var i=0;i<digit[num].length;i++){
            for(var j=0;j<digit[num][i].length;j++){
                if(digit[num][i][j] == 1){
                    var aBall = {
                        x: x+j*2*(radius+1)+(radius+1),
                        y: y+i*2*(radius+1)+(radius+1),
                        g: 1.5+Math.random(),
                        vx: Math.pow(-1,Math.ceil(Math.random()*100))*4,
                        vy: -4,
                        color: rgba()
                    };
                    balls.push(aBall);
                }
            }
        }
    }

    function render(cxt){
        var hours = parseInt(curShowTimeSeconds/3600);
        var minutes = parseInt((curShowTimeSeconds -hours*3600)/60);
        var seconds = curShowTimeSeconds%60;
        cxt.clearRect(0,0,window_width,window_height);//刷新画布
        renderDigit(margin_left,margin_top,parseInt(hours/10),cxt);
        renderDigit(margin_left + 15*(radius+1),margin_top,parseInt(hours%10),cxt);
        renderDigit(margin_left + 30*(radius+1),margin_top,10,cxt);
        renderDigit(margin_left + 39*(radius+1),margin_top,parseInt(minutes/10),cxt);
        renderDigit(margin_left + 54*(radius+1),margin_top,parseInt(minutes%10),cxt);
        renderDigit(margin_left + 69*(radius+1),margin_top,10,cxt);
        renderDigit(margin_left + 78*(radius+1),margin_top,parseInt(seconds/10),cxt);
        renderDigit(margin_left + 93*(radius+1),margin_top,parseInt(seconds%10),cxt);

        for(var i=0;i<balls.length;i++){
            cxt.beginPath();
            cxt.fillStyle = balls[i].color;
            cxt.arc(balls[i].x,balls[i].y,radius,0,2*Math.PI,true);
            cxt.closePath();
            cxt.fill()
        }
    }
    function renderDigit(x,y,num,cxt){
        cxt.fillStyle = "rgb(0,102,153)";
        for(var i=0;i<digit[num].length;i++){
            for(var j=0;j<digit[num][i].length;j++){
                if(digit[num][i][j] == 1){
                    cxt.beginPath();
                    cxt.arc( x+j*2*(radius+1)+(radius+1),y+i*2*(radius+1)+(radius+1),radius,0,2*Math.PI);
                    cxt.closePath();
                    cxt.fill()
                }
            }
        }
    }

    function rgba(){
        var r = Math.round(Math.random()*255);
        var g = Math.round(Math.random()*255);
        var b = Math.round(Math.random()*255);
        var a = 1;
        return "rgba("+r+","+g+","+b+","+a+")";
    }
};