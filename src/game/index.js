var Phaser = require('phaser');

var SCALE = 3;
var ball;
var ballSpeed = 100;
var game = new Phaser.Game(
  // Game width
  224 * SCALE,
  // Game height
  192 * SCALE,
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
}

function _create() {
  // console.log('✨ Create game');
  game.stage.backgroundColor = "#7fc379";
  ball = game.add.sprite(100,100,"ball")
  ball.scale.set(SCALE);
  game.physics.enable(ball, Phaser.Physics.ARCADE);
  var angle = 0;
  ball.body.velocity.setTo(
    Math.cos(angle) * ballSpeed,
    Math.sin(angle) * ballSpeed
  )
  ball.body.collideWorldBounds = true;
}

function _update() {
  // console.log('🔄 Update game');
}
