import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import app from "../../base.js";
import firebase from 'firebase';
import { useSelector, useDispatch } from 'react-redux';
import * as authFunctions from '../../actions/authFunctions'
import { useHistory } from "react-router-dom";
import Particles from 'react-particles-js';
import { NeuButton } from "neumorphism-react";


const useStyles = makeStyles((theme) => ({
    root: {

    },
    pad: {
        textAlign: 'center',
        color: 'RGB(92, 88, 88)',
        margin: 10,
        fontFamily: 'Lato',
        zIndex: 101,
    },
    back: {
        minHeight: '100vh',
        justifyContent: 'center',
        position: "fixed ",
        zIndex: 100,
        top: '25%',
        width: '100%',
        zIndex: 101,


    },
    test: {
        width: '50%',
        marginTop: 5,
        maxWidth: '500px',
        margin: 15,
        padding: 7,
        fontFamily: "Lato"
    },
    particle: {
        height: '100%',
        zIndex: 10,

    },
    title: {
        flex: 1,
        display: 'flex',
        alignSelf: 'center',
        justifyContent: 'center',
        fontFamily: 'Lato',
        top: '5%',
        position: "absolute ",
        width: '100%',
        zIndex: 101,
    },
    glass: {
        backgroundColor: 'white',
        opacity: '0.5',
        zIndex: -10,
    },
    green: {
        color: '#72B01D'
    },
    suggestion: {
        marginTop: 25
    }


}));

//redux
//actions and reducers and dispatch
//actions: 
//they r just functions that u call
//redcuers


const SignUp = () => {
    console.log("here")
    let history = useHistory();
    const dispatch = useDispatch()
    const classes = useStyles();
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')

    useEffect(() => {
    }, [])
    //login
    //u would need to use useState for user and pass
    const changeValue = (event, type) => {
        if (type === 'user') {
            setUser(event.target.value)
        }
        else {
            setPass(event.target.value)
        }
    }
    const logValues = () => {
        console.log("here")
        try {
            const response = app.auth().createUserWithEmailAndPassword(user, pass);//doSignInWithGoogle()
            console.log(response)
        }
        catch (err) {
            console.log(err)
        }
    }

    const googleLogin = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            console.log(result.user.email)
            console.log(result.user.displayName)
            console.log(result.user.uid)
            dispatch(authFunctions.googleUser(result.user.uid, result.user.displayName, result.user.email))
            var token = result.credential.accessToken;
            history.push('/')
            // The signed-in user info.
            var user = result.user;
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }


    return (
        <div className={classes.root}>
            <div className={classes.particle}>
                <div className={classes.glass}>
                    <Particles

                        params={{
                            "particles": {
                                "number": {
                                    "value": 50

                                },
                                "size": {
                                    "value": 3
                                },
                                "color": {
                                    "value": "#a1a1a1"
                                }, // color of the dot
                                "line_linked": {
                                    "enable": true,
                                    "distance": 300,
                                    "color": "#a1a1a1", //color of the lines
                                    "opacity": 0.4,
                                    "width": 1
                                },
                            },

                            "interactivity": {
                                "events": {
                                    "onhover": {
                                        "enable": true,
                                        "mode": "grab"
                                    }
                                }
                            }
                        }} />
                </div>
            </div>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Typography variant="h6" className={classes.title}>
                        HABITUAL
                </Typography>
                </Grid>


                <div className={classes.back} style={{ textAlign: 'center' }}>
                    <Grid container spacing={0}>

                        <Grid item xs={12}>

                            <input type="text" className={classes.test} placeholder="Username" />
                        </Grid>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={12}>

                            <input type="text" className={classes.test} placeholder="Email" />
                        </Grid>
                        <Grid item xs={12}>

                            <input type="password" className={classes.test} placeholder="Password" />
                        </Grid>
                        <Grid item xs={12}>

                            <NeuButton className={classes.test} onClick={logValues} color="#ffffff" distance={8} radius={10} ><span className={classes.green}>SIGN UP</span></NeuButton>
                        </Grid>
                        <Grid item xs={12}>

                            <p className={classes.suggestion}>or skip creating a new account and <span><u>sign in</u></span> with Google</p>
                        </Grid>
                    </Grid>

                </div>
            </Grid>
        </div>
    )
}

export default SignUp;