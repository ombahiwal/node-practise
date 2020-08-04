
// mongod --dbpath=data --bind_ip 127.0.0.1
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Operations File
const dboper = require('./operations');
const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

// DB OPERATIONS test.
MongoClient.connect(url, (err, client)=>{
    assert.equal(err, null);
    console.log("Connected Correctly to the server");
    const db = client.db(dbname);
    dboper.insertDocument(db, {name : "Vadonut", description : "Vada but a donut 1"}, 'dishes', (result) =>{
        console.log("Insert Document : \n", result.ops);
        dboper.findDocuments(db, 'dishes', (docs)=>{
            console.log("Found Documents ", docs);
            dboper.updateDocument(db, {name : 'Vadonut'}, {description: "Updated Test"}, 'dishes', (result) =>{
                console.log("Updated Document :\n", result.result);
                dboper.findDocuments(db, 'dishes', (docs)=>{
                    console.log("Found Documents ", docs);
                    db.dropCollection('dishes', (result)=>{
                        console.log("Dropped Collection : ",result );
                        client.close();
                    });
                });
            });
        });
    });
});



// Mongo Client 
/*
MongoClient.connect(url, (err, client) => {

    assert.equal(err, null);
    console.log('Connected to the MongoDB Server!');
    const db = client.db(dbname);
    // Inserting 
    const collection = db.collection('dishes');
    collection.insertOne({"name":"Utthappizza", "description": "combination of pizza and Utthappa"}, (err, result) => {
        assert.equal(err, null);
        console.log("After Insert");
        // How many operations are carried out.
        console.log(result.ops);

        collection.find({}).toArray((err, docs)=>{
            console.log("Found -");
            console.log(docs);

            db.dropCollection('dishes', (err, result)=> {
                assert.equal(err, null);
                client.close();
            });
        });
    });
});

*/


