const user = {
    name: "Sanjana",
    age: 25,
    city: "Pune"
  };
  
  console.log(user);
  
const keys=Object.keys(user);
console.log(keys);

const values=Object.values(user);
console.log(values);

Object.keys(user).forEach((key)=>{
    console.log(key+":"+user[key])
})

user.mobileNo="1234567890";
console.log(user);

delete user.city
console.log(user)

const users=[
    {name:"pratik",role:"admin"},
    { name: "Amit", role: "user" },
  { name: "Neha", role: "admin" },
  { name: "Ravi", role: "user" }
]

const grouped=users.reduce((acc,curr)=>{
    if(!acc[curr.role]){
        acc[curr.role]=[];
    }
    acc[curr.role].push(curr)
    return acc;
},{})

console.log(grouped)