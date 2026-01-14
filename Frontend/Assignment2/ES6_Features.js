// Destructure an object 

const user = {
    name: "Akshay",
    age: 25,
    city: "Pune"
  };

const { name, age } = user;

console.log(name); 

console.log(age);  


//Merge two arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const mergedArray = [...arr1, ...arr2];

console.log(mergedArray);

//Function accepting 5 numbers and their sum(rest)

function sumAll(...numbers) {
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return sum;
  }
  
  console.log(sumAll(1, 2, 3, 4, 5)); 
  