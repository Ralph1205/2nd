const audio = document.getElementById("audio");
const playButton = document.getElementById("play");
const topPlay = document.getElementById("topPlay");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const vinyl = document.getElementById("vinyl");
const musicNote = document.getElementById("musicNote");

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${remaining}`;
}

function updatePlayer() {
  const playing = !audio.paused;

  playButton.textContent = playing ? "Ⅱ" : "▶";
  topPlay.textContent = playing ? "Ⅱ Pause Music" : "♫ Play Music";

  vinyl.classList.toggle("playing", playing);
}

async function toggleMusic() {
  if (audio.paused) {
    try {
      await audio.play();
      musicNote.textContent = "Playing just for you ♡";
    } catch (error) {
      musicNote.textContent =
        "Please add your song to the music folder as music.mp3.";
    }
  } else {
    audio.pause();
  }

  updatePlayer();
}

playButton.addEventListener("click", toggleMusic);
topPlay.addEventListener("click", toggleMusic);

audio.addEventListener("play", updatePlayer);
audio.addEventListener("pause", updatePlayer);

audio.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  current.textContent = formatTime(audio.currentTime);

  if (Number.isFinite(audio.duration) && audio.duration > 0) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  }
});

progress.addEventListener("input", () => {
  if (Number.isFinite(audio.duration) && audio.duration > 0) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

document.getElementById("restart").addEventListener("click", () => {
  audio.currentTime = 0;

  if (audio.paused) {
    toggleMusic();
  }
});

document.getElementById("mute").addEventListener("click", (event) => {
  audio.muted = !audio.muted;
  event.currentTarget.textContent = audio.muted ? "🔇" : "♫";
});

const menuButton = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuButton.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuButton.textContent = nav.classList.contains("open") ? "×" : "☰";
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.textContent = "☰";
  });
});

// Floating flower petals
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

const petals = document.getElementById("petals");
const symbols = ["✿", "✧", "♡"];

function createPetal() {
  const petal = document.createElement("span");

  petal.className = "petal";
  petal.textContent = symbols[Math.floor(Math.random() * symbols.length)];

  petal.style.left = Math.random() * 100 + "vw";
  petal.style.fontSize = 10 + Math.random() * 10 + "px";
  petal.style.setProperty("--drift", Math.random() * 150 - 75 + "px");

  const fallDuration = 9 + Math.random() * 9;
  petal.style.animationDuration = fallDuration + "s";

  petals.appendChild(petal);

  setTimeout(() => petal.remove(), fallDuration * 1000);
}

if (!reduceMotion) {
  for (let i = 0; i < 8; i++) {
    setTimeout(createPetal, i * 700);
  }

  setInterval(createPetal, 1600);
}
