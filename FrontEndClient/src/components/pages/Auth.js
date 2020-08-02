import React, {useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid';
import app from "../../base.js";
import { auth } from 'firebase';



const useStyles = makeStyles((theme) => ({
    user: {
        width: '100%',
        alignItems: 'center',
        padding: 5

    },
    pass: {
        width: '100%',
        alignItems: 'center',
        padding: 5

    },
    pad: {
        textAlign: 'center',
        color: 'RGB(92, 88, 88)'
    },
    back: {
        minHeight: '100vh',
        justifyContent: 'center'

    },
    test: {
        width: '50%',
        marginTop: 5,
    }
       
  }));

//redux
//actions and reducers and dispatch
//actions: 
//they r just functions that u call
//redcuers


const Auth = () => {
    const classes = useStyles();
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')

    useEffect(() => {
        console.log("here")
    }, [])
    //login
    //u would need to use useState for user and pass
    const changeValue = (event, type) => {
        if(type === 'user')
        {
            setUser(event.target.value)
        }
        else
        {
            setPass(event.target.value)
        }
    }
    const logValues = () => 
    {
        console.log("here")
        try
        {
           const response = app.auth().createUserWithEmailAndPassword(user, pass);//doSignInWithGoogle()
           console.log(response)
        }
        catch(err)
        {
            console.log(err)
        }
    }

    const googleLogin = () => 
    {
        let provider = new auth.GoogleAuthProvider()
        app.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
          }).catch(function(error) {
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
        

    return(
        <div>
            <div className={classes.back}>
                <h1 className={classes.pad}>Login</h1>
                <Button className={classes.test} onClick={(event) => {logValues(event)}} variant="contained">SIGN UP</Button>

                <Button className={classes.test} onClick={googleLogin} variant="contained">LOG IN WITH GOOGLE</Button>
                <h3 className={classes.pad}>OR</h3>
                    <TextField required className={classes.user} placeholder="User" onChange={(event) => {changeValue(event, 'user')}}/>
                    <TextField required className={classes.pass} placeholder="Password" onChange={(event) => {changeValue(event, 'pass')}}/>
                <Button className={classes.test} onClick={logValues} variant="contained">LOG IN</Button>
                    
            </div>
        </div>
    )
}

export default Auth;