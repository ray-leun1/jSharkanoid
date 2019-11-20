class Sealife {
  constructor(options) {
    this.aquarium = options.aquarium;
    this.posImage = options.posImage;
    this.sizeImage = {width: options.sizeImage.width, height: options.sizeImage.height};
    this.offset = options.offset;
    this.x1 = options.posNommable.x;
    this.y1 = options.posNommable.y;
    this.x2 = this.x1 + options.sizeNommable.width;
    this.y2 = this.y1 + options.sizeNommable.height;
    this.hp = Math.ceil(this.sizeImage.width / 16);
    this.image = new Image();
    this.image.src = options.filename;
  }

  collision(shark) {
    if ( // Left and right side collision
      ((shark.vel.x > 0 && (shark.pos.x - this.x1) < shark.size) ||
      (shark.vel.x < 0 && (shark.pos.x - this.x2) < shark.size)) &&
      shark.pos.y > this.y1 && shark.pos.y < this.y2
    ) {
      shark.calcAngle('vel x mirror');
      this.injure();
    } else if ( // Top and bottom side collision
      ((shark.vel.y > 0 && (shark.pos.y - this.y1) < shark.size) ||
      (shark.vel.y < 0 && (shark.pos.y - this.y2) < shark.size)) &&
      shark.pos.x > this.x1 && shark.pos.x < this.x2
    ) {
      shark.calcAngle('vel y mirror');
      this.injure();
    }
  }

  draw(ctx) {
    this.image.onload = () => {
      ctx.drawImage(this.image,
        this.posImage.x, this.posImage.y,
        this.sizeImage.width, this.sizeImage.height
      );
    }
    ctx.drawImage(this.image,
      this.posImage.x, this.posImage.y,
      this.sizeImage.width, this.sizeImage.height
    );
  }

  injure() {
    this.hp -= 1;
    if (this.hp <= 0) this.aquarium.destroy(this);
  }
}

Sealife.create = (aquarium, pos, scale, name) => {
  let filename;
  
  if (name === 'anchovy') {
    filename = '8x5_7x3_0x1_anchovy.png';
  }

  let [sizeImage, sizeNommable, offset] = filename.split('_');
  sizeImage = sizeImage.split('x');
  sizeNommable = sizeNommable.split('x');
  offset = offset.split('x');

  let options = {
    aquarium: aquarium,
    filename: '../img/sealife/' + filename,
    posImage: pos,
    sizeImage: {
      width: scale * parseInt(sizeImage[0]),
      height: scale * parseInt(sizeImage[1])
    },
    offset: {
      x: scale * parseInt(offset[0]),
      y: scale * parseInt(offset[1])
    },
    posNommable: {
      x: parseInt(pos.x) + parseInt(offset[0]),
      y: parseInt(pos.y) + parseInt(offset[1])
    },
    sizeNommable: {
      width: scale * parseInt(sizeNommable[0]),
      height: scale * parseInt(sizeNommable[1])
    }
  };

  return new Sealife(options);
};

module.exports = Sealife;