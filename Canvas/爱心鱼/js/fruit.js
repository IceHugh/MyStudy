var FruitObj = function() {
  this.alive = []; //boo
  this.x = [];
  this.y = [];
  this.l = [];
  this.aneNum = [];
  this.spd = [];
  this.fruitType = [];
  this.orange = new Image();
  this.blue = new Image();
}
FruitObj.prototype.num = 30;
FruitObj.prototype.init = function() {
  for (var i = 0; i < this.num; i++) {
    this.alive[i] = false;
    this.x[i] = 0;
    this.y[i] = 0;
    this.l[i] = 0;
    this.spd[i] = Math.random() * 0.017 + 0.003;
    this.fruitType[i] = "";
  }
  this.orange.src = './images/fruit.png';
  this.blue.src = './images/blue.png';
}
FruitObj.prototype.draw = function() {
  for (var i = 0; i < this.num; i++) {
    if (this.alive[i]) {
      if(this.fruitType[i] === "blue"){
        var pic = this.blue;
      }else{
        var pic = this.orange
      }
      if (this.l[i] < 14) {
        this.l[i] += this.spd[i] * deltaTime; //使动画平滑
        this.x[i] = ane.currentX[this.aneNum[i]];
      } else {
        this.y[i] -= this.spd[i] * 6 * deltaTime;
      }
      ctx2.drawImage(pic, this.x[i] - this.l[i] * .5, this.y[i] - this.l[i] * .5, this.l[i], this.l[i]);
      if (this.y[i] < 10) {
        this.alive[i] = false;
      }
    }
  }
};
FruitObj.prototype.born = function(i) {
  this.aneNum[i] = Math.floor(Math.random() * ane.num);
  this.y[i] = canHeight - ane.len[this.aneNum[i]];
  this.l[i] = 0;
  this.alive[i] = true;
  var ran = Math.random();
  if(ran < 0.15){
    this.fruitType[i] = "blue";
  }else{
    this.fruitType[i] = "orange"
  }
};
FruitObj.prototype.dead = function(i) {
  this.alive[i] = false;
};
function fruitMonitor() {
  var num = 0;
  for (var i = 0; i < fruit.num; i++) {
    if (fruit.alive[i]) num++;
  }
  if (num < 15) {
    sentFruit();
    return;
  }
}

function sentFruit() {
  for (var i = 0; i < fruit.num; i++) {
    if (!fruit.alive[i]) {
      fruit.born(i);
      return;
    }
  }
}