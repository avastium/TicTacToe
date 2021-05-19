'use strict';

const textScoreX = document.getElementById("scoreX");
const textScoreO = document.getElementById("scoreO");
const msg = document.getElementById("text");
const cells = document.getElementsByClassName("cell");
const crosses = document.getElementsByClassName("cross");
const circles = document.getElementsByClassName("circle");
const buttonNewGame = document.getElementById("btnNewGame");
const buttonResetScore = document.getElementById("btnResetScore");

let steps = 0;
let scoreX = 0;
let scoreO = 0;

let winLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

addEventListener('DOMContentLoaded', function(event) {
  toggleButtonState('buttonNewGame', 0);
  toggleButtonState('buttonResetScore', 0);
  updateScore();
});

const updateScore = () => {
  textScoreX.innerHTML = scoreX;
  textScoreO.innerHTML = scoreO;
  if (scoreX != 0 || scoreO != 0 && buttonResetStats.disabled == true) toggleButtonState('buttonResetScore', 1);
}

const disableCells = () => {
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.add('disabled');
  }
}

function toggleButtonState(name, state) { // NAMES: buttonNewGame, buttonResetScore; STATES: 0 - disable, 1 - enable
  switch (name) {
    case "buttonNewGame": {
      if (state == 0) return buttonNewGame.disabled = true;
      if (state == 1) return buttonNewGame.disabled = false;
    }
    case "buttonResetScore": {
      if (state == 0) return buttonResetScore.disabled = true;
      if (state == 1) return buttonResetScore.disabled = false;
    }
  }
}

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", function (event) {
    if (cells[i].classList.contains("disabled")) return true;
    cells[i].classList.add("disabled");
    if (steps % 2 == 0) {
      let newCross = document.createElement("div");
      newCross.className = 'cross';
      cells[i].appendChild(newCross);
      cells[i].classList.add('cross-mark');
    } else {
      let newCircle = document.createElement("div");
      newCircle.className = 'circle';
      cells[i].appendChild(newCircle);
      cells[i].classList.add('circle-mark');
    }
    steps++;
    if (steps != 0 && buttonNewGame.disabled == true) toggleButtonState('buttonNewGame', 1);
    checkWin();
  });
}

function checkWin() {
  for (let i = 0; i < winLines.length; i++) {
    if (cells[winLines[i][0]].classList.contains('cross-mark') && cells[winLines[i][1]].classList.contains('cross-mark') && cells[winLines[i][2]].classList.contains('cross-mark')) {
      disableCells();
      scoreX += 1;
      updateScore();
      return msg.innerHTML = 'Crosses WIN!';
    }
    else if (cells[winLines[i][0]].classList.contains('circle-mark') && cells[winLines[i][1]].classList.contains('circle-mark') && cells[winLines[i][2]].classList.contains('circle-mark')) {
      disableCells();
      scoreO += 1;
      updateScore();
      return msg.innerHTML = 'Circles WIN!';
    }
  }
  if (steps == 9) {
    disableCells();
    scoreX += 0.5;
    scoreO += 0.5;
    updateScore();
    return msg.innerHTML = 'Draw!';
  }
}

function newGame() {
  let confirmation = confirm('Are you sure you want to start new game?');
  if (confirmation == false) return true;
  for (let i = 0; i < cells.length; i++) {
    cells[i].className = 'cell';
    if (cells[i].hasChildNodes() == true) cells[i].removeChild(cells[i].firstElementChild);
  }
  steps = 0;
  toggleButtonState('buttonNewGame', 0);
  msg.innerHTML = "Game Started";
}

function resetScore() {
  if (scoreX == 0 && scoreO == 0) return true;
  let confirmation = confirm('Are you sure you want to reset stats?');
  if (confirmation == false) return true;
  scoreX = 0;
  scoreO = 0;
  toggleButtonState('buttonResetScore', 0);
  updateScore();
}