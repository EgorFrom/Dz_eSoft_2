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
  return array;
}
function counStash(stash, gems){
  gems.forEach(function(name){
    if (stash[name] == null)
      stash[name] = 0;
  })
  return stash;
}
function getNameElfByNumberFromArrayWishes(indexMax, elves, arrayWishes){
   var numberElf;
      numberElf = arrayWishes[indexMax][1];
    return elves[numberElf];
}
function getIndexElfByNumberFromArrayWishes(indexMax, arrayWishes){
   var numberElf;
      numberElf = arrayWishes[indexMax][1];
    return numberElf;
}
function UndefToZero(tree){
  tree.forEach(function(treei){
    treei.forEach(function(treeij){
        treeij.push(0);
    })
  });
}
function getMiddleNumber(middleNumber, tree, gemsLength, week, elves){
  let min = 99999;
  let max = -1;
  for(let i = 0; i < elves.length; i++)
  { 
    let score = 0;
    for(let j = 0; j < gemsLength; j++)
    { 
      let w = 0; 
      do {
        score += tree[i][j][w];
        w++;
      } while (w < week)
    }
    if (score < min) min = score;
    if (score > max) max = score;
  }
  if (min-max == 0)
    return middleNumber+1;
  else if (min >= middleNumber)
    return min+1;
    else 
      return middleNumber;
}

function getSumGemsByNumberElf(tree, Number, week){
  let score = 0;
  for(let w = 0; w < week; w++)
    for(let j = 0; j < tree[Number].length; j++)
      score += tree[Number][j][w];

  return score;
}

function createAssignment(tree, elves, gems){
  var resultArray = {};

  for(let i = 0; i < elves.length; i++)
  {
    let ar = tree[i].map((gem, g) => [gems[g],gem.reduce((carry, x) => carry + x, 0)]);
    let p = {};
    for(let j = 0; j < ar.length; j++)
    {
      if (ar[j][1] != 0)
        p[ar[j][0]] = ar[j][1]; 
    }
    resultArray[elves[i]] = p;
  }
  return resultArray;
}

function assignEqually(tree, wishes, stash, elves, gems, week) {
  var gemWish = [];
  var arrayWishes = [];//array(номер камня,номер эльфа, желание(float))
  var middleNumber = 0;
  var oldTree = [];

  if (tree[0][0][0] == undefined)
    UndefToZero(tree)    
  
  stash = counStash(stash, gems);

  var assig = [];
  for(let i = 0; i < tree.length; i++)
  {
    assig[i] = []; 
    oldTree[i] = [];
    for(let j = 0; j < tree[0].length; j++)
    {
      assig[i][j] = [];
      oldTree[i][j] = [];
      if (tree[0][0].length > 0)
      {
        for(let k = 0; k < tree[0][0].length; k++)
          oldTree[i][j][k] = tree[i][j][k];
      }
      else
      {
        oldTree[i][j] = tree[i][j];
      }
    }
  }
  for(let j = 0; j < wishes.length; j++)//wishes[j] - массив желаемых камней, j - номер эльфа
    wishes[j].forEach(function(wish, numberGem){//желание(float), номер камня
      arrayWishes.push([[numberGem],[j],[wish]]);
    });
  

  for (let i = 0; i < gems.length; i++)
  {
    while (stash[gems[i]] > 0)
    {
      maxWish = -1;
      var indexMax = 0;
      middleNumber = getMiddleNumber(middleNumber, tree, gems.length, week, elves);

        for(let p = 0; p < arrayWishes.length; p++){
          if (maxWish < arrayWishes[p][2] & arrayWishes[p][0] == i)//проверка тот ли камень
          {
            if (getSumGemsByNumberElf(tree, getIndexElfByNumberFromArrayWishes(p, arrayWishes), week>0?week:1) < middleNumber)
            {
              maxWish = arrayWishes[p][2];
              indexMax = p;
            }
          }
        }
      tree[getIndexElfByNumberFromArrayWishes(indexMax, arrayWishes)][i][week>0?week-1:0] += 1;
      //console.log(gems[i]+" передается эльфу "+ getNameElfByNumberFromArrayWishes(indexMax, elves, arrayWishes));
      stash[gems[i]]--;
    }
  }

  for (let i = 0; i < tree.length; i++)
    for(let j = 0; j < tree[i].length; j++)
      for(let k = 0; k < tree[i][j].length; k++)
        assig[i][j][k] = tree[i][j][k] - oldTree[i][j][k];


  return createAssignment(assig, elves, gems);
  // let i = -1; 
  // var wishGems = new Map();
  // wishes.forEach(function(wish){
  //   i++; 
  //   wishGems.set(elves[i],wish);
  // });
  // return {
  // };
}

function assignAtLeastOne(tree, wishes, stash, elves, gems, week) {
  return assignEqually(tree, wishes, stash, elves, gems, week);
}

function assignPreferredGems(tree, wishes, stash, elves, gems) {
  //return assignEqually(tree, wishes, stash, elves, gems, tree[0][0].length);
  var week = tree[0][0].length;
  var gemWish = [];
  var arrayWishes = [];//array(номер камня,номер эльфа, желание(float))
  var middleNumber = 0;
  var oldTree = [];

  if (tree[0][0][0] == undefined)
    UndefToZero(tree)    
  
  stash = counStash(stash, gems);

  var assig = [];
  for(let i = 0; i < tree.length; i++)
  {
    assig[i] = []; 
    oldTree[i] = [];
    for(let j = 0; j < tree[0].length; j++)
    {
      assig[i][j] = [];
      oldTree[i][j] = [];
      if (tree[0][0].length > 0)
      {
        for(let k = 0; k < tree[0][0].length; k++)
          oldTree[i][j][k] = tree[i][j][k];
      }
      else
      {
        oldTree[i][j] = tree[i][j];
      }
    }
  }
  for(let j = 0; j < wishes.length; j++)//wishes[j] - массив желаемых камней, j - номер эльфа
    wishes[j].forEach(function(wish, numberGem){//желание(float), номер камня
      arrayWishes.push([[numberGem],[j],[wish]]);
    });
  

  for (let i = 0; i < gems.length; i++)
  {
    while (stash[gems[i]] > 0)
    {
      maxWish = -1;
      var indexMax = 0;

        for(let p = 0; p < arrayWishes.length; p++){
          if (maxWish < arrayWishes[p][2] & arrayWishes[p][0] == i)//проверка тот ли камень
          {
            maxWish = arrayWishes[p][2];
            indexMax = p;
          }
        }
      tree[getIndexElfByNumberFromArrayWishes(indexMax, arrayWishes)][i][week>0?week-1:0] += 1;
      //console.log(gems[i]+" передается эльфу "+ getNameElfByNumberFromArrayWishes(indexMax, elves, arrayWishes));
      stash[gems[i]]--;
    }
  }

  for (let i = 0; i < tree.length; i++)
    for(let j = 0; j < tree[i].length; j++)
      for(let k = 0; k < tree[i][j].length; k++)
        assig[i][j][k] = tree[i][j][k] - oldTree[i][j][k];


  return createAssignment(assig, elves, gems);
}

function nextState(state, assignment, elves, gems) {
  
  let ar = [];
  for(let i in assignment)
    ar.push(Object.values(assignment[i]));

  for(let i = 0; i < state.length; i++)
    for(let j = 0; j < state[i].length; j++)
    {
      if (ar[i] != undefined)
      {
        if (ar[i][j] != undefined) {
          state[i][j].push(Number(ar[i][j]));
        } else {state[i][j].push(0);}
      } else {state[i][j].push(0);}
    }
  return state;
}