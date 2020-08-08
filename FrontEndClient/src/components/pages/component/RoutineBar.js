import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import { NeuDiv } from "neumorphism-react";
import { Grid, Paper } from "@material-ui/core"
import { NeuButton } from "neumorphism-react";
import RoutineDialog from '../insertRoutine'




const useStyles = makeStyles((theme) => ({


}));

const RoutineBar = () => {
    const classes = useStyles();
    return (
        <div>
            <Paper className={classes.test}>
                < img src="https://styles.redditmedia.com/t5_10288s/styles/communityIcon_u14gs7f4ugx21.png?width=256&s=5a814bcf6e9855f15f4a5ff9c4655de96565ff67" alt="hydro homies" className={classes.test3}></img>
                <h1 className={classes.test2}> Routine Name</h1>
                            img + routine name + join
                            <button onClick={completedRoutine}>completed</button>
            </Paper>
        </div>
    )
}

export default RoutineBar