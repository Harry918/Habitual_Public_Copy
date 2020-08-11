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
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client'
import TopMenuSpacer from './component/TopMenuSpacer'



// todo: get rid of margins around the page, reformat image size/shape, make post text wrap (when word is long)



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: 'black',
        background: '#DEE2E6',

    },

    paper1: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: 'white',
        backgroundImage: `url('https://wallpapercave.com/wp/wp2437909.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        height: 200, // change to200
        borderRadius: 0,
    },

    // paper2: {
    //     padding: theme.spacing(2),
    //     textAlign: 'center',
    //     color: 'white',
    //     background: 'green',
    //     height: 150,
    //     borderRadius: 0,
    //   },

    paper3: {
        padding: theme.spacing(2),
        textAlign: 'center',
        background: 'white',
        height: 400,
    },

    test: {
        padding: theme.spacing(2),
        color: 'black',
        background: '#DEE2E6',
        height: 150,
        borderRadius: 0,
    },

    test2: {
        textAlign: 'center',
        color: 'white',
    },
    test3: {
        float: 'left',
        borderRadius: '50%',
        width: 150

    },
    sharp: {
        borderRadius: '1!important'
    },

    about: {
        paddingLeft: 15,
        paddingTop: 15,
        paddingRight: 35,

    }


}));


const message = `No posts here yet, check back later`;

let socket
const Routine = (props) => {
    const dispatch = useDispatch()
    const classes = useStyles();
    const params = props.location.state
    console.log(props)
    // const params = {
    //     routine_ID: '123'
    // }

    const posts = useSelector(state => state.routineReducers.routinePosts)

    useEffect(() => {
        console.log(params.routine_ID)
        dispatch(routineActions.retRoutinePosts(params.routine_ID))
        var endpoint = "localhost:5000"
        socket = io(endpoint)
        let name = Math.random().toString(36).substring(3); //temp name for now
        console.log(params.routineID)
        socket.emit('join', { roomID: params.routine_ID, name: name });
        socket.on('first-connection', (response) => {
            console.log(response)

            dispatch(routineActions.checkRoutineCompletion('123', params.routine_ID))
        })
    }, [])

    const completedRoutine = () => {
        socket.emit('markCompletion', { uid: '123', routine_ID: params.routine_ID, name: 'Rishi', task: 'drinking water' })
    }

    useEffect(() => {
        socket.on('people_routine_completion', (response) => {
            console.log(response)
        })
    })

    return (
        <div style={{minWidth:1000}}>
            <TopMenu />
            <TopMenuSpacer/>

            <div className={classes.root}>
                <Grid container spacing={0}>
                    <Grid item xs={12} >
                        <Paper className={classes.paper1} >live feed / counter</Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.test}>
                            < img src="https://styles.redditmedia.com/t5_10288s/styles/communityIcon_u14gs7f4ugx21.png?width=256&s=5a814bcf6e9855f15f4a5ff9c4655de96565ff67" alt="hydro homies" className={classes.test3}></img>
                            <h1 className={classes.test2}> Routine Name</h1>
                            img + routine name + join
                            <button onClick={completedRoutine}>completed</button>
                        </Paper>
                    </Grid>
                    <Grid item xs={9} style={{ padding: 20 }}>
                        {/* <>
                            <NeuButton width="150px" height="100px" color="#212529" className={classes.sharp} />
                            <br /><br />
                            <NeuButton width="150px" height="100px" revert color="#212529" />
                        </> */}



                        <Grid container spacing={1} wrap="nowrap" direction="column">
                            {posts.map((item, i) => (
                                <Post description={item.content} title={item.title} />
                            ))}
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <Grid container wrap="nowrap" spacing={2}>
                                        <Grid item>
                                            <Avatar>W</Avatar>
                                        </Grid>
                                        <Grid item xs>
                                            <Typography>{message}</Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item xs={3} className={classes.about}>
                        <AboutRoutine />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}


export default Routine