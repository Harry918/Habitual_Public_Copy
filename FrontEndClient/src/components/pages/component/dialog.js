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
    width: 600,
    height: 300
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
  
  let images = ["data:image/jpeg;base64,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"]
  console.log(images[0])
  const movetoNextPage = (routine, image) => {
    history.push('/routine', { routine: routine, image: image })

  }

  const fetchNext = () => {
    if(type === 'public'){
      dispatch(test.getPublicRoutines(pageNumber))
    }
    else{
      dispatch(test.getUsersRoutines(pageNumber))
    }
  }

  const renderScroll = (routines) => {
    console.log(routines)
    return(
      routines.map((item, i) => (
        <Grid item>
          <Slide bottom collapse>
            <div className={classes.button}>
              <NeuButton
                className={classes.neubutton}
                onClick={() => { movetoNextPage(routines[i], images[i]);  }}
                color="#FFFFFF"
              >
                <Typography variant="h4" color="textSecondary" component="p">
                  {truncateWord(routines[i].title, 35)}
                </Typography>
                <div >
                  <img className={classes.imageDiv} src={images[i]} thumbnail />
                </div>
                <Typography variant="body2" color="textSecondary" component="p">
                  {truncateWord(routines[i].description,80)}
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
        loader={<h4>Loading...</h4>}
      >
        <Grid container spacing={0} style={{ justifyContent: 'center' }} direction="row">



            <NeuButton height="391.3px"
              width="630px"
              color="#FFFFFF"
              distance={8}
              style={{margin: 30}}
              onClick={openDialog}
            ><Typography variant='h1'>
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