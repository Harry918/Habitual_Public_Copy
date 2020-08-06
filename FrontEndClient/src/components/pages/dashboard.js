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
import Routine from './component/dialog'
import { useSelector, useDispatch } from 'react-redux';
import * as test from '../../actions/retHabitInfo'
import Button from '@material-ui/core/Button';
import RoutineDialog from './insertRoutine'
import { NeuButton } from "neumorphism-react";

async function upload(event) {
    console.log(event.target.files[0])
    const fd = new FormData();
    const file = event.target.files[0]
    fd.append('file', file, file.name)
    console.log(event.target.files[0].size)
    // dispatch(documents.sendFile(temp.userID, fd))
}

const Dashboard = React.memo(() => {
    const dispatch = useDispatch()
    const [dialog, setDialog] = useState(false)
    const update = useSelector(state => state.update)
    // const [routines, setRoutines] = useState(['Drinking Water', 'Better Sleep', 'Healthy Food']) //temperorary till we have a backend where we can retrieve the routines for each person
    useEffect(() => {
        dispatch(test.getPublicRoutines())
    }, [update])
    const openDialog = () => {
        setDialog(!dialog)
    }
    return (
        <div>
            <TopMenu />
            <iframe id="frame" frameborder="0"></iframe>
            <Routine />
            <NeuButton
                width="50px"
                height="50px"
                onClick={openDialog}
                color="#DEE2E6"
                radius={10}
            >
               +
            </NeuButton>
            <RoutineDialog dialog={dialog} openDialog={openDialog} />
        </div>
    )
})

export default Dashboard

