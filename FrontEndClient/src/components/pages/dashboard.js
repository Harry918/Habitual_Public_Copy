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
import TopMenuSpacer from './component/TopMenuSpacer'
import AddRoutine from './component/AddRoutine'; 




const useStyles = makeStyles((theme) => ({
    root: {
        textAlign:'center',
    },
    


}));



const Dashboard = React.memo(() => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [dialog, setDialog] = useState(false)
    const update = useSelector(state => state.update)
    const {uid} = useSelector(state => state.firebase.auth)
    const {pageNumber} = useSelector(state => state.dashboardReducers)
    const [reached, setReached] = useState(false)
    // const [routines, setRoutines] = useState(['Drinking Water', 'Better Sleep', 'Healthy Food']) //temperorary till we have a backend where we can retrieve the routines for each person
    // useEffect(() => {
    //     dispatch(test.getUsersRoutines(uid))
    // }, [update])
    useEffect(() => {
        // dispatch(test.getUsersRoutines(uid))
        console.log("REFRESHED")
        dispatch(test.getPublicRoutines(pageNumber))
            // window.addEventListener('scroll', function() {
            //     // setPageLength(pageLength)
            //     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && pageNumber < 3 && reached == false) {
            //         setReached(true)
            //        dispatch(test.getPublicRoutines(pageNumber, () => {
            //         dispatch({type:'INCREASE_PAGE'})
            //        }))
            //        //show loading spinner and make fetch request to api
            //     }
            //  });))
    }, [update])
    const openDialog = () => {
        setDialog(!dialog)
    }
    // useEffect(() => {
    // window.addEventListener('scroll', function() {
    //     // setPageLength(pageLength)
    //     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && pageNumber < 3 && reached == false) {
    //         setReached(true)
    //        dispatch(test.getPublicRoutines(pageNumber, () => {
    //            dispatch({type:'INCREASE_PAGE'})
    //        }))
    //        //show loading spinner and make fetch request to api
    //     }
    //  });
    // })

    return (
        <div className={classes.root}>
            <TopMenu />
            <TopMenuSpacer />
            
            <Dialog />
            <NeuButton
                width="50px"
                height="50px"
                onClick={openDialog}
                color="#DEE2E6"
                radius={10}
                style={{marginBottom:15}}
                
            >
               +
            </NeuButton>
            <AddRoutine />

            <RoutineDialog dialog={dialog} openDialog={openDialog} type='Routine' />
        </div>
    )
})

export default Dashboard

