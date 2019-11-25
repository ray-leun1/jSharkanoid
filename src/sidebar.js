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
    aquarium.ctx.fillText('About', 480, 575);

    if (aquarium.paused) {
      aquarium.ctx.beginPath();
      aquarium.ctx.moveTo(550, 556);
      aquarium.ctx.lineTo(573, 567);
      aquarium.ctx.lineTo(550, 579);
      aquarium.ctx.closePath();
      aquarium.ctx.fill();
    } else {
      aquarium.ctx.beginPath();
      aquarium.ctx.moveTo(550, 556);
      aquarium.ctx.lineTo(560, 556);
      aquarium.ctx.lineTo(560, 580);
      aquarium.ctx.lineTo(550, 580);
      aquarium.ctx.closePath();
      aquarium.ctx.fill();

      aquarium.ctx.beginPath();
      aquarium.ctx.moveTo(564, 556);
      aquarium.ctx.lineTo(574, 556);
      aquarium.ctx.lineTo(574, 580);
      aquarium.ctx.lineTo(564, 580);
      aquarium.ctx.closePath();
      aquarium.ctx.fill();

      aquarium.ctx.beginPath();
      aquarium.ctx.moveTo(550, 556);
      aquarium.ctx.lineTo(574, 556);
      aquarium.ctx.lineTo(574, 580);
      aquarium.ctx.lineTo(550, 580);
      aquarium.ctx.closePath();
    }

    aquarium.ctx.beginPath();
    aquarium.ctx.moveTo(474, 553);
    aquarium.ctx.lineTo(577, 553);
    aquarium.ctx.lineTo(577, 583);
    aquarium.ctx.lineTo(547, 583);
    aquarium.ctx.lineTo(547, 553);
    aquarium.ctx.lineTo(547, 583);
    aquarium.ctx.lineTo(474, 583);
    aquarium.ctx.closePath();
    aquarium.ctx.strokeStyle = '#064273';
    aquarium.ctx.lineWidth = 2;
    aquarium.ctx.stroke();
  }

  draw(aquarium) {
    aquarium.ctx.fillStyle = 'rgba(127,205,255, 0.5)';
    aquarium.ctx.beginPath();
    aquarium.ctx.moveTo(this.Aquarium.WIDTH, 0);
    aquarium.ctx.lineTo(this.Aquarium.CANVAS_WIDTH, 0);
    aquarium.ctx.lineTo(this.Aquarium.CANVAS_WIDTH, this.Aquarium.CANVAS_HEIGHT);
    aquarium.ctx.lineTo(this.Aquarium.WIDTH, this.Aquarium.CANVAS_HEIGHT);
    aquarium.ctx.closePath();
    aquarium.ctx.fill();

    aquarium.ctx.fillStyle = '#064273';
    aquarium.ctx.font = 'bold 19px sans-serif';
    aquarium.ctx.textAlign = 'center';
    aquarium.ctx.fillText('jSharkanoid', (this.Aquarium.CANVAS_WIDTH + this.Aquarium.WIDTH) / 2, 30)
    aquarium.ctx.font = '18px monospace';
    aquarium.ctx.textAlign = 'left';
    aquarium.ctx.fillText(aquarium.nommed.smol + 'x', 460, 70);
    aquarium.ctx.fillText(aquarium.nommed.medium + 'x', 460, 110);
    aquarium.ctx.fillText(aquarium.nommed.large + 'x', 460, 150);
    aquarium.ctx.fillText(aquarium.nommed.huge + 'x', 460, 190);
    aquarium.ctx.fillText(aquarium.nommed.duck + 'x', 460, 230);
    aquarium.ctx.drawImage(this.assets.smol, 500, 62);
    aquarium.ctx.drawImage(this.assets.medium, 500, 97);
    aquarium.ctx.drawImage(this.assets.large, 500, 132, 0.9 * 30, 0.9 * 30);
    aquarium.ctx.drawImage(this.assets.huge, 500, 175, 0.8 * 62, 0.8 * 32);
    aquarium.ctx.drawImage(this.assets.duck, 500, 215, 0.7 * 128, 0.7 * 29);
    aquarium.ctx.textAlign = 'center'

    aquarium.ctx.fillText('Shark Speed', (this.Aquarium.CANVAS_WIDTH + this.Aquarium.WIDTH) / 2, 300);
    aquarium.ctx.fillText(aquarium.calcSharkSpeed().toFixed(1), (this.Aquarium.CANVAS_WIDTH + this.Aquarium.WIDTH) / 2, 330);

    aquarium.ctx.fillText('Shark Lives', (this.Aquarium.CANVAS_WIDTH + this.Aquarium.WIDTH) / 2, 390);
    if (aquarium.shark.hp <= 0) {
      aquarium.ctx.drawImage(this.assets.death, 476, 405);
    } else {
      if (aquarium.shark.hp >= 1) aquarium.ctx.drawImage(this.assets.life, 465, 405, 36, 36);
      if (aquarium.shark.hp >= 2) aquarium.ctx.drawImage(this.assets.life, 506, 405, 36, 36);
      if (aquarium.shark.hp >= 3) aquarium.ctx.drawImage(this.assets.life, 547, 405, 36, 36);
      if (aquarium.shark.hp >= 4) aquarium.ctx.drawImage(this.assets.life, 465, 445, 36, 36);
      if (aquarium.shark.hp >= 5) aquarium.ctx.drawImage(this.assets.life, 506, 445, 36, 36);
      if (aquarium.shark.hp >= 6) aquarium.ctx.drawImage(this.assets.life, 547, 445, 36, 36);
    }

    this.drawBtns(aquarium);
  }
}

module.exports = Sidebar;