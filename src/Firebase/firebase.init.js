import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.enve.VITE_apiKey,
  authDomain: import.meta.enve.VITE_authDomain,
  projectId: import.meta.enve.VITE_projectId,
  storageBucket: import.meta.enve.VITE_storageBucket,
  messagingSenderId: import.meta.enve.VITE_messagingSenderId,
  appId: import.meta.enve.VITE_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);