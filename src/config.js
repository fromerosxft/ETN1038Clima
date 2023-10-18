// Import the functions you need from the SDKs you need
//import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAM2CS3dFRpEO7NDX3F1uwFJOaINUq6oyg",
  authDomain: "web1038-5f34c.firebaseapp.com",
  projectId: "web1038-5f34c",
  storageBucket: "web1038-5f34c.appspot.com",
  messagingSenderId: "549488023213",
  appId: "1:549488023213:web:0db6f1d3c7d98ccee3d824"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
