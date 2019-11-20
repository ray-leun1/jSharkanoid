const Aquarium = require('./aquarium');

document.addEventListener("DOMContentLoaded", function () {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Aquarium.WIDTH;
  canvasEl.height = Aquarium.HEIGHT;

  const ctx = canvasEl.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  
  const aquarium = new Aquarium(ctx);
  canvasEl.addEventListener('mousemove', e => aquarium.mousePos(e));
  canvasEl.addEventListener('click', e => aquarium.launch(e));
  aquarium.start();
});
