// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkSLHqrT_bo4XxKwhInq33iSpf6z4Qt4E",
  authDomain: "ishantcommerceclasses.firebaseapp.com",
  projectId: "ishantcommerceclasses",
  storageBucket: "ishantcommerceclasses.appspot.com",
  messagingSenderId: "1050827289803",
  appId: "1:1050827289803:web:08a9ef2525189afb56974e",
  measurementId: "G-3PPEV15CX6"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// app.then(() => console.log("done")).catch(() => {console.log("not done")});

export {app};