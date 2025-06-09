// src/firebase/firebase-config.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBhrDg3ZKF-6faYh_TicOCA2y3TR2L1Fjw",
    authDomain: "taxi-compare.firebaseapp.com",
    projectId: "taxi-compare",
    storageBucket: "taxi-compare.appspot.com",
    messagingSenderId: "507766664585",
    appId: "1:507766664585:web:b179c92ba94fcf0f1f4558",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
