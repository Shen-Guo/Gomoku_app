const gameArea = document.querySelector('.game-area');
const inputSize = document.querySelector('.size')
var isPlayer1 = true;
var array = [];
var winningCount = 5;
var size;


function createTable(size){
  // iif(document.querySelector('.box')).remove();
 
  gameArea.innerHTML = '';
  for(let i = 0; i < size; i++){
    var rowDiv = document.createElement('div');
    rowDiv.className ='row';
    array[i] = [];
    for(let j = 0; j < size; j++){
      var divElement = document.createElement('div')
      divElement.className = "element";
      divElement.dataset.id = [i,j];
      rowDiv.appendChild(divElement);
      array[i][j] = 0;
    }
    gameArea.appendChild(rowDiv);
  }
}


function findRowBorder(rowIndex, columnIndex){
  if(columnIndex >= 1 && array[rowIndex][columnIndex-1] == array[rowIndex][columnIndex]){
    
    return findRowBorder(rowIndex,columnIndex-1)
  }else{
    return [rowIndex,columnIndex]
  }
}
function findColBorder(rowIndex, columnIndex){
  if(rowIndex >= 1 && array[rowIndex-1][columnIndex] == array[rowIndex][columnIndex]){
    
    return findColBorder(rowIndex-1,columnIndex)
  }else{
    return [rowIndex,columnIndex]
  }
}

function findDiaBorder(rowIndex, columnIndex){
  if(rowIndex >= 1 && columnIndex >= 1 && array[rowIndex-1][columnIndex-1] == array[rowIndex][columnIndex]){
    
    return findDiaBorder(rowIndex-1,columnIndex-1)
  }else{
    return [rowIndex,columnIndex]
  }
}

function findDiaBorderR(rowIndex, columnIndex){
  if(rowIndex >= 1 && columnIndex+1 < size && array[rowIndex-1][columnIndex+1] == array[rowIndex][columnIndex]){
    
    return findDiaBorderR(rowIndex-1,columnIndex+1)
  }else{
    return [rowIndex,columnIndex]
  }
}




function checkForWin(id){
  
  let rowIndex =Number(id[0]);
  let columnIndex = Number(id[1]);
  let countR = 1;

//check for row
  let rowBorderId = findRowBorder(rowIndex, columnIndex);
  let rowR = Number(rowBorderId[0]);
  let colR = Number(rowBorderId[1]);
  for(let i = 1; i < size; i++){
    if(colR+i < size){
      if(array[rowR][colR+i] == array[rowR][colR]){
        countR ++;
      }
      if(countR == winningCount){
        console.log('win');
        break;
      }
    }
  }

  // check for col
  let colBorderId = findColBorder(rowIndex, columnIndex);
  let rowC = Number(colBorderId[0]);
  let colC = Number(colBorderId[1]);
  let countC = 1;
  for(let j = 1; j < size; j++){
    if(rowC+j<size){
      if(array[rowC+j][colC] == array[rowC][colC]){
        countC ++;
      }
      if(countC == winningCount){
        console.log('win');
        break;
      }
    }
  }

  // check for diagnol right
  let diaBorderId = findDiaBorder(rowIndex, columnIndex);
  let rowD = Number(diaBorderId[0]);
  let colD = Number(diaBorderId[1]);
  let countD = 1;
  for(let k = 1; k < size; k++){
    if(rowD + k < size && colD + k < size){
      if(array[rowD+k][colD+k] == array[rowD][colD]){
        countD ++;
      }
      if(countD == winningCount){
        console.log('win');
        break;
      }
    }
    
  }
  //check for diagnal left

 
  let diaRBorderId = findDiaBorderR(rowIndex, columnIndex);
  let rowDR = Number(diaRBorderId[0]);
  let colDR = Number(diaRBorderId[1]);
  let countDR = 1;

  for(let n = 1; n < size; n++){
    if(rowDR + n < size && colDR -n >= 0){
      if(array[rowDR+n][colDR-n] == array[rowDR][colDR]){
        countDR ++;
      }
      if(countDR == winningCount){
        console.log('win');
        break;
      }
    }
  }
  
  
  
}



function handleClick(evt){
  var id = evt.target.dataset.id.split(',');

  if(!evt.target.classList.contains('clicked')){ // div has not been clicked
    if(isPlayer1){ //player1
      evt.target.textContent = '⚫' ;
      evt.target.classList.add('black')
      array[id[0]][id[1]] = 1;
    }else{// player2
      evt.target.textContent = '⚪';
      evt.target.classList.add('white');
      array[id[0]][id[1]] = 2;
    }

  }else{
    return; 
  }
  isPlayer1 = !isPlayer1;
  evt.target.classList.add('clicked');
  checkForWin(id);
}

$('.new-btn').click(function(){
  size = Number(inputSize.value.trim());
  createTable(size)});

$(document).on('click','.element',handleClick);
$(document).on('click','.element',checkForWin);


// var borderId = findRowBorder(rowIndex, columnIndex);
//   var row = Number(borderId[0]);
//   var column = Number(borderId[1]);

//   for(var i = column; column < size -1; column++){
//     if(array[row][column+1] == array[row][column]){
//       count ++;
      
//       if (count == winningCount){
//         console.log('win');
//       }
//     }

//   }
