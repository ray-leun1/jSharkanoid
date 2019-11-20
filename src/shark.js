const Aquarium = require('./aquarium')

class Shark {
  constructor(aquariumSize) {
    this.size = 7;
    this.pos = {x: 0, y: 0};
    this.speed = 0;
    this.vel = {x: 0, y: 0};
    this.angle = 270;
    this.aquariumSize = aquariumSize;
    this.image = new Image();
    this.image.src = '../img/SharkSpriteSheet_110x45.png';
    this.width = 110;
    this.height = 45;
    this.frame = 0;
  }

  setPos(pos) {
    if (pos === 'initial') {
      this.pos = {x: this.aquariumSize.width / 2, y: this.aquariumSize.height - 30};
    } else {
      this.pos = pos;
    }
  }

  setSpeed(speed) {
    this.speed = speed;
    this.setVel();
  }

  setAngle(angle) {
    if (
      (this.angle > 359.5 && this.angle < 0.5) ||
      (this.angle > 89.5 && this.angle < 90.5) ||
      (this.angle > 179.5 && this.angle < 180.5) ||
      (this.angle > 269.5 && this.angle < 270.5)
    ) {
      this.angle += [-30, 30][Math.floor(Math.random() * 2)]
    } else {
      this.angle = angle;
    }
    this.setVel();
  }

  setVel() {
    this.vel.x = this.speed * Math.cos(Math.PI * this.angle / 180);
    this.vel.y = this.speed * Math.sin(Math.PI * this.angle / 180);
  }

  localPos() { // Calculate position in shark local coordinates
    let cosAngle = Math.cos(Math.PI * this.angle / 180);
    let sinAngle = Math.sin(Math.PI * this.angle / 180);
    return {
      x: this.pos.x * cosAngle + this.pos.y * sinAngle,
      y: this.pos.y * cosAngle - this.pos.x * sinAngle
    }
  }

  collision() {
    // Wall and ceiling collision
    if (        // Left wall collision
      this.pos.x < this.size
      && this.vel.x < 0
    ) {
      if (this.vel.y < 0) this.setAngle(180 - this.angle);
      if (this.vel.y > 0) this.setAngle(540 - this.angle);
    } else if ( // Right wall collision
      this. pos.x > (this.aquariumSize.width - this.size)
      && this.vel.x > 0
    ) {
      if (this.vel.y < 0) this.setAngle(180 - this.angle);
      if (this.vel.y > 0) this.setAngle(540 - this.angle);
    } else if ( // Ceiling collision
      this.pos.y < this.size
      && this.vel.y < 0
    ) {
      this.setAngle(360 - this.angle);
    }
      else if ( // Floor collision (DEBUG)
      this.pos.y > (this.aquariumSize.height - this.size)
      && this.vel.y > 0
    ) {
      this.setAngle(360 - this.angle);
    }
  };

  draw(ctx) {
    let localCoords = this.localPos();
    this.frame += 1;
    ctx.save();
    ctx.rotate(Math.PI * this.angle / 180);
    ctx.drawImage(this.image,
      (Math.floor(this.frame / 4) % 7) * this.width, 0,
      this.width, this.height,
      localCoords.x - 98, localCoords.y - 18,
      this.width, this.height
    );
    ctx.restore();
    this.image.onload = () => {
      ctx.save();
      ctx.rotate(Math.PI * this.angle / 180);
      ctx.drawImage(this.image,
        (Math.floor(this.frame / 4) % 7) * this.width, 0,
        this.width, this.height,
        localCoords.x - 98, localCoords.y - 18,
        this.width, this.height
      );
      ctx.restore();
    }
  }

  move() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  remove() {
    this.aquarium.remove(this);
  }
}

module.exports = Shark;
