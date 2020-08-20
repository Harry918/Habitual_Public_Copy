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
    const {pageNumber} = useSelector(state => state.dashboardReducers)


    useEffect(() => {
        // dispatch(test.getUsersRoutines(uid))
        console.log("REFRESHED")
        dispatch(test.getPublicRoutines(pageNumber))

    }, [update])
    const openDialog = () => {
        setDialog(!dialog)
    }


    return (
        <div className={classes.root}>
            <TopMenu />
            
            <Dialog type="public"/>
        </div>
    )
})

export default Dashboard

