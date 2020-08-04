import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import { fade, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import * as test from '../../actions/retHabitInfo'
import { useSelector, useDispatch } from 'react-redux';
import InputBase from '@material-ui/core/InputBase';
import Paper from "@material-ui/core/Paper";


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
    dialog: {
        padding:30,
    },
    submitbutton: {
        color: '#F3EFF5!important',
        backgroundColor: '#72B01D!important',
        margin: 20,
    },
    uploadbutton: {
        ///marginTop: 10, 
        //fontSize: 20,
        color: '#F3EFF5!important',
        backgroundColor: '#454955!important',
        margin:20,
    },
    multilineinput: {
        margin:20,
    },
    descriptionbox: {
        margin: 200,
    }
}));




const RoutineDialog = ({ dialog }) => {
    const dispatch = useDispatch()
    const classes = useStyles();
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [pub, setPub] = useState(false)
    const [file, setFile] = useState(null)
    const changeText = (e, type) => {
        if (type === 'title') {
            setTitle(e.target.value)
        }
        else if (type === 'desc') {
            setDesc(e.target.value)
        }
        else if (type === 'public') {
            setPub(!pub)
        }
    }

    async function upload(event) {
        const fd = new FormData();
        const file = event.target.files[0]
        fd.append('file', file, file.name)
        setFile(fd)
        // dispatch(test.sendFile(temp.userID, fd))
      }
      const createRoutine = () => {
        dispatch(test.createRoutine(title, desc, pub, file))
      }
    return (
        <Grid container>
            <Dialog aria-labelledby="customized-dialog-title" open={dialog} maxWidth = {'md'} fullWidth={true} maxHeight = {'md'} fullHeight={true}>
                <Grid container jusitfyContent="center" direction="column" className={classes.dialog}>
                    <TextField id="standard-multiline-flexible" label="Title" placeholder="title" onChange={(e) => { changeText(e, 'title') }} className={classes.multilineinput} />
                    <TextField
          id="outlined-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          variant="outlined"
          rows={4}
          onChange={(e) => { changeText(e, 'desc') }}
        />
                    <Grid container direction="row">
                    <Button variant="outlined" component="label"  className={classes.uploadbutton}>
                         Upload File
                        <input type="file"onChange={upload} style={{ display: "none" }}/>
                    </Button>
                    <FormControlLabel control={<Checkbox name="checkedA" onChange={(e) => { changeText(e, 'public') }} />} label="Private" />
                    </Grid>
                    <Button variant="outlined" className={classes.submitbutton} component="label" onPress={createRoutine}>
                         Submit
                    </Button>
                    {/* public */}
                    {/* photo*/}
                </Grid>
            </Dialog>

        </Grid>
    )
}



export default RoutineDialog
