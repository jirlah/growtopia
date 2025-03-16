// 🔹 Inisialisasi Firebase
import { getDatabase, ref, set } from "firebase/database";
import { db } from "./firebase.js"; // Pastikan ini diimpor dengan benar

function updatePlayerData() {
    if (!player || !player.id) {
        console.error("Player data is missing or invalid:", player);
        return;
    }

    set(ref(db, "players/" + player.id), player)
        .then(() => console.log("Player data updated successfully:", player))
        .catch((error) => console.error("Error updating player data:", error));
}

const app = firebase.initializeApp(firebaseConfig);
const db = getDatabase(app);

// 🔹 Setup Canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 🔹 Data Pemain
let players = {};
let playerId = Math.random().toString(36).substring(2, 9);  // ID unik sementara
let player = { id: playerId, x: Math.random() * 400, y: Math.random() * 400 };

// 🔹 Load Gambar Karakter
const playerImg = new Image();
playerImg.src = "assets/player.png";

// 🔹 Ambil data pemain lain dari Firebase
onValue(ref(db, "players"), (snapshot) => {
    players = snapshot.val() || {};
});

// 🔹 Gambar Game
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let id in players) {
        let p = players[id];

        if (id === playerId) {
            ctx.drawImage(playerImg, p.x, p.y, 40, 40);  // Gambar pemain utama
        } else {
            ctx.fillStyle = "blue";  // Pemain lain kotak biru
            ctx.fillRect(p.x, p.y, 20, 20);
        }
    }

    requestAnimationFrame(drawGame);
}

// 🔹 Gerakan Pemain (PC)
window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") player.y -= 5;
    if (e.key === "ArrowDown") player.y += 5;
    if (e.key === "ArrowLeft") player.x -= 5;
    if (e.key === "ArrowRight") player.x += 5;

    updatePlayerData(); // Simpan pergerakan ke Firebase
});

// 🔹 Kontrol untuk HP (Tombol Virtual)
document.getElementById("up").addEventListener("click", () => {
    player.y -= 5; updatePlayerData();
});
document.getElementById("down").addEventListener("click", () => {
    player.y += 5; updatePlayerData();
});
document.getElementById("left").addEventListener("click", () => {
    player.x -= 5; updatePlayerData();
});
document.getElementById("right").addEventListener("click", () => {
    player.x += 5; updatePlayerData();
});

// 🔹 Jalankan game setelah gambar termuat
playerImg.onload = drawGame;
