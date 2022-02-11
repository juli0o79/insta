// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLf38pwZntuVjL1K40gtFBnyZJLURp4Pw",
  authDomain: "insta-project-5ee36.firebaseapp.com",
  projectId: "insta-project-5ee36",
  storageBucket: "insta-project-5ee36.appspot.com",
  messagingSenderId: "562593872998",
  appId: "1:562593872998:web:ea46acb7838d8fcf4f41a7",
  measurementId: "G-H7GH0SEF6Q"
};

// Initialize Firebase
//When utilizing SSR firebase some bugs may occur like create two instances of firebase
//This condition checks if there is some instance already creatated, and if so, it uses that one instead of creating another
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
//const analytics = getAnalytics(app);
const db= getFirestore();
const storage = getStorage();
export {app, db, storage}