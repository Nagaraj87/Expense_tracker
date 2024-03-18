// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey:"AIzaSyBcA49XPYCiwqtIQK_vj7mzoL8lewzvRnE",
    authDomain: "payment-status-portal.firebaseapp.com",
    databaseURL: "https://payment-status-portal-default-rtdb.firebaseio.com",
    projectId: "payment-status-portal",
    storageBucket: "payment-status-portal.appspot.com",
    messagingSenderId: "1099093036798",
    appId: "1:1099093036798:web:2543c0260687d2874cdfaf",
    measurementId: "G-211VD1E85D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app