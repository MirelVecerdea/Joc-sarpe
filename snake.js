const game = document.getElementById("game");
// sa apara sarpele cand se deschide pagina
const btnReset = document.getElementById("btnReset");

let direction = "r";
const snake = [];
let head;
const w = 500;
const h = 250;
const bw = 10;
let interval = 110;
let food;
let score = 0;
let highScore = 0;

// Pentru sa apara sarpele cand se incarca pagina
document.addEventListener("DOMContentLoaded", onLoad);
// schimb diretie de miscare
document.addEventListener("keydown", onKeyDown);
btnReset.addEventListener("click", onReset);

// functie incarcare
function onLoad() {
  snakeMaker(100, 50);
  foodMaker();
  renderScore();
  renderHighScore();
}

// functie creare sarpe
function snakeMaker(left, top) {
  for (let i = 0; i < 4; i++) {
    let div = document.createElement("div");
    div.style.top = `${top}px`;
    div.style.left = `${left}px`;
    left = left - bw;
    snake.push(div);
    game.appendChild(div);
  }
  head = snake[0];
}

// setare interval miscarii sarpelui
let timer = setInterval(gameLoop, interval);

// miscarea capului sarpelui
function gameLoop() {
  // Coordonate actuale ale capului
  let t = parseInt(head.style.top);
  let l = parseInt(head.style.left);

  if (gameOver(t, l)) {
    clearInterval(timer);
    btnReset.disabled = false;

    if (score > highScore) {
      highScore = score;
      renderHighScore();
      showHighScoreMessage();
    } else {
      alert("Game over");
    }

    return;
  }
  // adauga mancarea la dupa cap
  if (head.offsetLeft == food.offsetLeft && head.offsetTop == food.offsetTop) {
    snake.splice(1, 0, food);
    foodMaker();
    score++;
    renderScore();
  }

  // memorare coordonate actuale
  head.oldT = t;
  head.oldL = l;
  switch (direction) {
    case "r":
      l = l + bw;
      break;
    case "l":
      l = l - bw;
      break;
    case "u":
      t = t - bw;
      break;
    case "d":
      t = t + bw;
      break;
  }
  head.style.top = `${t}px`;
  head.style.left = `${l}px`;
  // repetarea miscarii capului de trup
  for (let i = 1; i < snake.length; i++) {
    let prev = snake[i - 1];
    t = parseInt(snake[i].style.top);
    l = parseInt(snake[i].style.left);
    snake[i].oldT = t;
    snake[i].oldL = l;
    snake[i].style.top = `${prev.oldT}px`;
    snake[i].style.left = `${prev.oldL}px`;
  }
}

// Schimb directia sarpe
function onKeyDown(e) {
  switch (e.key) {
    case "ArrowRight":
      direction = direction != "l" ? "r" : direction;
      break;
    case "ArrowLeft":
      direction = direction != "r" ? "l" : direction;
      break;
    case "ArrowUp":
      direction = direction != "d" ? "u" : direction;
      break;
    case "ArrowDown":
      direction = direction != "u" ? "d" : direction;
      break;
  }
}

function gameOver(t, l) {
  // Loveste trupul
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].offsetLeft == l && snake[i].offsetTop == t) return true;
  }
  // Loveste marginile
  return t >= h || l < 0 || t < 0 || l >= w;
}

function foodMaker() {
  let d = document.createElement("div");
  let t = 10 * numbercreator(0, (h - 10) / 10);
  let l = 10 * numbercreator(0, (w - 10) / 10);
  d.style.top = `${t}px`;
  d.style.left = `${l}px`;
  food = d;
  game.appendChild(d);
}
function numbercreator(min, max) {
  return Math.ceil(min + Math.random() * (max - min));
}

function onReset() {
  game.innerHTML = "";
  snake.length = 0;
  btnReset.disabled = true;
  interval = 110;
  direction = "r";
  score = 0;
  renderScore();
  snakeMaker(100, 50);
  foodMaker();
  timer = setInterval(gameLoop, interval);
}

const scoreEl = document.querySelector(".score");
const highScoreEl = document.querySelector("#high-score");

function renderScore() {
  scoreEl.innerHTML = `${score}`;
}

function renderHighScore() {
  highScoreEl.innerHTML = `${highScore}`;
}

function showHighScoreMessage() {
  if (score > highScore) {
    alert(
      `Game over. Congratulations! You've surpassed the high score. New High Score: ${highScore}`
    );
  } else {
    alert("Game over");
  }
}
