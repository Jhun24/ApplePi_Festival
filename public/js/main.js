const time_timer = document.getElementById('start-btn');
const timer_stop = document.getElementById('stop-btn');
const timer_refresth = document.getElementById('refresh-btn');

const main = document.getElementById('main');
const roulette = document.getElementById('roulette');
const user_list = document.getElementById('user-list');
const peek = document.getElementById('peek');

const main_box = document.getElementById('main-box');
const peek_box = document.getElementById('peek-box');
const roulette_box = document.getElementById('roulette-box');
const user_list_box = document.getElementById('user-list-box');

const roulette_btn = document.getElementById('roulette-btn');

const popup = document.getElementById('sundal-popup');

const select_list = document.getElementById('sources');
const popup_card = document.getElementsByClassName('popup-card');


let intervalFunction;
let user_name_array = new Array();

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

    $.ajax({
        method:'GET',
        url:'/admin/data',
        success:function (data) {
            if(data.status == 200){
                let user_list_data = data.data;
                let input_html = '<div class="user-list-box-layout">';

                for(let o = 0; o<user_list_data.length; o++){
                    if(user_list_data[o].setting == true){
                        input_html+='<div class="user-list-box-content">';
                        input_html+='<img src="'+user_list_data[o].game_data.card+'">';
                        input_html+='<h4>'+user_list_data[o].user_name+'</h4>';
                        if(user_list_data[o].die){
                            input_html+='<p> 현재 상태 : 해고</p>';
                        }
                        else{
                            input_html+='<p> 현재 상태 : 생존</p>';
                        }
                        input_html+='</div>';

                        if((o+1)%4 == 0){
                            input_html+='</div>';
                            input_html+='<div class="user-list-box-layout">';
                        }

                        if(o == (user_list_data.length - 1)){
                            input_html+='<div class="user-list-box-null"></div>';
                            input_html+='</div>';
                        }
                    }
                }

                user_list_box.innerHTML = input_html;
            }
            else if(data.status == 404){
                alert('게임을 시작해주세요');
            }
            else if(data.status == 401){
                alert('관리자가 아닙니다!');
                window.close();
            }
        },
        error:function (err) {
            console.log(err);
        }
    });
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
    let get_peek_url = '';
    $.ajax({
        method:'GET',
        url:'/peek/get/sundal',
        success:function (url) {
            console.log(url);
            if(url.status == 404){
                alert("엿보기 오류났다 다시해라");
            }
            else{
                get_peek_url = url;
                $.ajax({
                    method:'GET',
                    url:'/admin/data',
                    success:function (data) {
                        if(data.status == 200){
                            let user_list_data = data.data;
                            let input_html = '<div class="peek-box">';
                            input_html+='<div class="peek-box-layout">';

                            for(let o = 0; o<user_list_data.length; o++){
                                if(user_list_data[o].setting == true){
                                    input_html+='<div class="peek-box-data">';
                                    input_html+='<div class="peek-on">'
                                    input_html+='<p>'+user_list_data[o].user_name+'</p>'
                                    input_html+='</div>';
                                    input_html+='<div class="peek-hover">';
                                    if(user_list_data[o].game_data.name == "김선달"){
                                        console.log(get_peek_url);
                                        input_html += '<img src="'+get_peek_url+'">';

                                    }
                                    else{
                                        input_html += '<img src="'+user_list_data[o].game_data.card+'">'
                                    }
                                    input_html+='</div>';
                                    input_html+='</div>';
                                }
                                if((o+1)%4 == 0){
                                    input_html+='</div>';
                                    input_html+='<div class="peek-box-layout">';
                                }

                                if(o == (user_list_data.length - 1)){
                                    input_html+='<div class="peek-box-null"></div>';
                                    input_html+='</div>';
                                    input_html+='</div>';
                                }
                            }

                            peek_box.innerHTML = input_html;
                        }
                        else if(data.status == 404){
                            alert('게임을 시작해주세요');
                        }
                        else if(data.status == 401){
                            alert('관리자가 아닙니다!');
                            window.close();
                        }
                    },
                    error:function (err) {
                        console.log(err);
                    }
                });
            }
        },
        error:function (err) {
            console.log(err);
        }
    });
});

roulette_btn.addEventListener('click',()=>{
    let rand = Math.floor(Math.random()*roulette_array.length);
    let game_name = roulette_array[rand];
    let user_name = select_list.value;

    $.ajax({
        method:'POST',
        url:'/admin/set/user',
        data:{
            game_name:game_name,
            user_name:user_name
        },
        success:function (data) {
            if(data.status == 200){
                alert(user_name+'님의 직업은 '+game_name+'입니다\n' +
                    '직업에 대한 자세한 내용은 지니어스 게임 어플에서 확인해주세요');
                if(game_name == '김선달'){
                    popup.style.display = 'flex';
                }

                roulette_array.splice(rand,1);
                console.log(roulette_array);
            }
            else if(data.status == 401){
                alert('이미 직군을 선택하셨습니다!');
            }
        },
        error:function (err) {
            console.log(err);
        }
    });

});

time_timer.addEventListener('click',()=>{
    intervalFunction = setInterval(timer,1000);
});

timer_stop.addEventListener('click',()=>{
    clearInterval(intervalFunction);
});

timer_refresth.addEventListener('click',()=>{
    "use strict";
    second = 60;
    minute = 9;

    document.getElementById('minite').innerHTML = '10';
    document.getElementById('second').innerHTML = '00';
});

for(let i = 0; i<popup_card.length; i++){
    Array.from(popup_card).forEach(function(element) {
        element.addEventListener('click', set_peek);
    });
}

window.onload = function(){
    select();
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
    });
}

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

function select(){
    "use strict";
    $.ajax({
        method:'GET',
        url:'/admin/data',
        success:function (data) {
            if(data.status == 401){
                alert("관리자가 아닙니다!");
                window.close();
            }
            else if(data.status == 404){
                alert("게임을 시작해주세요!");
            }
            else if(data.status == 200){
                console.log(data);
                let user_data = data.data;

                for(let i = 0; i<11; i++){
                    user_name_array[i] = user_data[i].user_name;
                    let option = document.createElement('option');
                    option.text = user_name_array[i];
                    option.value = user_name_array[i];
                    select_list.add(option);
                }

                $(".custom-select").each(function() {
                    var classes = $(this).attr("class"),
                        id      = $(this).attr("id"),
                        name    = $(this).attr("name");
                    var template =  '<div class="' + classes + '">';
                    template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
                    template += '<div class="custom-options">';
                    $(this).find("option").each(function() {
                        template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
                    });
                    template += '</div></div>';

                    $(this).wrap('<div class="custom-select-wrapper"></div>');
                    $(this).hide();
                    $(this).after(template);
                });
                $(".custom-option:first-of-type").hover(function() {
                    $(this).parents(".custom-options").addClass("option-hover");
                }, function() {
                    $(this).parents(".custom-options").removeClass("option-hover");
                });
                $(".custom-select-trigger").on("click", function() {
                    $('html').one('click',function() {
                        $(".custom-select").removeClass("opened");
                    });
                    $(this).parents(".custom-select").toggleClass("opened");
                    event.stopPropagation();
                });
                $(".custom-option").on("click", function() {
                    $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
                    $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
                    $(this).addClass("selection");
                    $(this).parents(".custom-select").removeClass("opened");
                    $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
                });
            }
        },
        error:function (err) {
            console.log(err);
        }
    });
}

function set_peek(){
    let user_name = select_list.value;
    let card_url = this.src;
    let id = this.id;

    console.log('User name : '+ user_name);
    console.log("card url : "+card_url);
    console.log("id : " + id);

    let name = '';

    if(id == 'simchung'){
        name='심청';
    }
    else if(id == 'intern'){
        name='인턴';
    }
    else if(id == 'kimsajang'){
        name='김사장';
    }
    else if(id == 'kimseja'){
        name='김세자';
    }
    else if(id == 'mongryong'){
        name='이몽룡';
    }
    else if(id == 'simchajang'){
        name='심차장';
    }
    else if(id == 'parkbujang'){
        name='박부장';
    }
    else if(id == 'leesangmu'){
        name='이상무';
    }
    else if(id == 'gildong'){
        name='홍길동';
    }
    else if(id == 'chunhayng'){
        name='성춘향';
    }

    $.ajax({
        method:'POST',
        url:'/peek/set/sundal',
        data:{
            peek_name:name,
            user_name:user_name,
            card_url:card_url
        },
        success:function (data) {
            alert(user_name+'님의 엿보기가 '+name+'으로 설정되었습니다!');
            popup.style.display = 'none';
            return null;
        },
        error:function (err) {
            console.log(err);
        }
    });
}