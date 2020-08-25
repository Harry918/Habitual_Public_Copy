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
import * as routineActions from '../../actions/routineFunctions'




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
    
        

    const [data, setData] = useState([
        {
            "id": "norway",
            "color": "hsl(50, 70%, 50%)",
            "data": []
          }
        ])
        
        
    useEffect(() => {
        // dispatch(routineActions.checkRoutineCompletion(uid, '5f3c697e578cfd25625d5182', (response) => {
        //     console.log(response)
        //     }
        // )) 
        dispatch(routineActions.getGraphData(uid, (response) => {
            console.log(response)
            let newArr=[];
            for (let i = 0; i < response.data.dataSize; i++) {
                let percentage;
                if (response.data.completions[i]*100 > 100 ) {
                    percentage = 100;
                } else {
                    percentage = response.data.completions[i]*100;
                }
                let time = Date.parse(response.data.startDate.substring(0,10)) + 86400000*(i+1);
                let date = new Date(time);
                newArr.push(
                    {
                        "x": date.toString().substring(0,10), 
                        
                        "y": percentage
                    }
                )
                
            }
            console.log(data[0].data)
            

            setData(
                [
                    {
                        "id": "nsdf",
                        "color": "hsl(50, 70%, 50%)",
                        "data": newArr
                      }
                    ]
            )
            }
        ))
        
    }, [])
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
