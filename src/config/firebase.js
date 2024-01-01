import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-MA6VdYdTYDJz8F8qYo72E1wmdgh-bPY",
  authDomain: "real-time-chat-app-47586.firebaseapp.com",
  projectId: "real-time-chat-app-47586",
  storageBucket: "real-time-chat-app-47586.appspot.com",
  messagingSenderId: "366330650494",
  appId: "1:366330650494:web:9f6f6cf165a49367afdd2f",
  measurementId: "G-3CSFD2GJ4Q",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
