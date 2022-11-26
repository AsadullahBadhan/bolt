const state = {
  STANDING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  SITTING: 4
}

class State {
  constructor(state) {
    this.state = state;
  }
}

export class Standing extends State {
  constructor(player) {
    super('STANDING');
    this.player = player;
  }

  enter() {
    this.player.frameY = 0;
    this.player.maxFrame = 6;
  }

  handleInput(input) {
    if (input.includes('ArrowRight') || input.includes('ArrowLeft')) this.player.setState(state.RUNNING, 1);
    else if (input.includes('ArrowUp')) this.player.setState(state.JUMPING, 1);
    else if (input.includes('ArrowDown')) this.player.setState(state.SITTING, 0);
  }
}

export class Running extends State {
  constructor(player) {
    super('RUNNING');
    this.player = player;
  }

  enter() {
    this.player.frameY = 3;
    this.player.maxFrame = 8;
  }

  handleInput(input) {
    if (input.length === 0) this.player.setState(state.STANDING, 0);
    if (input.includes('ArrowUp')) this.player.setState(state.JUMPING, 1);
  }
}

export class Jumping extends State {
  constructor(player) {
    super('JUMPING');
    this.player = player;
  }

  enter() {
    this.player.frameY = 1;
    this.player.maxFrame = 6;
    this.player.speed = 5;
    if (this.player.onGround()) this.player.vy = -20;
  }

  handleInput(input) {
    if (this.player.vy > this.player.weight) this.player.setState(state.FALLING, 1);
  }
}

export class Falling extends State {
  constructor(player) {
    super('FALLING');
    this.player = player;
  }

  enter() {
    this.player.frameY = 2;
    this.player.maxFrame = 6;
  }

  handleInput(input) {
    if (this.player.onGround()) this.player.setState(state.STANDING, 0)
  }
}


export class Sitting extends State {
  constructor(player) {
    super('SITTING');
    this.player = player;
  }

  enter() {
    this.player.frameY = 5;
    this.player.maxFrame = 4;
  }

  handleInput(input) {
    if (input.includes('ArrowRight') || input.includes('ArrowLeft')) this.player.setState(state.RUNNING, 1);
    else if (input.includes('ArrowUp')) this.player.setState(state.JUMPING, 1);
  }
}