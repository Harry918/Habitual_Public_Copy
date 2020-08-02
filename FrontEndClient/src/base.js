import * as firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: "AIzaSyDTqna4l3M37qi6Mulj3pKCC0aWwwIWV8A",
    databaseURL: "https://habitapp-8578e.firebaseio.com/"
});

export default app;