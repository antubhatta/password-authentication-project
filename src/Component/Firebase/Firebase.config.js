// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkxuHGTDQQCFUiL8p7ZtwceryIkYaGb_o",
  authDomain: "password-auth-project.firebaseapp.com",
  projectId: "password-auth-project",
  storageBucket: "password-auth-project.appspot.com",
  messagingSenderId: "138563341078",
  appId: "1:138563341078:web:7500880e8c761fbc881e37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export default auth;