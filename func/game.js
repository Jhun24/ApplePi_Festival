let { User } = require('../DB/schema');
let async = require('async');

class Game{
    constructor(){
        this.nojo = 4;
        this.fire_total = 0;
        this.sanmu_fire_total = 0;
        this.bujang_fire_total = 0;
    }

    move(user_token){
       async.waterfall([
           function(cb){
               User.find({user_tokne:user_token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 401 , 'Unauthorized Token');
                    }
                    else{
                        if(model[0].now_room == model[0].game_data.department){
                            cb(null , 200, "어느 부서로든 갈 수 있습니다");
                        }
                        else{
                            cb(null , 200 , model[0].game_data.department+" 부서로 가야합니다");
                        }
                    }
               });
           }
       ],function(cb , status , data){
            if(cb == true || cb == null){
                return {
                    status:status,
                    message:data
                }
            }
       });
    }

    fire(user_token , fire_token){
        async.waterfall([
            function(cb){
                User.find({user_token:user_token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 401 , 'Unauthorized Token');
                    }
                    else{
                        cb(null , user);
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
                 if(user.game_data.rank < fire.game_data.rank){

                    if(fire.game_data.name == '김세자'){
                        this.fire_total = this.fire_total + user.game_data.pay_number;
                        User.update({user_token:user.user_token},{$set:{die:true}},(err,model)=>{
                            if(err) throw err;
                            cb(null , 200 , "당신이 해고 되었습니다");
                        });
                    }
                    else if(fire.game_data.uniqueness[0] == '노동조합'){
                        User.find({now_room:fire.now_room},(err,model)=>{
                            if(err) throw err;
                            if(model.length == 0){
                                cb(true , 403 , "Access Denied");
                            }
                            else{
                                if(this.nojo == model.length){
                                    cb(null , 200 , "상대방을 해고 할 수 없습니다");
                                }
                                else{
                                    if(user.game_data.name = '박부장'){
                                        this.bujang_fire_total = this.bujang_fire_total + fire.game_data.pay_number;         
                                    }
                                    else if(user.game_data.name = '이상무'){
                                        this.sanmu_fire_total = this.sanmu_fire_total + fire.game_data.pay_number;
                                    }

                                    this.nojo = this.nojo - 1;
                                    this.fire_total = this.fire_total + fire.game_data.pay_number;
                                    User.update({user_token:fire.user_token},{$set:{die:true}},(err,model)=>{
                                        if(err) throw err;
                                        cb(null , 200 , "상대를 성공적으로 해고 시켰습니다!");
                                    });
                                }
                            }
                        })   
                    }
                    else{
                        if(user.game_data.name = '박부장'){
                            this.bujang_fire_total = this.bujang_fire_total + fire.game_data.pay_number;         
                        }
                        else if(user.game_data.name = '이상무'){
                            this.sanmu_fire_total = this.sanmu_fire_total + fire.game_data.pay_number;
                        }

                        this.nojo = this.nojo - 1;
                        this.fire_total = this.fire_total + fire.game_data.pay_number;
                        User.update({user_token:fire.user_token},{$set:{die:true}},(err,model)=>{
                            if(err) throw err;
                            cb(null , 200 , "상대를 성공적으로 해고 시켰습니다!");
                        });
                    }
                 }
                 else{
                     cb(true , 200 , "상대방을 해고 할 수 없습니다");
                 }
            }
        ],function(cb , status , data){
            if(cb == true || cb == null){
                return{
                    status:status,
                    message:data
                }
            }
        });
    }
}
 