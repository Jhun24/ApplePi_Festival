let data = {
    '김사장':{
        pay:'없음',
        pay_number : 0,
        department:'없음',
        win_condition:[
            '종료 시 5명 이상 생존',
            '총 감축액 2억 2천만원 이상'
        ],
        lose_condition:'승리 조건 실패',
        uniqueness:[
            '직원 해고 시 아무 일도 일어나지 않음',
            '아들 김세자의 정체를 앎',
            '부서없음'
        ],
        rank:1
    },
    '이상무':{
        pay:'1억 2천만원',
        pay_number:120000000,
        department:'생산',
        win_condition:['생존'],
        lose_condition:'해고',
        uniqueness:[
            '본인이 직접 해고해서 1억 2천만원 이상 감축',
            '목표 미달성시 해고'
        ],
        rank:2
    },
    '박부장':{
        pay:'7천만원',
        pay_number:700000000,
        department:'인사',
        win_condition:[
            '생존'
        ],
        lose_condition:'해고',
        uniqueness:[
            '본인이 직접 해고해서 7천만원 이상 감축',
            '목표 미달성시 해고'
        ],
        rank:3
    },
    '심차장':{
        pay:'6천만원',
        pay_number:60000000,
        department:'영업',
        win_condition:['박부장의 패배'],
        lose_condition:'박부장의 승리',
        uniqueness:['감축 목표 없음'],
        rank:4
    },
    '김세자':{
        pay:'6천만원',
        pay_number:60000000,
        department:'생산',
        win_condition:['김사장의 승리'],
        lose_condition:'김사장의 패배',
        uniqueness:[
            '사장아들',
            '김세자를 해고하는 플레이어는 김세자 대신 해고됨',
            '아버지 김사장의 정체를 앎'
        ],
        rank:5,
    },
    '이몽룡':{
        pay:'4천만원',
        pay_number:40000000,
        department:'영업',
        win_condition:['생존'],
        lose_condition:'해고',
        uniqueness:[
            '노동조합',
            '성춘향과 커플, 서로의 정체를 앎'
        ],
        rank:5,
    },
    '성춘향':{
        pay:'4천만원',
        pay_number:40000000,
        department:'생산',
        win_condition:['생존'],
        lose_condition:'해고',
        uniqueness:[
            '노동조합',
            '이몽룡과 커플, 서로의 정체를 앎'
        ],
        rank:5,
    },
    '홍길동':{
        pay:'3천만원',
        pay_number:30000000,
        department:'인사',
        win_condition:['생존'],
        lose_condition:'해고',
        uniqueness:[
            '노동조합',
        ],
        rank:5,
    },
    '김선달':{
        pay:'3천만원',
        pay_number:30000000,
        department:'영업',
        win_condition:['생존'],
        lose_condition:'해고',
        uniqueness:[
            '노동조합',
            '엿보기 시 자기 정채를 속일 수 있음',
        ],
        rank:5,
    },
    '심청':{
        pay:'3천만원',
        pay_number:30000000,
        department:'인사',
        win_condition:['생존'],
        lose_condition:'해고',
        uniqueness:[
            '심차장의 조카',
            '해고됐어도 심차장이 승리하면 복직됨'
        ],
        rank:5,
    },
    '인턴':{
        pay:'천만원',
        pay_number:10000000,
        department:'없음',
        win_condition:['생존'],
        lose_condition:'해고',
        uniqueness:[
            '부서 없음',
            '엿보기 2명 가능'
        ],
        rank:5,
    }
    
}