var HaloObj = function() {
    this.x = [];
    this.y = [];
    this.r = [];
    this.alive = [];
}
HaloObj.prototype.num = 5;
HaloObj.prototype.init = function() {
    for (var i = 0; i < this.num; i++) {
        this.x[i] = 0;
        this.y[i] = 0;
        this.r[i] = 0;
        this.alive[i] = false;
    }
};
HaloObj.prototype.draw = function() {
    ctx1.save();
    ctx1.lineWidth = 4;
    ctx1.shadowBlur = 10;
    ctx1.shadowColor = "rgba(203,91,0,1)";
    for (var i = 0; i < this.num; i++) {
        if (this.alive[i]) {
            ctx1.beginPath();
            this.r[i] += deltaTime*0.1;
            if (this.r[i] > 100) {
                this.alive[i] = false;
                break;
            }
            var alpha = 1 - this.r[i] / 100;
            ctx1.arc(this.x[i], this.y[i], this.r[i], 0, 2 * Math.PI);
            ctx1.closePath();
            ctx1.strokeStyle = "rgba(203,91,0," + alpha + ")";
            ctx1.stroke();
        }
    }
    ctx1.restore();
};
HaloObj.prototype.born = function(x, y) {
    for (var i = 0; i < this.num; i++) {
        if (!this.alive[i]) {
            this.x[i] = x;
            this.y[i] = y;
            this.r[i] = 20;
            this.alive[i] = true;
            return;
        }
    }
};