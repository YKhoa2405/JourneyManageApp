import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyChcssmcsviObuPZ2GHHMIpaNeOhQ59pVM",
    authDomain: "speedy-equator-420409.firebaseapp.com",
    databaseURL: "https://speedy-equator-420409-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "speedy-equator-420409",
    storageBucket: "speedy-equator-420409.appspot.com",
    messagingSenderId: "891379475355",
    appId: "1:891379475355:web:0a330bd1c1d48d86f4f73e",
    measurementId: "G-N97W1GGLDK"
};

const FirebaseApp = initializeApp(firebaseConfig);

// Lấy tham chiếu đến Firestore từ ứng dụng Firebase đã khởi tạo
const firestore = getFirestore(FirebaseApp)


export { firestore };