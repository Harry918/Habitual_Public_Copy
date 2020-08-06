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
import Image from 'react-bootstrap/Image';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: 10,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
    width:300,
    height:150
  }
}));

const Routine = () => {
  const classes = useStyles();
  let description = "This is a test description"
  const images = useSelector(state => state.images)
  const routines = useSelector(state => state.routines)
  
  // const renderImages = (image) => {
  //   console.log("line 68")
  //   var base64data
  //   const url = window.URL.createObjectURL(new Blob([image]))
  //   const fileReaderInstance = new FileReader();
  //   fileReaderInstance.readAsDataURL(image);
  //   fileReaderInstance.onload = () => {
  //     base64data = fileReaderInstance.result;
  //     document.getElementById('frame').src = base64data
  //     return base64data
  //   }
  // }
  return (
    <Grid container spacing={1}>
      {routines.map((item, i) => (
        <List key={i} style={{ display: 'flex', justifyContent: 'center' }}>
          <Grid container item xs={12} spacing={3}>
            <Slide bottom collapse>
              <div style={{ padding: 15 }}>
                <NeuButton
                  className={classes.neubutton}
                  onClick={() => console.log("Button cliked !")}
                  color="#FFFFFF"
                >
                  <Typography variant="h4" color="textSecondary" component="p">
                    {routines[i].title}
                  </Typography>
                  <div >
                    <Image className={classes.imageDiv} src={item}  thumbnail />
                  </div>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {routines[i].description}
                  </Typography>


                </NeuButton>
              </div>
            </Slide>
          </Grid>
        </List>
      ))}
    </Grid>
  )
}

export default Routine