function Person(name,age){
    this.name = name;
    this.age = age;

    //명시적 표시법
    this.info = function(){     //this.info =() =>   : 화살표함수를 사용하여 함수를 정의
        return `이름 :${this.name}, 나이 : ${this.age}`;
    }
    
}

let person = new Person('hoho',20);
console.log(person.info());