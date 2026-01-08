
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAgaR8tGHYOFENr3wZTrPgwar8zSQ3zx3U",
    authDomain: "habitat-7069d.firebaseapp.com",
    projectId: "habitat-7069d",
    storageBucket: "habitat-7069d.firebasestorage.app",
    messagingSenderId: "713675527660",
    appId: "1:713675527660:web:d3d180e63aadd15ba95cc9",
    measurementId: "G-F3P0673Z4K"
};

// Initialize Firebase (only on client side to avoid build errors)
const app = typeof window !== 'undefined' ? initializeApp(firebaseConfig) : null;
const analytics = app && typeof window !== 'undefined' ? getAnalytics(app) : null;

export { app, analytics };
