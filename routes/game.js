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
}