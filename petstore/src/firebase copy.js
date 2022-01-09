import {initializeApp} from 'firebase';

const firebaseConfig = {
    apiKey: "AIz...",
    authDomain: "petsho....firebaseapp.com",
    databaseURL: "https://petsho...b.firebaseio.com",
    projectId: "petsho...",
    storageBucket: "petsho...ot.com",
    messagingSenderId: "2...3",
    appId: "1...4",
    measurementId: "G...C"
  };

  const app = initializeApp(firebaseConfig);

  export const db = app.database();

  export const productsRef = db.ref('products');