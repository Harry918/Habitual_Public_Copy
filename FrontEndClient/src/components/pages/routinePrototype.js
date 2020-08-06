import React from 'react';
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
    }


}));


const message = `Truncation should be conditionally applicable on this long line of text
as this is a much longer line than what the container can support. Truncation should be conditionally applicable on this long line of text
as this is a much longer line than what the container can support. Truncation should be conditionally applicable on this long line of text
as this is a much longer line than what the container can support. Truncation should be conditionally applicable on this long line of text
as this is a much longer line than what the container can support. `;


const RoutinePrototype = () => {
    const classes = useStyles();
    return (
        <div>
            <TopMenu />
            <div className={classes.root}>
                <Grid container spacing={0}>
                    <Grid item xs={12} >
                        <Paper className={classes.paper1} >live feed / counter</Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={0}>
                            <Grid item xs={12}>
                                <Paper className={classes.test}>
                                    < img src="https://styles.redditmedia.com/t5_10288s/styles/communityIcon_u14gs7f4ugx21.png?width=256&s=5a814bcf6e9855f15f4a5ff9c4655de96565ff67" alt="hydro homies" className={classes.test3}></img>
                                    <h1 className={classes.test2}> Routine Name</h1>
                                    img + routine name + join
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={9} style={{ padding: 20 }}>
                        {/* <>
                            <NeuButton width="150px" height="100px" color="#212529" className={classes.sharp} />
                            <br /><br />
                            <NeuButton width="150px" height="100px" revert color="#212529" />
                        </> */}



                        <Grid container spacing={1} wrap="nowrap" direction="column">
                            <Post />
                            <Post />
                            <Post />
                            <Post />
                            <Post />
                            <Post />
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
                    <Grid item xs={3} style={{ padding: 20 }}>
                        <AboutRoutine/>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}


export default RoutinePrototype