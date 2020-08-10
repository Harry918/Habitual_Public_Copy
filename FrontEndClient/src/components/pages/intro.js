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
import TopMenuSpacer from './component/TopMenuSpacer'
import SignIn from './SignIn'


const useStyles = makeStyles((theme) => ({
    root :{
    },
    buttons :{}
}));



const Intro = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TopMenu />
            <TopMenuSpacer />
            <NeuButton height="50px" width="50%" color="#FFFFFF" distance={8} radius={10} className={classes.buttons} > Sign In </NeuButton>
            <NeuButton height="50px" width="50%" color="#FFFFFF" distance={8} radius={10} className={classes.buttons}> Sign Up </NeuButton>
            < img src="https://bashooka.com/wp-content/uploads/2018/01/intro-page-designs-12.jpg" alt="intro" style={{width:'100%', height:'100%'}} ></img>
        </div>
    );
}


export default Intro