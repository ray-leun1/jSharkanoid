const Aquarium = require('./aquarium');

document.addEventListener('DOMContentLoaded', () => {
  const canvasEl = document.getElementsByTagName('canvas')[0];
  canvasEl.width = Aquarium.CANVAS_WIDTH;
  canvasEl.height = Aquarium.CANVAS_HEIGHT;

  const context = canvasEl.getContext('2d');
  context.imageSmoothingEnabled = false;
  
  const aquarium = new Aquarium(canvasEl, context);
  canvasEl.addEventListener('mousemove', e => aquarium.mousePos(e));
  canvasEl.addEventListener('click', e => aquarium.mouseClick(e));
  canvasEl.addEventListener('mousedown', e => aquarium.mouseDown(e));
  canvasEl.addEventListener('mouseup', e => aquarium.mouseUp(e));
  aquarium.start();
});
