import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBTDCFCJ-4bNdH4fkhE5gg0IherV-IJ1BY",
    authDomain: "cosmetics-api-storage-941af.firebaseapp.com",
    projectId: "cosmetics-api-storage-941af",
    storageBucket: "cosmetics-api-storage-941af.appspot.com",
    messagingSenderId: "1050849023501",
    appId: "1:1050849023501:web:f7a1da11047d7ef23aa744"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
