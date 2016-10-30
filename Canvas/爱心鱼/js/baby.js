var BabyObj = function() {
    this.x;
    this.y;
    this.angle;
    this.babyEye = new Image();
    this.babyBody = new Image();

    this.babyTailTimer = 0;
    this.babyTailCount = 0;

    this.babyEyeTimer = 0;
    this.babyEyeCount = 0;
    this.babyEyeInterval = 1000;

    this.babyBodyTimer = 0;
    this.babyBodyCount = 0;
}
BabyObj.prototype.init = function() {
    this.x = canWidth * .5 - 50;
    this.y = canHeight * .5 + 50;
    this.angle = 0;
};
BabyObj.prototype.draw = function() {
    this.x = lerpDistance(mom.x, this.x, .99);
    this.y = lerpDistance(mom.y, this.y, .99);

    this.babyTailTimer += deltaTime;
    if(this.babyTailTimer >50){
        this.babyTailCount = (this.babyTailCount + 1) % 8;
        this.babyTailTimer %= 50;
    }
    this.babyEyeTimer += deltaTime;
    if(this.babyEyeTimer > this.babyEyeInterval){
        this.babyEyeCount = (this.babyEyeCount + 1) % 2;
        this.babyEyeTimer %= this.babyEyeInterval;
        if(this.babyEyeCount === 0){
            this.babyEyeInterval = Math.random()*1500+2000;
        }else{
            this.babyEyeInterval = 200;
        }
    }
    //身体
    this.babyBodyTimer += deltaTime;
    if(this.babyBodyTimer > 300){
        this.babyBodyCount = this.babyBodyCount + 1;
        this.babyBodyTimer %= 300;
        if(this.babyBodyCount > 19){
            this.babyBodyCount = 19;
            //game over
            data.gameOver = true;
        }
    }
    var babyTailCount = this.babyTailCount;
    var babyEyeCount = this.babyEyeCount;
    var babyBodyCount = this.babyBodyCount;
    var deltaX = mom.x - this.x;
    var deltaY = mom.y - this.y;
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;
    this.angle = lerpAngle(beta, this.angle, .7)
    ctx1.save();
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);
    ctx1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width * .5 + 23, -babyTail[babyTailCount].height * .5);
    ctx1.drawImage(babyBody[babyBodyCount], -babyBody[babyBodyCount].width * .5, -babyBody[babyBodyCount].height * .5);
    ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width * .5, -babyEye[babyEyeCount].height * .5);
    ctx1.restore();
};