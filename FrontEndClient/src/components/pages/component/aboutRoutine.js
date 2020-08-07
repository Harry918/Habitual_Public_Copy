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
    }

}));

const AboutRoutine = () => {
    const classes = useStyles();
    const [dialog, setDialog] = useState(false)
    const openDialog = () => {
        setDialog(!dialog)
    }
    return (
        <div>
            <div style={{ padding: 15 }}>
                <RoutineDialog dialog={dialog} openDialog={openDialog} type='Post' />
                <NeuDiv revert radius={10} color="#FFFFFF" style={{ padding: 15 }} >

                    <Grid item xs={12}>
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item xs>
                                <Typography style={{ color: "black", fontFamily: 'Lato' }}>
                                    <h2>About Community</h2>
                                    <p>{aboutMessage}</p>
                                    <p style={{textAlign:'center'}}>num mems</p>
                                    <p style={{textAlign:'center'}}>Created Aug 6, 2020</p>
                                </Typography>
                                <NeuButton
                                        width="150px"
                                        height="50px"
                                        onClick={openDialog}
                                        color="#FFFFFF"
                                        distance={8}
                                        radius = {10}
                                        style={{width:'100%'}}
                                >
                                        Create post
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