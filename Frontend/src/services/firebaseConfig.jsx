// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB0axqS-mxku00R6-2KWFU_SBOParZm-m8",
    authDomain: "ai-traveller-693b9.firebaseapp.com",
    projectId: "ai-traveller-693b9",
    storageBucket: "ai-traveller-693b9.firebasestorage.app",
    messagingSenderId: "713871873437",
    appId: "1:713871873437:web:36c1cea78540e9040dcb74",
    measurementId: "G-35XSWQWX8J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);