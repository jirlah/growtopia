import { db, ref, set, onValue } from "./firebase.js";

// 🔹 Setup Canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;

// 🔹 Data Pemain
const playerId = Math.random().toString(36).substring(2, 9);
const players = {};

// 🔹 Posisi Awal Pemain
const player = {
    id: playerId,
    x: Math.floor(Math.random() * 450),
    y: Math.floor(Math.random() * 450),
    color: "#" + Math.floor(Math.random()*16777215).toString(16) // Warna random
};

// 🔹 Simpan data pemain ke Firebase
function updatePosition() {
    set(ref(db, "players/" + player.id), player);
}

// 🔹 Update posisi saat tombol ditekan
window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") player.x += 10;
    if (e.key === "ArrowLeft") player.x -= 10;
    if (e.key === "ArrowUp") player.y -= 10;
    if (e.key === "ArrowDown") player.y += 10;
    updatePosition();
});

// 🔹 Terima data pemain dari Firebase
onValue(ref(db, "players"), (snapshot) => {
    const data = snapshot.val();
    if (data) {
        Object.assign(players, data);
        drawGame();
    }
});

// 🔹 Gambar Game
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let id in players) {
        let p = players[id];
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 20, 20);
    }
}

// 🔹 Masukkan pemain ke database saat load
updatePosition();
