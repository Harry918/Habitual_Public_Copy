import React, { useState } from 'react';
import Dashboard from './dashboard';
import Intro from './intro';
import firebase from 'firebase';

function Home() {
    const [logged, setLogged] = useState(false);
    firebase.auth().onAuthStateChanged(function(user) {
        if(user){
            setLogged(true);
        }
    }) 

    return (
        <div>
            {logged ? <Dashboard /> : <Intro />}
        </div>
    )
}

export default Home
