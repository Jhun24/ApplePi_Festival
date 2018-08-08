# GET : /game/data/:token

    유저 정보를 받아오는 쿼리입니다
    
> Require

    token : 유저 토큰을 의미합니다
    Data type : String
    
    파라미터 방식입니다
    EX : /game/toke/dfoekndsaxix
    
> Response : Success

    status : 200,
    data : 유저 데이터 Object
    
    User Schema 참조
    
> Response : Fail

    status : 401
    data : Unauthorized Token
    
# POST : /game/fire

    상대방을 해고하는 쿼리입니다
    
> Require 

    user_token : 자기 자신의 토큰을 의미합니다
    Data type : String
    
    oppenent_token : 해고할 상대방의 토큰을 의미합니다
    Data type : String 
    
> Response : Success

    status : 200
    message : 상대를 성공적으로 해고 시켰습니다!
    
> Response : Success

    status : 200
    message : 상대방을 해고 할 수 없습니다
    
> Response : Success

    status : 200
    message : 당신이 해고 되었습니다
    
> Response : Fail

    status : 401
    message : Unauthorized Token

# POST : /game/move

    방을 이동하는 쿼리입니다
    
> Require

    user_token : 유저 토큰을 의미합니다
    Data type : String
    
    move_department : 이동할려는 부서를 의미합니다
    Data type : String
    
> Response : Success

    status : 200
    message : 이동에 성공하셨습니다
    
> Response : Success

    status : 200
    message : 이동이 불가능합니다
    
> Response : Fail

    status : 500
    message : Move Function Error
    
> Response : Fail

    status : 403
    message : 접근 부서가 잘못되었습니다
    
> Response : Fail

    status : 401
    message : Unauthorized Token
    
    
# GET : /game/user/list/:token

    게임 참여자 목록을 받아오는 쿼리입니다
    
> Require

    token : 유저 토큰을 의미합니다
    
> Response : Success

    status: 200
    data : User_list Array
    
    EX :
    data[0] = {
        user_name : String,
        user_token : String,
        user_profile : String,
    }
    
> Response : Fail

    status : 401
    message : Unauthorized Token
    
# GET : /game/room/member/:token

    같은 방에 있는 참가자 목록을 받아오는 쿼리입니다
    
> Require

    token : 유저 토큰을 의미합니다
     
> Response : Success

    status : 200
    data : User_list_Object
    
    EX : 
    data : {
        room_name : String
        user_list:[
        {
            user_name : String
            user_token : String
        },
        {
            user_name : String
            user_token : String
        }]
        
> Response : Fail

    status: 401
    message : Unauthorized Token
        

# GET : /game/check/start/:token

> Require

    token : 유저 토큰을 의미합니다

> Response : Success

    status : 200
    start : Boolean

    start = true  : Game Start
    start = false : Waiting

> Response : Fail

    status : 401
    message : Unauthorized Token
