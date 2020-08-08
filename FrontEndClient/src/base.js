import * as firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: "AIzaSyDTqna4l3M37qi6Mulj3pKCC0aWwwIWV8A",
    authDomain: "habitapp-8578e.firebaseapp.com",
    databaseURL: "https://habitapp-8578e.firebaseio.com",
    projectId: "habitapp-8578e",
    storageBucket: "habitapp-8578e.appspot.com",
    messagingSenderId: "798761342559",
    appId: "1:798761342559:web:65d96c538ad335940bedea",
    measurementId: "G-0SVDBEVGY6"
});

export default app;