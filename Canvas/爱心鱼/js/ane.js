var AneObj = function() {
  this.x = [];
  this.len = [];
  this.currentX = [];
  this.amp = [];
  this.alpha = 0;
}
AneObj.prototype.num = 50;
AneObj.prototype.init = function() {
  for (var i = 0; i < this.num; i++) {
    this.x[i] = i * 16 + Math.random() * 20;
    this.len[i] = 200 + Math.random() * 50;
    this.amp[i] = Math.random() * 50 + 50;
  }
};
AneObj.prototype.draw = function() {
  this.alpha += deltaTime * .0008;
  var l = Math.sin(this.alpha);
  ctx2.save();
  ctx2.globalAlpha = .7;
  ctx2.lineWidth = 20;
  ctx2.lineCap = "round";
  ctx2.strokeStyle = "#3b154e";
  ctx2.shadowBlur = 1;
  ctx2.shadowColor = "white";
  for (var i = 0; i < this.num; i++) {
    ctx2.beginPath();
    ctx2.moveTo(this.x[i], canHeight);
    this.currentX[i] = this.x[i] + l * this.amp[i];
    ctx2.quadraticCurveTo(this.x[i], canHeight - 90, this.currentX[i], canHeight - this.len[i]);
    ctx2.stroke();
  }
  ctx2.restore();
}