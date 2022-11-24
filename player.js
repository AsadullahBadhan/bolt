export class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.x = 10;
    this.y = this.game.height - this.height;
    this.image = document.getElementById('player');
  }

  update() {
    // this.x++;
  }

  draw(context) {
    // context.strokeRect(this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.width * 2, this.height * 0, this.width, this.height, this.x, this.y, this.width, this.height);
  }
}