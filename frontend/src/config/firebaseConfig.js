// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByRFVnKZUzB14MZlcwuaFfOUdwpkAfrxI",
  authDomain: "usermanagment-7f214.firebaseapp.com",
  projectId: "usermanagment-7f214",
  storageBucket: "usermanagment-7f214.appspot.com",
  messagingSenderId: "511924706509",
  appId: "1:511924706509:web:35defccd52eec43c891d84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
export default storage