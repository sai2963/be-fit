// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "be-fit-49443.firebaseapp.com",
  projectId: "be-fit-49443",
  storageBucket: "be-fit-49443.appspot.com",
  messagingSenderId: "459089676826",
  appId: "1:459089676826:web:eca45dffa8f1c54240dfa3",
  measurementId: "G-QV15Y95P8S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth =getAuth(app);
export { db, storage ,auth};