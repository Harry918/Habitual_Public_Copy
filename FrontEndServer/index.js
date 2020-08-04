/* ENDPOINTS:
    getPublicRoutines
        returns the list public routines (return name, imageData, description)
    getRoutinePosts (sockets)
        returns all the posts associated with that routine (within each post: name, pic, description)
    createPost
        creates a post given a uid 
    

*/

const AWS = require('aws-sdk');
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

//     socket.on('getRoutinePosts', function() {
//         ....
//         ...
//         ..
//         socket.emit("")
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
    mongo.createUserDoc(req.query.uid, req.query.email).then(result => {
        console.log(result)
        res.send(result);
    });
})
app.get("/createRoutine", (req, res) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin',  req.headers.origin);
    res.header('Access-Control-Allow-Methods','OPTIONS,GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN');
    let result;
    const response =  mongo.createRoutine(req.query.uid, req.query.title, req.query.description, req.query.public, (recordID) => {
        console.log(recordID)
        res.send(recordID);
    })
    
})
app.get("/getPublicRoutines", (req, res) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin',  req.headers.origin);
    res.header('Access-Control-Allow-Methods','OPTIONS,GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN');
    let result;
    const response =  mongo.getPublicRoutines((routineArray) => {
        console.log(routineArray)
        res.send(routineArray);
    })
    
})
app.get("/joinRoutine", (req, res) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin',  req.headers.origin);
    res.header('Access-Control-Allow-Methods','OPTIONS,GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN');

    const response =  mongo.joinRoutine(req.query.uid, req.query.routineid, (result) => {
        console.log(result)
        res.send(result);
    })
    
})
app.get("/getPhoto", (req, res) => {

    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin',  req.headers.origin);
    res.header('Access-Control-Allow-Methods','OPTIONS,GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN');
    AWS.config.update({
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
      });
    let s3 = new AWS.S3();
    async function getImage(){
        const data =  s3.getObject(
          {
              Bucket: 'habitapp-photos',
              Key: 'yourin.png'
            }
          
        ).promise();
        return data;
    }
    getImage()
      .then((img)=>{
        res.writeHead(200, {'Content-Type': 'image/png'});
        res.write(img.Body, 'binary');
        res.end(null, 'binary');
      }).catch((e)=>{
        res.send(e)
    })
})
/*app.get("/sendPhoto", (req, res) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin',  req.headers.origin);
    res.header('Access-Control-Allow-Methods','OPTIONS,GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN');
})*/



app.use(router);

server.listen(PORT, () => console.log(`Server has started`));
