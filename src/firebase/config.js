
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC7RwnJoQGzJpUWZamrc6xaxsC2zlB4p-g",
  authDomain: "blog-7ade7.firebaseapp.com",
  projectId: "blog-7ade7",
  storageBucket: "blog-7ade7.appspot.com",
  messagingSenderId: "396285417609",
  appId: "1:396285417609:web:b150d79b66b2caaf91ce58"
};


const app = initializeApp(firebaseConfig);

const database = getFirestore(app)

export {database}