const arr = [20, 4, 23, 56, 1, 23];

const multiplied = arr.map(num => num * 2);
console.log(multiplied);

const greaterThan10 = arr.filter(num => num > 10);
console.log(greaterThan10);

const sum = arr.reduce((acc, curr) => acc + curr, 0);
console.log(sum);


const reversed = [...arr].reverse();
console.log(reversed);
