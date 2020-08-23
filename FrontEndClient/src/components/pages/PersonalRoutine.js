import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import TopMenu from './component/TopMenu'
import Dialog from './component/dialog'
import { useSelector, useDispatch } from 'react-redux';
import * as test from '../../actions/retHabitInfo'
import Button from '@material-ui/core/Button';
import RoutineDialog from './insertRoutine'
import { NeuButton } from "neumorphism-react";
import { Grid, Paper } from "@material-ui/core"
import Particles from 'react-particles-js';
import NivoChart from './component/NivoChart'

let data = [
    {
        "country": "AD",
        "hot dog": 100,
        "hot dogColor": "hsl(33, 70%, 50%)",
        // "burger": 70,
        // "burgerColor": "hsl(169, 70%, 50%)",
        // "sandwich": 39,
        // "sandwichColor": "hsl(175, 70%, 50%)",
        // "kebab": 171,
        // "kebabColor": "hsl(189, 70%, 50%)",
        // "fries": 96,
        // "friesColor": "hsl(309, 70%, 50%)",
        // "donut": 57,
        // "donutColor": "hsl(102, 70%, 50%)"
    },
    {
        "country": "AE",
        "hot dog": 67,
        "hot dogColor": "hsl(82, 70%, 50%)",
        // "burger": 24,
        // "burgerColor": "hsl(219, 70%, 50%)",
        // "sandwich": 125,
        // "sandwichColor": "hsl(281, 70%, 50%)",
        // "kebab": 131,
        // "kebabColor": "hsl(23, 70%, 50%)",
        // "fries": 165,
        // "friesColor": "hsl(309, 70%, 50%)",
        // "donut": 135,
        // "donutColor": "hsl(243, 70%, 50%)"
    },
    {
        "country": "AF",
        "hot dog": 84,
        "hot dogColor": "hsl(355, 70%, 50%)",
        // "burger": 32,
        // "burgerColor": "hsl(214, 70%, 50%)",
        // "sandwich": 94,
        // "sandwichColor": "hsl(36, 70%, 50%)",
        // "kebab": 183,
        // "kebabColor": "hsl(269, 70%, 50%)",
        // "fries": 93,
        // "friesColor": "hsl(23, 70%, 50%)",
        // "donut": 160,
        // "donutColor": "hsl(294, 70%, 50%)"
    },
    {
        "country": "AG",
        "hot dog": 23,
        "hot dogColor": "hsl(171, 70%, 50%)",
        // "burger": 41,
        // "burgerColor": "hsl(94, 70%, 50%)",
        // "sandwich": 76,
        // "sandwichColor": "hsl(267, 70%, 50%)",
        // "kebab": 17,
        // "kebabColor": "hsl(216, 70%, 50%)",
        // "fries": 116,
        // "friesColor": "hsl(34, 70%, 50%)",
        // "donut": 83,
        // "donutColor": "hsl(273, 70%, 50%)"
    },
    {
        "country": "AI",
        "hot dog": 25,
        "hot dogColor": "hsl(359, 70%, 50%)",
        // "burger": 33,
        // "burgerColor": "hsl(28, 70%, 50%)",
        // "sandwich": 3,
        // "sandwichColor": "hsl(234, 70%, 50%)",
        // "kebab": 42,
        // "kebabColor": "hsl(302, 70%, 50%)",
        // "fries": 152,
        // "friesColor": "hsl(196, 70%, 50%)",
        // "donut": 153,
        // "donutColor": "hsl(174, 70%, 50%)"
    },
    {
        "country": "AL",
        "hot dog": 66,
        "hot dogColor": "hsl(249, 70%, 50%)",
        // "burger": 181,
        // "burgerColor": "hsl(359, 70%, 50%)",
        // "sandwich": 41,
        // "sandwichColor": "hsl(128, 70%, 50%)",
        // "kebab": 125,
        // "kebabColor": "hsl(290, 70%, 50%)",
        // "fries": 78,
        // "friesColor": "hsl(69, 70%, 50%)",
        // "donut": 8,
        // "donutColor": "hsl(135, 70%, 50%)"
    },
    {
        "country": "AM",
        "hot dog": 70,
        "hot dogColor": "hsl(7, 70%, 50%)",
        // "burger": 167,
        // "burgerColor": "hsl(121, 70%, 50%)",
        // "sandwich": 72,
        // "sandwichColor": "hsl(7, 70%, 50%)",
        // "kebab": 198,
        // "kebabColor": "hsl(75, 70%, 50%)",
        // "fries": 44,
        // "friesColor": "hsl(27, 70%, 50%)",
        // "donut": 42,
        // "donutColor": "hsl(113, 70%, 50%)"
    }
    ]


// for (let i = 0; i < 358; i++) {
//     data.push(
//         {
//             "country": i,
//             "hot dog": 138,
//             "hot dogColor": "hsl(7, 70%, 50%)",
//         }
//     )
// }



const useStyles = makeStyles((theme) => ({
    root: {
        textAlign:'center',
    },
    pictureBar: {
        padding: theme.spacing(2),
        background: '#ffffff',
        height: 300,
        borderRadius: 0,

    },

    chart: {
        height: 500,
        borederBottom: '1px solid red'
    },





    pictureBar: {
        padding: theme.spacing(2),
        background: '#ffffff',
        height: 100,
        borderRadius: 0,
        // borderTop: '1px solid RGB(173, 173, 173)'

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





}));


const PersonalRoutine = React.memo(() => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [dialog, setDialog] = useState(false)
    const update = useSelector(state => state.update)
    // const uid = useSelector(state => state.firebase.auth)
    const uid = localStorage.getItem('uid')
    console.log(uid)
    // var tem1 = localStorage.getItem('displayName')
    const {pageNumber} = useSelector(state => state.dashboardReducers)
    const [reached, setReached] = useState(false)
    useEffect(() => {
        // console.log("HERE")
        // console.log(uid)
        dispatch(test.getUsersRoutines(uid))
    }, [])
    const openDialog = () => {
        setDialog(!dialog)
    }

    return (
        <div className={classes.root}>
            <TopMenu />
            {/* <div className={classes.chart}>
                                    <NivoChart data = {data}/>
                                </div> */}
            <Grid container spacing={0}>
                <Grid item xs={12} className={classes.chart}>
                    <NivoChart data = {data}/>
                    
                </Grid>


                <Grid item xs={12}>

                        <Paper className={classes.pictureBar}>
                            <Grid container spacing={0}>
                                <Grid item xs={4} className={classes.pictureBar__left}>
                                    <div className={classes.leftImageDiv}>
                                        < img className={classes.leftImage} src={`https://www.whittierfirstday.org/wp-content/uploads/default-user-image-e1501670968910.png`} alt="user photo" ></img>
                                    </div>
                                </Grid>
                                <Grid item xs={4} className={classes.pictureBar__center}>
                                    <Typography variant="h6" className={classes.centerTitle}>
                                        PERSONAL ROUTINES
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} className={classes.pictureBar__right} >
                            
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>


            </Grid>

            <Dialog type="private"/>
        </div>
    )
})

export default PersonalRoutine
