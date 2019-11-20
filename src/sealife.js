class Sealife {
  constructor(pos) {
    this.x1 = pos.x;
    this.y1 = pos.y;
    this.x2 = pos.x;
    this.y2 = pos.y;
    this.hp = 1;
    this.image = new Image();
    this.image.src = '../img/sealife/16x16 fish-herring.png';
    this.image.onload = () => {
      this.x2 = pos.x + this.image.width;
      this.y2 = pos.y + this.image.height;
    }
  }

  collision(shark) {
    if ( // Left and right side collision
      (shark.vel.x > 0 && shark.pos.x + shark.size > this.x1) ||
      (shark.vel.x < 0 && shark.pos.x - shark.size < this.x2)
    ) {
      shark.calcAngle('vel x mirror');
    } else if ( // Top and bottom side collision
      (shark.vel.y > 0 && shark.pos.y + shark.size > this.y1) ||
      (shark.vel.y < 0 && shark.pos.y - shark.size < this.y2)
    ) {
      shark.calcAngle('vel y mirror');
    }
  }

  draw(ctx) {
    ctx.drawImage(this.image,
      localCoords.x - 98, localCoords.y - 18,
      this.x2 - this.x1, this.y2 - this.y1
    );
    this.image.onload = () => {
      ctx.drawImage(this.image,
        localCoords.x - 98, localCoords.y - 18,
        this.x2 - this.x1, this.y2 - this.y1
      );
    }
  }

  injure() {
    this.hp -= 1;
    if (this.hp <= 0) this.destroy;
  }
}

module.exports = Sealife;