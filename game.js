const player = document.getElementById("player");
const starsContainer = document.getElementById("stars-container");
const scoreDisplay = document.getElementById("score");
const modeToggle = document.getElementById("mode-toggle");
const music = document.getElementById("bg-music");

let score = 0;
let intervalId;
let starInterval;
let gameRunning = false;

function startGame() {
  document.getElementById("start-screen").classList.remove("show");
  starsContainer.innerHTML = "";
  score = 0;
  gameRunning = true;
  music.play();
  intervalId = setInterval(updateScore, 1000);
  starInterval = setInterval(spawnStar, 800);
  requestAnimationFrame(moveStars);
}

function restartGame() {
  document.getElementById("game-over-screen").classList.remove("show");
  startGame();
}

function updateScore() {
  score++;
  scoreDisplay.textContent = `Score: ${score}`;
}

function spawnStar() {
  const star = document.createElement("div");
  star.classList.add("star");
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `-20px`;
  star.style.background = randomColor();
  starsContainer.appendChild(star);
}

function moveStars() {
  if (!gameRunning) return;

  const stars = document.querySelectorAll(".star");
  stars.forEach((star) => {
    const currentTop = parseFloat(star.style.top);
    star.style.top = `${currentTop + 2}px`;

    // collision check
    const starLeft = parseFloat(star.style.left);
    const playerLeft = player.offsetLeft;
    const diff = Math.abs(starLeft - playerLeft) < 30;
    const starTop = parseFloat(star.style.top);

    if (diff && starTop >= window.innerHeight - 60) {
      endGame();
    }

    if (starTop > window.innerHeight) {
      star.remove();
    }
  });

  requestAnimationFrame(moveStars);
}

function endGame() {
  gameRunning = false;
  clearInterval(intervalId);
  clearInterval(starInterval);
  music.pause();
  document.getElementById("finalScore").textContent = `Your Score: ${score}`;
  document.getElementById("game-over-screen").classList.add("show");
}

function randomColor() {
  const colors = ["#FFD700", "#FF69B4", "#00FFFF", "#7CFC00", "#FFA500"];
  return colors[Math.floor(Math.random() * colors.length)];
}

document.addEventListener("keydown", (e) => {
  if (!gameRunning) return;

  const left = player.offsetLeft;
  if (e.key === "ArrowLeft" && left > 10) {
    player.style.left = `${left - 30}px`;
  } else if (e.key === "ArrowRight" && left < window.innerWidth - 50) {
    player.style.left = `${left + 30}px`;
  }
});

modeToggle.onclick = () => {
  document.body.classList.toggle("light");
};
