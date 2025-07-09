// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Import the functions you need from the SDKs you need

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYdpCp4kESZLKwvUHUfU1BYYkn-ejpWHM",
  authDomain: "hbh-web-3d223.firebaseapp.com",
  projectId: "hbh-web-3d223",
  storageBucket: "hbh-web-3d223.appspot.com",
  messagingSenderId: "276174756632",
  appId: "1:276174756632:web:51c9c08fa7a916a6bd9c6d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
