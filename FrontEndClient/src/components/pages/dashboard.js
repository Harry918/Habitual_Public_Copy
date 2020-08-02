import React, {useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import TopMenu from './component/TopMenu'
import Routine from './component/routine'


const Dashboard = () => {

    const [routines, setRoutines] = useState(['Drinking Water', 'Better Sleep', 'Healthy Food']) //temperorary till we have a backend where we can retrieve the routines for each person
    useEffect(() => {
        const retRoutines = () => {
            let routines;
            return 'hi'
        }
    }, [])
    return(
        <div>
             <TopMenu />
             <Routine
                routines={routines}/>
        </div>
    )
}

export default Dashboard