// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4VlF4ivdWditNZRYZ0LHznvZ8a28qo4g",
  authDomain: "ecommerce-app-321.firebaseapp.com",
  projectId: "ecommerce-app-321",
  storageBucket: "ecommerce-app-321.appspot.com",
  messagingSenderId: "872336912081",
  appId: "1:872336912081:web:ebbbdf8818bdb7187edff0",
  measurementId: "G-VEMEMKWW68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export {analytics, auth, firestore, app}