import firebase from "firebase";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDofvzUe8zu8Yt_wFqgS0oW0jn6M2lczGw",
  authDomain: "food-order-4383a.firebaseapp.com",
  projectId: "food-order-4383a",
  storageBucket: "food-order-4383a.appspot.com",
  messagingSenderId: "108237570604",
  appId: "1:108237570604:web:65235a421e587aac170789",
  measurementId: "G-H6YS1ZXLE2"
};

let app;

if(firebase.apps.length === 0){
   app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
const storage = firebase.storage();


export { db, auth ,storage};
