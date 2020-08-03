require('dotenv').config();
const uri = process.env.MONGO_URI;
const {MongoClient} = require('mongodb');
var client
async function connectToMongo(){ 
    //start mogno
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
    //read server start counter
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
async function createUserDoc(uid, email){
    console.log('creating user');
    try {
        let client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect();
        doc = {
            uid:uid,
            email:email
        };
        client.db('HabitApp').collection('Users').insertOne(doc, function(error, response){
            if(error) {
                console.log('Error occurred while inserting');
                console.log(error);
                return error;
            } else {
               console.log('inserted record', response);
               return 'worked';
            }
        });
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
};
module.exports = { connectToMongo, incrementCoutner, printServerStarts, findHi, createUserDoc  };
