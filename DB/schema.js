let mongoose = require('mongoose');
let Logger = require('../func/color').Logger;

mongoose.connect('mongodb://localhost:27017/applepi') ;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    Logger.data("Mongo DB ON");
});

let User = new mongoose.Schema({
    user_name : String,
    user_token : String,
    game_data:{
        name:String,
        pay:String,
        pay_number:Number,
        department:String,
        win_condition:Array,
        lose_condition:String,
        uniqueness:String,
        rank:Number
    },
    die:Boolean,
    now_room : String,
});

let userModel = mongoose.model('userModel',User);

exports.User = userModel;