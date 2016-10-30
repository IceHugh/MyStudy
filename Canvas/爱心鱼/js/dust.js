var DustObj = function() {
    this.x = [];
    this.y = [];
    this.amp = [];
    this.No = [];
    this.alpha;
}
DustObj.prototype.num = 60;
DustObj.prototype.init = function() {
    for (var i = 0; i < this.num; i++) {
        this.x[i] = Math.random() * canWidth;
        this.y[i] = Math.random() * canHeight;
        this.No[i] = Math.floor(Math.random() * 7);
        this.amp[i] = Math.random() * 15 + 25;
    }
    this.alpha = 0;
};
DustObj.prototype.draw = function() {
    this.alpha += deltaTime * 0.0008;
    var l = Math.sin(this.alpha);
    for (var i = 0; i < this.num; i++) {
        ctx1.drawImage(dustPic[this.No[i]], this.x[i] + this.amp[i] * l, this.y[i]);
    }
};