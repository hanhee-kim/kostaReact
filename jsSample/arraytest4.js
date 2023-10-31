let arr = ['사과','오렌지','바나나'];

arr.forEach(function(item,index,array){
    console.log("item:"+item+" index:"+index+" array:"+array);
    console.log(`${index},${item},${array}`);
});

//find : 처음 true 리턴해주는 item을 반환해준다( 한번 )
//여러개를 찾고 싶으면 filter사용
let users = [{id:1,name:'Seoa',age:15},{id:2,name:'Inss',age:20},{id:3,name:'Seoa',age:25},{id:4,name:'Hanhee',age:15}];
//find : 조건을 만족하는 데이터를 찾는다.
let user1 = users.find(function(item){
    return item.name == 'Seoa';
});
console.log(user1);
//filter : 조건을 만족하는 데이터들(여러개)를 찾는다. filter의 반환은 배열이다.
let user2 = users.filter(function(item){
    return item.name == 'Seoa';
});
// console.log(user2);

let user20 = users.filter(function(item){
    return (item.age >=20 && item.age <30 );
})
console.log(user20);

//나이를 하나씩 증가시킴
let usersp = users.map(function(item){
    item.age--;
    return item;
})

console.log(usersp);

//sort는 배열의 원본이 바뀐다. ( 정렬의 기준을 정해주면 정렬되어 리턴 )
users.sort(function(item1,item2){
    // return item2.age - item1.age;
    return item1.name.localeCompare(item2.name);
})
console.log(users);



