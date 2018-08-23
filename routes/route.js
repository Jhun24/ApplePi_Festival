/**
 * Created by janghunlee on 2018. 8. 5..
 */
module.exports = route;

let { Admin } = require('../DB/schema');

function route(app) {
    app.get('/nimda/admin',(req,res)=>{
        "use strict";
        res.render('admin.html');
    });

    app.get('/admin/main',(req,res)=>{
        "use strict";
        console.log(req.session.token);
        Admin.find({admin_token:req.session.token},(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                res.send({
                    status:401,
                    message:"Unauthorized Admin Token"
                })
            }
            else{
                res.render('main.html');
            }
        });
    });

    app.get('/nimda/admin/watch',(req,res)=>{
        "use strict";
        res.render('watch_admin.html');
    });

    app.get('/admin/watch',(req,res)=>{
        "use strict";
        console.log(req.session.token);
        Admin.find({admin_token:req.session.token},(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                res.send({
                    status:401,
                    message:"Unauthorized Admin Token"
                })
            }
            else{
                res.render('watch.html');
            }
        });
    });

    app.get('/',(req,res)=>{
        res.render("index.html");
    });

    app.get('/card',(req,res)=>{
        res.render('card.html');
    });

    app.get('/main/room',(req,res)=>{
        res.render('main_room.html');
    });

    app.get('/main/game',(req,res)=>{
        res.render('game_room.html');
    });
}
