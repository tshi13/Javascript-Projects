import Sprite from "./Sprite.js"

class Missile extends Sprite{
  constructor(img, tank){
    super(tank.x + 20  , tank.y, 0, -2, img);
  }

  draw(ctx){ //draw missile
    ctx.drawImage(this.img, this.x, this.y, 10, 20); 
  }
}

export default Missile ;