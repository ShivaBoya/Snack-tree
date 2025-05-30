// // Import the functions you need from the SDKs you need
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
//   import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
//   // TODO: Add SDKs for Firebase products that you want to use
//   // https://firebase.google.com/docs/web/setup#available-libraries

//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   const firebaseConfig = {
//     apiKey: "AIzaSyAqPaprdgZKAav2BVCWhgeN_iCxXWU6mxU",
//     authDomain: "snacktree-e7fcd.firebaseapp.com",
//     projectId: "snacktree-e7fcd",
//     storageBucket: "snacktree-e7fcd.firebasestorage.app",
//     messagingSenderId: "381429882799",
//     appId: "1:381429882799:web:24bb669832f19fc17fd95a",
//     measurementId: "G-N7S23VQ2W0"
//   };

//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);
// src/firebase.js
// src/firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqPaprdgZKAav2BVCWhgeN_iCxXWU6mxU",
  authDomain: "snacktree-e7fcd.firebaseapp.com",
  databaseURL: "https://snacktree-e7fcd-default-rtdb.firebaseio.com",
  projectId: "snacktree-e7fcd",
  storageBucket: "snacktree-e7fcd.appspot.com",
  messagingSenderId: "381429882799",
  appId: "1:381429882799:web:24bb669832f19fc17fd95a",
  measurementId: "G-N7S23VQ2W0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// Export if needed
export { app, analytics, db };
