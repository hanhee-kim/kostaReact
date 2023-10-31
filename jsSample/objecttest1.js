let user = {id:1,name:'hong',age:30};
let user2 = user;
let user3 = {...user};
user.name = 'song';
console.log(user);
console.log(user2);
console.log(user==user2);
console.log(user3);

//원래 가지고 있는 속성 값을 넣으면 변경이 되고, 없는 속성 값을 넣으면 추가가 된다.
let user4 = {...user,age:40};
console.log(user4);








