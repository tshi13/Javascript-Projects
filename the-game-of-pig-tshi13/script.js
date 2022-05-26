const holdBtn = document.getElementById("hold");
const rollBtn = document.getElementById("roll");

holdBtn.addEventListener("click", hold);
rollBtn.addEventListener("click", roll);

let holdValue = 0; //hold value for each player
let p1Score = 0; //player 1 score
let p2Score = 0; //player 2 score
let score = 0; // score of the round
let isP1 = true; //true if p1's turn, false if p2's turn
let playerScoreString = "p1-score";
let playerHoldString = "p1-hold";

function setHoldValues(){ //sets strings and variables appropriately for Hold
  if (isP1){
    playerScoreString = "p1-score";
    playerHoldString = "p1-hold";
    p1Score += holdValue;
    score = p1Score;
  } else {
    playerScoreString = "p2-score";
    playerHoldString = "p2-hold";
    p2Score += holdValue;
    score = p2Score;
  }
}

function setRollValues(){ //sets strings and variables for roll
  if (isP1){
    playerScoreString = "p1-score";
    playerHoldString = "p1-hold";
    score = p1Score;
  } else {
    playerScoreString = "p2-score";
    playerHoldString = "p2-hold";
    score = p2Score;
  }
}

function adjustHold(){ //adjust hold bar
  document.getElementById(playerHoldString).style.width = holdValue + "%";
  document.getElementById(playerHoldString).setAttribute("aria-valuenow", holdValue);
  document.getElementById(playerHoldString).innerText = holdValue;
}

function adjustScore(){ //adjust score bar
  document.getElementById(playerScoreString).style.width = score + "%";
  document.getElementById(playerScoreString).setAttribute("aria-valuenow", score);
  document.getElementById(playerScoreString).innerText = score;
}

function setWin(){ //set score bar when a player wins
  document.getElementById(playerScoreString).style.width = score + "%";
  document.getElementById(playerScoreString).classList.add("bg-success"); // set color to green
  document.getElementById(playerScoreString).innerText = "100\uD83C\uDF89."; //100+confetti 
  document.getElementById(playerScoreString).setAttribute("aria-valuenow", score);
  document.getElementById("hold").disabled = true; //disable both buttons
  document.getElementById("roll").disabled = true;
}

function hold() {
  setHoldValues(); // initialize values properly
  adjustScore(); // update score, and score bar on screen
  holdValue = 0; // reset holdValue to 0, reset hold bar on screen
  adjustHold();

  isP1 = !isP1; // change players, show player turn
  if (isP1){
    document.getElementById("result").innerText = "Player-1 turn!";
  } else {
  document.getElementById("result").innerText = "Player-2 turn!";
  }
}

function roll() {
  setRollValues();
  const faceValue = Math.floor(Math.random() * 6) + 1;
  const output = "&#x268" + (faceValue  - 1) + "; ";
  const die = document.getElementById("die");
  die.innerHTML = output;

  
  if (faceValue == 1){ // if the dice is 1
    holdValue = 0;
    adjustHold(); // set hold bar to 0
    isP1 = !isP1; //change players
    if (isP1){
      document.getElementById("result").innerText = "Player-1 turn!";
    } else {
    document.getElementById("result").innerText = "Player-2 turn!";
    }
  } else {
  holdValue += faceValue; //update holdvalue

    //If we reach or exceed 100
    if (score + holdValue >= 100){
      if(isP1){
      document.getElementById("result").innerText = "Player-1 won!";
      } else {
      document.getElementById("result").innerText = "Player-2 won!";
      }
    
    holdValue = 0;
    adjustHold(); //clear hold values

    score = 100;
    setWin(); //show player is winner
    } else {
    adjustHold(); //otherwise we just update hold values
    }

  }
  
}
