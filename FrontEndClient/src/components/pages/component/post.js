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



const message = `Truncation should be conditionally applicable on this long line of text as this is a much longer line than what the container can support. 
Truncation should be conditionally applicable on this long line of text as this is a much longer line than what the container can support. 
Truncation should be conditionally applicable on this long line of text as this is a much longer line than what the container can support. 
Truncation should be conditionally applicable on this long line of text as this is a much longer line than what the container can support.`;

const useStyles = makeStyles((theme) => ({

}));

const Post = () => {
    return (
        <div>
            <div style={{ padding: 15 }}>

                <NeuDiv distance={40} radius={2}color="#DEE2E6" style={{ padding: 15 }} >

                    <Grid item xs={12}>
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                                <Avatar>W</Avatar>
                            </Grid>
                            <Grid item xs>
                                <Typography style={{color:"black"}, {fontFamliy:'Antic Slab'}}>{message}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </NeuDiv>
            </div>
        </div>
    )
}

export default Post