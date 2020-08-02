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



const useStyles = makeStyles((theme) => ({
    user: {
        width: 500,
        alignItems: 'center'
    },
    pass: {
        width: 500,
        alignItems: 'center'

    },
    root: {
        flexGrow: 1,
      },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    pad: {
        padding: '25px'
    }
   
  }));


const Auth = () => {
    //login
    //u would need to use useState for user and pass
    const classes = useStyles();
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
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
    const logValues = (event) => {
        if (user && pass){
            console.log(user)
            console.log(pass)
        }
        
    }

    return(
        <div>
            <Grid container spacing={3}>    

                <h1 className={classes.pad}>Login</h1>
                <Grid item xs={12}>
                <Button onClick={(event) => {logValues(event)}} variant="contained">LOG IN WITH GOOGLE</Button>
                </Grid>
                <h3>OR</h3>
                <Grid item xs={12}>
                    <TextField required className={classes.user} placeholder="User" onChange={(event) => {changeValue(event, 'user')}}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField required className={classes.pass} placeholder="Password" onChange={(event) => {changeValue(event, 'pass')}}/>
                </Grid>
                <Grid item xs>
                <Button onClick={(event) => {logValues(event)}} variant="contained">LOG IN</Button>
                </Grid>
                
            </Grid>
        </div>
    )
}

export default Auth;