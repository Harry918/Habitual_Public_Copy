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
    } catch (e) {
        console.error(e);
    } finally {
        //await client.close();
    }
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
    let today = new Date();
    var completionsArray = [];
    var length = 365; // user defined length

    for(var i = 0; i < length; i++) {
        completionsArray.push(0);
    }
    console.log('creating user with id', uid, 'and email', email);
    try {
        //let client = new MongoClient(uri, { useUnifiedTopology: true } );
        //await client.connect();
        doc = {
            _id: uid,
            email: email,
            displayName: displayName,
            routines: [],
        };
        completionSetupDoc = {
            _id: uid,
            startDate: today,
            completions:completionsArray,
            dailyCompletionCounter: 0,
            lastUpdate: today,
        };
        client.db('HabitApp').collection('Users').insertOne(doc, function (error, response) {
            if (error) {
                console.log('User has signed in before with this gmail account');
                //console.log(error);
                //return error;
            } else {
                //console.log('inserted record', response);
                //return 'worked';
            }
        });
        client.db('HabitApp').collection('CompletionStorage').insertOne(completionSetupDoc, function (error, response) {
            if (error) {
                console.log('Already setup user for graphs');
                //console.log(error);
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
        creationDate: today
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
    routineidObject = ObjectId(routineid)
    console.log("joining routine of routineid", routineid, 'with uid', uid)
    const userUpdate = { $addToSet: { routines: routineid } }
    const userQuery = { _id: uid }
    const routineUpdate = {$inc: {numPeople:1}}
    const routineQuery = {_id:routineidObject}
    console.log('checking if user', uid, 'is already in routine', routineid);
    client.db('HabitApp').collection('Users').findOne({ _id: uid }).then(data => {
        if (data != null) {
            //console.log(data.routines)
            if (data.routines.indexOf(routineid) != -1) {
                callback({ joined: true })
            }
            else {
                client.db("HabitApp").collection("Routines").updateOne(routineQuery, routineUpdate).then( () => {

                    client.db('HabitApp').collection('Users').updateOne(userQuery, userUpdate, function (err, doc) {
                        if (err) {
                            console.log('error occured while searching');
                            console.log(err);
                        }
                        //console.log(doc)
                        if (callback) {
                            callback('routine joined')
                        }
                    })
                })
            }
        }
        else{
            callback("user not found")
        }

    })


}
async function leaveRoutine(uid, routineid, callback) {
    routineidObject = ObjectId(routineid)
    console.log("leaving routine of routineid", routineid, 'with uid', uid)
    const userUpdate = { $pull: { routines: routineid } }
    const userQuery = { _id: uid }
    const routineUpdate = {$inc: {numPeople:-1}}
    const routineQuery = {_id:routineidObject}
    console.log('checking if user', uid, 'is already in routine', routineid);
    client.db('HabitApp').collection('Users').findOne({ _id: uid }).then(data => {
        if (data != null) {
            //console.log(data.routines)
            if (data.routines.indexOf(routineid) == -1) {
                callback({ message: "routine not found"})
            }
            else {
                client.db("HabitApp").collection("Routines").updateOne(routineQuery, routineUpdate).then( () => {

                    client.db('HabitApp').collection('Users').updateOne(userQuery, userUpdate, function (err, doc) {
                        if (err) {
                            console.log('error occured while searching');
                            console.log(err);
                        }
                        //console.log(doc)
                        if (callback) {
                            callback('routine left')
                        }
                    })
                })
            }
        }
        else{
            callback("user not found")
        }

    })
    /* ---------SECTION 2 -------------*/
    //calculate the number of completions by looking at the dailyCompletion counter
    //  1. DONT INCREMENT THE DAILY COUNTER (first set it to 0 if the date doesn't match today)
    //  2. retrieve the number of routines the user is subscribed to 
    //  3. divide the counter by the number of routines the user is in to find todays percentage
    //  4. subtract the starting date from the current date to find array index
    //  5. retrieve the current array, replace the 0 with the new value and send an upate for the array as well as the counter
    userQuery = { _id: { $eq: uid } }
    let today = new Date();
    client.db('HabitApp').collection('CompletionStorage').findOne(userQuery).then(result => {
        let startDate = result.startDate
        let lastUpdate = result.lastUpdate

        let todayFormat = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let lastUpdateFormat = lastUpdate.getFullYear() + '-' + (lastUpdate.getMonth() + 1) + '-' + lastUpdate.getDate();
        let startDateFormat = startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate();
        console.log('today is ', todayFormat)
        console.log('lastUpdate is ', lastUpdateFormat)
        console.log('startDate is ', startDateFormat)

        let completions = result.completions
        let dailyCompletionCounter = result.dailyCompletionCounter
        console.log('the counter retrieved for today is', dailyCompletionCounter);
        let lastDateDif = Math.floor((today-lastUpdate)/(1000*3600*24))
        let arrayIndex = Math.floor((today-startDate)/(1000*3600*24))
        if( lastDateDif != 0)
        {
            //last update was not today, have to update 
            console.log('Last update was not today')
            dailyCompletionCounter = 0
        }
        else
        {
            dailyCompletionCounter += 0
        }
            
        //update mongo
        //  update the lastUpdate thing in CompletionStorage as well as the dailyCompletionCounter
        //  update the array after proccessing as well
        //-------
        client.db('HabitApp').collection('Users').findOne(userQuery).then(userData => {
            let numRoutines = userData.routines.length
            let percentage = dailyCompletionCounter/numRoutines
            completions[arrayIndex] = percentage
            console.log('USER HAS COMPLETED ', completions[arrayIndex],'% of their routines today')
            console.log(completions)
            console.log('updating array at ', arrayIndex);
            completionUpdate = 
            {
                $set: {
                    lastUpdate: today,
                    completions: completions,
                    dailyCompletionCounter: dailyCompletionCounter
                }
            }
            client.db('HabitApp').collection('CompletionStorage').updateOne(userQuery, completionUpdate).then(result => {
                console.log('should have updated')
                if(callback)
                {
                    callback(completions)
                }
            })
        })
            
        
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
            if (1==1) {
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

    /* ---------SECTION 2 -------------*/
    //calculate the number of completions by looking at the dailyCompletion counter
    //  1. create a document that links the routineid, the userid, and the timestamp of completion
    //  2. insert this document into the rawCompletions collection
    const dataDoc = 
            {
                uid:uid,
                routineid:routineID,
                time:today
            }
    client.db('HabitApp').collection('randomData').insertOne(dataDoc)

   /* ---------SECTION 3 -------------*/
    //calculate the number of completions by looking at the dailyCompletion counter
    //  1. increment the dailyCompletionCounter by 1 (first set it to 0 if the date doesn't match today)
    //  2. retrieve the number of routines the user is subscribed to 
    //  3. divide the counter by the number of routines the user is in to find todays percentage
    //  4. subtract the starting date from the current date to find array index
    //  5. retrieve the current array, replace the 0 with the new value and send an upate for the array as well as the counter

    userQuery = { _id: { $eq: uid } }
    let today = new Date();
    client.db('HabitApp').collection('CompletionStorage').findOne(userQuery).then(result => {
        let startDate = result.startDate
        let lastUpdate = result.lastUpdate

        let todayFormat = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let lastUpdateFormat = lastUpdate.getFullYear() + '-' + (lastUpdate.getMonth() + 1) + '-' + lastUpdate.getDate();
        let startDateFormat = startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate();
        console.log('today is ', todayFormat)
        console.log('lastUpdate is ', lastUpdateFormat)
        console.log('startDate is ', startDateFormat)

        let completions = result.completions
        let dailyCompletionCounter = result.dailyCompletionCounter
        console.log('the counter retrieved for today is', dailyCompletionCounter);
        let lastDateDif = Math.floor((today-lastUpdate)/(1000*3600*24))
        let arrayIndex = Math.floor((today-startDate)/(1000*3600*24))
        if( lastDateDif != 0)
        {
            //last update was not today, have to update 
            console.log('Last update was not today')
            dailyCompletionCounter = 1
        }
        else
        {
            dailyCompletionCounter += 1
        }
            
        //update mongo
        //  update the lastUpdate thing in CompletionStorage as well as the dailyCompletionCounter
        //  update the array after proccessing as well
        //-------
        client.db('HabitApp').collection('Users').findOne(userQuery).then(userData => {
            let numRoutines = userData.routines.length
            let percentage = dailyCompletionCounter/numRoutines
            completions[arrayIndex] = percentage
            console.log('USER HAS COMPLETED ', completions[arrayIndex],'% of their routines today')
            console.log(completions)
            console.log('updating array at ', arrayIndex);
            completionUpdate = 
            {
                $set: {
                    lastUpdate: today,
                    completions: completions,
                    dailyCompletionCounter: dailyCompletionCounter
                }
            }
            client.db('HabitApp').collection('CompletionStorage').updateOne(userQuery, completionUpdate).then(result => {
                console.log('should have updated')
                if(callback)
                {
                    callback(completions)
                }
            })
        })
            
        
    })
   

}
async function getNumCompletions(routineid, callback)
{

    const query = {routineID:routineid}
    console.log('retrieveing number of completions for id', routineid)
    client.db('HabitApp').collection('completionMapping').find(query).toArray().then( numCompletions => {
        console.log(numCompletions.length, 'completions were found')
        if(callback)
        {
            callback(numCompletions.length)
        }
    })
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
    client.db('HabitApp').collection("LiveFeed").find({ roomid: roomid }).toArray().then(messageArray => {
        console.log('counted ', messageArray.length, 'message Objects')
        sortOrder = { $orderBy: { _id: 1 } }
        //FIND THE ID OF THE LAST DOCUMENT SORTED BY DOCUMENT ID AND DELETE ONE DOCUMENT EQUAL TO THAT ID BEFORE INSERTING THE NEW ONE
        //ASLO WRITE THE GETMESSAGES ENDPOINT
        if (messageArray.length > 4) {
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
        client.db('HabitApp').collection('LiveFeed').find({ roomid: roomid }).sort({ _id: -1 }).toArray().then(result => {
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
async function clearLiveFeed() {
    //title
    //content
    //uid
    //photokey
    console.log('clearing live feeds');
    try {
        client.db('HabitApp').collection('LiveFeed').drop()
    } catch (e) {
        console.error(e);
    } finally {
        //await client.close();
    }
    let today = new Date();
    routineDoc = {
      
        deleteDate: today
    }
    try {
        //let client = new MongoClient(uri, { useUnifiedTopology: true } );
        //await client.connect();
        client.db('HabitApp').collection('Users').insertOne(routineDoc, function (error, response) {
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
async function getDisplayName(uid, callback) {
    console.log('retreiving users displayName')
    userQuery = { _id: { $eq: uid } }
    // booksCollection.find({_id: {$in: author.books}}).toArray();
    client.db('HabitApp').collection('Users').findOne(userQuery).then(data => {
        if(callback)
        {
            console.log(data)
           callback(data.displayName)
        }
    })
}

async function completeTest(uid, callback){
    console.log('testing completion function')
    /* ---------SECTION 2 -------------*/
    //calculate the number of completions by looking at the dailyCompletion counter
    //  1. increment the dailyCompletionCounter by 1 (first set it to 0 if the date doesn't match today)
    //  2. retrieve the number of routines the user is subscribed to 
    //  3. divide the counter by the number of routines the user is in to find todays percentage
    //  4. subtract the starting date from the current date to find array index
    //  5. retrieve the current array, replace the 0 with the new value and send an upate for the array as well as the counter

    userQuery = { _id: { $eq: uid } }
    let today = new Date();
    client.db('HabitApp').collection('CompletionStorage').findOne(userQuery).then(result => {
        let startDate = result.startDate
        let lastUpdate = result.lastUpdate

        let todayFormat = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let lastUpdateFormat = lastUpdate.getFullYear() + '-' + (lastUpdate.getMonth() + 1) + '-' + lastUpdate.getDate();
        let startDateFormat = startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate();
        console.log('today is ', todayFormat)
        console.log('lastUpdate is ', lastUpdateFormat)
        console.log('startDate is ', startDateFormat)

        let completions = result.completions
        let dailyCompletionCounter = result.dailyCompletionCounter
        console.log('the counter retrieved for today is', dailyCompletionCounter);
        let lastDateDif = Math.floor((today-lastUpdate)/(1000*3600*24))
        let arrayIndex = Math.floor((today-startDate)/(1000*3600*24))
        if( lastDateDif != 0)
        {
            //last update was not today, have to update 
            console.log('Last update was not today')
            dailyCompletionCounter = 0
        }
        else
        {
            dailyCompletionCounter += 0
        }
            
        //update mongo
        //  update the lastUpdate thing in CompletionStorage as well as the dailyCompletionCounter
        //  update the array after proccessing as well
        //-------
        client.db('HabitApp').collection('Users').findOne(userQuery).then(userData => {
            let numRoutines = userData.routines.length
            let percentage = dailyCompletionCounter/numRoutines
            completions[arrayIndex] = percentage
            console.log('USER HAS COMPLETED ', completions[arrayIndex],'% of their routines today')
            console.log(completions)
            console.log('updating array at ', arrayIndex);
            completionUpdate = 
            {
                $set: {
                    lastUpdate: today,
                    completions: completions,
                    dailyCompletionCounter: dailyCompletionCounter
                }
            }
            client.db('HabitApp').collection('CompletionStorage').updateOne(userQuery, completionUpdate).then(result => {
                console.log('should have updated')
                if(callback)
                {
                    callback(completions)
                }
            })
        })
            
        
    })
}

async function getGraphData(uid, callback)
{
    console.log('retrieving graph data for uid', uid);
    userQuery = {_id: uid}
    client.db('HabitApp').collection('CompletionStorage').findOne(userQuery).then(result => {
        if(callback)
        {
            callback(result)
        }
    })
}
module.exports = {
    connectToMongo, findHi, createUserDoc, createRoutine, createRoutineWithBots,
    getPublicRoutines, getPublicRoutinesData, joinRoutine, leaveRoutine, uploadFile, getPosts, createPost, markCompletion, checkCompletion,
    getUserRoutines, searchRoutines, searchPosts, searchUsers, getComments, createComment, clearCompletionMapping, sendMessageToRoom, getRoomMessages,
    checkJoinStatus, getNumCompletions, clearLiveFeed, getDisplayName, completeTest, getGraphData
};
