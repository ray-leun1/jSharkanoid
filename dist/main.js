/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/aquarium.js":
/*!*************************!*\
  !*** ./src/aquarium.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Launchpad = __webpack_require__(/*! ./launchpad */ \"./src/launchpad.js\");\nconst Shark = __webpack_require__(/*! ./shark */ \"./src/shark.js\");\nconst Sealife = __webpack_require__(/*! ./sealife */ \"./src/sealife.js\");\n\nclass Aquarium {\n  constructor(ctx) {\n    this.ctx = ctx;\n    this.launchpad = null;\n    this.shark = null;\n    this.sealife = [];\n\n    this.generateShark()\n    this.animate = this.animate.bind(this);\n  }\n\n  generateLaunchpad() {\n\n  }\n\n  generateShark() {\n    this.shark = new Shark({width: Aquarium.WIDTH, height: Aquarium.HEIGHT});\n  }\n\n  draw() {\n    this.ctx.drawImage(Aquarium.BG, 0, 0);\n    Aquarium.BG.onload = () => this.ctx.drawImage(Aquarium.BG, 0, 0);\n    this.shark.draw(this.ctx);\n  }\n\n  animate() {\n    this.ctx.clearRect(0, 0, Aquarium.WIDTH, Aquarium.HEIGHT);\n    this.shark.move();\n    this.shark.collision();\n    this.draw();\n  \n    // requestAnimationFrame(this.animate());\n  }\n\n  start() {\n    this.shark.setPos('initial');\n    this.shark.setSpeed(10);\n    this.shark.setAngle(270);\n\n    // this.animate();\n    setInterval(this.animate, 30)\n  }\n}\n\nAquarium.WIDTH = 600;\nAquarium.HEIGHT = 600;\nAquarium.BG = new Image(Aquarium.WIDTH, Aquarium.HEIGHT);\nAquarium.BG.src = \"../img/background.png\";\n\nmodule.exports = Aquarium;\n\n//# sourceURL=webpack:///./src/aquarium.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Aquarium = __webpack_require__(/*! ./aquarium */ \"./src/aquarium.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  const canvasEl = document.getElementsByTagName(\"canvas\")[0];\n  canvasEl.width = Aquarium.WIDTH;\n  canvasEl.height = Aquarium.HEIGHT;\n\n  const ctx = canvasEl.getContext(\"2d\");\n\n  const aquarium = new Aquarium(ctx);\n  aquarium.start();\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/launchpad.js":
/*!**************************!*\
  !*** ./src/launchpad.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Launchpad {\n  constructor() {\n    this.pos = {x: 0, y: 0};\n  }\n\n  draw(ctx) {\n\n  }\n}\n\nmodule.exports = Launchpad;\n\n//# sourceURL=webpack:///./src/launchpad.js?");

/***/ }),

/***/ "./src/sealife.js":
/*!************************!*\
  !*** ./src/sealife.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Sealife {\n  constructor(options) {\n    \n  }\n}\n\nmodule.exports = Sealife;\n\n//# sourceURL=webpack:///./src/sealife.js?");

/***/ }),

/***/ "./src/shark.js":
/*!**********************!*\
  !*** ./src/shark.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Aquarium = __webpack_require__(/*! ./aquarium */ \"./src/aquarium.js\")\n\nclass Shark {\n  constructor(aquariumSize) {\n    this.size = 7;\n    this.pos = {x: 0, y: 0};\n    this.speed = 0;\n    this.vel = {x: 0, y: 0};\n    this.angle = 270;\n    this.aquariumSize = aquariumSize;\n    this.image = new Image();\n    this.image.src = '../img/SharkSpriteSheet_110x45.png';\n    this.width = 110;\n    this.height = 45;\n    this.frame = 0;\n  }\n\n  setPos(pos) {\n    if (pos === 'initial') {\n      this.pos = {x: this.aquariumSize.width / 2, y: this.aquariumSize.height - 30};\n    } else {\n      this.pos = pos;\n    }\n  }\n\n  setSpeed(speed) {\n    this.speed = speed;\n    this.setVel();\n  }\n\n  setAngle(angle) {\n    if (\n      (this.angle > 359.5 && this.angle < 0.5) ||\n      (this.angle > 89.5 && this.angle < 90.5) ||\n      (this.angle > 179.5 && this.angle < 180.5) ||\n      (this.angle > 269.5 && this.angle < 270.5)\n    ) {\n      this.angle += [-30, 30][Math.floor(Math.random() * 2)]\n    } else {\n      this.angle = angle;\n    }\n    this.setVel();\n  }\n\n  setVel() {\n    this.vel.x = this.speed * Math.cos(Math.PI * this.angle / 180);\n    this.vel.y = this.speed * Math.sin(Math.PI * this.angle / 180);\n  }\n\n  localPos() { // Calculate position in shark local coordinates\n    let cosAngle = Math.cos(Math.PI * this.angle / 180);\n    let sinAngle = Math.sin(Math.PI * this.angle / 180);\n    return {\n      x: this.pos.x * cosAngle + this.pos.y * sinAngle,\n      y: this.pos.y * cosAngle - this.pos.x * sinAngle\n    }\n  }\n\n  collision() {\n    // Wall and ceiling collision\n    if (        // Left wall collision\n      this.pos.x < this.size\n      && this.vel.x < 0\n    ) {\n      if (this.vel.y < 0) this.setAngle(180 - this.angle);\n      if (this.vel.y > 0) this.setAngle(540 - this.angle);\n    } else if ( // Right wall collision\n      this. pos.x > (this.aquariumSize.width - this.size)\n      && this.vel.x > 0\n    ) {\n      if (this.vel.y < 0) this.setAngle(180 - this.angle);\n      if (this.vel.y > 0) this.setAngle(540 - this.angle);\n    } else if ( // Ceiling collision\n      this.pos.y < this.size\n      && this.vel.y < 0\n    ) {\n      this.setAngle(360 - this.angle);\n    }\n      else if ( // Floor collision (DEBUG)\n      this.pos.y > (this.aquariumSize.height - this.size)\n      && this.vel.y > 0\n    ) {\n      this.setAngle(360 - this.angle);\n    }\n  };\n\n  draw(ctx) {\n    let localCoords = this.localPos();\n    this.frame += 1;\n    ctx.save();\n    ctx.rotate(Math.PI * this.angle / 180);\n    ctx.drawImage(this.image,\n      (Math.floor(this.frame / 4) % 7) * this.width, 0,\n      this.width, this.height,\n      localCoords.x - 98, localCoords.y - 18,\n      this.width, this.height\n    );\n    ctx.restore();\n    this.image.onload = () => {\n      ctx.save();\n      ctx.rotate(Math.PI * this.angle / 180);\n      ctx.drawImage(this.image,\n        (Math.floor(this.frame / 4) % 7) * this.width, 0,\n        this.width, this.height,\n        localCoords.x - 98, localCoords.y - 18,\n        this.width, this.height\n      );\n      ctx.restore();\n    }\n  }\n\n  move() {\n    this.pos.x += this.vel.x;\n    this.pos.y += this.vel.y;\n  }\n\n  remove() {\n    this.aquarium.remove(this);\n  }\n}\n\nmodule.exports = Shark;\n\n\n//# sourceURL=webpack:///./src/shark.js?");

/***/ })

/******/ });