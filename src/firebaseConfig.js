// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLloDnSyu2guZPlV1v1eAiD7lkrGp1xIk",
  authDomain: "follower-tracker-377aa.firebaseapp.com",
  projectId: "follower-tracker-377aa",
  storageBucket: "follower-tracker-377aa.appspot.com",
  messagingSenderId: "392596526107",
  appId: "1:392596526107:web:6f90e0c2d411dc310594be",
  measurementId: "G-73HGLFEYWF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };