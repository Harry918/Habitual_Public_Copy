import React from 'react';
import TopMenu from './component/TopMenu'
import {fade, makeStyles } from '@material-ui/core/styles';
import './test.css'



const useStyles = makeStyles((theme) => ({
   
       
  }));


const Routine = () => {
    const classes = useStyles();
    return (
        
        <div >
            <TopMenu />
            <div class="wrapper">
                <h1 class="box1"> 420 Completed Today</h1>
                <h1 class="box2"> 420 Completed Today</h1>
                <h1 class="box3"> 420 Completed Today</h1>
                <h1 class="box4"> 420 Completed Today</h1>
            </div>
        </div>
    )
}


export default Routine