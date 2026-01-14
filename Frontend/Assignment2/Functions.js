function add(a,b){
    return a+b;
}

var res=add(2,3)
console.log("result of normal function ",res)


var arrFuncRes = (a,b)=>a+b
console.log("result of arrow function " , arrFuncRes(2,3))


