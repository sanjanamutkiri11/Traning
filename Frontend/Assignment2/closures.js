//Create a counter
function createCounter() {
    let count = 0;   
  
    return function () {
      count++;       
      console.log(count);
    };
  }
  
  const counter1 = createCounter();
  
  counter1(); 
  counter1(); 
  counter1(); 
  
  const counter2 = createCounter();
  counter2(); 
//inner function acess
function outer() {
    let message = "Hello";
  
    function inner() {
      console.log(message);  
    }
  
    inner();
  }
  
  outer();
  