// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDQlKa0FWeFcVtf4LRSQHPDHvteRiE3lsg",
	authDomain: "serbisyo-706f1.firebaseapp.com",
	projectId: "serbisyo-706f1",
	storageBucket: "serbisyo-706f1.appspot.com",
	messagingSenderId: "124058064007",
	appId: "1:124058064007:web:f67935c2e3c9af3b96d422",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
