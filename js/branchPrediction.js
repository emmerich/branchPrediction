// Branch Prediction

var run = function() {
  var arraySize = 32768;
  
  // Unsorted
  var unsorted = [];
  for(var i = 0; i<arraySize; i++) {
    unsorted[i] = Math.random() * 256;
  }
  
  // Sorted
  var sorted = [];
  for(var i = 0; i<arraySize; i++) {
    sorted[i] = Math.random() * 256;
  }
  sorted.sort();
  
  // Test
  var startTime = new Date().getTime();
  var sum = 0;
  
  for(var i = 0; i<100000; i++) {
    for(var j = 0; j<arraySize; j++) {
      if(unsorted[j] >= 128) {
        sum = sum + unsorted[j];
      }
    }
  }
  
  var unsortedElapsedTime = new Date().getTime() - startTime;
  
  // Test sorted
  startTime = new Date().getTime();
  sum = 0;
  
  for(var i = 0; i<100000; i++) {
    for(var j = 0; j<arraySize; j++) {
      if(sorted[j] >= 128) {
        sum = sum + sorted[j];
      }
    }
  }
  
  var sortedElapsedTime = new Date().getTime() - startTime;
  
  
  // Test unsorted fixed
  startTime = new Date().getTime();
  sum = 0;
  
  for(var i = 0; i<100000; i++) {
    for(var j = 0; j<arraySize; j++) {
      var t = (unsorted[j] - 128) >> 31;
      sum = sum + (~t & unsorted[j]);
    }
  }
  
  var unsortedFixedElapsedTime = new Date().getTime() - startTime;
  
  console.log('Unsorted took', (unsortedElapsedTime / 1000), 's');
  console.log('Sorted took', (sortedElapsedTime / 1000), 's');
  console.log('Unsorted fixed took', (unsortedFixedElapsedTime / 1000), 's');
};