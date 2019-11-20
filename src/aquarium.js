const Launchpad = require('./launchpad');
const Shark = require('./shark');
const Sealife = require('./sealife');

class Aquarium {
  constructor(ctx) {
    this.ctx = ctx;
    this.launchpad = null;
    this.shark = null;
    this.sealife = [];

    this.generateShark()
    this.animate = this.animate.bind(this);
  }

  generateLaunchpad() {

  }

  generateShark() {
    this.shark = new Shark({width: Aquarium.WIDTH, height: Aquarium.HEIGHT});
  }

  draw() {
    this.ctx.drawImage(Aquarium.BG, 0, 0);
    Aquarium.BG.onload = () => this.ctx.drawImage(Aquarium.BG, 0, 0);
    this.shark.draw(this.ctx);
  }

  animate() {
    this.ctx.clearRect(0, 0, Aquarium.WIDTH, Aquarium.HEIGHT);
    this.shark.move();
    this.shark.collision();
    this.draw();
  
    // requestAnimationFrame(this.animate());
  }

  start() {
    this.shark.setPos('initial');
    this.shark.setSpeed(10);
    this.shark.setAngle(270);

    // this.animate();
    setInterval(this.animate, 30)
  }
}

Aquarium.WIDTH = 600;
Aquarium.HEIGHT = 600;
Aquarium.BG = new Image(Aquarium.WIDTH, Aquarium.HEIGHT);
Aquarium.BG.src = "../img/background.png";

module.exports = Aquarium;