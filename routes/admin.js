module.exports = admin;

let async = require('async');
let { User , Admin } = require('../DB/schema');
let GameData = require('../func/gameData').GameData;

function admin(app , startGame){
    app.post('/admin/login',(req,res)=>{
        "use strict";
        let id = req.body.admin_id;
        let password = req.body.admin_password;

        Admin.find({id:id,password:password},(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                res.send({
                    status:401,
                    message:"Unauthorized Admin Token"
                })
            }
            else{
                req.session.token = model[0].admin_token;
                // res.send({
                //     status:200,
                // })
                res.redirect('/admin/main');
            }
        });
    });
    app.get('/admin/data',(req,res)=>{
        let token = req.session.token;

        async.waterfall([
            function(cb){
                Admin.find({admin_token:token},(err,model)=>{
                    if(err) throw err;

                    if(model.length == 0){
                        cb(true , 403 , "Unauthorized Admin Token");
                    }
                    else{
                        cb(null);
                    }
                });
            },
            function(cb){
                User.find({},(err,model)=>{
                    if(err) throw err;

                    if(model.length == 0){
                        cb(true , 404 , "Please Start Game"); 
                    }
                    else{
                        cb(null , 200 , model);
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
        })
    });

    app.get('/admin/get/token/list',(req,res)=>{
        "use strict";
        let admin_token = req.session.token;

        Admin.find({admin_token:admin_token},(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                res.send({
                    status:401,
                    message:"Unauthorized Admin Token"
                });
            }
            else{
                res.send({
                    status:200,
                    data:model
                });
            }
        });
    });

    app.post('/admin/set/user',(req,res)=>{
        "use strict";
        let admin_token = req.session.token;
        let user_name = req.body.user_name;
        let game_name = req.body.game_name;
        
        async.waterfall([
            function (cb) {
                Admin.find({admin_token:admin_token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 401 , "Your Not Admin");
                    }
                    else{
                        cb(null);
                    }
                });
            },
            function (cb) {
                User.find({user_name:user_name , setting:true},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(null);
                    }
                    else{
                        cb(true , 401 , "Already Exist");
                    }
                });
            },
            function (cb) {
                User.find({
                    game_data:{
                        name:game_name
                    }
                },(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(null);
                    }
                    else{
                        cb(true , 401 , "Already Exist");
                    }
                });
            },
            function (cb) {
                User.update({user_name:user_name},{$set:{
                    game_data:{
                        name:game_name,
                        pay:GameData[game_name].pay,
                        pay_number:GameData[game_name].pay_number,
                        department:GameData[game_name].department,
                        win_condition:GameData[game_name].win_condition,
                        lose_condition:GameData[game_name].lose_condition,
                        uniqueness:GameData[game_name].uniqueness,
                        rank:GameData[game_name].rank,
                        profile:GameData[game_name].profile,
                        card:GameData[game_name].card
                    },
                    setting:true
                }},(err,model)=>{
                    if(err) throw err;
                    cb(null , 200 , "Update Success");
                });
            }
        ],function (cb , status , data) {
            if(cb == null || cb == true){
                res.send({
                    status:status,
                    message:data
                });
            }
        });
    });

    app.get('/admin/get/left/part',(req,res)=>{
        "use strict";
        let admin_token = req.session.token
        
        async.waterfall([
            function (cb) {
                Admin.find({admin_token:admin_token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 401, "Unauthorized Admin Token")
                    }
                    else{
                        cb(null);
                    }
                });
            },
            function (cb) {
                User.find({},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 404 , "Please Start Game");
                    }
                    else{
                        cb(null , model);
                    }
                });
            },
            function (user , cb) {
                let name_array = new Array();
                for(let i = 0; i<user.length; i++){
                    if(user.setting == true){
                        name_array[name_array.length] = user.game_data.name;
                    }
                }
                cb(null , 200 , name_array);
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
        })
    });

    app.get('/admin/user/list',(req,res)=>{
        "use strict";
        let admin_token = req.session.token;
        async.waterfall([
            function (cb) {
                Admin.find({admin_token:admin_token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 401 , "Unauthorized Admin Token");
                    }
                    else{
                        cb(null);
                    }
                });
            },
            function (cb) {
                User.find({},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 404 , "Please Start Game");
                    }
                    else{
                        cb(null , model);
                    }
                });
            },
            function (user , cb) {
                let user_array = new Array();
                for(let i = 0; i<user.length; i++){
                    user_array[i] = new Object();
                    user_array[i] = {
                        user_name:user[i].user_name,
                        user_token:user[i].user_token
                    }
                }

                cb(null , 200 , user_array);
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
                })
            }
        });
    });

    app.get('/admin/get/result',(req,res)=>{
        "use strict";
        let admin_token = req.session.token;
        async.waterfall([
            function (cb) {
                Admin.find({admin_token:admin_token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 401 , "Unauthorized Token");
                    }
                    else{
                        cb(null);
                    }
                })
            },
            function (cb) {
                User.find({},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){

                    }
                });
            }
        ])
    });
}