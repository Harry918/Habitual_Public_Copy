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



const aboutMessage = `About routine bros About routine bros About routine bros About routine bros About routine bros About routine bros About routine bros About routine bros About routine bros About routine bros About routine bros About routine bros About routine bros `;

const useStyles = makeStyles((theme) => ({
    test: {
        color:'red',
        float: 'right'
    },
    test2: {
        color: 'blue',
        float: 'left',
    },
    button: {
        marginTop: 150,
        marginBottom: 150,
        width: '100%'
    },
    counts: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 15,
    },
    created: {
        marginBottom: 15, 
        textAlign:'center',
    }

}));

const AboutRoutine = () => {
    const classes = useStyles();
    const [dialog, setDialog] = useState(false)
    const openDialog = () => {
        setDialog(!dialog)
    }
    let testClick = false;
    return (
        <div>
            <div style={{ padding: 15 }}>
                <RoutineDialog dialog={dialog} openDialog={openDialog} type='Post' />
                <NeuDiv revert radius={10} color="#FFFFFF" style={{ padding: 15 }} >

                    <Grid item xs={12}>
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item xs>
                                <Typography style={{ color: "black", fontFamily: 'Lato' }}>
                                    <h2 style={{margin: '15px'}}>About Community</h2>
                                    <p style={{margin: '25px 15px 25px 15px'}}>{aboutMessage}</p>
                                    <Grid container wrap="nowrap" className = {classes.counts} spacing={2}>
                                        <Grid item xs={6}>  
                                            <p >23.2k Members</p>
                                        </Grid>
                                        <Grid item xs={6}>  
                                            <p >462 Active</p>
                                        </Grid>
                                    </Grid>
                                    <p className={classes.created}>Created Aug 6, 2020</p>
                                </Typography>
                                <NeuButton
                                        height="50px"
                                        onClick={openDialog}
                                        color="#FFFFFF"
                                        distance={8}
                                        radius = {10}
                                        className={classes.button}
                                >
                                        Create post
                                </NeuButton>
                                <div></div>
                                <br />
                                <NeuButton
                                        height="50px"
                                        onClick={openDialog}
                                        color="#FFFFFF"
                                        distance={8}
                                        radius = {10}
                                        className={classes.button}
                                        
                                >
                                    Join
                                </NeuButton>
                            </Grid>         
                        </Grid>
                    </Grid>
                </NeuDiv>
            </div>
        </div>
    )
}

export default AboutRoutine