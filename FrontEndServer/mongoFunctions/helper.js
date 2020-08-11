require('dotenv').config();
const uri = process.env.MONGO_URI;
const {MongoClient} = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
var client
var ObjectId = require('mongodb').ObjectID;
async function connectToMongo(){
    //start mogno
    try {
        client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect();
        await incrementCoutner();
        console.log('\x1b[32m','[mongo] connected');
        console.log('\x1b[40m');
        console.log('\x1b[37m');
    } catch (e) {
        console.error(e);
    } finally {
        //await client.close();
    }
    //read server start counter
    try {
        client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect();
        await printServerStarts();
    } catch (e) {
        console.error(e);
    } finally {
        //await client.close();
    }
}
async function incrementCoutner(){
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
async function printServerStarts(){
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
async function createUserDoc(uid, email, displayName){
    console.log('creating user with id', uid, 'and email', email);
    try {
        //let client = new MongoClient(uri, { useUnifiedTopology: true } );
        //await client.connect();
        doc = {
            _id:uid,
            email:email,
            username: '',
            displayName: displayName,
            routines: []
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
        //await client.close();
    }
};
async function createRoutine(uid, title, description, public, picturekey, callback){
    console.log('creating Routine');
    let routineID
    routineDoc = {
        creator: uid,
        title: title,
        description: description,
        numPeople: 1,
        public: public,
        picturekey: picturekey
    }
    try{
        //let client = new MongoClient(uri, { useUnifiedTopology: true } );
        //await client.connect();
        client.db('HabitApp').collection('Routines').insertOne(routineDoc, function(error, response){
            if(error) {
                console.log('Error occurred while inserting');
                console.log(error);
                return error;
            } else {
               routineID = response.ops[0]._id;
               console.log('inserted record with id: ', routineID);
               if(callback){
                   callback(routineID)
               }
            }
        });
    } catch (e) {
        console.error(e);
    } finally {
        //await client.close();
    }

}
async function getPublicRoutines(callback){
    console.log('retreiving public routines')
    query = {public :{$eq: 'true'}}
    let publicRoutines
    //let client = new MongoClient(uri, { useUnifiedTopology: true});
    //await client.connect();
    client.db('HabitApp').collection('Routines').find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        if(callback){
            callback(result)
        }
    });

}
async function getUserRoutines(uid, callback){
    console.log('retreiving public routines')
    userQuery = {_id :{$eq: uid}}
    // booksCollection.find({_id: {$in: author.books}}).toArray();
    client.db('HabitApp').collection('Users').findOne(userQuery).then(data => {
        let routines = data.routines
        routineQuery = {_id :{ $in: routines}}
        console.log('routine ids are', routines);
        for(let i = 0; i<routines.length; i++)
        {
          routines[i]  = ObjectId(routines[i])
        }
        client.db('HabitApp').collection('Routines').find(routineQuery).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            if (callback){
                callback(result)
            }
        })
    })
}

async function joinRoutine(uid, routineid, callback)
{
    console.log("joining routine of routineid", routineid, 'with uid', uid)
    update = { $addToSet : { routines: routineid}}
    query = {_id: uid}
    client.db('HabitApp').collection('Users').updateOne(query, update, function(err, doc){
        if(err)
        {
            console.log('error occured while searching');
            console.log(err);
        }
        //console.log(doc)
        if(callback){
            callback('routine joined')
        }
    })
}

async function createPost(uid, title, content, parentRoutine, callback){
    //title
    //content
    //uid
    //photokey
    console.log('creating Post');
    let routineID
    postDoc = {
        creator: uid,
        title: title,
        content: content,
        picturekey: '',
        parentRoutine: parentRoutine
    }
    try{
        //let client = new MongoClient(uri, { useUnifiedTopology: true } );
        //await client.connect();
        client.db('HabitApp').collection('Posts').insertOne(postDoc, function(error, response){
            if(error) {
                console.log('Error occurred while inserting');
                console.log(error);
                return error;
            } else {
               routineID = response.ops[0]._id;
               console.log('inserted record with id: ', routineID);
               if(callback){
                   callback(routineID)
               }
            }
        });
    } catch (e) {
        console.error(e);
    } finally {
        //await client.close();
    }

}
async function checkCompletion(uid, routineID, callback){
    console.log('checking completion')
    //db.inventory.find( { $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } )
    query = {$and: [{'uid' :{$eq:uid}}, {'routineID' :{$eq:routineID}}]}
    client.db('HabitApp').collection('completionMapping').find(query).toArray(function(err, result) {
       if (err) throw err;
        console.log(result);
        if(callback){
            callback(result.length)
        }
    });

}
async function markCompletion(uid, routineID, callback){
    console.log('marking completion');
    query = {$and: [{'uid' :{$eq:uid}}, {'routineID' :{$eq:routineID}}]}
    client.db('HabitApp').collection('completionMapping').find(query).toArray(function(err, result) {
       if (err) throw err;
        console.log(result);
        if(result.length==0){
            postDoc = {
                uid: uid,
                routineID: routineID,
            }
            try{
                client.db('HabitApp').collection('completionMapping').insertOne(postDoc, function(error, response){
                    if(error) {
                        console.log('Error occurred while inserting');
                        console.log(error);
                        return error;
                    } else {
                       routineID = response.ops[0]._id;
                       console.log('inserted record with id: ', routineID);
                       if(callback){
                           callback(routineID)
                       }
                    }
                });
            } catch (e) {
                console.error(e);
            } finally {
                //await client.close();
            }
        }
    });
}
async function getPosts(parentRoutine, callback){
    console.log('retreiving public posts')
    query = {'parentRoutine' :{$eq:parentRoutine}}
    client.db('HabitApp').collection('Posts').find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        if(callback){
            callback(result)
        }
    });

}
const uploadFile = (buffer, name, type) => {
    const params = {
      ACL: 'public-read',
      Body: buffer,
      Bucket: 'habitapp-photos',
      ContentType: type.mime,
      Key: `${name}.${type.ext}`
    };
    return s3.upload(params).promise();
  };


module.exports = { connectToMongo, incrementCoutner, printServerStarts, findHi, createUserDoc, createRoutine, getPublicRoutines, joinRoutine, uploadFile, getPosts, createPost, markCompletion, checkCompletion, getUserRoutines};
