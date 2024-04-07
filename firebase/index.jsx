// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCI03kFAEkmyioH93lPlnT98oxfmHsMGPY",
  authDomain: "journeymanage-18e21.firebaseapp.com",
  projectId: "journeymanage-18e21",
  storageBucket: "journeymanage-18e21.appspot.com",
  messagingSenderId: "543194012820",
  appId: "1:543194012820:web:9e0aedd0f0672e3d252881",
  measurementId: "G-VWJWR2E8E3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {app, analytics}