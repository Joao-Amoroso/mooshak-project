import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
    apiKey: "AIzaSyBfOudwzfLrJvKsKL1sKh6RdjK0jiDEZHY",
    authDomain: "mooshak-clone.firebaseapp.com",
    projectId: "mooshak-clone",
    storageBucket: "mooshak-clone.appspot.com",
    messagingSenderId: "190444116652",
    appId: "1:190444116652:web:a8dc89f499d9dbc4e7dd09",
    measurementId: "G-6XTYMW82S3"
};

let app;
if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app(); // if already initialized, use that one
}

export const auth = app.auth();
export default app;
