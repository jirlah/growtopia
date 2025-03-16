import { getDatabase, ref, set, onValue } from "firebase/database";
import { db } from "./firebase.js";

// Setup Canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Data Pemain
let players = {};
let playerId = Math.random().toString(36).substring(2, 9); // ID unik sementara
let player = { id: playerId, x: Math.random() * 400, y: Math.random() * 400 };

// Load Gambar Karakter
const playerImg = new Image();
playerImg.src = "assets/player.png";

// Fungsi menyimpan posisi pemain ke Firebase
function updatePlayerData() {
  if (!player || !player.id) {
    console.error("Player data is missing or invalid:", player);
    return;
  }

  set(ref(db, "players/" + player.id), player)
    .then(() => console.log("Player data updated successfully."))
    .catch((error) => console.error("Error updating player data:", error));
}

// Ambil data pemain lain dari Firebase
onValue(ref(db, "players"), (snapshot) => {
  players = snapshot.val() || {};
});

// Fungsi menggambar game
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let id in players) {
    let p = players[id];
    if (id === playerId) {
      ctx.drawImage(playerImg, p.x, p.y, 40, 40); // Gambar pemain utama
    } else {
      ctx.fillStyle = "blue"; // Pemain lain kotak biru
      ctx.fillRect(p.x, p.y, 20, 20);
    }
  }

  requestAnimationFrame(drawGame);
}

// Gerakan Pemain (PC)
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") player.y -= 5;
  if (e.key === "ArrowDown") player.y += 5;
  if (e.key === "ArrowLeft") player.x -= 5;
  if (e.key === "ArrowRight") player.x += 5;

  updatePlayerData();
});

// Kontrol untuk HP (Tombol Virtual)
document.getElementById("up").addEventListener("click", () => {
  player.y -= 5;
  updatePlayerData();
});
document.getElementById("down").addEventListener("click", () => {
  player.y += 5;
  updatePlayerData();
});
document.getElementById("left").addEventListener("click", () => {
  player.x -= 5;
  updatePlayerData();
});
document.getElementById("right").addEventListener("click", () => {
  player.x += 5;
  updatePlayerData();
});

// Jalankan game setelah gambar dimuat
playerImg.onload = drawGame;
