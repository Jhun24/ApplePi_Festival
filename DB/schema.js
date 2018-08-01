let mongoose = require('mongoose');
let Logger = require('../func/color').Logger;
let random_string = require('randomstring');

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

let Admin = new mongoose.Schema({
    admin_token : String,
    id: String ,
    password : String,    
});

let adminModel = mongoose.model('adminModel',Admin);
let userModel = mongoose.model('userModel',User);

let setAdmin = new adminModel({
    token: random_string.generate(),
    id:'ApplePi_is_best',
    password:'edcan'
});

setAdmin.save((err,model)=>{
    if(err) throw err;

    Logger.info('Set Admin Success');
    Logger.info('Admin ID : ApplePi_is_best');
    Logger.info('Admin Password : edcan');
});

exports.User = userModel;
exports.Admin = adminModel;