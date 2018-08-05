let time_timer = document.getElementById('start-btn');

const main = document.getElementById('main');
const roulette = document.getElementById('roulette');
const user_list = document.getElementById('user-list');
const peek = document.getElementById('peek');

const main_box = document.getElementById('main-box');
const peek_box = document.getElementById('peek-box');
const roulette_box = document.getElementById('roulette-box');
const user_list_box = document.getElementById('user-list-box');

const roulette_btn = document.getElementById('roulette-btn');

let minute = 9;
let second = 60;

let roulette_array = new Array();

main.addEventListener('click',()=>{
    main_box.style.display = 'flex';
    peek_box.style.display = 'none';
    roulette_box.style.display = 'none';
    user_list_box.style.display = 'none';
});

user_list.addEventListener('click',()=>{
    user_list_box.style.display = 'block';
    peek_box.style.display = 'none';
    roulette_box.style.display = 'none';
    main_box.style.display = 'none';
});

roulette.addEventListener('click',()=>{
    roulette_box.style.display = 'flex';
    peek_box.style.display = 'none';
    main_box.style.display = 'none';
    user_list_box.style.display = 'none';
});

peek.addEventListener('click',()=>{
    peek_box.style.display = 'block';
    main_box.style.display = 'none';
    roulette_box.style.display = 'none';
    user_list_box.style.display = 'none';
});

roulette_btn.addEventListener('click',()=>{
    let rand = Math.floor(Math.random()*roulette_array.length);
    let name = roulette_array[rand];

    $.ajax({
        
    })
    roulette_array.splice(rand,1);
    console.log(roulette_array);
    alert(rand);
});

time_timer.addEventListener('click',()=>{
    setInterval(timer,1000);
});

function timer(){
    second--;
    if(second == 0){
        second = 59;
        minute--;
    }
   
    
    if(minute == -1){
        document.getElementById('minite').innerHTML = '00';
        document.getElementById('second').innerHTML = '00';    
    }
    else if(second < 10){
        document.getElementById('minite').innerHTML = '0'+minute;
        document.getElementById('second').innerHTML = '0'+second;
    }
    else{
        document.getElementById('minite').innerHTML = '0'+minute;
        document.getElementById('second').innerHTML = second;
    }
}

window.onload = function(){
    $.ajax({
        method:'GET',
        url:'/peek/get/array',
        success:function(data){
            if(data == 200){
                alert("No Array Data");
            }
            else{
                roulette_array = data;               
            }
        },
        error:function(err){
            console.log(err);
        }
    })
}