module.exports = game;

let { User } = require('../DB/schema');
let async = require('async');

function game(app , startGame){
    app.get('/game/data/:token',(req,res)=>{
        let token = req.params.token;
        
        async.waterfall([
            function(cb){
                User.find({user_token : token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 401 , 'Unauthorized Token');
                    }
                    else{
                        cb(null , 200 , model[0]);
                    }
                });
            }
        ],function(cb , status , data){
            if(cb == true){
                res.send({
                    status:status,
                    message:data
                });
            }
            else if(cb == null){
                res.send({
                    status:status,
                    data:data
                });
            }
        });
    });

    app.post('/game/fire',(req,res)=>{
        let user_token = req.body.user_token;
        let oppenent_token = req.body.oppenent_token;

        let result_fire = startGame.fire(user_token , oppenent_token);
        
        res.send({
            status:result_fire.status,
            message:result_fire.message
        });
    });

    app.post('/game/move/check',(req,res)=>{
        let user_token = req.body.user_token;

        let result_move_check = startGame.move_check(user_token);

        res.send({
            status:result_move_check.status,
            message:result_move_check.message
        });
    });

    app.post('/game/move',(req,res)=>{
        let user_token = req.body.user_token;
        let move_department = req.body.move_department;

        let result_move = startGame.move(user_token,move_department);
        
        res.send({
            status:result_move.status,
            message:result_move.message
        });
    });

    app.get('/game/user/list/:token',(req,res)=>{
        "use strict";
        let user_token = req.params.token;
        
        async.waterfall([
            function (cb) {
                User.find({user_token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 401 , "Unauthorized Token");
                    }
                    else{
                        cb(null);
                    }
                });
            },
            function (cb) {
                User.find({},(err,model)=>{
                    if(err) throw err;
                    let user_array = new Array();
                    for(let i = 0; i<user.length; i++){
                        user_array[i] = new Object();
                        user_array[i] = {
                            user_name:user[i].user_name,
                            user_token:user[i].user_token,
                            user_profile:'/img/profile.png'
                        }
                    }
                    cb(null , 200 , user_array);
                });
            }
        ],function (cb , status , data) {
            if(cb == true){
                res.send({
                    status:status,
                    message:data
                });
            }
            else if (cb == null){
                res.send({
                    status:status,
                    data:data
                });
            }
        })
    });

    app.get('/game/room/member/:token',(req,res)=>{
        "use strict";
        let user_token = req.params.token;

        async.waterfall([
            function (cb) {
                User.find({user_token:user_token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 401 , "Unauthorized Token");
                    }
                    else{
                        cb(null , model[0].now_room);
                    }
                });
            },
            function (now_room , cb) {
                User.find({now_room:now_room},(err,model)=>{
                    if(err) throw err;
                    let return_data = new Object();
                    return_data = {
                        room_name : now_room,
                        user_list : new Array()
                    }

                    for(let i = 0; i<model.length; i++){
                        return_data.user_list[i] = new Object();
                        return_data.user_list[i] = {
                            user_name:model[i].user_name,
                            user_token:model[i].user_token
                        }
                    }

                    cb(null , 200 , return_data);
                });
            }
        ],function (cb , status , data) {
             if(cb == true){
                 res.send({
                     status:status,
                     message:data
                 });
             }
             else if(cb == null){
                 res.send({
                     status:status,
                     data:data
                 });
             }
        });
    });
}