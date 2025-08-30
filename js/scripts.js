const boardBox = document.querySelectorAll(".box");
const symbolX = document.querySelector(".x");
const symbolO = document.querySelector(".o");
const messageContainer = document.querySelector("#message p");
let boardState = ["", "", "", "", "", "", "", "", ""];
let turn = "X";
let gameActive = true;

//Button
const buttons = document.querySelectorAll("nav div button");
const gameContainer = document.querySelector("#game");
const backMenu = document.querySelector("#backToMenu");
let vsCPU = false;

//Button modo de jogo
buttons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    gameContainer.classList.remove("hide");
    backMenu.classList.remove("hide");
    buttons.forEach((btn) => {
      btn.style.display = "none";
    });
    vsCPU = index === 1;
  });
});

//Button BackMenu
backMenu.addEventListener("click", () => {
  gameContainer.classList.add("hide");
  backMenu.classList.add("hide");
  buttons.forEach((btn) => {
    btn.style.display = "inline-block";
  });

  boardState = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  gameActive = true;
  boardBox.forEach((box) => {
    box.innerHTML = "";
  });
});

//Jogada do Player
boardBox.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (!gameActive || box.children.length > 0 || boardState[index]) return;

    if (turn === "X" || !vsCPU) {
      const symbolClone =
        turn === "X" ? symbolX.cloneNode(true) : symbolO.cloneNode(true);

      box.appendChild(symbolClone);
      boardState[index] = turn;
      checkWinner();
    }
    if (vsCPU) {
      if (turn === "X" && gameActive) {
        turn = "O";
        setTimeout(computerPlay, 500);
      }
    } else {
      turn = turn === "X" ? "O" : "X";
    }
  });
});

//Jogada da CPU
function computerPlay() {
  let availableMoves = [];
  boardState.forEach((cell, index) => {
    if (cell === "") availableMoves.push(index);
  });

  if (availableMoves.length === 0) return;
  const randomIndex =
    availableMoves[Math.floor(Math.random() * availableMoves.length)];

  const symbolClone = symbolO.cloneNode(true);
  boardBox[randomIndex].appendChild(symbolClone);
  boardState[randomIndex] = "O";

  checkWinner();
  turn = "X";
}

//Condições de vitória
let scoreX = 0;
let scoreO = 0;
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  for (let combo of winningCombinations) {
    let [a, b, c] = combo;
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      messageContainer.textContent = `${boardState[a]} Venceu!`;
      messageContainer.style.display = "block";
      gameActive = false;
      if (boardState[a] === "X") {
        scoreX++;
        document.querySelector("#scoreboard-1").textContent = scoreX;
      } else {
        scoreO++;
        document.querySelector("#scoreboard-2").textContent = scoreO;
      }
      setTimeout(function () {
        resetGame();
      }, 1000);
      return;
    }
  }
  if (!boardState.includes("")) {
    messageContainer.textContent = "Empate!";
    messageContainer.style.display = "block";
    gameActive = false;
    setTimeout(function () {
      resetGame();
    }, 1000);
  }
}

//Reiniciar jogo
function resetGame() {
  boardState = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  gameActive = false;
  boardBox.forEach((box) => {
    box.innerHTML = "";
  });
  setTimeout(function () {
    messageContainer.textContent = "";
    messageContainer.style.display = "none";
    gameActive = true;
  }, 1000);
}
