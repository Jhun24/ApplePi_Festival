module.exports = admin;

let async = require('async');
let { User , Admin } = require('../DB/schema');

function admin(app , startGame){
    app.get('/admin/data/:token',(req,res)=>{
        let token = req.params.token;

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
}