//function 이면서 class 
//생성자 함수 ! 생성자 함수는 보통 대문자로 시작하고, 반드시 new 연산자를 붙여 실행한다.
function User(name){
    this.name = name;
    this.isAdmin = false;

    // return this; //생략하더라도 암묵적으로 반환한다.
}

let user = new User('hoho');
console.log(user.name);
console.log(user.isAdmin);