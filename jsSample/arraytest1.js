let arr = [10,20,30,40];
console.log("arr길이:"+arr.length);
arr.splice(1,1); //arr의 함수 ( 값만 삭제 되는 것이 아니라 java의 배열에서 삭제하듯이 뒤의 요소들도 앞으로 당겨와진다.)
delete arr[1];
console.log("arr"+arr);
console.log("삭제 후 arr길이:"+arr.length);

arr.splice(1,2,100,200); //1번인덱스부터 2개 삭제후 100,200삽입
console.log(arr);
arr.splice(2,0,300,400,200); //삭제하지않고 2번째 300,400을 집어넣음
console.log(arr);

//splice는 원본 배열을 건드린다.
//반면 slice는 배열의 부분요소를 복사해온다.

//slice : 배열의 부분 요소 가져오기
let arr2 = [10,20,30,40,50,60,70,80];
let subarr = arr2.slice(2,5); // arr2의 인덱스2번부터 인덱스5번째 아래까지 즉 [2]~[4]까지 5는 미포함.
console.log(subarr);

//concat :원본은 바뀌지않고, 두개의 배열을 연결
let arr3 = [1,2];
let totarr = arr3.concat(3,4);
console.log(arr3);
console.log(totarr);
//concat은 안에 배열을 넣을 수도, 배열을 담은 변수를 넣을 수 있다.
let arr4 = [10,20];
let totarr2 = arr3.concat(3,4,[4,5],arr4);
console.log(totarr2);

