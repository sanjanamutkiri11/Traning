const a=5;
const b='5';

console.log(a==b)
console.log(a===b)


var myname="sanjana mutkiri"
console.log(toTitleCase(myname))

function toTitleCase(myname){
    return myname
    .toLowerCase() 
    .split(' ')    
    .map(function(word) { 
      return word.charAt(0).toUpperCase() + word.slice(1); 
    })
    .join(' '); 
}