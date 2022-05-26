import "./style.css";
import Game from "./model/Game"

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let game = new Game(ctx,canvas); //create game object
game.playGame(); // play game

