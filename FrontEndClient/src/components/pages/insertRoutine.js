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
import logo from './squares.png';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

const useStyles = makeStyles((theme) => ({
    title: {
        margin:5,
        marginBottom:20,
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
        background: 'linear-gradient(15deg, #3F7D20 30%, #72B01D 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        marginTop: 20.
    },
    uploadbutton: {
        ///marginTop: 10, 
        //fontSize: 20,
        color: '#F3EFF5!important',
        background: 'linear-gradient(45deg, #535865 30%, #454955 90%)',
        marginTop:20,
        paddingLeft:60,
        paddingRight:60,
        //marginRight: '5%',
    },
    multilineinput: {
        margin:20,
    },
    descriptionbox: {
        margin: 200,
    },
    checkbox: {
        marginTop:20,
        //marginRight: '5%',
    },
    greetingImage: {
        display:'Flex',
        alignSelf: 'center',
        //...StyleSheet.absoluteFillObject
        
        backgroundColor: 'transparent',
        maxWidth: '200px',
        //maxHeight: 50,
        //margin: 15,
    },
    header: {
        alignSelf: 'center',
        fontSize:50,
        fontFamily:'Roboto',
        //margin: 15,
        //marginLeft:45
    },
    close: {
        right:0,
        position: 'absolute'
    }
}));




const RoutineDialog = ({ dialog, openDialog }) => {
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
            <Dialog aria-labelledby="customized-dialog-title" open={dialog} maxWidth = {'sm'} fullWidth={true} maxHeight = {'md'} fullHeight={true}>
                <Grid className={classes.close}>
                    <Button onClick={openDialog}><CloseRoundedIcon/></Button>
                </Grid>
                
                <Grid container jusitfyContent="center" direction="column" className={classes.dialog}>
                    <Typography variant="h2" className={classes.header}>Create a Routine</Typography>
                    <img src={logo} alt="Logo" className={classes.greetingImage}/>
                    <TextField id="standard-multiline-flexible" label="Title" placeholder="title" onChange={(e) => { changeText(e, 'title') }} className={classes.title} />
                    <TextField
                        id="outlined-textarea"
                        label="Enter a description of the routine"
                        placeholder="Placeholder"
                        multiline
                        variant="outlined"
                        rows={4}
                        onChange={(e) => { changeText(e, 'desc') }}
                        />
                    <Grid container direction="row" jusitfyContent="space-between">
                        <Grid item xs={12} sm={6}>
                            <Button variant="outlined" component="label"  className={classes.uploadbutton}>
                                Upload File
                                <input type="file"onChange={upload} style={{ display: "none" }}/>
                            </Button>
                        </Grid>
                        <Grid item container justifyContent="center" xs={12} sm={6}>
                            <FormControlLabel control={<Checkbox name="checkedA" onChange={(e) => { changeText(e, 'public') }} />} label="Make Routine Private" className={classes.checkbox}/>
                        </Grid>
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
