import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List'
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useSelector, useDispatch } from 'react-redux';
import { useTransition, animated } from 'react-spring'
import { Slide } from 'react-reveal';
import { NeuButton } from "neumorphism-react";
//  import Image from 'react-bootstrap/Image';
import { useHistory } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import * as test from '../../../actions/retHabitInfo'

import RoutineDialog from '../insertRoutine'


const useStyles = makeStyles((theme) => ({
  root: {

  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  neubutton: {
    padding: 15
  },
  imageDiv: {
    // width: 300,
    // height: 300,
    // textAlign: 'center',
    // margin: '0 auto'
  //   margin-left: auto;
  // margin-right: auto;
  // display: block;
  },
  image: {
    width: '500px',
    height: '350px',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '5%',
    // maxHeight:'100%',
    // maxWidth:'100%',
    // borderRadius:'15%',
    // overflow:'hidden'
    // alignItems: 'center',
  },
  button: {
    padding: 15,
    margin: 15
  }
}));

const Dialog = ({type}) => {
  let history = useHistory();
  const classes = useStyles();
  let description = "This is a test description"
  const publicRoutines = useSelector(state => state.dashboardReducers.publicRoutines)
  const images = useSelector(state => state.dashboardReducers.images)
  const userRoutines= useSelector(state => state.dashboardReducers.userRoutines)
  const [routines, setRoutines] = useState([])
  // const { images, publicRoutines, userRoutines } = useSelector(state => state.dashboardReducers)
  // useEffect(() => {
  //   if(type === 'public'){
  //     setRoutines(publicRoutines)
  //    }
  //    else{
  //     setRoutines(userRoutines)
  //    }
  //    console.log(routines)
  // }, [])
 

  const temp = useSelector(state => state.dashboardReducers)
  const { uid } = useSelector(state => state.firebase.auth)
  const { pageNumber, stop } = useSelector(state => state.dashboardReducers)
  const dispatch = useDispatch()


  const openDialog = () => {
    setDialog(!dialog)
  }
  function truncateWord(word, limit) {
    if (word.length > limit) {
      return word.substring(0, limit - 3) + "..."
    }
    else {
      return word
    }
  }
  const [dialog, setDialog] = useState(false)
  // console.log(images[0])
  const movetoNextPage = (routine, image) => {  
    history.push('/routine', { routine: routine, image: image })

  }

  const fetchNext = () => {
    if(type === 'public'){
      dispatch(test.getPublicRoutines(pageNumber))
    }
    else{
      dispatch(test.getUsersRoutines(uid))
    }
  }
  console.log(images)
  const renderScroll = (routines) => {
    return(
      images.map((item, i) => (
        <Grid item>
          <Slide bottom collapse>
            <div className={classes.button}>
              <NeuButton
                className={classes.neubutton}
                onClick={() => { movetoNextPage(routines[i], images[i]);  }}
                color="#FFFFFF"
              >
                <Typography variant="header4" color="textSecondary" component="p">
                  {truncateWord(routines[i].title, 35)}
                </Typography>
                <div className={classes.imageDiv}>
                  {<img src={images[i]} className={classes.image} thumbnail />}
                </div>
                <Typography variant="body2" color="textSecondary" component="p">
                  {truncateWord(routines[i].description, 75)}
                </Typography>
              </NeuButton>
            </div>
          </Slide>
        </Grid>
      ))
    )
  }

  return (
    <div className={classes.root}>
      <InfiniteScroll
        dataLength={images.length}
        next={fetchNext}
        hasMore={true}
        scrollThreshold={0.7}
        loader={null}
      >
        <Grid container spacing={0} style={{ justifyContent: 'center' }} direction="row">



            <NeuButton height="424px"
              width="530px"
              color="#FFFFFF"
              distance={8}
              style={{margin: 30}}
              onClick={openDialog}
            ><Typography variant='h2'>
              +
              </Typography>
            </NeuButton>
            {type === 'public' ? renderScroll(publicRoutines) : renderScroll(userRoutines)}
        </Grid>
      </InfiniteScroll>
      <RoutineDialog dialog={dialog} openDialog={openDialog} type='Routine' />

    </div>
  )
}

export default Dialog