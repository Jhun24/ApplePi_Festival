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
}