import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
} from "@env";

const firebaseConfig = {
  apiKey: "AIzaSyA9UxRyJqj6PVqoD1bm4QV5IiSzhKRxfT0",
  authDomain: "meal-planner-ff63a.firebaseapp.com",
  projectId: "meal-planner-ff63a",
  storageBucket: "meal-planner-ff63a.appspot.com",
  messagingSenderId: "858487927874",
  appId: "1:858487927874:web:1296771a9896ee3c61e9db",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
