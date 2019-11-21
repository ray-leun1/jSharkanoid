const Aquarium = require('./aquarium');

document.addEventListener('DOMContentLoaded', function () {
  const canvasEl = document.getElementsByTagName('canvas')[0];
  canvasEl.width = Aquarium.WIDTH;
  canvasEl.height = Aquarium.HEIGHT;

  const ctxMain = canvasEl.getContext('2d');
  ctxMain.imageSmoothingEnabled = false;
  const ctxBtn = canvasEl.getContext('2d');
  ctxBtn.imageSmoothingEnabled = false;
  
  const aquarium = new Aquarium(ctxMain);
  canvasEl.addEventListener('mousemove', e => aquarium.mousePos(e));
  canvasEl.addEventListener('click', e => aquarium.launch(e));
  aquarium.start();
});
