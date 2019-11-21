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
    if ( // Corner collision, upper left
      (shark.pos.x < this.x1) && (shark.pos.y < this.y1) 
      && Math.sqrt(
        Math.pow(shark.pos.x - this.x1, 2)
        + Math.pow(shark.pos.y - this.y1, 2)
      ) < shark.size
    ) {
      console.log('Upper left corner collision');
      shark.calcAngle('corner', {x: this.x1, y: this.y1});
    } else if ( // Corner collision, upper right
      (shark.pos.x > this.x2) && (shark.pos.y < this.y1)
      && Math.sqrt(
        Math.pow(shark.pos.x - this.x2, 2)
        + Math.pow(shark.pos.y - this.y1, 2)
      ) < shark.size
    ) {
      console.log('Upper right corner collision');
      shark.calcAngle('corner', {x: this.x2, y: this.y1});
    } else if ( // Corner collision, lower left
      (shark.pos.x < this.x1) && (shark.pos.y > this.y2)
      && Math.sqrt(
        Math.pow(shark.pos.x - this.x1, 2)
        + Math.pow(shark.pos.y - this.y2, 2)
      ) < shark.size
    ) {
      console.log('Lower left corner collision');
      shark.calcAngle('corner', {x: this.x1, y: this.y2});
    } else if ( // Corner collision, lower right
    (shark.pos.x > this.x2) && (shark.pos.y > this.y2)
      && Math.sqrt(
        Math.pow(shark.pos.x - this.x2, 2)
        + Math.pow(shark.pos.y - this.y2, 2)
      ) < shark.size
    ) {
      console.log('Lower right corner collision');
      shark.calcAngle('corner', {x: this.x2, y: this.y2});
    } else if ( // Left and right side collision
      ((shark.vel.x > 0 && Math.abs(shark.pos.x - this.x1) < shark.size) ||
      (shark.vel.x < 0 && Math.abs(shark.pos.x - this.x2) < shark.size)) &&
      shark.pos.y > this.y1 && shark.pos.y < this.y2
    ) {
      console.log('l/r collision')
      shark.calcAngle('vel x mirror');
      this.injure();
    } else if ( // Top and bottom side collision
      ((shark.vel.y > 0 && Math.abs(shark.pos.y - this.y1) < shark.size) ||
      (shark.vel.y < 0 && Math.abs(shark.pos.y - this.y2) < shark.size)) &&
      shark.pos.x > this.x1 && shark.pos.x < this.x2
    ) {
      console.log('t/d collision')
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
  fileAssociations = {
    anchovy: '8x5_7x3_0x1_anchovy.png',
    crab1: '12x11_6x4_3x3_crab.png',
    seahorse1: '13x32_9x28_2x2_seahorse.png',
    grunt: '14x9_12x6_1x1_grunt.png',
    croaker: '14x11_13x7_1x2_croaker.png',
    corepod: '15x11_10x4_4x4_corepod.png',
    sandlance: '16x4_14x3_0x0_sandlance.png',
    sardine: '16x6_13x3_0x2_sardine.png',
    herring: '16x7_14x4_0x2_herring.png',
    pollock: '16x8_12x6_1x1_pollock.png',
    crab2: '16x13_6x4_5x4_crab.png',
    butter: '16x15_10x9_1x3_butter.png',
    mantaRay: '16x16_12x12_1x1_manta-ray.png',
    jellyfish1: '16x16_14x12_1x1_jellyfish-cyan.png',
    jellyfish2: '16x16_14x12_1x1_jellyfish-mint.png',
    seahorse2: '17x32_11x30_3x1_Seahorse.png',
    jellyfish3: '18x7_16x12_1x1_jellyfish.png',
    crab3: '22x23_12x14_5x4_crab.png',
    jellyfish4: '22x25_20x16_1x1_jellyfish.png',
    halfbeak: '24x7_17x3_4x3_halfbeak.png',
    sunfish1: '24x24_23x18_0x4_sunfish.png',
    sunfish2: '24x24_23x18_0x4_sunfish-ah.png',
    crab4: '28x20_16x1_5x1_crab.png',
    anglerfish: '29x26_23x20_4x4_anglerfish.png',
    polarBear1: '30x19_24x12_1x2_goldar-bear.png',
    polarBear2: '30x19_24x12_1x2_polar-bear.png',
    gastropod1: '30x25_25x22_2x2_gastropod-gray.png',
    gastropod2: '30x25_25x22_2x2_gastropod-orange.png',
    pufferfish: '30x30_24x24_5x3_pufferfish.png',
    whale1: '62x30_48x16_11x4_whale.png',
    whale2: '62x32_48x16_11x4_whale.png',
    swordfish: '64x16_40x8_17x4_swordfish.png',
    baiji: '64x22_44x14_10x4_baiji.png',
    duck: '128x29_110x22_8x3_Duck.png'
  }

  let filename = fileAssociations[name];

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