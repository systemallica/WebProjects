var humanPlayer, aiPlayer;
var aiMove;
var tilesID = ["#t11", "#t12", "#t13", "#t21", "#t22", "#t23", "#t31", "#t32", "#t33"];
var tiles = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var ended = false;

$("#playerX").on("click", function() {
  $("#playerO").hide();
  $("#playerX").html("You are X");
  if(humanPlayer == undefined){
    humanPlayer = "X";
    aiPlayer = "O";
    $("#status").html("Try to beat me!");
  }
  });

$("#playerO").on("click touchstart", function() {
  $("#playerX").hide();
  $("#playerO").html("You are O"); 
  if(humanPlayer == undefined){ 
    humanPlayer = "O"; 
    aiPlayer = "X";
    $("#t22").html(aiPlayer);
    tiles[4] = aiPlayer;
    $("#status").html("Try to beat me!"); 
  }
  });  
//Check for winning combinations
function win(board, player){
     //Check rows
  if((board[0] == player && board[1] == player && board[2] == player)||
     (board[3] == player && board[4] == player && board[5] == player)||
     (board[6] == player && board[7] == player && board[8] == player)||
     //Check columns
     (board[0] == player && board[3] == player && board[6] == player)||
     (board[1] == player && board[4] == player && board[7] == player)||
     (board[2] == player && board[5] == player && board[8] == player)||
     //Check diagonals
     (board[0] == player && board[4] == player && board[8] == player)||
     (board[2] == player && board[4] == player && board[6] == player)
    ){
    return true;
  }else{
    return false;
  } 
}

//Check empty spaces in board
function emptySpaces(board){
  return board.filter(function(val){return val != "X" && val != "O";});
}

// Write player symbol in cell when clicked
//First row
for(let i = 0; i < tilesID.length; i++){
  $(tilesID[i]).on("click", function() {   
    if($(tilesID[i]).html() == "" && humanPlayer != undefined && !ended){   
      //Write human move
      $(tilesID[i]).html(humanPlayer);
      tiles[i] = humanPlayer;
      //Check if you won 
      if(win(tiles, humanPlayer)){ 
        $("#status").html("You win!");
        ended = true;
      }
      //Check if tie
      var empty = emptySpaces(tiles);
      if(empty.length === 0){
        $("#status").html("Tie! Try again?");
        ended = true;
      }
      //Decide AI move  
      aiMove = miniMax(tiles, aiPlayer);
      //Write AI move
      tiles[aiMove.index] = aiPlayer;
      $(tilesID[aiMove.index]).html(aiPlayer);
      //Check if you lost
      if(win(tiles, aiPlayer)){
        $("#status").html("You lose!");
        ended = true;
      }
      empty = emptySpaces(tiles);
      if(empty.length === 0){
        $("#status").html("Tie! Try again?");
        ended = true;
      }
    }
  }); 
} 

// Artificial intelligence function, makes decisions about best move and returns it
function miniMax(newBoard, player){
  var freeSpots = emptySpaces(newBoard);
  
  //Check if somebody won or the table is full
  if(win(newBoard, humanPlayer)){
    return {score:-10};
  }else if(win(newBoard, aiPlayer)){
    return {score:+10};
  }else if(freeSpots.length === 0){
    return {score:0};
  }
  
  var moves = [];
  //Loop through possible moves
  for(var i = 0; i < freeSpots.length; i++){
    //Create an object for each move
    var move = {};
    //Set index
    move.index = newBoard[freeSpots[i]];
    
    newBoard[freeSpots[i]] = player;
    
    /*collect the score resulted from calling minimax 
      on the opponent of the current player*/
    if (player == aiPlayer){
      var result = miniMax(newBoard, humanPlayer);
       move.score = result.score;
    }
    else{
      var result = miniMax(newBoard, aiPlayer);
      move.score = result.score;
    }
    
    newBoard[freeSpots[i]] = move.index;
    //Write current move to array
    moves.push(move);
  }
// if it is the computer's turn loop over the moves and choose the move with the highest score  
  var bestMove;
  if(player === aiPlayer){
    var bestScore = -10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }else{
 
// else loop over the moves and choose the move with the lowest score
    var bestScore = 10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}
function reset(){
  for(let i = 0; i < tilesID.length; i++){
    $(tilesID[i]).html("");
    $("#status").html("Pick your side!");
    $("#playerO").show();
    $("#playerO").html("Play as O");
    $("#playerX").show();
    $("#playerX").html("Play as X");
    humanPlayer = undefined;
    aiPlayer = undefined;
    var aiMove = undefined;
    tilesID = ["#t11", "#t12", "#t13", "#t21", "#t22", "#t23", "#t31", "#t32", "#t33"];
    tiles = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    ended = false;
  }
}

$("#reset").on("click", function() {
  reset();
});   