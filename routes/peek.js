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

function peek(app) {
    app.post('/peek/set/array',(req,res)=>{
        let array = req.body.array;
        saveLeft_roulette_array = array;
        res.send(200);
    });   

    app.get('/peek/get/array',(req,res)=>{
        res.send(saveLeft_roulette_array);
    });
}