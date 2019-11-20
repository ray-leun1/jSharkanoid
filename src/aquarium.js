const Launchpad = require('./launchpad');
const Shark = require('./shark');
const Sealife = require('./sealife');

class Aquarium {
  constructor(ctx) {
    this.ctx = ctx;
    this.frame = 0;
    this.launchpad = null;
    this.shark = null;
    this.sealife = [];

    this.generateShark();
    this.generateSealife();
    this.animate = this.animate.bind(this);
  }

  collision(shark) {
    // Wall and ceiling collision
    if ( // Left and right wall collision
      (shark.pos.x < shark.size && shark.vel.x < 0) ||
      (shark.pos.x > (Aquarium.WIDTH - shark.size) && shark.vel.x > 0)
    ) {
      shark.calcAngle('vel x mirror');
    } else if ( // Ceiling collision and floor collision (DEBUG)
      (shark.pos.y < shark.size && shark.vel.y < 0) ||
      (shark.pos.y > (Aquarium.HEIGHT - shark.size) && shark.vel.y > 0)
    ) {
      shark.calcAngle('vel y mirror');
    }
  };
  
  generateShark() {
    this.shark = new Shark({width: Aquarium.WIDTH, height: Aquarium.HEIGHT});
  }
  
  generateSealife() {
    let genList = [
      'anchovy', 'crab1', 'seahorse1', 'grunt', 'croaker', 'corepod',
      'sandlance', 'sardine', 'herring', 'pollock', 'crab2', 'butter',
      'mantaRay', 'jellyfish1', 'jellyfish2', 'seahorse2', 'jellyfish3',
      'crab3', 'jellyfish4', 'halfbeak', 'sunfish1', 'sunfish2', 'crab4',
      'anglerfish', 'polarBear1', 'polarBear2', 'gastropod1', 'gastropod2',
      'pufferfish', 'whale1', 'whale2', 'swordfish', 'baiji'
    ]

    genList.forEach((nommable, idx) => {
      let sizeable = () => {
        let maxPosX;
        let maxPosY;
        let maxScale;

        if (idx < 15) {
          maxPosX = Aquarium.WIDTH - 32;
          maxPosY = Aquarium.HEIGHT - 16;
          maxScale = 3;
        } else if (idx < 30) {
          maxPosX = Aquarium.WIDTH - 64;
          maxPosY = Aquarium.HEIGHT - 32;
          maxScale = 2;
        } else {
          maxPosX = Aquarium.WIDTH - 80;
          maxPosY = Aquarium.HEIGHT - 80;
          maxScale = 1;
        }

        return {
          pos: {
            x: Math.floor(Math.random() * maxPosX),
            y: Math.floor(Math.random() * maxPosY)
          },
          scale: (Math.random() * maxScale)
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
    //   2,
    //   genList[1]
    // ))
  }

  destroy(sealife) {
    this.sealife.splice(this.sealife.indexOf(sealife), 1);
  }

  draw() {
    Aquarium.BG.onload = () => this.ctx.drawImage(Aquarium.BG, 0, 0);
    this.ctx.drawImage(Aquarium.BG, 0, 0);
    this.shark.draw(this.ctx);
    this.sealife.forEach(consumable => consumable.draw(this.ctx));
  }

  animate() {
    this.frame += 1;
    this.shark.setFrame(Math.floor(this.frame / 4) % 7 - 1)

    this.ctx.clearRect(0, 0, Aquarium.WIDTH, Aquarium.HEIGHT);
    this.shark.move();
    this.collision(this.shark);
    this.sealife.forEach(consumable => consumable.collision(this.shark));
    this.draw();
    // requestAnimationFrame(this.animate());
  }

  start() {
    this.shark.setPos({ x: Aquarium.WIDTH / 2, y: Aquarium.HEIGHT - 30 });
    this.shark.setSpeed(5);
    this.shark.setAngle(270);
    this.shark.setFrame(0);

    // this.animate();
    setInterval(this.animate, 16.67)
  }
}

Aquarium.WIDTH = 600;
Aquarium.HEIGHT = 600;
Aquarium.BG = new Image(Aquarium.WIDTH, Aquarium.HEIGHT);
Aquarium.BG.src = "../img/background.png";

module.exports = Aquarium;