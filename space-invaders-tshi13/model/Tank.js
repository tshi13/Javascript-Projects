import Missile from "./Missile.js";
import Sprite from "./Sprite.js"


class Tank extends Sprite{

  constructor(x, y, img, ctx) {
    super(x, y, 0, 0, img);
    this.displacement = 5;
    this.missileNumber = 10;
    this.ctx = ctx;
    this.launch = false; //controls missile launch
    this.beginGame = false; //whether to begin game
    document.addEventListener("keydown", this.keyDownHandler.bind(this));
    document.addEventListener("keyup", this.keyUpHandler.bind(this));
  }

  keyDownHandler(e) { //press key situation
    if (e.key === "Right" || e.key === "ArrowRight") { //move right
      this.dx = this.displacement;
      this.beginGame = true; 
    } if (e.key === "Left" || e.key === "ArrowLeft") { //move left
      this.dx = -this.displacement;
      this.beginGame = true;
    } if ((e.key === " " || e.key === "Spacebar") && this.missileNumber > 0) {
      const shootMusic = new Audio("./assets/shoot.wav"); //shoot missiles and play shoot music
      shootMusic.play();
      this.launch = true;
    }
  }

  keyUpHandler(e) { //release key situation
    if (e.key === "Right" || e.key === "ArrowRight") {
      this.dx = 0;
    } if (e.key === "Left" || e.key === "ArrowLeft") {
      this.dx = 0;}
  }

  move(canvasWidth) { //move tank within canvas
    super.move();
    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + this.img.width > canvasWidth) {
      this.x = canvasWidth - this.img.width;
    }
  }
}

export default Tank;