import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import app from "../../base.js";
import firebase from 'firebase';
import { useSelector, useDispatch } from 'react-redux';
import * as authFunctions from '../../actions/authFunctions'
import { useHistory } from "react-router-dom";
import Particles from 'react-particles-js';
import { NeuButton } from "neumorphism-react";
import { ResponsiveStream } from '@nivo/stream'


const useStyles = makeStyles((theme) => ({
  

}));

//redux
//actions and reducers and dispatch
//actions: 
//they r just functions that u call
//redcuers

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveStream = ({ data /* see data tab */ }) => (
    <ResponsiveStream
        data={data}
        keys={[ 'Raoul', 'Josiane', 'Marcel', 'René', 'Paul', 'Jacques' ]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: 36
        }}
        axisLeft={{ orient: 'left', tickSize: 5, tickPadding: 5, tickRotation: 0, legend: '', legendOffset: -40 }}
        offsetType="silhouette"
        colors={{ scheme: 'nivo' }}
        fillOpacity={0.85}
        borderColor={{ theme: 'background' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#2c998f',
                size: 4,
                padding: 2,
                stagger: true
            },
            {
                id: 'squares',
                type: 'patternSquares',
                background: 'inherit',
                color: '#e4c912',
                size: 6,
                padding: 2,
                stagger: true
            }
        ]}
        fill={[
            {
                match: {
                    id: 'Paul'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'Marcel'
                },
                id: 'squares'
            }
        ]}
        dotSize={8}
        dotColor={{ from: 'color' }}
        dotBorderWidth={2}
        dotBorderColor={{ from: 'color', modifiers: [ [ 'darker', 0.7 ] ] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                translateX: 100,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: '#999999',
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000000'
                        }
                    }
                ]
            }
        ]}
    />
)

const Graph = () => {
   
    let history = useHistory();
    const dispatch = useDispatch()
    const classes = useStyles();
   
    return (
        MyResponsiveStream
    )
}

export default Graph;