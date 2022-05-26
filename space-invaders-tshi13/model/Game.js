import Tank from "./Tank";
import Missile from "./Missile";
import Invader from "./Invader";

//initialize images and audio used
const imageTank = new Image(50, 50);
const imageMissile = new Image(10, 20);
const imageInvader = new Image(40,40);
imageTank.src = "./assets/tank.png";
imageMissile.src = "./assets/missile.png";
imageInvader.src = "./assets/invader.png";
const gameMusic = new Audio("./assets/music.mpeg");


class Game{
  constructor(ctx, canvas){ 
    this.ctx = ctx;
    this.canvas = canvas;
    this.tank = new Tank(canvas.width / 2 - 25, canvas.height - 60, imageTank);//tank object
    this.missileArray = []; //array of missiles on canvas
    this.invaderArray = []; //arrray of invaders on canvas
    this.continueGame = true; // if we should continue game
    this.score = 0; //aliens shot down
  }
    
  
  playGame() { //main logic to play entire game
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.tank.draw(this.ctx);
    if (this.tank.beginGame){
      gameMusic.play(); //play music
      this.tank.move(this.canvas.width); //check if move tank
      this.launchMissile(); //check if launch missile
      this.hitEnemy(); //check if invader is hit?
      this.missileOutOfRange(); //check if missile exits canvas
      this.setInvader(); //release new invaders
    }
    this.setScoreBoard(); //set score board portion
    if (this.continueGame){ //check if we continue iteration of game 
      window.requestAnimationFrame(this.playGame.bind(this));
    } else {
      this.endGame();
    }
  }

  setScoreBoard(){ //set score board portion
    this.ctx.fillStyle = "#0095DD";
    this.ctx.font = "16px Arial";
    this.ctx.fillText("Invaders shot down: " + this.score,8,20);
    this.ctx.fillText("Missiles remaining: " + this.tank.missileNumber,8,40);
  }

  launchMissile(){ //check if we should launch missile
    if (this.tank.launch && this.tank.missileNumber>0){ //checks conditions 
      this.missileArray.push(new Missile(imageMissile, this.tank)); //put new missile in array
      this.tank.missileNumber -- ;
      this.tank.launch = false; //finish launching this missile
    }
  }

  missileOutOfRange(){ //check if missile exits canvas
    for (let i = 0; i < this.missileArray.length; i++) {
      this.missileArray[i].draw(this.ctx); //draw and move missile
      this.missileArray[i].move();
      if (this.missileArray[i].y < 0){
        this.missileArray.splice(i,1); //delete missile from array
        i--;
        this.tank.missileNumber++; //award new missile
      }
    }
  }

  hitEnemy(){ //check if missile hits invader
    for (let i = 0; i< this.missileArray.length; i++){
      for (let j = 0; j< this.invaderArray.length; j++) {
        if (this.invaderArray[j].intersects(this.missileArray[i])){ //check condition
          const explostionMusic = new Audio("./assets/explosion.wav"); //play explosion
          explostionMusic.play();
          this.score++;
          this.tank.missileNumber++;
          this.invaderArray.splice(j,1); //delete missile and invader from array
          this.missileArray.splice(i,1);
          i--;
          j--;
          break;
        }
      }
    }
  }

  setInvader(){ //release new invaders on canvas
    const dropInvader = Math.random() < 0.01; //random probability 
    if (dropInvader) {
      this.invaderArray.push(new Invader(imageInvader,this.canvas)); //add invader to array
    }
    for(let i = 0; i < this.invaderArray.length; i++) { //draw and move invaders
      this.invaderArray[i].draw(this.ctx);
      this.invaderArray[i].move();
      if (this.invaderArray[i].intersects(this.tank)){ //if invader hits tank
        this.continueGame = false;
      }
      if (this.invaderArray[i].y > this.canvas.height){ //if invader reaches bottom
        this.invaderArray.splice(i,1);
        this.continueGame = false;
      }  
    }
  }

  endGame(){ //when player loses and we should end the game
    gameMusic.pause();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillText("Invaders shot down: " + this.score,8,20);
    this.ctx.fillText("Game Over!" ,8,40);
    const endTank = new Tank(this.canvas.width / 2 - 25, this.canvas.height - 60, imageTank);
    endTank.draw(this.ctx);
  }
}

export default Game;