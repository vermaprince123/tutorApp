// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhfeyjKE5g1f_tuy2_vH-BiHe3L-NQ0lo",
  authDomain: "test-d7c04.firebaseapp.com",
  projectId: "test-d7c04",
  storageBucket: "test-d7c04.appspot.com",
  messagingSenderId: "849365814185",
  appId: "1:849365814185:web:447445ecab93e0393712b8",
  measurementId: "G-RTL2SPQTF8",
  storageBucket: '',
//   storageBucket: 'gs://test-d7c04.appspot.com',

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// app.then(() => console.log("done")).catch(() => {console.log("not done")});

export {app};