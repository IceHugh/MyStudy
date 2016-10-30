var can1, can2, ctx1, ctx2, lastTime, deltaTime;
var bgPic = new Image();
var canWidth;
var canHeight;
var ane;
var fruit;
var mom;
var data;
var babyTail = [];
var babyEye = [];
var babyBody = [];
var momTail = [];
var momEye = [];
var momBodyOran = [];
var momBodyBlue = [];
var wave;
var halo;
var dust;
var dustPic = [];
document.body.onload = game;

function game() {
  init();
  lastTime = Date.now();
  deltaTime = 0;
  gameloop();
}

function init() {
  can1 = document.getElementById("canvas1"); //firshes,dust,UI,circle
  ctx1 = can1.getContext("2d");
  can2 = document.getElementById("canvas2"); //background,ane,fruits
  ctx2 = can2.getContext("2d");

  can1.addEventListener("mousemove", onMouseMove, false);

  bgPic.src = "images/background.jpg"
  canWidth = can1.width;
  canHeight = can1.height;

  ane = new AneObj();
  ane.init();

  fruit = new FruitObj();
  fruit.init();

  baby = new BabyObj();
  baby.init();

  mom = new MomObj();
  mom.init();

  mx = canWidth * .5;
  my = canHeight * .5;

  for (var i = 0; i < 8; i++) {
    babyTail[i] = new Image();
    babyTail[i].src = './images/babyTail' + i + '.png';
  };
  for (var j = 0; j < 2; j++) {
    babyEye[j] = new Image();
    babyEye[j].src = './images/babyEye' + j + '.png';
  };
  for (var k = 0; k < 20; k++) {
    babyBody[k] = new Image();
    babyBody[k].src = './images/babyFade' + k + '.png';
  }
  for (var i = 0; i < 8; i++) {
    momTail[i] = new Image();
    momTail[i].src = './images/bigTail' + i + '.png';
  };
  for (var j = 0; j < 2; j++) {
    momEye[j] = new Image();
    momEye[j].src = './images/bigEye' + j + '.png';
  };
  for (var k = 0; k < 8; k++) {
    momBodyOran[k] = new Image();
    momBodyBlue[k] = new Image();
    momBodyOran[k].src = './images/bigSwim' + k + '.png';
    momBodyBlue[k].src = './images/bigSwimBlue' + k + '.png';
  }
  data = new DataObj();
  ctx1.font = "30px Vardana";
  ctx1.textAlign = "center";

  wave = new WaveObj();
  wave.init();
  halo = new HaloObj();
  halo.init();

  for (var i = 0; i < 7; i++) {
    dustPic[i] = new Image();
    dustPic[i].src = "./images/dust"+i+".png";
  }
  dust = new DustObj();
  dust.init();
}

function gameloop() {
  window.requestAnimFrame(gameloop);
  var now = Date.now();
  deltaTime = now - lastTime; //没两帧之间的时间差
  // console.log(deltaTime);
  if (deltaTime > 40) deltaTime = 40; //解决chrome浏览器下切换标签deltaTime变的过大，导致果实变得太大的问题
  lastTime = now;
  drawBackground();
  ane.draw();
  fruitMonitor();
  fruit.draw();
  ctx1.clearRect(0, 0, canWidth, canHeight)
  mom.draw();
  baby.draw();

  momFruitsCollision();
  momBabyCollision();

  data.draw();
  wave.draw();
  halo.draw();
  dust.draw();
}

function onMouseMove(e) {
  if (!data.gameOver) {
    if (e.offsetX || e.layerX) {
      mx = e.offsetX == undefined ? e.layerX : e.offsetX;
      my = e.offsetY == undefined ? e.layerY : e.offsetY;
      // console.log(mx)
    }
  }
}