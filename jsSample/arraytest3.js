let arr = ['사과','오렌지','바나나'];
for(let i = 0 ; i<arr.length;i++){
    console.log(arr[i]);
}

for(let f of arr){
    console.log("of의 f"+f);
}

//키를 순번으로 주는것, 키와 벨류로 나뉘어 있으면 idx는 key로 쓰인다.
for(let idx in arr){
    console.log("in의 idx"+idx);
}