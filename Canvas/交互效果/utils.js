if(!window.requestAnimationFrame){
    window.requestAnimationFrame = (window.webkitRequsetAnimationFrame ||
                                    window.mozRequsetAnimationFrame ||
                                    window.oRequestAnimationFrame ||
                                    window.msRequestAnimationFrame ||
                                    function (callback) {
                                        retrun window.setTimeout(callback,1000/60);
                                    });
}
if(!window.cancelAnimationFrame){
    window.cancelAnimationFrame = (window.cancelRequestAnimationFrame ||
                                   window.webkitCancelAnimationFrame ||
                                   window.webkitCancelRequestAnimationFrame ||
                                   window.mozCancelAnimationFrame ||
                                   window.mozCancelRequsetAnimationFrame ||
                                   window.oCancelAnimationFrame ||
                                   window.oCancelRequestAnimationFrame ||
                                   window.clearTimeout);
}
/**
 * 旋转角度函数
 * @param {number} mx mouse.x
 * @param {number} my mouse.y
 * @param {number} ox object.x
 * @param {number} oy object.y
 */
function RotationToMouse(mx,my,ox,oy){
    var dx = mx - ox;
    var dy = my -oy;
    var angle = Math.atan2(dy,dx);
    return angle
}

var utils = {
    this.captureMouse = function (element) {
        var mouse = {
            x:0,
            y:0
        }
        element.addEventListener('mousemove',function (event) {
            var x = 0;
            var y = 0;
            if (event.pageX || event.pageY) {
                x = event.pageX;
                y = event.pageY;
            } else {
                x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            x -= element.offsetLeft;
            y -= element.offsetTop;
            mouse.x = x;
            mouse.y = y;
        },false)；
        return mouse;
    }
    this.captureTouch = function (element) {
        var touch = {
            x: null,
            y: null,
            isPressed: false,
            event: null
            },
            body_scrollLeft = document.body.scrollLeft,
            element_scrollLeft = document.documentElement.scrollLeft,
            body_scrollTop = document.body.scrollTop,
            element_scrollTop = document.documentElement.scrollTop,
            offsetLeft = element.offsetLeft,
            offsetTop = element.offsetTop;
        element.addEventListener('touchstart',function (event) {
            touch.isPressed = true;
            touch.event = event;
        },false);
        element.addEventListener('touchend',function (event) {
            touch.isPressed = false;
            touch.x = null;
            touch.y = null;
            touch.event = event;
        },false);
        element.addEventListener('touchmove',function (event) {
            var x,y,
                touch_event = event.touches[0];
            if(touch_event.pageX || touch_event.pageY){
                x = touch_event.pageX;
                y = touch_event.pageY;
            }else{
                x = touch_event.clientX + body_scrollLeft + element_scrollLeft;
                y = touch_event.clientY + body_scrollTop + element_scrollTop;
            }
            x -= offsetLeft;
            y -= offsetTop;
            touch.x = x;
            touch.y = y;
            touch.event = event;
        },false);
        return touch;
    };
    this.parseColor = function (color,toNumber) {
        if (toNumber === true) {
            if (typeof color === 'number') {
                return (color | 0)
            }
            if(typeof color === 'string' && color[0] === '#'){
                color = color.slice(1);
            }
            return parseInt(color,16);
        }else {
            if (typeof color === 'number') {
                color = '#' + ('00000' + (color | 0).toString(16)).substr(-6);
            }
            return color;
        }
    };
    this.colorToGRgb = function (color,alpha) {
        if(typeof color === 'string' && color[0] === '#'){
            color = parseInt(color.slice(1),16);
        }
        alpha = (alpha === undefined)?1:alpha;
        var r = color >> 16 & oxff;
        var g = color >> 8 & oxff;
        var b = color & oxff;
        a = (alpha <0) ? 0 : ((alpha >1)?1:alpha);
        if(a===1){
            return 'rgb('+r+','+b+','+b+')';
        }else{
            return 'rgba('+r+','+b+','+b+','+a+')';
        }
    };
    this.containsPoint = function (rect,x,y) {
        return !(x < rect.x || x > rect.x + rect.width || y < rect.y || y>rect.y+rect.height)
    };
    this.intersects = function (rectA,rectB) {
        return !(rectA.x + rectA.width < rectB.x||
                 rectB.x + rectB.width <rectA.x ||
                 rectA.y + rectA.height < rectB.x ||
                 rectB.y +rectB.height <rectA.y);
    };
};
