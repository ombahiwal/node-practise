// const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Insert Document
exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.insert(document, (err, result) => {
        assert.equal(err, null);
        console.log("Inserted "+result.result.n + "documents into the collection " + collection);
        callback(result);
    });

};


// Find Documents 
exports.findDocuments = (db, collection, callback) =>{
    const coll = db.collection(collection);
    coll.find({}).toArray((err, docs)=>{
        assert.equal(err, null);
        callback(docs);
    });
};

// Remove Document - Delete Operation
exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result)=>{
        assert.equal(err, null);
        console.log("Removed The Document ", document);
        callback(result);
    });

};

// Update Document 
exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    coll.updateOne(document, {$set : update}, null, (err, docs)=>{
        assert.equal(err, null);
        console.log("Updated the documents with ", update);
        callback(docs);
    });
};
