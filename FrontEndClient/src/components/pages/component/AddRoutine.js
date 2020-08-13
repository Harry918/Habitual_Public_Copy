import React from 'react'
import { NeuButton } from "neumorphism-react";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    neubutton: {

    }
}));


function AddRoutine() {
    const classes = useStyles();


    return (
        <div>
            <NeuButton height="150px"
                width="300px"
                color="#FFFFFF"
                distance={8}
                > +</NeuButton>
        </div>
    )
}

export default AddRoutine
