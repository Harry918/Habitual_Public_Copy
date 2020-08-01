const express = require('express');
//express is being used for FrontEndServer
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');

const app = express();
const server = http.createServer(app);

const io = socketio(server);
const {MongoClient} = require('mongodb');

const PORT = process.env.PORT || 5000;



app.use(router);

server.listen(PORT, () => console.log(`Server has started`));