import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBwbzoElMILTrS9Nii9Iz6XPJbtrgv-2uM",
    authDomain: "movie-e-commerce-project.firebaseapp.com",
    projectId: "movie-e-commerce-project",
    storageBucket: "movie-e-commerce-project.appspot.com",
    messagingSenderId: "1076390940993",
    appId: "1:1076390940993:web:fd1f9260b05e77aecb51c0",
    measurementId: "G-MHHG9SCZGX"
};

// ^ Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {db, auth, provider};