import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAq8IwoFAWEjj4C-A8d4jzJGGvrJiiLUpU",
  authDomain: "petconnect-adoption-platform.firebaseapp.com",
  projectId: "petconnect-adoption-platform",
  storageBucket: "petconnect-adoption-platform.firebasestorage.app",
  messagingSenderId: "558003549606",
  appId: "1:558003549606:web:4870fba301f40021d50b67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);