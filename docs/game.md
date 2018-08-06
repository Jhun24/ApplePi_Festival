#GET : /game/data/:token

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
    
#POST : /game/fire

    상대방을 해고하는 쿼리입니다
    
> Require 

    user_token : 자기 자신의 토큰을 의미합니다
    oppenent_token : 해고할 상대방의 토큰을 의미합니다
    
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

#POST : /game/move

    방을 이동하는 쿼리입니다