class About {
  constructor(Aquarium) {
    this.Aquarium = Aquarium;
    this.active = false;
  }

  draw(ctx) {
    if (this.active) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(this.Aquarium.WIDTH, 0);
      ctx.lineTo(this.Aquarium.WIDTH, this.Aquarium.CANVAS_HEIGHT);
      ctx.lineTo(0, this.Aquarium.CANVAS_HEIGHT);
      ctx.closePath();
      ctx.fill();

      ctx.textAlign = 'start';
      ctx.fillStyle = '#def3f6'
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('About', 20, 30);
      ctx.fillText('Controls', 20, 150);
      ctx.fillText('Credits', 20, 300);

      ctx.font = '14px sans-serif';
      ctx.fillText('The ocean is brimming with peacefully coexisting life!', 20, 50);
      ctx.fillText('Help your shark consume them all, but prevent it from', 20, 70);
      ctx.fillText('swimming too deep, or its ravenous hunger will drag it', 20, 90);
      ctx.fillText('down into the painful depths!', 20, 110);

      ctx.fillText('Use the mouse to position the launchpad.', 20, 170);
      ctx.fillText('Click and hold to aim your shark.', 20, 190);
      ctx.fillText('Release to launch!', 20, 210);
      ctx.fillText('Continue using the launchpad to ', 20, 240);
      ctx.fillText('redirect your shark away from the deep!', 20, 260);

      ctx.fillText('Background: https://opengameart.org/users/', 20, 320);
      ctx.fillText('game-developer-studio', 116, 340);
      ctx.fillText('Sea Nommables: https://rapidpunches.itch.io/', 20, 360);
      ctx.fillText('Shark: https://opengameart.org/users/pillarist', 20, 380);
      ctx.fillText('BGM: "Sunken Suite" (djpretzel / https://ocremix.org)', 20, 400);
      ctx.fillText('Chomp Sounds: https://opengameart.org/users/darsycho', 20, 420);

      ctx.beginPath();
      ctx.moveTo(474, 553);
      ctx.lineTo(577, 553);
      ctx.lineTo(577, 583);
      ctx.lineTo(474, 583);
      ctx.closePath();
    }
  }
}

module.exports = About;