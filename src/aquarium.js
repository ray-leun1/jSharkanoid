const Launchpad = require('./launchpad');
const Shark = require('./shark');
const Sealife = require('./sealife');

class Aquarium {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    let BB = this.canvas.getBoundingClientRect();
    this.ctx = ctx;
    this.offset = {x: BB.left + 4, y: BB.top + 4};
    this.sidebarAssets = {
      smol: new Image(),
      medium: new Image(),
      large: new Image(),
      huge: new Image(),
      duck: new Image(),
      life: new Image(),
      death: new Image()
    }
    this.sidebarAssets.smol.src = '../img/sealife/8x5_7x3_0x1_anchovy.png';
    this.sidebarAssets.medium.src = '../img/sealife/16x15_10x9_1x3_butter.png';
    this.sidebarAssets.large.src = '../img/sealife/30x30_24x24_5x3_pufferfish.png';
    this.sidebarAssets.huge.src = '../img/sealife/62x32_48x16_11x4_whale.png';
    this.sidebarAssets.duck.src = '../img/sealife/128x29_110x22_8x3_Duck.png';
    this.sidebarAssets.life.src = '../img/SharkIcon.png';
    this.sidebarAssets.death.src = '../img/SharkDeath.png';
    this.frame = 0;
    this.launchpad = new Launchpad({width: Aquarium.WIDTH, height: Aquarium.HEIGHT});
    this.shark = new Shark(this.launchpad);
    this.sealife = [];
    this.nommed = {
      smol: 0,
      medium: 0,
      large: 0,
      huge: 0,
      duck: 0
    }
    this.prevSpeedAdjust = 0;
    this.lostHP = 0;
    this.mouseLeftDown = false;
    this.paused = false;
    this.gameover = false;

    this.animate = this.animate.bind(this);
    window.onscroll = () => this.getOffset();
    window.onresize = () => this.getOffset();
  }

  collision(shark) {
    // Wall and ceiling collision
    if ( // Left and right wall collision
      (shark.pos.x < shark.size && shark.vel.x < 0) ||
      (shark.pos.x > (Aquarium.WIDTH - shark.size) && shark.vel.x > 0)
    ) {
      shark.calcAngle('vel x mirror');
    } else if ( // Ceiling collision and floor collision (DEBUG)
      (shark.pos.y < shark.size && shark.vel.y < 0)
      // || (shark.pos.y > (Aquarium.HEIGHT - shark.size) && shark.vel.y > 0)
    ) {
      shark.calcAngle('vel y mirror');
    } else if ( // Shark injury
      (shark.pos.y > (Aquarium.HEIGHT + shark.width * 2/3) && shark.vel.y > 0)
    ) {
      this.prevSpeedAdjust = this.calcSpeedAdjust();
      shark.setAngle(270);
      shark.injure();
      ++this.lostHP;
    }
  };

  generateSealife() {
    let genList = [
      'anchovy', 'crab1', 'seahorse1', 'grunt', 'croaker', 'corepod',
      'sandlance', 'sardine', 'herring', 'pollock', 'crab2', 'butter',
      'mantaRay', 'jellyfish1', 'jellyfish2', 'seahorse2', 'jellyfish3',
      'crab3', 'jellyfish4', 'halfbeak', 'sunfish1', 'sunfish2', 'crab4',
      'anglerfish', 'polarBear1', 'polarBear2', 'gastropod1', 'gastropod2',
      'pufferfish', 'whale1', 'whale2', 'swordfish', 'baiji', 'duck'
    ]

    genList.forEach((nommable, idx) => {
      let sizeable = () => {
        let maxPosX, maxPosY, minScale, maxScale;

        if (idx <= 15) {
          maxPosX = Aquarium.WIDTH - 48;
          maxPosY = Aquarium.HEIGHT - 16 - 80;
          minScale = 0.25;
          maxScale = 3;
        } else if (idx <= 28) {
          maxPosX = Aquarium.WIDTH - 64;
          maxPosY = Aquarium.HEIGHT - 32 - 80;
          minScale = 0.5;
          maxScale = 2;
        } else if (idx <= 32) {
          maxPosX = Aquarium.WIDTH - 96;
          maxPosY = Aquarium.HEIGHT - 64 - 80;
          minScale = 0.75;
          maxScale = 1.5;
        } else {
          maxPosX = Aquarium.WIDTH - 128;
          maxPosY = Aquarium.HEIGHT - 128 - 80;
          minScale = 1;
          maxScale = 1;
        }

        let scale = Math.random() * maxScale;

        return {
          pos: {
            x: Math.floor(Math.random() * maxPosX),
            y: Math.floor(Math.random() * maxPosY)
          },
          scale: scale >= minScale ? scale : minScale
        };
      }

      let {pos, scale} = sizeable();

      this.sealife.push(Sealife.create(
        this,
        pos,
        scale,
        nommable
      ))
    })
  }

  calcSpeedAdjust() {
    return (
        (this.nommed.smol * 0.1)
      + (this.nommed.medium * 0.2)
      + (this.nommed.large * 0.4)
      + (this.nommed.huge * 0.7)
      + (this.nommed.duck * 1)
    );
  }

  calcSharkSpeed() {
    return 5 + this.calcSpeedAdjust() - this.prevSpeedAdjust;
  }

  calcGainedHP() {
    return (
      (this.nommed.smol * 0.1)
      + (this.nommed.medium * 0.15)
      + (this.nommed.large * 0.2)
      + (this.nommed.huge * 0.35)
      + (this.nommed.duck * 0.5)
    );
  }

  destroy(sealife) {
    this.sealife.splice(this.sealife.indexOf(sealife), 1);
    ++this.nommed[sealife.class];
    this.shark.setSpeed(5 + this.calcSpeedAdjust() - this.prevSpeedAdjust);
  }

  mousePos(e) {
    let mouseX = e.clientX - this.offset.x;
    let mouseY = e.clientY - this.offset.y;

    if (this.ctx.isPointInPath(mouseX, mouseY)) {
      this.canvas.style.cursor = 'pointer';
    } else {
      this.canvas.style.cursor = 'default';
    }

    if (!this.paused && !this.gameover) {
      if (this.shark.launching && this.mouseLeftDown) {
        let vector = {x: mouseX - this.shark.pos.x, y: mouseY - this.shark.pos.y};
        let newAngle = Math.atan(vector.y / vector.x) * 180 / Math.PI;
        if ((vector.x < 0 && vector.y > 1) || (vector.x < 0 && vector.y < 0)) {
          newAngle += 180;
        } else if ((vector.x > 1 && vector.y < 1) || vector.x > 1 && vector.y > 1) {
          newAngle += 360;
        }
        this.shark.setAngle(newAngle);
      } else {
        this.launchpad.setPos(mouseX);
      }
    }
  }

  mouseClick(e) {
    let mouseX = e.clientX - this.offset.x;
    let mouseY = e.clientY - this.offset.y;

    if (mouseX <= Aquarium.WIDTH && this.shark.launching && !this.paused && !this.gameover) {
      this.shark.launching = false;
      this.shark.setSpeed(5 + this.calcSpeedAdjust() - this.prevSpeedAdjust);
    }

    if (this.ctx.isPointInPath(mouseX, mouseY)) {
      if (mouseX < Aquarium.WIDTH) {
        this.reset();
      } else if (mouseX > Aquarium.WIDTH) {
        this.paused = this.paused ? false : true;
      }
    }
  }

  mouseDown(e) {
    let mouseX = e.clientX - this.offset.x;
    let mouseY = e.clientY - this.offset.y;

    if (mouseX <= Aquarium.WIDTH && this.shark.launching && !this.paused && !this.gameover) this.mouseLeftDown = true;
  }

  mouseUp(e) {
    let mouseX = e.clientX - this.offset.x;
    let mouseY = e.clientY - this.offset.y;

    this.mouseLeftDown = false;
  }

  getOffset() {
    let BB = this.canvas.getBoundingClientRect();
    this.offset = {x: BB.left + 4, y: BB.top + 4};
  }

  draw() {
    Aquarium.BG.onload = () => this.ctx.drawImage(Aquarium.BG, 0, 0);
    this.ctx.drawImage(Aquarium.BG, 0, 0);
    this.shark.draw(this.ctx);
    this.launchpad.draw(this.ctx);
    this.sealife.forEach(consumable => consumable.draw(this.ctx));
    this.drawSidebar();
    this.drawBtn();
    
    if (this.gameover) this.drawGameover();
  }

  animate() {
    this.ctx.clearRect(0, 0, Aquarium.WIDTH, Aquarium.HEIGHT);

    if (!this.paused && !this.gameover) {
      ++this.frame;
      this.shark.setFrame(Math.floor(this.frame / 4) % 7)
  
      if (!this.shark.launching) {
        this.shark.setSpeed(this.calcSharkSpeed());
      } else if (this.shark.launching && !this.mouseLeftDown) {
        this.shark.setAngle(270);
      }
  
      this.shark.setHP(3 - this.lostHP + this.calcGainedHP());
      this.shark.move();
      this.launchpad.collision(this.shark);
      this.collision(this.shark);
      this.sealife.forEach(consumable => consumable.collision(this.shark));
    }

    this.draw();
    
    if (this.shark.hp < 1) this.gameover = true;
  }

  start() {
    this.reset();

    setInterval(this.animate, 16.67);
  }

  reset() {
    this.frame = 0;
    this.launchpad = new Launchpad({ width: Aquarium.WIDTH, height: Aquarium.HEIGHT });
    this.shark = new Shark(this.launchpad);
    this.sealife = [];
    this.nommed = {
      smol: 0,
      medium: 0,
      large: 0,
      huge: 0,
      duck: 0
    }
    this.prevSpeedAdjust = 0;
    this.lostHP = 0;
    this.mouseLeftDown = false;
    this.paused = false;
    this.gameover = false;
    this.generateSealife();
    this.shark.reset();
  }

  drawBtn() {
    this.ctx.fillStyle = '#064273';

    if (this.paused) {
      this.ctx.beginPath();
      this.ctx.moveTo(550, 556);
      this.ctx.lineTo(573, 567);
      this.ctx.lineTo(550, 579);
      this.ctx.closePath();
      this.ctx.fill();
    } else {
      this.ctx.beginPath();
      this.ctx.moveTo(550, 556);
      this.ctx.lineTo(560, 556);
      this.ctx.lineTo(560, 580);
      this.ctx.lineTo(550, 580);
      this.ctx.closePath();
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.moveTo(564, 556);
      this.ctx.lineTo(574, 556);
      this.ctx.lineTo(574, 580);
      this.ctx.lineTo(564, 580);
      this.ctx.closePath();
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.moveTo(550, 556);
      this.ctx.lineTo(574, 556);
      this.ctx.lineTo(574, 580);
      this.ctx.lineTo(550, 580);
      this.ctx.closePath();
    }
  }

  drawSidebar() {
    this.ctx.fillStyle = 'rgba(127,205,255, 0.5)';
    this.ctx.rect(Aquarium.WIDTH, 0, Aquarium.CANVAS_WIDTH, Aquarium.CANVAS_HEIGHT);
    this.ctx.fill();
    this.ctx.fillStyle = '#064273';
    this.ctx.font = 'bold 19px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('jSharkanoid', (Aquarium.CANVAS_WIDTH + Aquarium.WIDTH) / 2, 30)
    this.ctx.font = '18px monospace';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(this.nommed.smol + 'x', 460, 70);
    this.ctx.fillText(this.nommed.medium + 'x', 460, 110);
    this.ctx.fillText(this.nommed.large + 'x', 460, 150);
    this.ctx.fillText(this.nommed.huge + 'x', 460, 190);
    this.ctx.fillText(this.nommed.duck + 'x', 460, 230);
    this.ctx.drawImage(this.sidebarAssets.smol, 500, 62);
    this.ctx.drawImage(this.sidebarAssets.medium, 500, 97);
    this.ctx.drawImage(this.sidebarAssets.large, 500, 132, 0.9 * 30, 0.9 * 30);
    this.ctx.drawImage(this.sidebarAssets.huge, 500, 175, 0.8 * 62, 0.8 * 32);
    this.ctx.drawImage(this.sidebarAssets.duck, 500, 215, 0.7 * 128, 0.7 * 29);
    this.ctx.textAlign = 'center'
    this.ctx.fillText('Shark Speed', (Aquarium.CANVAS_WIDTH + Aquarium.WIDTH) / 2, 300);
    this.ctx.fillText(this.calcSharkSpeed().toFixed(1), (Aquarium.CANVAS_WIDTH + Aquarium.WIDTH) / 2, 330);
    this.ctx.fillText('Shark Lives', (Aquarium.CANVAS_WIDTH + Aquarium.WIDTH) / 2, 390);
    if (this.shark.hp <= 0) {
      this.ctx.drawImage(this.sidebarAssets.death, 476, 405);
    } else {
      if (this.shark.hp >= 1) this.ctx.drawImage(this.sidebarAssets.life, 465, 405, 36, 36);
      if (this.shark.hp >= 2) this.ctx.drawImage(this.sidebarAssets.life, 506, 405, 36, 36);
      if (this.shark.hp >= 3) this.ctx.drawImage(this.sidebarAssets.life, 547, 405, 36, 36);
      if (this.shark.hp >= 4) this.ctx.drawImage(this.sidebarAssets.life, 465, 445, 36, 36);
      if (this.shark.hp >= 5) this.ctx.drawImage(this.sidebarAssets.life, 506, 445, 36, 36);
      if (this.shark.hp >= 6) this.ctx.drawImage(this.sidebarAssets.life, 547, 445, 36, 36);
    }
    this.drawBtn();
  }

  drawGameover() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(Aquarium.WIDTH, 0);
    this.ctx.lineTo(Aquarium.WIDTH, Aquarium.CANVAS_HEIGHT);
    this.ctx.lineTo(0, Aquarium.CANVAS_HEIGHT);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.fillStyle = 'rgba(64, 103, 128, 0.55)';
    this.ctx.beginPath();
    this.ctx.moveTo(Aquarium.WIDTH, 0);
    this.ctx.lineTo(Aquarium.CANVAS_WIDTH, 0);
    this.ctx.lineTo(Aquarium.CANVAS_WIDTH, Aquarium.CANVAS_HEIGHT);
    this.ctx.lineTo(Aquarium.WIDTH, Aquarium.CANVAS_HEIGHT);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.font = 'bold 56px sans-serif';
    this.ctx.fillStyle = '#ffffff';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('GAME OVER', Aquarium.WIDTH / 2, Aquarium.HEIGHT / 2 - 24);

    this.ctx.font = 'bold 32px monospace';
    this.ctx.fillStyle = '#ff7a00';
    this.ctx.fillText('Restart', Aquarium.WIDTH / 2, Aquarium.HEIGHT / 2 + 32);

    this.ctx.beginPath();
    this.ctx.moveTo(162, 310);
    this.ctx.lineTo(290, 310);
    this.ctx.lineTo(290, 332);
    this.ctx.lineTo(162, 332);
    this.ctx.closePath();
  }
}

Aquarium.WIDTH = 450;
Aquarium.HEIGHT = 600;
Aquarium.CANVAS_WIDTH = 600;
Aquarium.CANVAS_HEIGHT = 600;
Aquarium.BG = new Image(Aquarium.WIDTH, Aquarium.HEIGHT);
Aquarium.BG.src = "../img/background.png";

module.exports = Aquarium;