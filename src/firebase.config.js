// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSs1XOXnUg1KjIGuBUsyFMFtu7h-7k7Jg",
  authDomain: "new-verification-b67a3.firebaseapp.com",
  projectId: "new-verification-b67a3",
  storageBucket: "new-verification-b67a3.appspot.com",
  messagingSenderId: "691633500442",
  appId: "1:691633500442:web:16751c60f843d50d60fca3",
  measurementId: "G-T3MFWC3HHV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);



// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAbfMMOQkI2qzk6MojiqHOzpjCGXiYoobw",
//   authDomain: "verification-e92dd.firebaseapp.com",
//   projectId: "verification-e92dd",
//   storageBucket: "verification-e92dd.appspot.com",
//   messagingSenderId: "500202729863",
//   appId: "1:500202729863:web:50f4828faf5ab9caace322",
//   measurementId: "G-11DM449XS1"
// };


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
