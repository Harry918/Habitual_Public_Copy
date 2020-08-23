import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { NeuDiv } from "neumorphism-react";
import { NeuButton } from "neumorphism-react";
import logo from './LogoMakr_5yRiFP.png';
import Image from 'react-bootstrap/Image';
import firebase from 'firebase';
import { useHistory } from "react-router-dom";
import * as searchResultsFunctions from '../../../actions/search_Results'
import { useSelector, useDispatch } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Beta from './beta'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: '#ffffff',
    overflow: 'hidden',
    position: 'sticky',
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
    marginLeft: 10,
    marginRight: 10,
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
  logoButton: {
    marginLeft: 10,
    marginRight: 10,


  }
}));
function truncateWord(word, limit) {
  if (word.length > limit) {
    return word.substring(0, limit - 3) + "..."
  }
  else {
    return word
  }
}

const TopMenu = () => {
  let history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch()
  const results1 = useSelector(state => state.searchReducers)
  const {results} = useSelector(state => state.searchReducers)
  
  const signOut = () => {
    firebase.auth().signOut()
    localStorage.clear()
    window.location.reload(false);
  }

  const searchQueriedRoutines = (event) => {
    console.log(event.target.value)
    dispatch(searchResultsFunctions.getSearchRoutines(event.target.value))
    dispatch(searchResultsFunctions.getSearchRoutines(event.target.value))
  }

  const moveToRoutine = (routine) => {
    console.log(routine.target.innerHTML)
    console.log(results)
    // let temp = results.findIndex(routine.target.innerHTML)
    console.log(results[0]._id, )
    console.log(results.findIndex(obj => obj.title === routine.target.innerHTML))
    dispatch(searchResultsFunctions.getSearchRoutines(routine.target.innerHTML, ))
    //also need the api reuqest for getting the picture key
    window.location.reload(false)
    history.push('/routine', { routine: results[results.findIndex(obj => obj.title === routine.target.innerHTML)]})
  }

  return (
    <div className={classes.root}>

      <Toolbar>
          <a href='./intro'>
            {/* <div className={classes.logoImage} style={{backgroundImage: `url('https://styles.redditmedia.com/t5_10288s/styles/communityIcon_u14gs7f4ugx21.png?width=256&s=5a814bcf6e9855f15f4a5ff9c4655de96565ff67)`}}> */}
              <img className={classes.logoImage} src={logo} /> 
              {/* </div> */}

          </a>

        <Typography id="exploreText" variant="h6" className={classes.title}
        onMouseOver={(event) => {
          document.getElementById("exploreText").style.textDecoration="underline" ;
        }} 
        onMouseOut={(event) => {
          document.getElementById("exploreText").style.textDecoration="none" ;

        }}>
          <a href="./" style={{color:'inherit'}}>
          EXPLORE
          </a>
        </Typography>
        <Typography id="habitualText" variant="h6" className={classes.title}>
        
          HABITUAL
        </Typography>
        <Typography id="personalText" variant="h6" className={classes.title}
        onMouseOver={(event) => {
          document.getElementById("personalText").style.textDecoration="underline" ;
        }} 
        onMouseOut={(event) => {
          document.getElementById("personalText").style.textDecoration="none" ;

        }}>
          <a href="../PersonalRoutine" style={{color:'inherit'}}>

          PERSONAL
          </a>

        </Typography>
        <div >

          {/* <NeuButton height="50px"
            color="#FFFFFF"
            distance={8}
            radius={10}
            onClick={signOut}>logout</NeuButton> */}
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={signOut}
          >
            <AccountCircle />
          </IconButton>
          <Beta/>

        </div>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
          </div>
            <Autocomplete
              onClick={() => {console.log('clicked')}}
              getLimitTagsText={(more) => +`${more}`}
              id="combo-box-demo"
              options={results}
              getOptionLabel={(option) =>truncateWord(option.title,30)/*+ '-' + truncateWord(option.description,10)*/}
              filterOptions={(options, state) => options}
              renderOption={(option) => <Button value={option} onClick={(option) => moveToRoutine(option)} noWrap>{option.title}</Button>}
              style={{ width: 300 }}
              renderInput={(params) => <TextField
              onChange={searchQueriedRoutines}
                {...params} 
                label="Search Routines" variant="outlined" />
              }
            />



        </div>
      </Toolbar>
      
    </div>
  )
}

export default TopMenu
