// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA4uBz5RrwbRTlxnOtWSci9Yj7om9v3Wjg",
    authDomain: "project-01-ae9bf.firebaseapp.com",
    projectId: "project-01-ae9bf",
    storageBucket: "project-01-ae9bf.firebasestorage.app",
    messagingSenderId: "300268114004",
    appId: "1:300268114004:web:5d55272c47abfd7ad51dc1",
    measurementId: "G-HSXEWF7CP1"
  };

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db=getFirestore(app);
 // const analytics = getAnalytics(app);