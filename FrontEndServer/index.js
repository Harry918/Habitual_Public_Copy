/* ENDPOINTS:
    getPublicRoutines
        returns the list public routines (return name, imageData, description)
    getRoutinePosts (sockets)
        returns all the posts associated with that routine (within each post: name, pic, description)
    createPost
        creates a post given a uid 
    

*/

const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');
AWS.config.update({
    accessKeyId:'AKIAIETAAPLUUVF6EZSQ',
    secretAccessKey:'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',
});
AWS.config.setPromisesDependency(bluebird);
const s3 = new AWS.S3();


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
    console.log('recieved request');
    const response =  mongo.createRoutine(req.query.uid, req.query.title, req.query.description, req.query.public, req.query.picturekey, (recordID) => {
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

app.post('/uploadImg', (req, res) => {
   /* res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin',  req.headers.origin);
    res.header('Access-Control-Allow-Methods','OPTIONS,GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN');

   
    const form = new multiparty.Form();
      form.parse(req, async (error, fields, files) => {
        if (error) throw new Error(error);
        try {
          const path = files.file[0].path;
          const buffer = fs.readFileSync(path);
          const type = await fileType.fromBuffer(buffer);
          const timestamp = Date.now().toString();
          const fileName = `bucketFolder/${timestamp}-lg`;
          const data = await uploadFile(buffer, fileName, type);
          return res.status(200).send(data);
        } catch (error) {
            console.log(error)
          return res.status(400).send(error);
        }
    });*/
});
app.get("/createPost", (req, res) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin',  req.headers.origin);
    res.header('Access-Control-Allow-Methods','OPTIONS,GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN');

    const response =  mongo.createPost(req.query.uid, req.query.title, req.query.content, req.query.parentRoutine, (result) => {
        console.log(result)
        res.send(result);
    })
    
})
app.get("/getPosts", (req, res) => {
    //takes routineID
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin',  req.headers.origin);
    res.header('Access-Control-Allow-Methods','OPTIONS,GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN');

    const response =  mongo.getPosts(req.query.parentRoutine, (result) => {
        console.log(result)
        res.send(result);
    })
    
})
app.get("/getPhoto", (req, res) => {
/*
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin',  req.headers.origin);
    res.header('Access-Control-Allow-Methods','OPTIONS,GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN');
    AWS.config.update({
        accessKeyId: '',
        secretAccessKey: ''
      });
    let s3 = new AWS.S3();
    async function getImage(){
        const data =  s3.getObject(
          {
              Bucket: 'habitapp-photos',
              Key: req.query.key
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
    })*/
})
/*(const uploadFile = (buffer, name, type) => {
    const params = {
        ACL: 'public-read-write',
        Body: buffer,
        Bucket: 'habitapp-photos',
        ContentType: type.mime,
        Key: `${name}.${type.ext}`
    };
    return s3.upload(params).promise();
};*/

  

app.use(router);

server.listen(PORT, () => console.log(`Server has started`));
