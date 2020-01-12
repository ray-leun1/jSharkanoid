class Launchpad {
  constructor(aquarium) {
    this.aquarium = aquarium;
    this.image = new Image();
    this.image.src = './img/Launchpad.png';
    this.size = {width: 80, height: 14};
    this.x1 = ((aquarium.left + aquarium.width) / 2) - (this.size.width / 2);
    this.y1 = aquarium.height - 16 - this.size.height;
    this.x2 = this.x1 + this.size.width;
    this.y2 = this.y1 + this.size.height;
    this.vel = 0;
    this.friction = 1;
  }

  collision(shark) {
    if ( // Left and right side collision
      ((shark.vel.x > 0 && Math.abs(shark.pos.x - this.x1) < shark.size) ||
      (shark.vel.x < 0 && Math.abs(shark.pos.x - this.x2) < shark.size)) &&
      shark.pos.y > this.y1 && shark.pos.y < this.y2
    ) {
      shark.calcAngle('vel x mirror');
    } else if ( // Top (and bottom, though not possible) side collision
      ((shark.vel.y > 0 && Math.abs(shark.pos.y - this.y1) < shark.size) ||
      (shark.vel.y < 0 && Math.abs(shark.pos.y - this.y2) < shark.size)) &&
      shark.pos.x > this.x1 && shark.pos.x < this.x2
    ) {
      shark.calcAngle('launchpad', {vel: this.vel, friction: this.friction});
    }
  }

  draw(ctx) {
    this.image.onload = () => {
      ctx.drawImage(this.image,
        this.x1, this.y1
      );
    }
    ctx.drawImage(this.image,
      this.x1, this.y1
    );
  }

  setPos(centerX) {
    let oldx1 = this.x1;

    if (centerX < (this.aquarium.left + this.size.width / 2)) {
      this.x1 = this.aquarium.left;
      this.x2 = this.aquarium.left + this.size.width;
    } else if (centerX > ((this.aquarium.left + this.aquarium.width) - this.size.width / 2)) {
      this.x1 = (this.aquarium.left + this.aquarium.width) - this.size.width;
      this.x2 = (this.aquarium.left + this.aquarium.width);
    } else {
      this.x1 = centerX - this.size.width / 2;
      this.x2 = centerX + this.size.width / 2;
    }

    this.setVel(this.x1 - oldx1);
  }

  setVel(vel) {
    this.vel = vel;
  }
}

module.exports = Launchpad;