const player = document.getElementById("player");
const block = document.getElementById("block");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("high-score");
const overlay = document.getElementById("overlay");
const gameOverModal = document.getElementById("gameOverModal");
const finalScore = document.getElementById("finalScore");
const hearts = document.getElementById("hearts");
const jumpSound = document.getElementById("jump-sound");
const hitSound = document.getElementById("hit-sound");
const bgMusic = document.getElementById("bg-music");

let playerX = 125;
let blockX = Math.floor(Math.random() * 6) * 50;
let blockY = 0;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let lives = 3;
let speed = 4;
let playerName = "";

function drawBlock() {
  block.style.top = `${blockY}px`;
  block.style.left = `${blockX}px`;
}

function startGame() {
  playerName = document.getElementById("playerName").value || "Player";
  overlay.classList.remove("show");
  gameOverModal.classList.remove("show");
  score = 0;
  lives = 3;
  speed = 4;
  blockY = 0;
  playerX = 125;
  bgMusic.play();
  update();
}

function restartGame() {
  startGame();
}

function update() {
  if (lives <= 0) return;

  blockY += speed;

  if (blockY > 400) {
    blockY = 0;
    blockX = Math.floor(Math.random() * 6) * 50;
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    if (score % 5 === 0) speed += 0.5;
  }

  if (blockY + 50 >= 350 && blockX === playerX) {
    hitSound.play();
    lives--;
    hearts.innerHTML = "❤️".repeat(lives);
    blockY = 0;
    blockX = Math.floor(Math.random() * 6) * 50;
    if (lives <= 0) {
      bgMusic.pause();
      finalScore.innerText = `${playerName}, your score: ${score}`;
      gameOverModal.classList.add("show");
      if (score > highScore) {
        localStorage.setItem("highScore", score);
      }
    }
  }

  drawBlock();
  requestAnimationFrame(update);
}

document.addEventListener("keydown", (e) => {
  if (lives <= 0) return;
  if (e.key === "ArrowLeft" && playerX > 0) {
    playerX -= 50;
    jumpSound.play();
  } else if (e.key === "ArrowRight" && playerX < 250) {
    playerX += 50;
    jumpSound.play();
  }
  player.style.left = `${playerX}px`;
});

document.getElementById("mode-toggle").onclick = () => {
  document.body.classList.toggle("light");
};

highScoreDisplay.textContent = `High Score: ${highScore}`;
