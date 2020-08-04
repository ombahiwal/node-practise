const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db)=>{
    console.log("Connected Correctly to the MongoDB Server");
    /*
    var newDish = Dishes({
        name: 'Utthapizza',
        description: 'test'
    });


    newDish.save().then((dish)=>{
        console.log(dish);
        return Dishes.findByIdAndUpdate(dish._id, {$set: {
            description: "Updated test"}},{
            new: true
    }).exec();
    }).then((dishes) => {
        console.log(dishes);
        dishes.comments.push({
            rating: 5,
            comment: "Hello Comments",
            Author: "Omkar B"
        })
        return Dishes.save();
    }) .then(()=> {
        return Dishes.remove()
    }).then(()=>{
        return mongoose.connection.close();
    }).catch((err)=>{
        console.log(err);
    });
    */

        Dishes.create({
            name: 'Uthappizza',
            description: 'test'
        })
        .then((dish) => {
            console.log(dish);

            return Dishes.findByIdAndUpdate(dish._id, {
                $set: { description: 'Updated test'}
            },{ 
                new: true 
            })
            .exec();
        })
        .then((dish) => {
            console.log(dish);

            dish.comments.push({
                rating: 5,
                comment: 'I\'m getting a sinking feeling!',
                author: 'Leonardo di Carpaccio'
            });

            return dish.save();
        })
        .then((dish) => {
            console.log(dish);

            return Dishes.remove({});
        })
        .then(() => {
            return mongoose.connection.close();
        })
        .catch((err) => {
            console.log(err);
        });
});

