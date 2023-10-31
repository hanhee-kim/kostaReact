class User{
    constructor(name){
        this.name = name;   //this가 붙지 않으면 단순한 지역변수일 뿐
    }

    sayHello(){
        console.log(`Hello!,${this.name}`);
    }
}

let user = new User('hong');
user.sayHello();