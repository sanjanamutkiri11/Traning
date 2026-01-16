
const timer=setInterval(()=>{
    console.log(c)
    c--;
    if(c<0){
        clearInterval(timer)
        console.log("Time up")
    }
},1000)
let c=4