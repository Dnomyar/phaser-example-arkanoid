var Phaser = require('phaser');

var SCALE = 3;
var ball;
var bar;
var ballSpeed = 200;
var barSpeed = 200;
var cursor;
var brick;
var bricks;

var WIDTH = 224;
var HEIGHT = 192;

var WIDTH_SCALED = WIDTH * SCALE;
var HEIGHT_SCALED = HEIGHT * SCALE;

var game = new Phaser.Game(
  // Game width
  WIDTH_SCALED,
  // Game height
  HEIGHT_SCALED,
  // Game renderer (WebGL, Canvas, auto)
  Phaser.AUTO,
  // Game id in index.html
  'phaser-example-arkanoid',
  // Phaser states
  {
    preload: _preload,
    create: _create,
    update: _update
  },
  // Transparent canvas background
  false,
  // Antialias
  false
);

function _preload() {
  // console.log('💤 Preload game');
  game.load.image("ball", "game/assets/ball.png")
  game.load.image("bar", "game/assets/bar.png")
  game.load.image("brick", "game/assets/brick01.png")
}

function _create() {
  // console.log('✨ Create game');
  game.stage.backgroundColor = "#7fc379";
  ball = game.add.sprite(100,100,"ball")
  bar = game.add.sprite(WIDTH_SCALED / 2, HEIGHT_SCALED - 40, "bar")
  ball.scale.set(SCALE);
  bar.scale.set(SCALE);
  game.physics.enable(ball, Phaser.Physics.ARCADE);
  game.physics.enable(bar, Phaser.Physics.ARCADE);

  var angle = 90;
  ball.body.velocity.setTo(
    Math.cos(angle) * ballSpeed,
    Math.sin(angle) * ballSpeed
  )
  ball.body.collideWorldBounds = true;
  bar.body.collideWorldBounds = true;
  ball.body.bounce.set(1);

  cursor = game.input.keyboard.createCursorKeys();
  bar.body.immovable = true;

  _createBricks()
}

function _createBricks(){
  bricks = game.add.group();
  var brickWidth = game.cache.getImage('brick').width;
  var brickHeight = game.cache.getImage('brick').height;
  for (var i = 0; i < WIDTH / brickWidth; i++) {
    for (var j = 0; j < 6; j++) {
      var brick = _createOneBrick(
        brickWidth * SCALE * i,
        brickHeight * SCALE * j,
        'brick');
      bricks.add(brick);
    }
  }
  return bricks;
}

function _createOneBrick(x, y, sprite){
  var brick = game.add.sprite(x, y, sprite);
  brick.scale.set(SCALE);
  game.physics.enable(brick, Phaser.Physics.ARCADE);
  brick.body.immovable = true;
  return brick;
}

function _update() {
  // console.log('🔄 Update game');
  bar.body.velocity.x = 0;
  if(cursor.left.isDown){
    bar.body.velocity.x = - barSpeed * SCALE;
  } else if (cursor.right.isDown){
    bar.body.velocity.x = barSpeed * SCALE;
  }
  game.physics.arcade.collide(bar, ball, null, _reflect, this);
  game.physics.arcade.collide(ball, bricks, null, _breakBrick, this);
}

function _reflect(bar, ball){
  if(ball.y > (bar.y + 5)){
    return true;
  }else{
    var rate = (1 - (ball.x + ball.width * 0.5 - bar.x) / bar.width);
    if(rate < 0.1) rate = 0.1;
    if(rate > 0.9) rate = 0.9;
    var angle = - Math.PI * rate;
    ball.body.velocity.setTo(
      Math.cos(angle) * ballSpeed,
      Math.sin(angle) * ballSpeed
    )
    return false;
  }
}

function _breakBrick(ball, brick) {
  brick.kill();
  return true;
}
