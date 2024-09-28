import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZivOZwrXY8LFn8tohObITw4X6Qmx4XQA",
  authDomain: "newecommerce-ef8e3.firebaseapp.com",
  projectId: "newecommerce-ef8e3",
  storageBucket: "newecommerce-ef8e3.appspot.com",
  messagingSenderId: "749572910070",
  appId: "1:749572910070:web:9e5947b8a212106eb3b5d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }