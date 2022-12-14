import { Standing, Running, Jumping, Falling, Sitting, Rolling } from './playerState.js';

export class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.x = 10;
    this.y = this.game.height - this.height - this.game.baseline;
    this.speed = 0;
    this.maxSpeed = 10;
    this.vy = 0;
    this.weight = 1;
    this.image = document.getElementById('player');
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame;
    this.fps = 30;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.states = [new Standing(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Sitting(this.game), new Rolling(this.game)];
  }

  update(delta, input) {
    this.checkCollision();
    // console.log(this.currentState)
    this.currentState.handleInput(input)
    // horizontal movement
    this.x += this.speed;
    if (input.includes('ArrowRight')) this.speed = this.maxSpeed;
    else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
    else this.speed = 0;
    // horizontal border
    if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
    if (this.x < 0) this.x = 0;

    //vertical movement
    this.y += this.vy;
    if (!this.onGround()) this.vy += this.weight;
    else this.vy = 0;
    if (this.y > this.game.height - this.height - this.game.baseline) this.y = this.game.height - this.height - this.game.baseline;

    if (this.frameTimer > this.frameInterval) {
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
      this.frameTimer = 0;
    } else this.frameTimer += delta;
  }

  draw(context) {
    if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
  }

  onGround() {
    return (
      this.y >= this.game.height - this.height - this.game.baseline
    )
  }

  setState(state, speed) {
    this.currentState = this.states[state];
    this.game.speed = this.game.maxSpeed * speed;
    this.currentState.enter();
  }

  checkCollision() {
    this.game.enemies.forEach(enemy => {
      if (
        enemy.x < this.x + this.width &&
        enemy.x + enemy.width > this.x &&
        enemy.y < this.y + this.height &&
        enemy.y + enemy.height > this.y
      ) {
        //player and enemy collided
        enemy.markedForDeletion = true;
      } else {
        //player and enemy not collided
      }
    });
  }
}