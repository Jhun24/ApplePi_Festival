let { User , Log } = require('../DB/schema');
let async = require('async');
let Logger = require('../func/color').Logger;
let random_string = require('randomstring');

class Game{
    constructor(){
        this.nojo = 4;
        this.fire_total = 0;
        this.sanmu_fire_total = 0;
        this.bujang_fire_total = 0;
    }

    log(user_token , oppenent_token , doing , doing_message){
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
                User.find({user_token:oppenent_token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 401 , "Unauthorized Oppenent Token");
                    }
                    else{
                        cb(null , user , model[0]);
                    }
                });
            },
            function(user , oppenent , cb){
                let user_name = user.user_name;
                let oppenent_name = oppenent.user_name;
                let setTitle = "";
                let setContent = "";

                if(doing == 'fire'){
                    setTitle = user_name+"가 "+oppenent_name+" 해고 시도!"
                    if(doing_message == '당신이 해고 되었습니다'){
                        setContent = user_name+"(직책 : "+user.game_data.name+" )가 "+oppenent_name+"( 직책 : "+oppenent.game_data.name+" )의 특의사항 "+oppenent.game_data.uniqueness[1]+"으로  인해 해고되었습니다!"
                    }
                    else if(doing_message == "상대를 성공적으로 해고 시켰습니다!"){
                        setContent = user_name+"(직책 : "+user.game_data.name+" )가 "+oppenent_name+"( 직책 : "+oppenent.game_data.name+" ) 해고에 성공했습니다!"
                    }
                    else if(doing_message == "상대방을 해고 할 수 없습니다"){
                        setContent = user_name+"(직책 : "+user.game_data.name+" )가 "+oppenent_name+"( 직책 : "+oppenent.game_data.name+" ) 해고에 실패했습니다!"
                    }
                    else{
                        cb(true , 403 , "Fire Message Something Wrong");
                    }
                }
                else if(doing == 'move'){
                    if(doing_message == '이동에 성공하셨습니다'){
                        setTitle = user_name+"가 " + user.now_room+"로 이동!";
                        setContent = user_name+"가 "+user.now_room+"로 이동했습니다!";    
                    }           
                    else{
                        cb(true , 403 , "Move Fail Don't Log");
                    }
                }
                else{
                    cb(true , 403 , "Something Wrong with doing");
                }
                
                let saveLog = new Log({
                    log_token: random_string.generate,
                    title:setTitle,
                    time:new Date(),
                    content:setContent
                });
                
                saveLog.save((err,model)=>{
                    if(err) throw err;
                    Logger.info("Save Log Success");
                    cb(null , 200 , "Save Log Success");
                });
            }
        ],function(cb , status , message){
            if(cb == true || cb == null){
                res.send({
                    status:status,
                    message:message
                });
            }
        });
    }

    move(user_token , part){
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
                        cb(null , model[0]);
                    }
                });
            },
            function(data ,cb){
                if(data.game_data.department == '없음'){
                    cb(null , 0);
                }
                else if(data.now_room == data.game_data.department){
                    cb(null , 0);
                }
                else if (data.now_room != data.game_data.department){
                    cb(null , 1);
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
                else{
                    cb(true , 403 , "이동이 불가능합니다");
                }
            }
        ],function(cb , status , data){
            if(cb == true || cb == null){
                return{
                    status:status,
                    message:data
                };
            }
        });
    }

    move_check(user_token){
       async.waterfall([
           function(cb){
               User.find({user_token:user_token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 401 , 'Unauthorized Token');
                    }
                    else{
                        if(model[0].now_room == model[0].game_data.department){
                            cb(null , 200, "어느 부서로든 갈 수 있습니다");
                        }
                        else if(model[0].game_data.department == '없음'){
                            cb(null , 200 , "어느 부서로든 갈 수 있습니다");
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
 
exports.Game = Game;