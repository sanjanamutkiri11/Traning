console.log("start")
function runAfterTenSeconds(callback) {
    setTimeout(() => {
      callback();
    }, 2000); // 10000 milliseconds = 10 seconds
  }

  runAfterTenSeconds(() => {
    console.log("Executed after 10 seconds");
  });
  

  console.log("end")
  console.log("end1")
  console.log("end2")
  