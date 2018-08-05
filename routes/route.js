/**
 * Created by janghunlee on 2018. 8. 5..
 */
module.exports = route;

function route(app) {
    app.get('/nimda/admin',(req,res)=>{
        "use strict";
        res.render('admin.html');
    })
}