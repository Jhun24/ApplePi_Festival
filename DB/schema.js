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
        uniqueness:Array,
        rank:Number,
        profile:String,
        card:String
    },
    setting:Boolean,
    die:Boolean,
    now_room : String,
});

let Admin = new mongoose.Schema({
    admin_token : String,
    id: String ,
    password : String,    
});

let Log = new mongoose.Schema({
    log_token : String,
    title : String,
    time : String,
    content : String
});


let adminModel = mongoose.model('adminModel',Admin);
let userModel = mongoose.model('userModel',User);
let logModel = mongoose.model('logModel',Log);

let setAdmin = new adminModel({
    token: random_string.generate(),
    id:'ApplePi_is_best',
    password:'edcan'
});

adminModel.find({},(err,model)=>{
    "use strict";
    if(err) throw err;
    if(model.length == 0){
        setAdmin.save((err,model)=>{
            if(err) throw err;

            Logger.info('Set Admin Success');
            Logger.info('Admin ID : ApplePi_is_best');
            Logger.info('Admin Password : edcan');
        });
    }
});

userModel.find({},(err,model)=>{
    "use strict";
    if(err) throw err;
    if(model.length == 0){
        for(let i = 0; i < 11; i++){
            let new_user_token = random_string.generate();
            let die = false;
            let room = "없음";

            let setStart = new userModel({
                user_token:new_user_token,
                die:die,
                now_room:room,
                setting:false,
            });

            setStart.save((err , model)=>{
                "use strict";
                if(err) throw err;
                Logger.info((i+1)+"Set Success");
            });
        }
    }
});

exports.User = userModel;
exports.Admin = adminModel;
exports.Log = logModel;