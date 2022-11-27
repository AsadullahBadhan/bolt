import { Dust, Fire } from './particle.js';

const state = {
  STANDING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  SITTING: 4,
  ROLLING: 5,
  DIVING: 6,
  HIT: 7
}

class State {
  constructor(state, game) {
    this.state = state;
    this.game = game;
  }
}

export class Standing extends State {
  constructor(game) {
    super('STANDING', game);
  }

  enter() {
    this.game.player.frameY = 0;
    this.game.player.maxFrame = 6;
  }

  handleInput(input) {
    if (input.includes('ArrowRight') || input.includes('ArrowLeft')) this.game.player.setState(state.RUNNING, 1);
    else if (input.includes('ArrowUp')) this.game.player.setState(state.JUMPING, 1);
    else if (input.includes('ArrowDown')) this.game.player.setState(state.SITTING, 0);
    else if (input.includes('Enter')) this.game.player.setState(state.ROLLING, 2);
  }
}

export class Running extends State {
  constructor(game) {
    super('RUNNING', game);
  }

  enter() {
    this.game.player.frameY = 3;
    this.game.player.maxFrame = 8;

  }

  handleInput(input) {
    this.game.particles.push(new Dust(this.game, this.game.player.x + this.game.player.width / 2, this.game.player.y + this.game.player.height));
    if (input.length === 0) this.game.player.setState(state.STANDING, 0);
    if (input.includes('ArrowUp')) this.game.player.setState(state.JUMPING, 1);
    else if (input.includes('Enter')) this.game.player.setState(state.ROLLING, 2);
  }
}

export class Jumping extends State {
  constructor(game) {
    super('JUMPING', game);
  }

  enter() {
    this.game.player.frameY = 1;
    this.game.player.maxFrame = 6;
    this.game.player.speed = 5;
    if (this.game.player.onGround()) this.game.player.vy -= 25;
  }

  handleInput(input) {
    if (this.game.player.vy > this.game.player.weight) this.game.player.setState(state.FALLING, 1);
    else if (input.includes('Enter')) this.game.player.setState(state.ROLLING, 2);
  }
}

export class Falling extends State {
  constructor(game) {
    super('FALLING', game);
  }

  enter() {
    this.game.player.frameY = 2;
    this.game.player.maxFrame = 6;
  }

  handleInput(input) {
    if (this.game.player.onGround()) this.game.player.setState(state.STANDING, 0)
  }
}


export class Sitting extends State {
  constructor(game) {
    super('SITTING', game);
  }

  enter() {
    this.game.player.frameY = 5;
    this.game.player.maxFrame = 4;
  }

  handleInput(input) {
    if (input.includes('ArrowRight') || input.includes('ArrowLeft')) this.game.player.setState(state.RUNNING, 1);
    else if (input.includes('ArrowUp')) this.game.player.setState(state.JUMPING, 1);
    else if (input.includes('Enter')) this.game.player.setState(state.ROLLING, 2);
  }
}

export class Rolling extends State {
  constructor(game) {
    super('ROLLING', game);
  }

  enter() {
    this.game.player.frameY = 6;
    this.game.player.maxFrame = 6;
  }

  handleInput(input) {
    this.game.particles.push(new Fire(this.game, this.game.player.x, this.game.player.y));
    if (!input.includes('Enter') && this.game.player.onGround()) {
      this.game.player.setState(state.RUNNING, 1);
    } else if (!input.includes('Enter') && !this.game.player.onGround()) {
      this.game.player.setState(state.FALLING, 1)
    } else if (input.includes('Enter') && this.game.player.onGround() && input.includes('ArrowUp')) {
      this.game.player.vy -= 27;
    }
  }
}