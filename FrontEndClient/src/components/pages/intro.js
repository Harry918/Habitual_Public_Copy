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


const useStyles = makeStyles((theme) => ({
    
}));



const Intro = () => {
    const classes = useStyles();

    return (
        <div>
            <TopMenu/>
            <TopMenuSpacer/>
            <div>

            </div>
        </div>
    );
}


export default Intro