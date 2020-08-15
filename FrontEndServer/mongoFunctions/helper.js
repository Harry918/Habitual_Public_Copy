require('dotenv').config();
const uri = process.env.MONGO_URI;
const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
var client
var ObjectId = require('mongodb').ObjectID;
async function connectToMongo() {
    //start mogno
    try {
        client = new MongoClient(uri, { useUnifiedTopology: true });
        await client.connect();
        await incrementCoutner();
        console.log('\x1b[32m', '[mongo] connected');
        console.log('\x1b[40m');
        console.log('\x1b[37m');
    } catch (e) {
        console.error(e);
    } finally {
        //await client.close();
    }
    //read server start counter
    try {
        client = new MongoClient(uri, { useUnifiedTopology: true });
        await client.connect();
        await printServerStarts();
    } catch (e) {
        console.error(e);
    } finally {
        //await client.close();
    }
}
async function incrementCoutner() {
    query = { numStarts: { $exists: true } }
    update = { $inc: { numStarts: 1 } }
    client.db('HabitApp').collection('Test').updateOne(query, update, (function (err, doc) {
        if (err) {
            console.log('error occured while searching');
            console.log(err);
        }
    }));
}
async function printServerStarts() {
    query = { numStarts: { $exists: true } }
    client.db('HabitApp').collection('Test').findOne(query, function (err, doc) {
        if (err) {
            console.log(err);
        }
        else {
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
async function findHi(client) {
    client.db('HabitApp').collection('Test').find().toArray(function (err, docs) {
        if (err) {
            console.log('error occured while searching');
            console.log(err);
        }
        else {
            //console.log("retrieved records:");
            //console.log(docs);
        }

    });
};
async function createUserDoc(uid, email, displayName) {
    console.log('creating user with id', uid, 'and email', email);
    try {
        //let client = new MongoClient(uri, { useUnifiedTopology: true } );
        //await client.connect();
        doc = {
            _id: uid,
            email: email,
            username: '',
            displayName: displayName,
            routines: []
        };
        client.db('HabitApp').collection('Users').insertOne(doc, function (error, response) {
            if (error) {
                console.log('HARRY THIS USER ALREADY EXISTS SO WHEN WE TRY TO MAKE A NEW USER DOC MONGO DOESNT LET US BUT THATS OK (or it might be an actual error who knows you made me hide it');
                console.log(error);
                //return error;
            } else {
                //console.log('inserted record', response);
                //return 'worked';
            }
        });
    } catch (e) {
        console.error(e);
    } finally {
        //await client.close();
    }
};
async function createRoutine(uid, title, description, public, picturekey, callback) {
    console.log('creating Routine');
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let routineID
    routineDoc = {
        creator: uid,
        title: title,
        description: description,
        numPeople: 1,
        public: public,
        picturekey: picturekey,
        creationDate: date
    }
    try {
        //let client = new MongoClient(uri, { useUnifiedTopology: true } );
        //await client.connect();
        client.db('HabitApp').collection('Routines').insertOne(routineDoc, function (error, response) {
            if (error) {
                console.log('Error occurred while inserting');
                console.log(error);
                return error;
            } else {
                routineID = response.ops[0]._id;
                //console.log('inserted record with id: ', routineID);
                if (callback) {
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
async function createRoutineWithBots(uid, title, description, public, picturekey, bots, callback) {
    bots = parseInt(bots, 10)
    console.log('creating Routine');
    let routineID
    routineDoc = {
        creator: uid,
        title: title,
        description: description,
        numPeople: bots,
        public: public,
        picturekey: picturekey
    }
    try {
        //let client = new MongoClient(uri, { useUnifiedTopology: true } );
        //await client.connect();
        client.db('HabitApp').collection('Routines').insertOne(routineDoc, function (error, response) {
            if (error) {
                console.log('Error occurred while inserting');
                console.log(error);
                return error;
            } else {
                routineID = response.ops[0]._id;
                //console.log('inserted record with id: ', routineID);
                if (callback) {
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
async function getPublicRoutines(pageNumber, pageLimit, callback) {
    console.log('retreiving public routines')
    pageNumber = parseInt(pageNumber, 10) - 1
    pageLimit = parseInt(pageLimit, 10)
    let query = { public: { $eq: 'true' } }
    let jsonResponse = {}
    let publicRoutines
    //let client = new MongoClient(uri, { useUnifiedTopology: true});
    //await client.connect();
    client.db('HabitApp').collection('Routines').find(query).skip(pageLimit * pageNumber).limit(pageLimit).sort({ numPeople: -1 }).toArray(function (err, result) {//sort by num mems
        if (err) throw err;
        numRoutines = client.db('HabitApp').collection('Routines').stats().then(stats => {
            //console.log('the number of routines is', stats);
            if (numRoutines <= pageNumber * pageLimit) {
                jsonResponse = {
                    result: result,
                    lastPage: true
                }
            }
            else {
                jsonResponse = {
                    result: result,
                    lastPage: false
                }
            }
        }).then(something => {
            //console.log(something);
            if (callback) {
                callback(jsonResponse)
            }
        })
        //console.log(result);

    });

}
async function getPublicRoutinesData(pageNumber, pageLimit, callback) {
    console.log('retreiving public routines data')
    pageNumber = parseInt(pageNumber, 10) - 1
    pageLimit = parseInt(pageLimit, 10)
    let query = { public: { $eq: 'true' } }
    let jsonResponse = {}
    let publicRoutines
    //let client = new MongoClient(uri, { useUnifiedTopology: true});
    //await client.connect();
    // cursor.explain("executionStats")
    client.db('HabitApp').collection('Routines').find(query).skip(pageLimit * pageNumber).limit(pageLimit).sort({ numPeople: -1 }).explain("executionStats").then(executionStats => {
        console.log(executionStats)
        if (callback) {
            callback(executionStats)
        }
    })

}
async function getUserRoutines(uid, callback) {
    console.log('retreiving user routines')
    userQuery = { _id: { $eq: uid } }
    // booksCollection.find({_id: {$in: author.books}}).toArray();
    client.db('HabitApp').collection('Users').findOne(userQuery).then(data => {
        let routines = data.routines
        routineQuery = { _id: { $in: routines } }
        //console.log('routine ids are', routines);
        for (let i = 0; i < routines.length; i++) {
            routines[i] = ObjectId(routines[i])
        }
        client.db('HabitApp').collection('Routines').find(routineQuery).toArray(function (err, result) {
            if (err) throw err;
            //console.log(result);
            if (callback) {
                callback(result)
            }
        })
    })
}

async function joinRoutine(uid, routineid, callback) {
    console.log("joining routine of routineid", routineid, 'with uid', uid)
    update = { $addToSet: { routines: routineid } }
    query = { _id: uid }
    client.db('HabitApp').collection('Users').updateOne(query, update, function (err, doc) {
        if (err) {
            console.log('error occured while searching');
            console.log(err);
        }
        //console.log(doc)
        if (callback) {
            callback('routine joined')
        }
    })
}
async function leaveRoutine(uid, routineid, callback) {
    console.log("leaving routine of routineid", routineid, 'with uid', uid)
    update = { $pull: { routines: routineid } }
    query = { _id: uid }
    client.db('HabitApp').collection('Users').updateOne(query, update, function (err, doc) {
        if (err) {
            console.log('error occured while searching');
            console.log(err);
        }
        //console.log(doc)
        if (callback) {
            callback('routine left')
        }
    })
}

async function createPost(uid, title, content, parentRoutine, callback) {
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
    try {
        //let client = new MongoClient(uri, { useUnifiedTopology: true } );
        //await client.connect();
        client.db('HabitApp').collection('Posts').insertOne(postDoc, function (error, response) {
            if (error) {
                console.log('Error occurred while inserting');
                console.log(error);
                return error;
            } else {
                routineID = response.ops[0]._id;
                //console.log('inserted record with id: ', routineID);
                if (callback) {
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
async function checkCompletion(uid, routineID, callback) {
    console.log('checking completion')
    //db.inventory.find( { $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } )
    query = { $and: [{ 'uid': { $eq: uid } }, { 'routineID': { $eq: routineID } }] }
    client.db('HabitApp').collection('completionMapping').find(query).toArray(function (err, result) {
        if (err) throw err;
        //console.log(result);
        if (callback) {
            callback(result.length)
        }
    });

}
async function markCompletion(uid, routineID, callback) {
    if (uid == null) {
        console.log('null user detected')
    }
    else {
        console.log('marking completion');
        query = { $and: [{ 'uid': { $eq: uid } }, { 'routineID': { $eq: routineID } }] }
        client.db('HabitApp').collection('completionMapping').find(query).toArray(function (err, result) {
            if (err) throw err;
            //console.log(result);
            if (1 == 1/*result.length == 0*/) {
                postDoc = {
                    uid: uid,
                    routineID: routineID,
                }
                try {
                    client.db('HabitApp').collection('completionMapping').insertOne(postDoc, function (error, response) {
                        if (error) {
                            console.log('Error occurred while inserting');
                            console.log(error);
                            return error;
                        } else {
                            routineID = response.ops[0]._id;
                            //console.log('inserted record with id: ', routineID);
                            if (callback) {
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

}
async function getPosts(parentRoutine, callback) {
    console.log('retreiving public posts')
    query = { 'parentRoutine': { $eq: parentRoutine } }
    client.db('HabitApp').collection('Posts').find(query).toArray(function (err, result) {
        if (err) throw err;
        //console.log(result);
        if (callback) {
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
    console.log('uploaded image');
    return s3.upload(params).promise();
};
async function searchRoutines(keywords, pageNumber, pageLimit, callback) {
    //db.Posts.find({$text: {$search: "water"}}, {score: {$meta: "textScore"} }).sort({score: {$meta :"textScore"} } )
    console.log('searching through Routines')
    pageNumber = parseInt(pageNumber, 10) - 1
    pageLimit = parseInt(pageLimit, 10)
    const query = { $text: { $search: `${keywords}` } }
    const projection = { score: { $meta: "textScore" } }
    const sort = { score: { $meta: "textScore" } }
    client.db('HabitApp').collection('Routines').find(query).project(projection).skip(pageLimit * pageNumber).limit(pageLimit).sort(sort).toArray(function (err, result) {
        if (err) throw err;
        //console.log(result);
        if (callback) {
            callback(result)
        }
    });

}
async function searchPosts(keywords, pageNumber, pageLimit, callback) {
    //db.Posts.find({$text: {$search: "water"}}, {score: {$meta: "textScore"} }).sort({score: {$meta :"textScore"} } )
    console.log('searching through Posts')
    pageNumber = parseInt(pageNumber, 10) - 1
    pageLimit = parseInt(pageLimit, 10)
    const query = { $text: { $search: `${keywords}` } }
    const projection = { score: { $meta: "textScore" } }
    const sort = { score: { $meta: "textScore" } }
    client.db('HabitApp').collection('Posts').find(query).project(projection).skip(pageLimit * pageNumber).limit(pageLimit).sort(sort).toArray(function (err, result) {
        if (err) throw err;
        //console.log(result);
        if (callback) {
            callback(result)
        }
    });

}
async function searchUsers(keywords, pageNumber, pageLimit, callback) {
    //db.Posts.find({$text: {$search: "water"}}, {score: {$meta: "textScore"} }).sort({score: {$meta :"textScore"} } )
    console.log('searching through Users')
    pageNumber = parseInt(pageNumber, 10) - 1
    pageLimit = parseInt(pageLimit, 10)
    const query = { $text: { $search: `${keywords}` } }
    const projection = { score: { $meta: "textScore" } }
    const sort = { score: { $meta: "textScore" } }
    client.db('HabitApp').collection('Users').find(query).project(projection).skip(pageLimit * pageNumber).limit(pageLimit).sort(sort).toArray(function (err, result) {
        if (err) throw err;
        //console.log(result);
        if (callback) {
            callback(result)
        }
    });

}
async function getComments(parentPost, callback) {
    console.log('retreiving  comments')
    query = { 'parentPost': { $eq: parentPost } }
    client.db('HabitApp').collection('Comments').find(query).toArray(function (err, result) {
        if (err) {
            //throw err;
            console.log(err)
        }
        //console.log(result);
        if (callback) {
            callback(result)
        }
    });

}
async function createComment(uid, content, parentPost, callback) {
    //title
    //content
    //uid
    //photokey
    console.log('creating Comment');
    let commentID
    commentDoc = {
        creator: uid,
        content: content,
        picturekey: '',
        parentPost: parentPost
    }
    try {
        //let client = new MongoClient(uri, { useUnifiedTopology: true } );
        //await client.connect();
        client.db('HabitApp').collection('Comments').insertOne(commentDoc, function (error, response) {
            if (error) {
                console.log('Error occurred while inserting');
                console.log(error);
                return error;
            } else {
                commentID = response.ops[0]._id;
                //console.log('inserted record with id: ', routineID);
                if (callback) {
                    callback(commentID)
                }
            }
        });
    } catch (e) {
        console.error(e);
    } finally {
        //await client.close();
    }

}
async function clearCompletionMapping() {
    //title
    //content
    //uid
    //photokey
    console.log('clearing Completions');
    try {
        client.db('HabitApp').collection('completionMapping').drop()
    } catch (e) {
        console.error(e);
    } finally {
        //await client.close();
    }

}
async function sendMessageToRoom(uid, roomid, message, callback) {


    console.log("sending message to room");
    const messageObject = {
        uid: uid,
        roomid: roomid,
        message: message
    }
    client.db('HabitApp').collection("LiveFeed").countDocuments().then(messageCount => {
        console.log('counted ', messageCount, 'message Objects')
        sortOrder = { $orderBy: { _id: 1 } }
        //FIND THE ID OF THE LAST DOCUMENT SORTED BY DOCUMENT ID AND DELETE ONE DOCUMENT EQUAL TO THAT ID BEFORE INSERTING THE NEW ONE
        //ASLO WRITE THE GETMESSAGES ENDPOINT 
        if (messageCount > 4) {
            //console.log("message limit hit, deleting one...")


            client.db('HabitApp').collection('LiveFeed').find({ roomid: roomid }).sort({ _id: 1 }).limit(1).toArray().then(resultsArr => {
                //console.log('results: ', resultsArr);
                oldestid = resultsArr[0]._id
                //console.log('the oldest id is', oldestid)
                client.db('HabitApp').collection('LiveFeed').deleteOne({ _id: ObjectId(oldestid) }).then(() => {
                    client.db('HabitApp').collection('LiveFeed').insertOne(messageObject, function (err, res) {
                        if (err) {
                            console.log('Error occurred while inserting');
                            console.log(err);
                            return err;
                        }
                        else {
                            messageID = res.ops[0]._id;
                            //console.log('inserted record with id: ', routineID);
                            if (callback) {
                                callback(messageID)
                            }
                        }
                    })
                })
            })

        }
        else {
            client.db('HabitApp').collection('LiveFeed').insertOne(messageObject, function (err, res) {
                if (err) {
                    console.log('Error occurred while inserting');
                    console.log(err);
                    return err;
                }
                else {
                    messageID = res.ops[0]._id;
                    //console.log('inserted record with id: ', routineID);
                    if (callback) {
                        callback(messageID)
                    }
                }
            })
        }

    })
}

async function getRoomMessages(roomid, callback) {
    console.log('getting messages')
    try {
        client.db('HabitApp').collection('LiveFeed').find({ roomid: roomid }).sort({ _id: 1 }).toArray().then(result => {
            //console.log(result);
            if (callback) {
                callback(result)
            }

        })
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

async function checkJoinStatus(uid, routineid, callback) {
    console.log('checking if user', uid, 'is already in routine', routineid);
    client.db('HabitApp').collection('Users').findOne({ _id: uid }).then(data => {
        if (data != null) {
            console.log(data.routines)
            if (data.routines.indexOf(routineid) != -1) {
                callback({ joined: true })
            }
            else {
                callback({ joined: false })
            }
        }
        else{
            callback("user not found")
        }

    })
}
//

module.exports = {
    connectToMongo, incrementCoutner, printServerStarts, findHi, createUserDoc, createRoutine, createRoutineWithBots,
    getPublicRoutines, getPublicRoutinesData, joinRoutine, leaveRoutine, uploadFile, getPosts, createPost, markCompletion, checkCompletion,
    getUserRoutines, searchRoutines, searchPosts, searchUsers, getComments, createComment, clearCompletionMapping, sendMessageToRoom, getRoomMessages,
    checkJoinStatus
};
