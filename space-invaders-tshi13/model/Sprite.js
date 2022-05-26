class Sprite {
  constructor(x, y, dx, dy, img) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.img = img;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  draw(ctx){
    ctx.drawImage(this.img, this.x, this.y, 50, 50); //arg2/3 是position
  }

  intersects(other) { //checks if an object intersects another object
    let thisLeftPos = this.x;
    let thisRightPos = this.x + this.img.width;
    let thisUpPos = this.y;
    let thisDownPos = this.y + this.img.height;

    let otherLeftPos = other.x;
    let otherRightPos = other.x + other.img.width;
    let otherUpPos = other.y;

    if (otherUpPos >= thisUpPos && otherUpPos <= thisDownPos) { //conditions for intersection
      if ((otherLeftPos >= thisLeftPos && otherLeftPos <= thisRightPos)
       || (otherRightPos >= thisLeftPos && otherRightPos <= thisRightPos)){
        return true;
      }
    }
    return false;
  }

}

export default Sprite;