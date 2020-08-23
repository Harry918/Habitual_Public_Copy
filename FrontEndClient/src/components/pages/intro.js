import React, { useState, useEffect } from 'react';
import TopMenu from './component/TopMenu'
import { fade, makeStyles } from '@material-ui/core/styles';
import './test.css'
import { Grid, Paper } from "@material-ui/core"
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { NeuDiv } from "neumorphism-react";
import { NeuButton } from "neumorphism-react";
import Post from './component/post'
import AboutRoutine from './component/aboutRoutine'
import * as routineActions from '../../actions/routineFunctions'


const useStyles = makeStyles((theme) => ({
    miniHeader: {

    },

    header: {
        fontFamily: 'Montserrat',
        fontSize: '36px',
    },
    subHeader: {
        fontFamily: 'Montserrat',
        fontSize: '18px',
        marginBottom: 100
    },

    loginButton: {
        padding: '20px',
        borderRadius: '99px',
        backgroundColor: 'gray',
        fontWeight: 800,
        textDecoration: 'none',
        color: 'white',
        marginTop: 500
        
    }

}));



const Intro = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TopMenu />
            <Typography className={classes.header}>Get motivated with habitual </Typography>
            <Typography className={classes.subHeader}>Create Routines that drive personal growth for you and your community. All in a matter of seconds.</Typography>
            <a className={classes.loginButton} href ='./login'> LOGIN NOW</a>
        </div>
    );
}


export default Intro