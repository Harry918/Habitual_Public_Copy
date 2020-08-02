const express = require('express');
//express is being used for FrontEndServer
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');

const app = express();
const server = http.createServer(app);
require('dotenv').config();

const io = socketio(server);
const {MongoClient} = require('mongodb');
async function main(){
    const uri = process.env.MONGO_URI;


   
    var client
    try {
        client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect();
        await incrementCoutner(client);
        console.log('\x1b[32m','[mongo] connected');
        console.log('\x1b[40m');
        console.log('\x1b[37m');
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    try {
        client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect();
        await printServerStarts(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
async function incrementCoutner(client){
    query = {numStarts: {$exists: true}}
    update = { $inc: { numStarts:1 } }
    client.db('HabitApp').collection('Test').updateOne(query, update, (function(err, doc){
        if(err) 
        {
            console.log('error occured while searching');
            console.log(err);
        }
    }));
}
async function printServerStarts(client){
    query = {numStarts: {$exists: true}}
    client.db('HabitApp').collection('Test').findOne(query, function(err, doc){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log('The server has been started', doc.numStarts, 'times');
        }
    });
}
/*async function addSomething(client){
    doc = {hi:'hi'};
    client.db('HabitApp').collection('Test').insertOne(doc, function(error, response){
        if(error) {
            console.log('Error occurred while inserting');
           // return
        } else {
           console.log('inserted record', response);
          // return
        }
    });

    console.log("Databases:");
};*/
async function findHi(client){
    client.db('HabitApp').collection('Test').find().toArray(function(err, docs){
        if(err)
        {
            console.log('error occured while searching');
            console.log(err);
        }
        else
        {
            console.log("retrieved records:");
            console.log(docs);
        }
      
    });
};


const PORT = process.env.PORT || 5000;

io.on('connection', function(socket) {

    socket.on('join', function() {
    });




});


app.use(router);

server.listen(PORT, () => console.log(`Server has started`));
