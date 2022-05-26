import Sprite from "./Sprite.js"

class Invader extends Sprite{
  constructor(img,canvas){ //constructor, with random x position for invader
    super(Math.random()*(canvas.width - 50), 0, 0, Math.random()*5 + 0.5,img);
    this.center = this.x;
  }

  draw(ctx){ //draws invader
    ctx.drawImage(this.img, this.x, this.y, 40,  40); //arg2/3 是position
  }

  move(){ //override sprite move function, allows squiggly movement
    this.x = this.center + (Math.ceil(Math.random() * 2) * (Math.round(Math.random()) ? 1 : -1));
    this.y += this.dy;
  }
}

export default Invader;