module.exports = game;

let { User , Check } = require('../DB/schema');
let async = require('async');               
let Logger = require('../func/color').Logger;

function game(app , startGame , io){
    io.sockets.on('connection',(socket)=>{
        socket.on('game_start_check',(data)=>{
            Logger.info('game_start_check : '+data);
            Check.update({},{$set:{game:true}},(err,model)=>{
                if(err) throw err;
                socket.broadcast.emit('game_start_check',true);
            });

        });

        socket.on('round_start_check',(data)=>{
            Logger.info('round start message '+data);
            if(data == true){
                Check.find({},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        socket.broadcast.emit('round_start_check',404);
                    }
                    else{
                        let check_data = model[0];

                        if(check_data.game == true){   
                            if(check_data.round_one == true){
                                if(check_data.round_two == true){
                                    if(check_data.round_three == true){
                                        if(check_data.round_four == true){
                                            socket.broadcast.emit('round_start_check','Game Finish');
                                        }
                                        else{
                                            Check.update({},{$set:{round_four:true,now_round:'round_four'}},(err,model)=>{
                                                if(err) throw err;
                                                socket.broadcast.emit('round_start_check',true);
                                            });
                                        }
                                    }
                                    else{
                                        Check.update({},{$set:{round_three:true,now_round:'round_three'}},(err,model)=>{
                                            if(err) throw err;
                                            socket.broadcast.emit('round_start_check',true);
                                        });
                                    }
                                }
                                else{
                                    Check.update({},{$set:{round_two:true,now_round:'round_two'}},(err,model)=>{
                                        if(err) throw err;
                                        socket.broadcast.emit('round_start_check',true);
                                    });
                                }
                            }
                            else{
                                Check.update({},{$set:{round_one:true , now_round:'round_one'}},(err,model)=>{
                                    if(err) throw err;
                                    socket.broadcast.emit('round_start_check',true);
                                });
                            }
                        }
                        else{
                            socket.broadcast.emit('round_start_check',"Please Start Game");
                        }
                    }
                });
            }
            else{
                socket.broadcast.emit('round_start_check',false);
            }
        });
    });



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
        let fire_token = req.body.oppenent_token;

        async.waterfall([
            function(cb){
                User.find({user_token:user_token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 401 , 'Unauthorized Token');
                    }
                    else{
                        cb(null , model[0]);
                    }
                });
            },
            function(user , cb){
                User.find({user_token:fire_token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 401 , "Unauthorized Token");
                    }
                    else{
                        cb(null , user , model[0]);
                    }
                });
            },
            function(user , fire , cb){

                if(user.game_data.rank < fire.game_data.rank && user.now_room == fire.now_room){

                    if(fire.game_data.name == '김세자'){
                        startGame.fire_total = startGame.fire_total + user.game_data.pay_number;
                        User.update({user_token:user.user_token},{$set:{die:true}},(err,model)=>{
                            if(err) throw err;
                            cb(null , 200 , "당신이 해고 되었습니다" , user.user_name);
                        });
                    }
                    else if(fire.game_data.uniqueness[0] == '노동조합'){
                        User.find({now_room:fire.now_room},(err,model)=>{
                            if(err) throw err;
                            if(model.length == 0){
                                cb(true , 403 , "Access Denied");
                            }
                            else{
                                let check_alive_nojo = 0;
                                for(let i = 0; i<model.length; i++){
                                    if(model[i].game_data.uniqueness[0] == '노동조합' && model[i].die == false){
                                        check_alive_nojo++;
                                    }
                                }
                                if(startGame.nojo == check_alive_nojo){
                                    cb(null , 200 , "상대방을 해고 할 수 없습니다");
                                }
                                else{
                                    if(user.game_data.name == '박부장'){
                                        startGame.bujang_fire_total = startGame.bujang_fire_total + fire.game_data.pay_number;
                                    }
                                    else if(user.game_data.name == '이상무'){
                                        startGame.sanmu_fire_total = startGame.sanmu_fire_total + fire.game_data.pay_number;
                                    }

                                    startGame.nojo = startGame.nojo - 1;
                                    startGame.fire_total = startGame.fire_total + fire.game_data.pay_number;
                                    User.update({user_token:fire.user_token},{$set:{die:true}},(err,model)=>{
                                        if(err) throw err;
                                        cb(null , 200 , "상대를 성공적으로 해고 시켰습니다!" , fire.user_name);
                                    });
                                }
                            }
                        })
                    }
                    else{
                        if(user.game_data.name == '박부장'){
                            startGame.bujang_fire_total = startGame.bujang_fire_total + fire.game_data.pay_number;
                        }
                        else if(user.game_data.name == '이상무'){
                            startGame.sanmu_fire_total = startGame.sanmu_fire_total + fire.game_data.pay_number;
                        }

                        startGame.nojo = startGame.nojo - 1;
                        startGame.fire_total = startGame.fire_total + fire.game_data.pay_number;
                        User.update({user_token:fire.user_token},{$set:{die:true}},(err,model)=>{
                            if(err) throw err;

                            cb(null , 200 , "상대를 성공적으로 해고 시켰습니다!" , fire.user_name);
                        });
                    }
                }
                else{
                    cb(true , 200 , "상대방을 해고 할 수 없습니다");
                }
            }
        ],function(cb , status , data , user_name){
            if(cb == true || cb == null){
                res.send({
                    status:status,
                    message:data
                });
            }
        });

    });

    app.post('/game/move',(req,res)=>{
        let user_token = req.body.user_token;
        let part = req.body.move_department;
        let user_name = ''

        Logger.info(part);

        async.waterfall([
            function(cb){
                if((part == '생산') || (part == '인사') || (part == '영업')){
                    cb(null);
                }
                else{
                    cb(true , 403 , "접근 부서가 잘못되었습니다");
                }
            },
            function(cb){
                User.find({user_token:user_token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 401 , "Unauthorized Token");
                    }
                    else{
                        user_name = model[0].user_name;
                        cb(null , model[0]);
                    }
                });
            },
            function(data ,cb){
                if(data.game_data.department == '없음'){
                    cb(null , 0);
                }
                else if(data.now_room == "없음"){
                    cb(null , 0);
                }
                else if(data.now_room == data.game_data.department){
                    cb(null , 0);
                }
                else if (data.now_room != data.game_data.department && data.game_data.department != part){
                    cb(null , 1);
                }
                else if(data.now_room != data.game_data.department && data.game_data.department == part){
                    cb(null , 0);
                }
                else{
                    cb(true , 500 , "Move Function Error");
                }
            },
            function(code , cb){
                if(code == 0){
                    User.update({user_token:user_token},{$set:{now_room:part}},(err,model)=>{
                        if(err) throw err;
                        cb(null , 200 , "이동에 성공하셨습니다");
                    });
                }
                else if(code == 1){
                    cb(null , 200 , "이동이 불가능합니다")
                }
                else{
                    cb(true , 500 , "Move Function Error");
                }
            }
        ],function(cb , status , data){
            if(cb == true || cb == null){
                res.send({
                    status:status,
                    message:data
                });
            }
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
                    for(let i = 0; i<model.length; i++){
                        user_array[i] = new Object();
                        user_array[i] = {
                            user_name:model[i].user_name,
                            user_token:model[i].user_token,
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
                        if(model[i].die == false){
                            return_data.user_list[i] = new Object();
                            return_data.user_list[i] = {
                                user_name:model[i].user_name,
                                user_token:model[i].user_token
                            }
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


    app.get('/game/check/start',(req,res)=>{
        Check.find({},(err,model)=>{
            if(err) throw err;
            res.send({
                status:200,
                data:model
            });
        });
    });
    app.get('/game/fire/user/list',(req,res)=>{
        async.waterfall([
            function(cb){
                User.find({},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                       cb(true , 404 , "Please Start Game")
                    }
                    else{
                        cb(null , model);
                    }
                });
            },
            function(model , cb){
                let fire_member = new Array();
                let i = 0;

                async.during(
                    function(cb){
                        count < model.length
                    },
                    function(cb){
                        if(model[i].die == true){
                            fire_member = new Object();
                            fire_member = model[i];
                        }
                    },
                    function(err , res){
                        cb(null , 200 , fire_member);
                    }
                )
            
            }
        ],function(cb,status,data){
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

    app.get('/game/check/refresh',(req,res)=>{
        Check.find({game:true},(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                res.send({
                    status:404,
                    message:"Please Start game"
                })
            }
            else{
                Check.remove({game:true},(err,model)=>{
                    if(err) throw err;
                    let saveCheck = new Check({
                        game:true,
                        round_one:false,
                        round_two:false,
                        round_three:false,
                        round_four:false,
                        now_round : 'round_one',
                    });
        
                    saveCheck.save((err,model)=>{
                        if(err) throw err;
                        res.send({
                            status:200,
                            message:"Refresh Success"
                        }) 
                    });
                });
            }
        });
    });

}