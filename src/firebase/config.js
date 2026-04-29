
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { exp } from "firebase/firestore/pipelines";

const firebaseConfig = {
    apiKey: "AIzaSyAp-mhYSlGGgBdwtKRV0AmUALR09_oFgqk",
    authDomain: "miniblog-bc3da.firebaseapp.com",
    projectId: "miniblog-bc3da",
    storageBucket: "miniblog-bc3da.firebasestorage.app",
    messagingSenderId: "384650617870",
    appId: "1:384650617870:web:2ee2335478fa9cc833c85f"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };