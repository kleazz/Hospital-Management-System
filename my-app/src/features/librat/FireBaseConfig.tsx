// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDd59-xP8FkqUxRmwyTMvDZ2VAQkSfIGuc",
  authDomain: "bibliotela.firebaseapp.com",
  projectId: "bibliotela",
  storageBucket: "bibliotela.appspot.com",
  messagingSenderId: "933159529491",
  appId: "1:933159529491:web:c302196accd425a6cf23e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)