class Shark {
  constructor(launchpad) {
    this.launchpad = launchpad;
    this.size = 5;
    this.pos = {x: 0, y: 0};
    this.speed = 0;
    this.vel = {x: 0, y: 0};
    this.angle = 270;
    this.hp = 3;
    this.image = new Image();
    this.image.src = '../img/SharkSpriteSheet_110x45.png';
    this.width = 110;
    this.height = 45;
    this.frame = 0;
  }

  setPos(pos) {
    this.pos = pos;
  }

  setSpeed(speed) {
    this.speed = speed;
    this.setVel();
  }

  calcAngle(option) {
    if (option === 'vel x mirror') {
      if (this.vel.y < 0) this.setAngle(540 - this.angle);
      if (this.vel.y > 0) this.setAngle(180 - this.angle);
    } else if (option === 'vel y mirror') {
      this.setAngle(360 - this.angle);
    }
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

  setFrame(frame) {
    this.frame = frame;
  }

  localPos() { // Calculate position in shark local coordinates
    let cosAngle = Math.cos(Math.PI * this.angle / 180);
    let sinAngle = Math.sin(Math.PI * this.angle / 180);
    return {
      x: this.pos.x * cosAngle + this.pos.y * sinAngle,
      y: this.pos.y * cosAngle - this.pos.x * sinAngle
    }
  }

  draw(ctx) {
    if (this.speed === 0) {
      this.setPos({
        x: this.launchpad.x1 + (this.launchpad.size.width / 2),
        y: this.launchpad.y1 + 10
      });
      this.setFrame(0);
    };

    let localCoords = this.localPos();
    this.frame += 1;

    this.image.onload = () => {
      ctx.save();
      ctx.rotate(Math.PI * this.angle / 180);
      ctx.drawImage(this.image,
        this.frame * this.width, 0,
        this.width, this.height,
        localCoords.x - 98, localCoords.y - 18,
        this.width, this.height
        );
      ctx.restore();
    }

    ctx.save();
    ctx.rotate(Math.PI * this.angle / 180);
    ctx.drawImage(this.image,
      this.frame * this.width, 0,
      this.width, this.height,
      localCoords.x - 98, localCoords.y - 18,
      this.width, this.height
    );
    ctx.restore();
  }

  move() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  injure() {
    this.hp -= 1;
    this.reset();
  }

  reset() {
    this.setPos({
      x: this.launchpad.x1 + (this.launchpad.size.width / 2),
      y: this.launchpad.y1 + 10
    });
    this.setSpeed(0);
    this.setAngle(270);
    this.setFrame(0);
  }
}

module.exports = Shark;
