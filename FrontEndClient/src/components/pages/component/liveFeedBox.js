import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { NeuDiv } from "neumorphism-react";
import { Grid } from "@material-ui/core"
import { NeuButton } from "neumorphism-react";
import { useSelector, useDispatch } from 'react-redux';
import Fade from '@material-ui/core/Fade';


const useStyles = makeStyles((theme) => ({
    title: {
        borderBottom: 'black 1px solid',
        fontSize: '36px'


    },
    boxList: {
        backgroundColor:'rgba(255, 255, 255, 0.5)',
        
        width:'50%',
        margin: '0 auto',
        //marginLeft: 300,
        listStyle:'none',
        textAlign: 'left',
        //border: 'red 2px solid',  
        overflowY: 'hidden',
        overflowX: 'hidden',  
        height:195,


    },
    listItemStyling: {
        borderColor:'red',
        borderWidth:'15px',
        fontWeight: '10',
        fontFamily: 'Lato'
    }
}));

function LiveFeedBox() {
    const classes = useStyles();
    const temp = useSelector(state => state.routineReducers)
    console.log(temp)
    return (
        <div>
            {/* <div className={classes.box}> */}
                
                <ul className ={classes.boxList}>
                    <li className={classes.title} ><h1>Recent Completions</h1></li>
                    {temp.live_feed ? temp.live_feed.map((item, i) => (
                            <Fade in={item ? true : false}>
                                <li className={classes.listItemStyling}>{item}</li>
                            </Fade>
                            )) : null}
                </ul>
            {/* </div> */}
            
        </div>
    )
}

export default LiveFeedBox
