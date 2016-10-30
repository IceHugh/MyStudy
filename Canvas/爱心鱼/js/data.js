var DataObj = function() {
    this.fruitNum = 0;
    this.double = 1;
    this.score = 0;
    this.alpha = 0;
    this.fontSize = 0;
    this.gameOver = false;
};
DataObj.prototype.draw = function() {
    var w = can1.width;
    var h = can1.height;
    // ctx1.fillText("num " + this.fruitNum, w * .5, h - 50);
    // ctx1.fillText("double " + this.double, w * .5, h - 80);
    ctx1.save();
    ctx1.shadowBlur = 20;
    ctx1.shadowColor = "white";
    ctx1.fillStyle = "white";
    ctx1.fillText("SCORE:" + this.score, w * .5, h - 40);
    if (this.gameOver) {
        this.alpha += deltaTime * 0.0005;
        if (this.alpha > 1) {
            this.alpha = 1;
        }
        this.fontSize += parseInt(Math.ceil(deltaTime*.05));
        if(this.fontSize > 60) this.fontSize = 60;
        ctx1.font = this.fontSize+"px Vardana";
        ctx1.fillStyle = "rgba(255,255,255," + this.alpha + ")";
        ctx1.fillText("GAME OVER", w * .5, h * .5+40);
    }
    ctx1.restore();
};
DataObj.prototype.addScore = function() {
    this.score += this.fruitNum * 100 * this.double;
    this.fruitNum = 0;
    this.double = 1;
};