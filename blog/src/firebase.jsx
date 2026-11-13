import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCz-kTE8szIyP8nl92Zd1Nn05iGIwLC1Hg",
  authDomain: "blog-react-project-878b5.firebaseapp.com",
  projectId: "blog-react-project-878b5",
  storageBucket: "blog-react-project-878b5.firebasestorage.app",
  messagingSenderId: "157423433681",
  appId: "1:157423433681:web:29001ded264cf4cdf0d2f0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const db = getFirestore(app)

export {
  app,
  auth,
  db
}

