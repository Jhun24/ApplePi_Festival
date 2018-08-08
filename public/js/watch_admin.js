/**
 * Created by janghunlee on 2018. 8. 5..
 */
let login = document.getElementsByClassName('login')[0];
let id = document.getElementById('id');
let password = document.getElementById('password');


login.addEventListener('click',()=>{
    $.ajax({
        method:'POST',
        url:'/admin/login',
        data:{
            admin_id:id.value,
            admin_password:password.value
        },
        success:function (data) {
            console.log(data)
            if(data.status == 401){
                alert("관리자가 아닙니다");
            }
            else{
                location.href = '/admin/watch'
            }
        },
        error:function (err) {
            "use strict";
            console.log(err);
        }
    });
});