const Launchpad = require('./launchpad');
const Shark = require('./shark');
const Sealife = require('./sealife');
const Sidebar = require('./sidebar');
const Pages = require('./pages');

class Aquarium {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    let BB = this.canvas.getBoundingClientRect();
    this.ctx = ctx;
    this.offset = {x: BB.left + 4, y: BB.top + 4};
    this.bgm = new Audio('./sound/sunken-suite.mp3');
    this.bgm.loop = true;
    this.bgm.currentTime = 0;
    this.bgm.volume = 0.05;
    this.frame = 0;
    this.launchpad = new Launchpad({width: Aquarium.WIDTH, height: Aquarium.HEIGHT});
    this.shark = new Shark(this.launchpad);
    this.sealife = [];
    this.prevNommables = 0;
    this.numNommables = 0;
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
    this.sidebar = new Sidebar(Aquarium);
    this.pages = new Pages(Aquarium, this.ctx);
    this.numWins = 0;

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
      (shark.pos.y > (Aquarium.HEIGHT + shark.width * 2/3) && shark.vel.y > 0) ||
      (shark.pos.y > (Aquarium.HEIGHT + shark.width * 1/3) && shark.vel.y < shark.vel.x / 8)
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
      'sandlance', 'sardine', 'herring', 'pollock', 'crab2',
      'butter', 'mantaRay', 'jellyfish1', 'jellyfish2', 'seahorse2',
      'jellyfish3', 'crab3', 'jellyfish4', 'halfbeak', 'sunfish1',
      'sunfish2', 'crab4', 'anglerfish', 'polarBear1', 'polarBear2',
      'gastropod1', 'gastropod2', 'pufferfish', 'whale1', 'whale2',
      'swordfish', 'baiji', 'duck'
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

    // this.sealife.push(Sealife.create(
    //   this,
    //   {x: 200, y: 200},
    //   1,
    //   genList[2]
    // ))

    this.numNommables = this.sealife.length;
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
    return 5 + this.calcSpeedAdjust() - this.prevSpeedAdjust + (this.numWins * 0.5);
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

    if (!this.paused && !this.pages.gameover) {
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

    if (!this.bgm.ended) this.bgm.play();

    if (mouseX <= Aquarium.WIDTH && this.shark.launching && !this.paused && !this.pages.gameover) {
      this.shark.launching = false;
      this.shark.setSpeed(5 + this.calcSpeedAdjust() - this.prevSpeedAdjust);
    }

    if (this.ctx.isPointInPath(mouseX, mouseY)) {
      if (mouseX < Aquarium.WIDTH) {
        if (this.pages.victory) {
          this.continue();
        } else if (this.pages.gameover) {
          this.reset();
        }
      } else if (mouseX >= 474 && mouseX < 547) {
        this.paused = this.pages.about ? false : true;
        this.pages.about = this.pages.about ? false : true;
      } else if (mouseX > 547 && mouseX <= 577) {
        this.paused = this.paused ? false : true;
        this.pages.about = false;
      }
    }
  }

  mouseDown(e) {
    let mouseX = e.clientX - this.offset.x;
    let mouseY = e.clientY - this.offset.y;

    if (mouseX <= Aquarium.WIDTH
      && this.shark.launching
      && !this.paused
      && !this.pages.gameover
      && !this.pages.victory
    ) this.mouseLeftDown = true;
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
    this.sidebar.draw(this);

    if (this.pages.about) this.pages.drawAbout();
    if (this.pages.victory) this.pages.drawVictory();
    if (this.pages.gameover) this.pages.drawGameover();
  }

  animate() {
    this.ctx.clearRect(0, 0, Aquarium.WIDTH, Aquarium.HEIGHT);

    if (!this.paused && !this.pages.gameover && !this.pages.victory) {
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
    
    if (Object.values(this.nommed).reduce((acc, curr) => acc + curr)
      - this.prevNommables === this.numNommables && !this.pages.victory) {
      ++this.numWins;
      this.pages.victory = true;
    }
    if (this.shark.hp < 1 && !this.pages.gameover) this.pages.gameover = true;
  }

  start() {
    this.reset();

    setInterval(this.animate, 16.67);
  }

  continue() {
    this.prevNommables += this.numNommables;
    this.numNommables = 0;
    this.mouseLeftDown = false;
    this.paused = false;
    this.pages.victory = false;
    this.generateSealife();
    this.shark.reset();
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
    this.prevNommables = 0;
    this.numNommables = 0;
    this.prevSpeedAdjust = 0;
    this.lostHP = 0;
    this.mouseLeftDown = false;
    this.paused = false;
    this.pages.gameover = false;
    this.generateSealife();
    this.shark.reset();
  }
}

Aquarium.WIDTH = 450;
Aquarium.HEIGHT = 600;
Aquarium.CANVAS_WIDTH = 600;
Aquarium.CANVAS_HEIGHT = 600;
Aquarium.BG = new Image(Aquarium.WIDTH, Aquarium.HEIGHT);
Aquarium.BG.src = "./img/background.png";

module.exports = Aquarium;