import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

//import Beta from './beta'
const useStyles = makeStyles((theme) => ({
    betaRect: {
        fontSize:6,
        color:'#4bf542',
        fontFamily:'PressStart',
    }
}));

function Beta() {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.betaRect}>coming</div>
            <div className={classes.betaRect}>soon...</div>
        </div>
    )
}
 
export default Beta
