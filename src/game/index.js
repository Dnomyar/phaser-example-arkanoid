var Phaser = require('phaser');

var SCALE = 3;
var ball;
var bar;
var ballSpeed = 200;
var barSpeed = 200;
var cursor;

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
}

function _update() {
  // console.log('🔄 Update game');
  bar.body.velocity.x = 0;
  if(cursor.left.isDown){
    bar.body.velocity.x = - barSpeed * SCALE;
  } else if (cursor.right.isDown){
    bar.body.velocity.x = barSpeed * SCALE;
  }
}
