import firebase from "firebase";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDHe6X_zLXOQEvYPFXB9SlNr2R7rZz0VRc",
  authDomain: "react-native-firebase-dcc0f.firebaseapp.com",
  projectId: "react-native-firebase-dcc0f",
  storageBucket: "react-native-firebase-dcc0f.appspot.com",
  messagingSenderId: "1054845141070",
  appId: "1:1054845141070:web:35e43d2c4fdcc0bff4c31f",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default {
  firebase,
  db,
};
