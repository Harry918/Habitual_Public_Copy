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
import { NeuDiv } from "neumorphism-react";
import { Grid, Paper } from "@material-ui/core"
import Avatar from '@material-ui/core/Avatar';
import { NeuButton } from "neumorphism-react";
import 'fontsource-antic-slab';
import TextField from '@material-ui/core/TextField';
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as routineActions from '../../../actions/routineFunctions'
import { useSelector, useDispatch } from 'react-redux';
import Comment from './Comment'

// title
// avatar
// picture 
// content

const message = `404`;

const useStyles = makeStyles((theme) => ({
    title: {
       
        fontFamily: 'Lato',
        marginLeft:10,
        marginRight:10,
        color:"black",
        fontSize:40,
        margin:10
      },
      description: {
       fontSize:20,
       color:"black",
       fontFamliy:'Antic Slab',
       margin:10

      },
    go: {
        width:'20%',
        height: '60%'
    },  
    comment: {
        width:'100%',
        height: '100%',

    }
}));

const Post = ({title, description, postID}) => {
    const dispatch = useDispatch()
    const classes = useStyles();
    const uid = useSelector(state => state.firebase.auth.uid)
    // console.log(description)
    
    const [message, setMessage] = useState('');

    const postComment = (event) => {
        dispatch(routineActions.postComment(uid, message, postID))
      }


    return (
        <div>
            <div style={{ padding: 15 }}>

                <NeuDiv distance={4} radius={4} color="#ffffff" style={{ padding: 15 }} >

                    <Grid item xs={12}>
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                                <Avatar>W</Avatar>
                            </Grid>
                            <Grid item xs>
                                <Typography variant='h2' className={classes.title}>{title}</Typography>
                                <Typography className={classes.description}>{description}</Typography>
                                <Comment />

                                <Grid container spacing={1} style={{height: 100}}>

                                    <Grid item xs={8}>
                                    <TextField onChange={(event) => {setMessage(event.target.value)}} className={classes.comment} id="Standard" label="Comment" />

                                    </Grid>
                                    <Grid item xs={4}>

                                    <Button onClick={postComment} className={classes.go} variant="outline-success">GO</Button>
                                    </Grid>

                                </Grid>
                                
                            </Grid>
                        </Grid>
                    </Grid>
                </NeuDiv>
            </div>
        </div>
    )
}

export default Post