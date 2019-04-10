function dummySegmentTree(array, fn, N) {
  return function (from, to) {
  	var newArray = array.slice();
  	if (from > to)
			throw new Error("from > to");
		if (from < 0 | to > newArray.length)
			throw new Error("from < 0 | to > array.length");

    let result = N;
   	
    let numberDimension = -1;  
    numberDimension = countDimensions(newArray, numberDimension);

  	if (numberDimension == 1)	{
  		if (!flagSecondLayer)
	  		countColumnsOnLayer2 = newArray.length;
  		while (newArray.length >= countColumnsOnLayer2)
  		{
  			for (let i = from; i < to; i++) {
  	    	result = fn(result, newArray[i]);
  			}
  	    newArray.splice(0,countColumnsOnLayer2);
  		}
      mainArrayLevel2 = [];
      countColumnsOnLayer2 = 1;
  		countColumnsOnLayer3 = 1;
  		flagSecondLayer = false;
  	}
	  else if (numberDimension == 2)
	  {	
      if (!flagThirdLayer)
        countColumnsOnLayer3 = newArray.length;
      while (newArray.length >= countColumnsOnLayer3)
      {
  	  	for (var i = from; i < to; i++) 
  	  		for (var j = 0; j < newArray[i].length; j++)
  	  			mainArrayLevel2.push(newArray[i][j]);
       countColumnsOnLayer2 = newArray[0].length;
        newArray.splice(0,countColumnsOnLayer3);
      }
      mainArrayLevel3 = [];
	  	flagSecondLayer = true;
  	  result = dummySegmentTree(mainArrayLevel2, fn, N);
		}
		else if (numberDimension == 3)
		{
			for (var i = from; i < to; i++) 
        for (var j = 0; j < newArray[i].length; j++)
          mainArrayLevel3.push(newArray[i][j]);
      flagThirdLayer = true;
      countColumnsOnLayer3 = newArray[0].length;
      result = dummySegmentTree(mainArrayLevel3, fn, N);
		}
    return result;
  }
}

function countDimensions(array, numberDimension) {
	if (Array.isArray(array)) {
		numberDimension = countDimensions(array[0], numberDimension);
	}
	return numberDimension += 1;
}

function segmentTree(array, fn, N) {
  return dummySegmentTree(array, fn, N);
};
var countColumnsOnLayer2 = 1;
var countColumnsOnLayer3 = 1;
var mainArrayLevel2 = [];
var mainArrayLevel3 = [];
var flagSecondLayer = false;
var flagThirdLayer = false;
function recursiveSegmentTree(array, fn, N) {
	return segmentTree(array, fn, N);
}

function getElfTree(array) {
  return recursiveSegmentTree(array, sum, 0);
}

function assignEqually(tree, wishes, stash, elves, gems, week) {
  return {};
}

function assignAtLeastOne(tree, wishes, stash, elves, gems, week) {
  return {};
}

function assignPreferredGems(tree, wishes, stash, elves, gems) {
  return {};
}

function nextState(state, assignment, elves, gems) {
  return state;
}