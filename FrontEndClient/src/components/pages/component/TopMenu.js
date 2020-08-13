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
import { NeuButton } from "neumorphism-react";
import logo from './LogoMakr_5yRiFP.png';
import Image from 'react-bootstrap/Image';
import firebase from 'firebase';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: '#ffffff',
    overflow: 'hidden',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 9999999,
    borderBottom: '1px solid #C8C8C8',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    minHeight: 128,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  title: {
    flex: 1,
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
    fontFamily: 'Lato',
    marginLeft:10,
    marginRight:10,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 3),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  bar: {
    marginBottom: 20,
    // background: 'black'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      width: '30ch',
      '&:focus': {
        width: '40ch',
      },
    },
  },
  logoImage: {
    width: 40,
    height: 40
  },
  logoButton:{
    marginLeft:10,
    marginRight:10,

  }
}));

const TopMenu = () => {
  let history = useHistory();
  const classes = useStyles();
  const signOut = () => {
    firebase.auth().signOut()
    window.location.reload(false);
  }
  return (
    <div className={classes.root}>

      <Toolbar>
        <form action="./" method="get" >
          <NeuButton className={classes.logoButton}
            onClick={() => console.log("Button cliked !")}
            color="#FFFFFF"
            radius={10}
            distance={0}
          >
             <Image className={classes.logoImage} src={logo} fluid />
          </NeuButton>
         
        </form>
          <Typography variant="h6" className={classes.title}>
            HABITUAL
          </Typography>
        <div >
            
          <NeuButton height="50px"
                                        color="#FFFFFF"
                                        distance={8}
                                        radius = {10}
                                        onClick={signOut}>logout</NeuButton>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </div>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <NeuDiv revert color="FFFFFF" position="static" className={classes.bar}>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </NeuDiv>
        </div>
      </Toolbar>

    </div>
  )
}

export default TopMenu
