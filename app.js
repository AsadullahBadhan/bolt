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
      this.particles = [];
      this.enemies = [];
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.dubug = false;
      this.player.currentState = this.player.states[0];
      this.player.currentState.enter();
    }

    update(delta) {
      this.player.update(delta, this.input.keys);
      this.background.update();

      //add enemy to the game
      if (this.enemyTimer > this.enemyInterval) {
        this.enemyTimer = 0;
        this.addEnemy();
      } else {
        this.enemyTimer += delta;
      }
      this.enemies.forEach(enemy => {
        enemy.update(delta);
      })
      this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion)

      //handle particle
      this.particles.forEach((particle, index) => {
        particle.update();
        if (particle.markedForDeletion) this.particles.splice(index, 1);
      })
    }

    draw(context) {
      this.background.draw(context);
      this.player.draw(context);
      this.enemies.forEach(enemy => {
        enemy.draw(context);
      })
      this.particles.forEach((particle) => {
        particle.draw(context);
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