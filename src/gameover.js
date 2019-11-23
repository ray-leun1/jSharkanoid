class Gameover {
  constructor(Aquarium) {
    this.Aquarium = Aquarium;
    this.active = false;
  }

  draw(ctx) {
    if (this.active) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(this.Aquarium.WIDTH, 0);
      ctx.lineTo(this.Aquarium.WIDTH, this.Aquarium.CANVAS_HEIGHT);
      ctx.lineTo(0, this.Aquarium.CANVAS_HEIGHT);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = 'rgba(64, 103, 128, 0.55)';
      ctx.beginPath();
      ctx.moveTo(this.Aquarium.WIDTH, 0);
      ctx.lineTo(this.Aquarium.CANVAS_WIDTH, 0);
      ctx.lineTo(this.Aquarium.CANVAS_WIDTH, this.Aquarium.CANVAS_HEIGHT);
      ctx.lineTo(this.Aquarium.WIDTH, this.Aquarium.CANVAS_HEIGHT);
      ctx.closePath();
      ctx.fill();

      ctx.font = 'bold 56px sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', this.Aquarium.WIDTH / 2, this.Aquarium.HEIGHT / 2 - 24);

      ctx.font = 'bold 32px monospace';
      ctx.fillStyle = '#ff7a00';
      ctx.fillText('Restart', this.Aquarium.WIDTH / 2, this.Aquarium.HEIGHT / 2 + 32);

      ctx.beginPath();
      ctx.moveTo(162, 310);
      ctx.lineTo(290, 310);
      ctx.lineTo(290, 332);
      ctx.lineTo(162, 332);
      ctx.closePath();
    }
  }
}

module.exports = Gameover;