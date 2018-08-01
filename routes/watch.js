module.exports = watch;

function watch(app , startGame){
    app.get('/watch/show/total',(req,res)=>{
        res.send({
            status:200,
            fire_total:startGame.fire_total,
            sanmu_fire_total:startGame.sanmu_fire_total,
            bujang_fire_total:startGame.bujang_fire_total
        });
    });

    app.get('/watch/show/user',(req,res)=>{
        User.find({},(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                res.send({
                    status:404,
                    message:"Please Start Game"
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
}