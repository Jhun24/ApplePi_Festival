/**
 * Created by janghunlee on 2018. 8. 8..
 */
window.onload = function () {
    $.ajax({
        method:'GET',
        url:'/admin/get/result',
        success:function (data) {
            if(data.status == 200){
                let user = data.data;

                let input_html = '';
                for(let i = 0; i<user.length; i++){
                    input_html+='<div class="watch-layout">'
                    input_html+='<img src="'+user.card+'">'
                    input_html+='<div class="box">'
                    input_html+='<h4>'+user.user_name+'</h4>';
                    input_html+='<p>'+user.game_name+'</p>';
                    if(user.win){
                        input_html+='<h2>'+승리+'</h2>';
                    }
                    else{
                        input_html+='<h2>'+패배+'</h2>';
                    }
                    input_html+='</div></div>';
                }

                document.getElementById('watch').innerHTML = input_html;
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