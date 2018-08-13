/**
 * Created by janghunlee on 2018. 8. 8..
 */
window.onload = function () {
    let socket = io.connect('http://aws.soylatte.kr:3000');

    socket.on('game_start_check',(data)=>{
        console.log('game_start_check' + data);
    });

    socket.on('round_start_check',(data)=>{
        console.log('round start check : '+data)
    });

    socket.on('fire',(data)=>{
        console.log(data+' 님이 해고됬습니다');
    });

    socket.on('영업',(data)=>{
        console.log(data);
    });

    socket.on('인사',(data)=>{
        console.log(data);
    });

    socket.on('생산',(data)=>{
        console.log(data);
    });
    $.ajax({
        method:'GET',
        url:'/admin/get/result',
        success:function (data) {
            if(data.status == 200){
                let user = data.data;
                console.log(data.data);

                let input_html = '';
                for(let i = 0; i<user.length; i++){
                    input_html+='<div class="watch-layout">'
                    input_html+='<img src="'+user[i].profile+'">'
                    input_html+='<div class="box">'
                    input_html+='<h4>'+user[i].user_name+'</h4>';
                    input_html+='<p>'+user[i].game_name+'</p>';
                    if(user[i].win){
                        input_html+='<h2>'+'승리'+'</h2>';
                    }
                    else{
                        input_html+='<h2>'+'패배'+'</h2>';
                    }
                    input_html+='</div></div>';
                }

                document.getElementById('watch-box').innerHTML = input_html;
            }
            else{
                alert("오류 떴다")
            }
        },
        error:function (err) {
            console.log(err);
        }
    })
}