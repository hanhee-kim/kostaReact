let fruits = ['banana'];
let arr = fruits;   //복사(하나의 객체를 같이 참조하고 있는 것.)
//데이터 추가
fruits.push('orange');
console.log(fruits);
console.log(arr);
console.log(arr==fruits);   //하나의 객체를 같이 참조하고 있기 때문에 true

let carr = [...fruits];     //전개연산자 ( 배열을 선언하고 fruits의 값을 모두 그대로 이 배열에 복사해서 집어 넣겠다는 뜻)
fruits.push('strawberry');
console.log(carr);
console.log(fruits);
console.log(carr==fruits);  //전개연산자를 사용하여 복사하였으므로 false ( 분리된 배열이다. )