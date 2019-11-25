class Pages {
  constructor(Aquarium, ctx) {
    this.Aquarium = Aquarium;
    this.ctx = ctx;
    this.about = false;
    this.victory = false;
    this.gameover = false;
  }

  drawAbout() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(this.Aquarium.WIDTH, 0);
    this.ctx.lineTo(this.Aquarium.WIDTH, this.Aquarium.CANVAS_HEIGHT);
    this.ctx.lineTo(0, this.Aquarium.CANVAS_HEIGHT);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.textAlign = 'start';
    this.ctx.fillStyle = '#def3f6'
    this.ctx.font = 'bold 16px sans-serif';
    this.ctx.fillText('About', 20, 30);
    this.ctx.fillText('Controls', 20, 150);
    this.ctx.fillText('Credits', 20, 300);

    this.ctx.font = '14px sans-serif';
    this.ctx.fillText('The ocean is brimming with peacefully coexisting life!', 20, 50);
    this.ctx.fillText('Help your shark consume them all, but prevent it from', 20, 70);
    this.ctx.fillText('swimming too deep, or its ravenous hunger will drag it', 20, 90);
    this.ctx.fillText('down into the painful depths!', 20, 110);

    this.ctx.fillText('Use the mouse to position the launchpad.', 20, 170);
    this.ctx.fillText('Click and hold to aim your shark.', 20, 190);
    this.ctx.fillText('Release to launch!', 20, 210);
    this.ctx.fillText('Continue using the launchpad to ', 20, 240);
    this.ctx.fillText('redirect your shark away from the deep!', 20, 260);

    this.ctx.fillText('Background: https://opengameart.org/users/', 20, 320);
    this.ctx.fillText('game-developer-studio', 116, 340);
    this.ctx.fillText('Sea Nommables: https://rapidpunches.itch.io/', 20, 360);
    this.ctx.fillText('Shark: https://opengameart.org/users/pillarist', 20, 380);
    this.ctx.fillText('BGM: "Sunken Suite" (djpretzel / https://ocremix.org)', 20, 400);
    this.ctx.fillText('Chomp Sounds: https://opengameart.org/users/darsycho', 20, 420);

    this.ctx.beginPath();
    this.ctx.moveTo(474, 553);
    this.ctx.lineTo(577, 553);
    this.ctx.lineTo(577, 583);
    this.ctx.lineTo(474, 583);
    this.ctx.closePath();
  }

  drawVictory() {
    this.ctx.font = 'bold 56px sans-serif';
    this.ctx.fillStyle = '#def3f6'
    this.ctx.textAlign = 'center';
    this.ctx.fillText('ATE \'EM', this.Aquarium.WIDTH / 2, this.Aquarium.HEIGHT / 2 - 24);

    this.ctx.font = 'bold 32px monospace';
    this.ctx.fillText('Nom More', this.Aquarium.WIDTH / 2, this.Aquarium.HEIGHT / 2 + 32);

    this.ctx.beginPath();
    this.ctx.moveTo(151, 310);
    this.ctx.lineTo(300, 310);
    this.ctx.lineTo(300, 332);
    this.ctx.lineTo(151, 332);
    this.ctx.closePath();
  }

  drawGameover() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(this.Aquarium.WIDTH, 0);
    this.ctx.lineTo(this.Aquarium.WIDTH, this.Aquarium.CANVAS_HEIGHT);
    this.ctx.lineTo(0, this.Aquarium.CANVAS_HEIGHT);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.fillStyle = 'rgba(64, 103, 128, 0.55)';
    this.ctx.beginPath();
    this.ctx.moveTo(this.Aquarium.WIDTH, 0);
    this.ctx.lineTo(this.Aquarium.CANVAS_WIDTH, 0);
    this.ctx.lineTo(this.Aquarium.CANVAS_WIDTH, this.Aquarium.CANVAS_HEIGHT);
    this.ctx.lineTo(this.Aquarium.WIDTH, this.Aquarium.CANVAS_HEIGHT);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.font = 'bold 56px sans-serif';
    this.ctx.fillStyle = '#ffffff';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('GAME OVER', this.Aquarium.WIDTH / 2, this.Aquarium.HEIGHT / 2 - 24);

    this.ctx.font = 'bold 32px monospace';
    this.ctx.fillStyle = '#ff7a00';
    this.ctx.fillText('Restart', this.Aquarium.WIDTH / 2, this.Aquarium.HEIGHT / 2 + 32);

    this.ctx.beginPath();
    this.ctx.moveTo(162, 310);
    this.ctx.lineTo(290, 310);
    this.ctx.lineTo(290, 332);
    this.ctx.lineTo(162, 332);
    this.ctx.closePath();
  }
}

module.exports = Pages;