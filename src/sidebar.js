class Sidebar {
  constructor(Aquarium) {
    this.Aquarium = Aquarium;
    this.assets = {
      smol: new Image(),
      medium: new Image(),
      large: new Image(),
      huge: new Image(),
      duck: new Image(),
      life: new Image(),
      death: new Image()
    }
    this.assets.smol.src = './img/sealife/8x5_7x3_0x1_anchovy.png';
    this.assets.medium.src = './img/sealife/16x15_10x9_1x3_butter.png';
    this.assets.large.src = './img/sealife/30x30_24x24_5x3_pufferfish.png';
    this.assets.huge.src = './img/sealife/62x32_48x16_11x4_whale.png';
    this.assets.duck.src = './img/sealife/128x29_110x22_8x3_Duck.png';
    this.assets.life.src = './img/SharkIcon.png';
    this.assets.death.src = './img/SharkDeath.png';
  }

  drawBtns(aquarium) {
    aquarium.ctx.fillStyle = '#064273';

    aquarium.ctx.font = 'bold 18px sans-serif';
    aquarium.ctx.textAlign = 'start';
    aquarium.ctx.fillText('About', this.Aquarium.SIDEBAR_LEFT + 30, 575);

    if (aquarium.paused) {
      aquarium.ctx.beginPath();
      aquarium.ctx.moveTo(this.Aquarium.SIDEBAR_LEFT + 100, 556);
      aquarium.ctx.lineTo(this.Aquarium.SIDEBAR_LEFT + 123, 567);
      aquarium.ctx.lineTo(this.Aquarium.SIDEBAR_LEFT + 100, 579);
      aquarium.ctx.closePath();
      aquarium.ctx.fill();
    } else {
      aquarium.ctx.beginPath();
      aquarium.ctx.moveTo(this.Aquarium.SIDEBAR_LEFT + 100, 556);
      aquarium.ctx.lineTo(this.Aquarium.SIDEBAR_LEFT + 110, 556);
      aquarium.ctx.lineTo(this.Aquarium.SIDEBAR_LEFT + 110, 580);
      aquarium.ctx.lineTo(this.Aquarium.SIDEBAR_LEFT + 100, 580);
      aquarium.ctx.closePath();
      aquarium.ctx.fill();

      aquarium.ctx.beginPath();
      aquarium.ctx.moveTo(this.Aquarium.SIDEBAR_LEFT + 114, 556);
      aquarium.ctx.lineTo(this.Aquarium.SIDEBAR_LEFT + 124, 556);
      aquarium.ctx.lineTo(this.Aquarium.SIDEBAR_LEFT + 124, 580);
      aquarium.ctx.lineTo(this.Aquarium.SIDEBAR_LEFT + 114, 580);
      aquarium.ctx.closePath();
      aquarium.ctx.fill();

      aquarium.ctx.beginPath();
      aquarium.ctx.moveTo(this.Aquarium.SIDEBAR_LEFT + 100, 556);
      aquarium.ctx.lineTo(this.Aquarium.SIDEBAR_LEFT + 124, 556);
      aquarium.ctx.lineTo(this.Aquarium.SIDEBAR_LEFT + 124, 580);
      aquarium.ctx.lineTo(this.Aquarium.SIDEBAR_LEFT + 100, 580);
      aquarium.ctx.closePath();
    }

    aquarium.ctx.beginPath();
    aquarium.ctx.moveTo(this.Aquarium.SIDEBAR_LEFT + 24, 553);
    aquarium.ctx.lineTo(this.Aquarium.SIDEBAR_LEFT + 127, 553);
    aquarium.ctx.lineTo(this.Aquarium.SIDEBAR_LEFT + 127, 583);
    aquarium.ctx.lineTo(this.Aquarium.SIDEBAR_LEFT + 97, 583);
    aquarium.ctx.lineTo(this.Aquarium.SIDEBAR_LEFT + 97, 553);
    aquarium.ctx.lineTo(this.Aquarium.SIDEBAR_LEFT + 97, 583);
    aquarium.ctx.lineTo(this.Aquarium.SIDEBAR_LEFT + 24, 583);
    aquarium.ctx.closePath();
    aquarium.ctx.strokeStyle = '#064273';
    aquarium.ctx.lineWidth = 2;
    aquarium.ctx.stroke();
  }

  draw(aquarium) {
    aquarium.ctx.fillStyle = 'rgba(127,205,255, 0.5)';
    aquarium.ctx.beginPath();
    aquarium.ctx.moveTo(this.Aquarium.SIDEBAR_LEFT, 0);
    aquarium.ctx.lineTo(this.Aquarium.SIDEBAR_LEFT + this.Aquarium.SIDEBAR_WIDTH, 0);
    aquarium.ctx.lineTo(this.Aquarium.SIDEBAR_LEFT + this.Aquarium.SIDEBAR_WIDTH, this.Aquarium.CANVAS_HEIGHT);
    aquarium.ctx.lineTo(this.Aquarium.SIDEBAR_LEFT, this.Aquarium.CANVAS_HEIGHT);
    aquarium.ctx.closePath();
    aquarium.ctx.fill();

    aquarium.ctx.fillStyle = '#064273';
    aquarium.ctx.font = 'bold 19px sans-serif';
    aquarium.ctx.textAlign = 'center';
    aquarium.ctx.fillText('jSharkanoid', this.Aquarium.SIDEBAR_LEFT + (this.Aquarium.SIDEBAR_WIDTH / 2), 30)
    aquarium.ctx.font = '18px monospace';
    aquarium.ctx.textAlign = 'left';
    aquarium.ctx.fillText(aquarium.nommed.smol + 'x', this.Aquarium.SIDEBAR_LEFT + 10, 70);
    aquarium.ctx.fillText(aquarium.nommed.medium + 'x', this.Aquarium.SIDEBAR_LEFT + 10, 110);
    aquarium.ctx.fillText(aquarium.nommed.large + 'x', this.Aquarium.SIDEBAR_LEFT + 10, 150);
    aquarium.ctx.fillText(aquarium.nommed.huge + 'x', this.Aquarium.SIDEBAR_LEFT + 10, 190);
    aquarium.ctx.fillText(aquarium.nommed.duck + 'x', this.Aquarium.SIDEBAR_LEFT + 10, 230);
    aquarium.ctx.drawImage(this.assets.smol, this.Aquarium.SIDEBAR_LEFT + 50, 62);
    aquarium.ctx.drawImage(this.assets.medium, this.Aquarium.SIDEBAR_LEFT + 50, 97);
    aquarium.ctx.drawImage(this.assets.large, this.Aquarium.SIDEBAR_LEFT + 50, 132, 0.9 * 30, 0.9 * 30);
    aquarium.ctx.drawImage(this.assets.huge, this.Aquarium.SIDEBAR_LEFT + 50, 175, 0.8 * 62, 0.8 * 32);
    aquarium.ctx.drawImage(this.assets.duck, this.Aquarium.SIDEBAR_LEFT + 50, 215, 0.7 * 128, 0.7 * 29);
    aquarium.ctx.textAlign = 'center'

    aquarium.ctx.fillText('Shark Speed', this.Aquarium.SIDEBAR_LEFT + (this.Aquarium.SIDEBAR_WIDTH / 2), 280);
    aquarium.ctx.fillText(aquarium.calcSharkSpeed().toFixed(1), this.Aquarium.SIDEBAR_LEFT + (this.Aquarium.SIDEBAR_WIDTH / 2), 310);

    aquarium.ctx.fillText('Shark Lives', this.Aquarium.SIDEBAR_LEFT + (this.Aquarium.SIDEBAR_WIDTH / 2), 350);
    if (aquarium.shark.hp < 1) {
      aquarium.ctx.drawImage(this.assets.death, this.Aquarium.SIDEBAR_LEFT + 26, 365);
    } else {
      if (aquarium.shark.hp >= 1) aquarium.ctx.drawImage(this.assets.life, this.Aquarium.SIDEBAR_LEFT + 15, 365, 36, 36);
      if (aquarium.shark.hp >= 2) aquarium.ctx.drawImage(this.assets.life, this.Aquarium.SIDEBAR_LEFT + 56, 365, 36, 36);
      if (aquarium.shark.hp >= 3) aquarium.ctx.drawImage(this.assets.life, this.Aquarium.SIDEBAR_LEFT + 97, 365, 36, 36);
      if (aquarium.shark.hp >= 4) aquarium.ctx.drawImage(this.assets.life, this.Aquarium.SIDEBAR_LEFT + 15, 405, 36, 36);
      if (aquarium.shark.hp >= 5) aquarium.ctx.drawImage(this.assets.life, this.Aquarium.SIDEBAR_LEFT + 56, 405, 36, 36);
      if (aquarium.shark.hp >= 6) aquarium.ctx.drawImage(this.assets.life, this.Aquarium.SIDEBAR_LEFT + 97, 405, 36, 36);
    }

    this.drawBtns(aquarium);
  }
}

module.exports = Sidebar;