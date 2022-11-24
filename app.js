import { Player } from './player.js'

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
      this.player = new Player(this);
    }

    update() {
      this.player.update();
    }

    draw(context) {
      this.player.draw(context);
    }
  }

  const game = new Game(CANVAS_WIDTH, CANVAS_HEIGHT);

  function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    game.update()
    game.draw(ctx)
    requestAnimationFrame(animate)
  }

  animate();
});