import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBGSaLhWlmVKk0aW0c2qdmwJECitT6zd5Y",
  authDomain: "post-more.firebaseapp.com",
  projectId: "post-more",
  storageBucket: "post-more.appspot.com",
  messagingSenderId: "281269770080",
  appId: "1:281269770080:web:e88dfea480c9b362797005"
};


const app = initializeApp(firebaseConfig);

const databae = getFirestore(app)

export {databae}