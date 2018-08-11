let mongoose = require('mongoose');
let Logger = require('../func/color').Logger;
let random_string = require('randomstring');

let User_Array = require('../func/user').User_Array;

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

let Peek = new mongoose.Schema({
    card_url:String,
});

let Start_Check = new mongoose.Schema({
    game:Boolean,
    round_one:Boolean,
    round_two:Boolean,
    round_three:Boolean,
    round_four:Boolean,
    now_round: String 
});

let peekModel = mongoose.model('peekModel',Peek);
let adminModel = mongoose.model('adminModel',Admin);
let userModel = mongoose.model('userModel',User);
let logModel = mongoose.model('logModel',Log);
let checkModel = mongoose.model('checkModel',Start_Check);

let setAdmin = new adminModel({
    admin_token: random_string.generate(),
    id:'ApplePi',
    password:'edcan'
});

let startCheck = new checkModel({
    game:false,
    round_one:false,
    round_two:false,
    round_three:false,
    round_four:false,
    now_round : 'game',
});

checkModel.find({},(err,model)=>{
    if(err) throw err;
    if(model.length == 0){
        startCheck.save((err,model)=>{
            if(err) throw err;
        });
    }
});

adminModel.find({},(err,model)=>{
    "use strict";
    if(err) throw err;
    if(model.length == 0){
        setAdmin.save((err,model)=>{
            if(err) throw err;

            Logger.info('Set Admin Success');
            Logger.info('Admin ID : ApplePi');
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
                user_name:User_Array[i],
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
exports.Peek = peekModel;
exports.Check = checkModel;