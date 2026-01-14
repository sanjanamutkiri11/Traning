function getUserData(userId) {
    return new Promise((resolve, reject) => {
      if (userId === 1) {
        resolve({
          name: "sanjana",
          age: 21,
          city: "solapur"
        });
      } else if (userId === 0) {
        reject("Invalid userId");
      } else {
        reject("User not found");
      }
    });
  }
  

  getUserData(1)
  .then((user) => {
    console.log("User data:", user);
  })
  .catch((error) => {
    console.log("Error:", error);
  });

  getUserData(0)
  .then((user) => {
    console.log("User data:", user);
  })
  .catch((error) => {
    console.log("Error:", error);
  });


  console.log("1: Start");

setTimeout(() => {
  console.log("2: setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log("3: Promise");
});

console.log("4: End");
