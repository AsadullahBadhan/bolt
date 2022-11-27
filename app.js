import { Player } from './player.js';
import { InputHandler } from './inputHandler.js';
import { Background } from './layer.js';
import { ClimbingEnemy, FlyingEnemy, GroundEnemy } from './enemy.js';

window.addEventListener('load', function () {
  /** @type {HTMLCanvasElement} */

  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');

  document.getElementById('loading').style.display = 'none';

  const CANVAS_WIDTH = canvas.width = 800;
  const CANVAS_HEIGHT = canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.baseline = 80;
      this.speed = 0;
      this.maxSpeed = 6;
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.enemies = [];
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.dubug = false;
    }

    update(delta) {
      this.player.update(delta, this.input.keys);
      this.background.update();

      this.enemies.forEach(enemy => {
        enemy.update(delta);
      })
      this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion)
      //add enemy to the game
      if (this.enemyTimer > this.enemyInterval) {
        this.enemyTimer = 0;
        this.addEnemy();
      } else {
        this.enemyTimer += delta;
      }
    }

    draw(context) {
      this.background.draw(context);
      this.player.draw(context);
      this.enemies.forEach(enemy => {
        enemy.draw(context);
      })
    }

    addEnemy() {
      if (this.speed > 0 && Math.random() < 0.5) {
        this.enemies.push(new GroundEnemy(this))
      } else if (this.speed > 0) {
        this.enemies.push(new ClimbingEnemy(this));
      }
      this.enemies.push(new FlyingEnemy(this));
    }
  }

  const game = new Game(CANVAS_WIDTH, CANVAS_HEIGHT);
  console.log(game)
  let lastTime = 0;

  function animate(timeStamp) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const delta = timeStamp - lastTime;
    lastTime = timeStamp;
    // console.log(delta)
    game.update(delta);
    game.draw(ctx)
    requestAnimationFrame(animate)
  }

  animate(0);
});