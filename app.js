import { Player } from './player.js';
import { InputHandler } from './inputHandler.js';
import { Background } from './layer.js';

window.addEventListener('load', function () {
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
      this.input = new InputHandler();
    }

    update(delta) {
      this.player.update(delta, this.input.keys);
      this.background.update();
    }

    draw(context) {
      this.background.draw(context);
      this.player.draw(context);
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