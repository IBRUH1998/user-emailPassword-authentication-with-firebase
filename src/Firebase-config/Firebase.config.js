// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD42zoU7-ZaIKUzR7b4ts-btH3_oiFcrik",
  authDomain: "user-email-password-auth-8611d.firebaseapp.com",
  projectId: "user-email-password-auth-8611d",
  storageBucket: "user-email-password-auth-8611d.appspot.com",
  messagingSenderId: "650350263269",
  appId: "1:650350263269:web:fb191a03915b143e75cd0c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth ;