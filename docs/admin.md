# GET : /admin/user/list

    유저 토큰 + 유저 이름 받아오기
    
> Require

    없음
    
> Response : Success

    status : 200
    data : data
    
    EX:
    
    data[0] = {
        user_name : String
        user_token : String
    }
    
> Response : Fail

    status : 401
    message : Unauthorized Admin Token
    
> Response : Fail

    status : 404
    message : Please Start Game