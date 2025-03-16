// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
