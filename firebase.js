import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// 🔹 GANTI DENGAN KONFIGURASI FIREBASE KAMU
const firebaseConfig = {
  apiKey: "AIzaSyA1JbIyH-JdsI6UoNlooLYojzuR8k1sjrs",
  authDomain: "growtopia-lite.firebaseapp.com",
  databaseURL: "https://growtopia-lite-default-rtdb.firebaseio.com",
  projectId: "growtopia-lite",
  storageBucket: "growtopia-lite.firebasestorage.app",
  messagingSenderId: "626819031630",
  appId: "1:626819031630:web:fbacefa82542c47297991f",
  measurementId: "G-7383GLZBSV"
};

// 🔹 Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, onValue };
