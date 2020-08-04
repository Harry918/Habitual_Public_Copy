import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import {fade, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';


const useStyles = makeStyles((theme) => ({
    title: {
        padding: 15
    },
    root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
        }
    },   
  }));


  



const RoutineDialog = ({dialog}) => {
    const classes = useStyles();
    console.log(dialog)
    return(
        <div>
            <Dialog aria-labelledby="customized-dialog-title" open={dialog} className={dialog}>
                <Grid>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="standard-basic" label="Title" placeholder="title"/>
                        <TextField id="standard-basic" label="Description" placeholder="Description"/>
                        {/* public */}
                        {/* photo*/}

                    </form>
                </Grid>
            </Dialog>

        </div>
    )
}



export default RoutineDialog
