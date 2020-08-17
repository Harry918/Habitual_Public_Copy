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
import { useSelector, useDispatch } from 'react-redux';
import * as routineActions from '../../../actions/routineFunctions'
import PostDialog from '../createPost';
import * as retHabitActions from '../../../actions/retHabitInfo'
import moment from 'moment';






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
        width: '100%',
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

const AboutRoutine = ({routineID, description, numPeople, creationDate, peopleLive}) => {
    console.log(creationDate)
    const classes = useStyles();
    const dispatch = useDispatch()
    const [postDialog, setPostDialog] = useState(false)
    const [dialog, setDialog] = useState(false)
    const {uid} = useSelector(state => state.firebase.auth)

    // const userRoutines = useSelector(state => state.dashboardReducers.userRoutines)


    // const [inRoutine, setInRoutine] = useState(false);
    const [joinButtonState, setJoinButtonState] = useState([])

    const convertTime = (date) => {
        console.log(date)
        //let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        return(moment(date).format('MMMM Do YYYY'))
    }


    useEffect(() => {
        dispatch(retHabitActions.getUsersRoutines(uid, (userRoutines) => {
            if (userRoutines.map(a => a._id).includes(routineID)){
                setJoinButtonState([true, '#b4b8bf', 'Joined'])

                console.log("yessir")

            } else {
                setJoinButtonState([false, '#72b01d', 'Join'])
                console.log("no sir")

            }
            console.log("here", userRoutines.map(a => a._id))
        }))
    }, []) // only runs once when the page renders










    const openDialog = () => {
        setDialog(!dialog)
    }
    const openPostDialog = () => {
        setPostDialog(!postDialog)
    }
    let testClick = false;

    const joinGroup = () => {
        dispatch(routineActions.joinRoutine(uid, routineID))
    }

    const leaveGroup = () => {
        dispatch(routineActions.leaveRoutine(uid, routineID));
    }

    const revertButton = () => {
        if (joinButtonState[0]==false) {
            setJoinButtonState([true, '#b4b8bf', 'Joined']);
        } else {
            setJoinButtonState([false, '#72b01d', 'Join']);
        }
    }



    return (
        <div >
            
            <div style={{ padding: 15 }}>
                <RoutineDialog dialog={dialog} openDialog={openDialog} type='Post' />
                <PostDialog dialog={postDialog} openDialog={openPostDialog} type='Post' />

                <NeuDiv revert radius={10} color="#FFFFFF" style={{ padding: 15 }} >

                    <Grid item xs={12}>
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item xs>
                                <Typography style={{ color: "black", fontFamily: 'Lato' }}>
                                    <h2 style={{margin: '15px'}}>About Routine</h2>
                                    <p style={{margin: '25px 15px 25px 15px'}}>{description}</p>
                                    <Grid container wrap="nowrap" className = {classes.counts} spacing={2}>
                                        <Grid item xs={6}>  
                                            <p >{numPeople} Members</p>
                                        </Grid>
                                        <Grid item xs={6}>  
                                            <p >{peopleLive} Active</p>
                                        </Grid>
                                    </Grid>
                                    <p className={classes.created}>{convertTime(creationDate)}</p>
                                </Typography>
                                <NeuButton
                                        height="50px"
                                        onClick={openPostDialog}
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
                                        onClick={(event) => {
                                            if(joinButtonState[0] == false){
                                                joinGroup(event);
                                                revertButton();
                                            }
                                            else {
                                                leaveGroup(event);
                                                revertButton();
                                            }
                                        }}
                                        color='#ffffff'
                                        distance={8}
                                        radius = {10}
                                        className={classes.button}
                                        id="joinButton"
                                        
                                        // onMouseOver ={(event) => {
                                        //     if (inRoutine){
                                        //         document.getElementById("joinButton").innerText='Leave';
                                        //         document.getElementById("joinButton").style.color='#f26a66';
                                                
                                                
                                        //         // setJoinButtonState([joinButtonState[0], '#ff0000', 'Leave']);

                                        //     }

                                        // }}
                                        // onMouseOut ={() => {
                                        //     if (inRoutine){
                                        //         document.getElementById("joinButton").innerText="Joined";
                                        //         document.getElementById("joinButton").style.color='#b4b8bf';

                                                
                                        //     }

                                        // }}
                                        
                                        
                                >
                                    <div id="joinedText" style={{color:joinButtonState[1]}}>{joinButtonState[2]}</div>
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