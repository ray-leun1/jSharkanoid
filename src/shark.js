class Shark {
  constructor(launchpad) {
    this.launchpad = launchpad;
    this.size = 6;
    this.pos = {x: 0, y: 0};
    this.speed = 0;
    this.vel = {x: 0, y: 0};
    this.angle = 270;
    this.hp = 3;
    this.image = new Image();
    this.image.src = './img/SharkSpriteSheet_110x45.png';
    this.chompSounds = [
      new Audio('./sound/ravenous-hunger01.mp3'),
      new Audio('./sound/ravenous-hunger02.mp3'),
      new Audio('./sound/ravenous-hunger03.mp3'),
      new Audio('./sound/ravenous-hunger04.mp3'),
      new Audio('./sound/ravenous-hunger05.mp3'),
      new Audio('./sound/ravenous-hunger06.mp3'),
      new Audio('./sound/ravenous-hunger07.mp3'),
      new Audio('./sound/ravenous-hunger08.mp3'),
      new Audio('./sound/ravenous-hunger09.mp3'),
      new Audio('./sound/ravenous-hunger10.mp3'),
      new Audio('./sound/ravenous-hunger11.mp3'),
      new Audio('./sound/ravenous-hunger12.mp3'),
      new Audio('./sound/ravenous-hunger13.mp3'),
    ];
    this.chompSounds.forEach(chomp => chomp.volume = 0.05);
    this.width = 110;
    this.height = 45;
    this.frame = 0;
    this.launching = true;
  }

  setPos(pos) {
    this.pos = pos;
  }

  setSpeed(speed) {
    this.speed = speed;
    this.setVel();
  }

  calcAngle(option, params) {
    if (option === 'vel x mirror') {
      if (this.vel.y < 0) this.setAngle(540 - this.angle);
      else if (this.vel.y === 0) this.setAngle(this.angle + (Math.random() * 10 - 5));
      else if (this.vel.y > 0) this.setAngle(180 - this.angle);
    } else if (option === 'vel y mirror') {
      this.setAngle(360 - this.angle);
    } else if (option === 'corner') {
      let vector = {x: params.x - this.pos.x, y: params.y - this.pos.y};
      let vectorAngle = Math.atan(vector.y / vector.x) * 180 / Math.PI;
      let tangentAngle = vectorAngle + 90;
      let newAngle = 360 - (this.angle - tangentAngle) + tangentAngle;
      while (newAngle > 360) newAngle -= 360;
      this.setAngle(newAngle);
    } else if (option === 'launchpad') {
      let newVel = {x: this.vel.x + (params.vel * params.friction), y: this.vel.y}
      if (newVel.x === 0) newVel.x += [-1, 1][Math.floor(Math.random() * 2)];
      let newAngle = Math.atan(newVel.y / newVel.x) * 180 / Math.PI;
      if ((newVel.x < 0 && newVel.y > 1) || (newVel.x < 0 && newVel.y < 0)) {
        newAngle += 180;
      } else if (newVel.x > 1 && newVel.y < 1) {
        newAngle += 360;
      }
      this.setAngle(newAngle);
      this.calcAngle('vel y mirror');
    }
  }

  setAngle(angle) {
    this.angle = angle;

    if (!this.launching &&
      ((this.angle > 89.5 && this.angle < 90.5) ||
      (this.angle > 269.5 && this.angle < 270.5))
    ) {
      this.angle += [-1, 1][Math.floor(Math.random() * 2)];
    } else if (!this.launching &&
      ((this.angle > 355 && this.angle < 5) ||
      (this.angle > 175 && this.angle < 185))
    ) {
      this.vel.y > 0 ? this.angle -= 5 : this.angle += 5;
      if (this.vel.y === 0) this.angle += Math.random() * 10 - 5;
    }

    this.setVel();
  }

  setVel() {
    this.vel.x = this.speed * Math.cos(Math.PI * this.angle / 180);
    this.vel.y = this.speed * Math.sin(Math.PI * this.angle / 180);
  }

  setHP(hp) {
    this.hp = hp;
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
    if (this.launching) this.reset();

    let localCoords = this.localPos();

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
    --this.hp;
    if (this.hp >= 1) this.reset();
  }

  reset() {
    this.setPos({
      x: this.launchpad.x1 + (this.launchpad.size.width / 2),
      y: this.launchpad.y1 - 10
    });
    this.setSpeed(0);
    this.setFrame(0);
    this.launching = true;
  }

  playChomp() {
    let chomp = this.chompSounds[Math.floor(Math.random() * this.chompSounds.length)];
    chomp.play();
  }
}

module.exports = Shark;
