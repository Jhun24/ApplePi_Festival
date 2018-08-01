module.exports = admin;

function admin(app , startGame){
    app.get('/admin/data/:token',(req,res)=>{
        let token = req.params.token;

        
    });
}