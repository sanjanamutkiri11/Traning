console.log("start")
function runAfterTenSeconds(callback) {
    setTimeout(() => {
      callback();
    }, 2000); 
  }

  runAfterTenSeconds(() => {
    console.log("Executed after 10 seconds");
  });
  

  console.log("end")
  console.log("end1")
  console.log("end2")
  