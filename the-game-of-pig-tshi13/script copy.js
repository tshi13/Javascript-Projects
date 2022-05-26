const holdBtn = document.getElementById("hold");
const rollBtn = document.getElementById("roll");

holdBtn.addEventListener("click", hold);
rollBtn.addEventListener("click", roll);

let holdValue = 0;
let score = 0;

function hold() {
  holdValue += 5;
  document.getElementById("p1-hold").style.width = holdValue + "%";
  document.getElementById("p1-hold").setAttribute("aria-valuenow", holdValue);
  document.getElementById("p1-hold").innerText = holdValue;

  score += 10;
  document.getElementById("p1-score").style.width = score + "%";
  document.getElementById("p1-score").setAttribute("aria-valuenow", score);
  document.getElementById("p1-score").innerText = score;
}

function roll() {
  const faceValue = Math.floor(Math.random() * 6) + 1;
  const output = "&#x268" + (faceValue  - 1) + "; ";
  const die = document.getElementById("die");
  die.innerHTML = output;


}
