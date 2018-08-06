/**
 * Created by janghunlee on 2018. 8. 5..
 */
module.exports = peek;

let saveLeft_roulette_array = [
    '김사장',
    '이상무',
    '박부장',
    '심차장',
    '김세자',
    '이몽룡',
    '성춘향',
    '홍길동',
    '김선달',
    '심청',
    '인턴'
];

let { Peek } = require('../DB/schema');

function peek(app) {
    app.post('/peek/set/array',(req,res)=>{
        let array = req.body.array;
        saveLeft_roulette_array = array;
        res.send(200);
    });   

    app.get('/peek/get/array',(req,res)=>{
        res.send(saveLeft_roulette_array);
    });

    app.post('/peek/set/sundal',(req,res)=>{
        "use strict";
        let user_name = req.body.user_name;
        let peek_name = req.body.peek_name;
        let card_url = req.body.card_url;

        let savePeek = new Peek({
            card_url:card_url
        });

        savePeek.save((err,model)=>{
            if(err) throw err;
            res.send(200);
        });
    });

    app.get('/peek/get/sundal',(req,res)=>{
        "use strict";
        Peek.find({},(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                res.send({
                    status:404
                });
            }
            else{
                res.send(model[0].card_url);
            }
        });
    });
}