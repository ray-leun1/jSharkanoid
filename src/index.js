const Aquarium = require('./aquarium');

document.addEventListener("DOMContentLoaded", function () {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Aquarium.WIDTH;
  canvasEl.height = Aquarium.HEIGHT;

  const ctx = canvasEl.getContext("2d");

  const aquarium = new Aquarium(ctx);
  aquarium.start();
});
