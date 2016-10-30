var MomObj = function() {
  this.x = [];
  this.y = [];
  this.angle = [];
  this.momTailTimer = 0;
  this.momTailCount = 0;

  this.momEyeTimer = 0;
  this.momEyeCount = 0;
  this.momEyeInterval = 1000;

  this.momBodyCount = 0;
}
MomObj.prototype.init = function() {
  this.x = canWidth * .5;
  this.y = canHeight * .5;
  this.angle = 0;
};
MomObj.prototype.draw = function() {
  this.x = lerpDistance(mx, this.x, .99);
  this.y = lerpDistance(my, this.y, .99);

  var deltaX = mx - this.x;
  var deltaY = my - this.y;
  var beta = Math.atan2(deltaY, deltaX) + Math.PI;
  this.angle = lerpAngle(beta, this.angle, .6)

  this.momTailTimer += deltaTime;
  if (this.momTailTimer > 50) {
    this.momTailCount = (this.momTailCount + 1) % 8;
    this.momTailTimer %= 50;
  }
  this.momEyeTimer += deltaTime;
  if (this.momEyeTimer > this.momEyeInterval) {
    this.momEyeCount = (this.momEyeCount + 1) % 2;
    this.momEyeTimer %= this.momEyeInterval;
    if (this.momEyeCount === 0) {
      this.momEyeInterval = Math.random() * 1500 + 2000;
    } else {
      this.momEyeInterval = 200;
    }
  }
  var momTailCount = this.momTailCount;
  var momEyeCount = this.momEyeCount;
  ctx1.save();
  ctx1.translate(this.x, this.y);
  ctx1.rotate(this.angle);
  var momBodyCount = this.momBodyCount;
  if(data.double == 1){
    ctx1.drawImage(momBodyOran[momBodyCount], -momBodyOran[momBodyCount].width * .5, -momBodyOran[momBodyCount].height * .5);
  }else{
    ctx1.drawImage(momBodyBlue[momBodyCount], -momBodyBlue[momBodyCount].width * .5, -momBodyBlue[momBodyCount].height * .5);
  }
  ctx1.drawImage(momTail[momTailCount], -momTail[momTailCount].width * .5 + 30, -momTail[momTailCount].height * .5);
  ctx1.drawImage(momEye[momEyeCount], -momEye[momEyeCount].width * .5, -momEye[momEyeCount].height * .5);
  ctx1.restore();
  // console.log(this.x);
};