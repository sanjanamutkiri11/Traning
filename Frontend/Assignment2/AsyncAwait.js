function getUserData(userId) {
    return new Promise((resolve, reject) => {
      if (userId === 1) {
        resolve({
          name: "sanjana",
          age: 21,
          city: "Solapur",
        });
      } else if (userId === 0) {
        reject("Invalid userId");
      } else {
        reject("User not found");
      }
    });
  }
  
  async function fetchUser() {
    try {
      const user = await getUserData(1);
      console.log("User data:", user);
    } catch (error) {
      console.log("Error:", error);
    }
  }
  
  fetchUser();
  

 