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
import { isBrowser, deviceDetect, isMobile } from 'react-device-detect';
import Particles from 'react-particles-js';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import List from '@material-ui/core/List'
import { Slide } from 'react-reveal';
import LiveFeedBox from './component/liveFeedBox'
import Comment from './component/Comment'






// todo: get rid of margins around the page, reformat image size/shape, make post text wrap (when word is long)



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    noPostsPaper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: 'black',
        background: '#DEE2E6',

    },


    paper3: {
        padding: theme.spacing(2),
        textAlign: 'center',
        background: 'white',
        height: 400,
    },



    sharp: {
        borderRadius: '1!important'
    },

    about: {
        paddingLeft: 15,
        paddingTop: 15,
        paddingRight: 35,

    },

    pictureBar: {
        padding: theme.spacing(2),
        background: '#ffffff',
        height: 100,
        borderRadius: 0,


    },

    pictureBar__left: {

    },

    leftImageDiv: {
        width: '100px',
        height: '100px',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '50%',
    },

    leftImage: {
        display: 'inline',
    margin: '0 auto',
    height: '100%',
    width: 'auto',
    },

    pictureBar__center: {
        textAlign: 'center',
        margin: 'auto',
    },

    centerTitle: {
        color: 'black',
        fontFamily: 'Lato',

    },

    pictureBar__right: {
        textAlign: 'right',
        margin: 'auto',

    },

    completedButton: {
        padding: 15,
    },
    particle: {
        height: 400,
    },


    live: {
        position: 'absolute',
        textAlign: 'center',
        marginTop: 150,
        color: '#575353',
    }

}));




let socket
const Routine = (props) => {
    const serverAddress = 'http://ec2-52-53-149-51.us-west-1.compute.amazonaws.com:9000'
    const dispatch = useDispatch()
    const classes = useStyles();
    const params = props.location.state
    console.log(params)
    const user = useSelector(state => state.firebase.auth)
    // console.log(temp.displayName)
    // console.log(temp.uid)
    // const params = {
    //     routine_ID: '123'
    // }

    const posts = useSelector(state => state.routineReducers.routinePosts)
    const numCompletions = useSelector(state => state.routineReducers.numCompletions)
    const active = useSelector(state => state.routineReducers.active)


    useEffect(() => {
        console.log(params.routine)
        dispatch(routineActions.retRoutinePosts(params.routine._id))
        console.log(posts)
        var endpoint = serverAddress
        socket = io(endpoint)
        let name = Math.random().toString(36).substring(3); //temp name for now
        socket.emit('join', { roomID: params.routine._id, name: user.displayName });
        socket.on('first-connection', (response) => {
            // setPeopleLive(response.numPeople.length)
            console.log(response)
            let messages = response.messages.map(({message}) => message)
            console.log(messages)
            dispatch({type:'SET_LIVE_MESSAGES', payload: {messages: messages, numCompletions: response.completions, active: response.numPeople.length}})
            // dispatch(routineActions.checkRoutineCompletion('123', params.routine_ID))
        })
    }, [])

    const completedRoutine = () => {
        socket.emit('markCompletion', { uid: user.uid, routine_ID: params.routine._id, name: user.displayName, task: `${user.displayName} is drinking water` })
    }

    useEffect(() => {
        socket.on('people_routine_completion', (response) => {
            console.log(response)
            let messages = response.messages.map(({message}) => message)
            console.log(messages)
            dispatch({type:'SET_LIVE_UPDATE', payload: {messages: messages, numCompletions: response.completions}})
            // dispatch({ type: 'LIVE_FEED_UPDATE', payload: response.message })
            // setLive_feed([...live_feed, response.message])
        })
        
    })

    useEffect(() => {
        socket.on('active_people', (response) => {
            dispatch({type: 'SET_ACTIVE_PEOPLE', payload: response.numPeople})
            console.log(response)
        })
    })

    const showNone = () => {
        if (!posts.length) {
            return (
                <Grid item xs={12}>
                    <Paper className={classes.noPostsPaper}>
                        <Typography>No posts here yet, check back later</Typography>
                    </Paper>
                </Grid>
            );
        }
    }
    window.onbeforeunload = function() {
        socket.emit('forceDisconnect', { routine_ID: params.routine._id})
    }
    return (
        <div style={{ minWidth: 500 }}>
            <TopMenu />

            <div className={classes.root}>
                <Grid container spacing={0}>


                    <Grid item xs={12} >
                        <Grid container spacing={0} className={classes.live}>



                            {/* {live_feed.map((item, i) => (
                                <List key={i} style={{ justifyContent: 'center' }}>
                                    <Typography style={{ fontSize: 5 }} variant="h4" color="textSecondary" component="p">
                                        {item}
                                    </Typography>
                                </List>
                            ))} */}
                            <Grid item xs={6}>
                                <LiveFeedBox />
                            </Grid>



                            <Grid item xs={6}>
                                <h1 className={classes.liveCount}>{numCompletions}<br />COMPLETED TODAY</h1>
                            </Grid>
                        </Grid>


                        <Particles
                            className={classes.particle}
                            params={{
                                "particles": {
                                    "number": {
                                        "value": 50

                                    },
                                    "size": {
                                        "value": 3
                                    },
                                    "color": {
                                        "value": "#a1a1a1"
                                    }, // color of the dot
                                    "line_linked": {
                                        "enable": true,
                                        "distance": 300,
                                        "color": "#a1a1a1", //color of the lines
                                        "opacity": 0.4,
                                        "width": 1
                                    },
                                },

                                "interactivity": {
                                    "events": {
                                        "onhover": {
                                            "enable": true,
                                            "mode": "grab"
                                        }
                                    }
                                }
                            }} />


                    </Grid>
                    <Grid item xs={12}>

                        <Paper className={classes.pictureBar}>
                            <Grid container spacing={0}>
                                <Grid item xs={4} className={classes.pictureBar__left}>
                                    <div className={classes.leftImageDiv}>
                                    < img className={classes.leftImage} src="https://styles.redditmedia.com/t5_10288s/styles/communityIcon_u14gs7f4ugx21.png?width=256&s=5a814bcf6e9855f15f4a5ff9c4655de96565ff67" alt="hydro homies" ></img>
                                    </div>
                                </Grid>
                                <Grid item xs={4} className={classes.pictureBar__center}>
                                    <Typography variant="h6" className={classes.centerTitle}>
                                        {params.routine.title.toUpperCase()}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} className={classes.pictureBar__right} >
                                    <NeuButton className={classes.completedButton} height="50px" width="150px" color="#ffffff" distance={8} radius={10} onClick={completedRoutine}>
                                        <Typography style={{ fontFamily: 'Lato', color: 'rgb(114, 176, 29)' }}>
                                            COMPLETED
                                    </Typography></NeuButton>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid item xs={9} style={{ padding: 20 }}>



                        <Grid container spacing={1} wrap="nowrap" direction="column">
                            {posts.map((item, i) => (
                                <Post description={item.content} title={item.title} postID={item._id} />
                            ))}

                            {showNone()}



                        </Grid>
                    </Grid>
                    <Grid item xs={3} className={classes.about}>
                        <AboutRoutine routineID={params.routine._id} description={params.routine.description} numPeople={params.routine.numPeople} creationDate={params.routine.creationDate} />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}


export default Routine