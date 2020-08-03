const express = require('express');
//express is being used for FrontEndServer
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');
const mongo = require('./mongoFunctions/helper')

const app = express();
const server = http.createServer(app);
require('dotenv').config();

const io = socketio(server);

async function main(){
    await mongo.connectToMongo();
}

main().catch(console.error);


const PORT = process.env.PORT || 5000;
console.log("RUNNING ON PORT", PORT)

// io.on('connection', function(socket) {

//     socket.on('join', function() {
//     });




// });

app.get("/getUsers", function(req, res) {

    // list of methods that are supported by the server
    res.header('Access-Control-Allow-Methods','GET');
    console.log("here")
    //add the ret from db here
    res.send("testwdwq")
})
app.get("/createUser", function(req, res) {
    res.header('Access-Control-Allow-Credentials', true);

    // origin can not be '*' when crendentials are enabled. so need to set it to the request origin
    res.header('Access-Control-Allow-Origin',  req.headers.origin);

    // list of methods that are supported by the server
    res.header('Access-Control-Allow-Methods','OPTIONS,GET,PUT,POST,DELETE');

    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN');
    // console.log(req.data)
    console.log(req.query.uid)
    mongo.createUserDoc(req.query.uid, req.query.email).then(result => {
        res.send(result);
    });
})


app.use(router);

server.listen(PORT, () => console.log(`Server has started`));
