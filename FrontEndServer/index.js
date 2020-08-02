const express = require('express');
//express is being used for FrontEndServer
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');

const app = express();
const server = http.createServer(app);

const io = socketio(server);
const {MongoClient} = require('mongodb');
/*const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Anyone:<password>@cluster0.7u46e.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log('whatsup')
  collection.insertOne({stuff: 'hello'});
  client.close();
});*/
async function main(){
    const uri = "mongodb+srv://Anyone:anyonepass@cluster0.7u46e.mongodb.net/HabitApp?retryWrites=true&w=majority";
 

    const client = new MongoClient(uri, { useUnifiedTopology: true } );
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  addSomething(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function addSomething(client){
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
};


const PORT = process.env.PORT || 5000;

io.on('connection', function(socket) {

    socket.on('join', function() {
    });
  

  

});

app.get("/getUsers", function(req, res) {
    //add the ret from db here
    res.send("test")
})


app.use(router);

server.listen(PORT, () => console.log(`Server has started`));