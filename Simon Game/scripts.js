var redSound = document.getElementById("audioRed");
var greenSound = document.getElementById("audioGreen");
var yellowSound = document.getElementById("audioYellow");
var blueSound = document.getElementById("audioBlue");

var randomArr = [];
var userArr = [];
var gameOn = false;
var gameStarted = false;
var humanTurn = false;
var turn = 1;
var click = 1;
var strictMode = false;

$("#onBtn").on("mousedown", function() {
  onOff();
});
$("#onBtn").on("touchstart", function() {
  onOff();
});

$("#strictMode").on("click", function() {
  if (!gameStarted) {
    if (strictMode) {
      strictMode = false;
      $("#strictMode").css("background-color", "#8F0000");
    } else {
      strictMode = true;
      $("#strictMode").css("background-color", "red");
    }
  }
});

$("#start").on("mousedown", function() {
  startGame();
});
$("#start").on("touchstart", function() {
  startGame();
});

$("#red").on("mousedown", function() {
  redMouseDown();
});
$("#red").on("touchstart", function() {
  redMouseDown();
});

$("#green").on("mousedown", function() {
  greenMouseDown();
});
$("#green").on("touchstart", function() {
  greenMouseDown();
});

$("#yellow").on("mousedown", function() {
  yellowMouseDown();
});
$("#yellow").on("touchstart", function() {
  yellowMouseDown();
});

$("#blue").on("mousedown", function() {
  blueMouseDown();
});
$("#blue").on("touchstart", function() {
  blueMouseDown();
});

//Red
function redMouseDown() {
  if (gameOn) {
    $("#red").css("background-color", "red");
    redSound.play();

    setTimeout(function() {
      $("#red").css("background-color", "#8F0000");
    }, 800);

    if (gameStarted && humanTurn) {
      userTurn(0);
    }
  }
}
//Green
function greenMouseDown() {
  if (gameOn) {
    $("#green").css("background-color", "#00B81F");
    greenSound.play();

    setTimeout(function() {
      $("#green").css("background-color", "#004D00");
    }, 800);

    if (gameStarted && humanTurn) {
      userTurn(1);
    }
  }
}
//Yellow
function yellowMouseDown() {
  if (gameOn) {
    $("#yellow").css("background-color", "yellow");
    yellowSound.play();

    setTimeout(function() {
      $("#yellow").css("background-color", "#999900");
    }, 800);

    if (gameStarted && humanTurn) {
      userTurn(2);
    }
  }
}
//Blue
function blueMouseDown() {
  if (gameOn) {
    $("#blue").css("background-color", "blue");
    blueSound.play();

    setTimeout(function() {
      $("#blue").css("background-color", "#000066");
    }, 800);

    if (gameStarted && humanTurn) {
      userTurn(3);
    }
  }
}

//Turn on and off the machine
function onOff() {
  gameOn = !gameOn;
  if ($("#start").hasClass("disabled")) {
    $("#turnTag").html("--");
    $("#turnNumber").html(" --");
    $("#start").removeClass("disabled");
    $("#start").css("cursor", "pointer");
  } else {
    $("#start").addClass("disabled");
    $("#start").css("cursor", "not-allowed");
    $("#turnTag").html("");
    $("#turnNumber").html("");
    reset();
  }
}

function reset() {
  turn = 1;
  click = 1;
  gameStarted = false;
  humanTurn = false;
  randomArr = [];
  userArr = [];
}

function startGame() {
  if (gameOn) {
    $("#turnTag").html("Turn");
    $("#turnNumber").html(" 1");
    // 20 random numbers between 0 and 3
    gameStarted = true;
    for (let i = 0; i < 20; i++) {
      randomArr.push(Math.floor(Math.random() * 4));
    }
    machineTurn();
  }
}

function machineTurn() {
  click = 0;
  let i = 0;
  humanTurn = false;
  userArr = [];
  var interval = setInterval(function() {
    if (i < turn) {
      activateColor(randomArr[i]);
      i++;
    } else {
      clearInterval(interval);
      humanTurn = true;
    }
  }, 1500);
}

function userTurn(index) {
  if (userArr.length < turn) {
    userArr.push(index);
    if (areEqual()) {
      if (turn == 20 && click == 20) {
        reset();
        $("#turnTag").html("You win!");
        $("#turnNumber").html("");
      } else {
        if (userArr.length == turn) {
          turn++;
          $("#turnNumber").html(" " + turn);
          machineTurn();
        }
      }
      click++;
    } else if(strictMode) {
      $("body").css("background-color", "red");
      setTimeout(function() {
        $("body").css("background-color", "white");
        turn = 1;
        $("#turnNumber").html(" " + turn);
        reset();
      }, 1500);
    }else {
      $("body").css("background-color", "red");
      setTimeout(function() {
        $("body").css("background-color", "white");
        turn = 1;
        $("#turnNumber").html(" " + turn);
        machineTurn();
      }, 1500);
    }
  }
}

function activateColor(index) {
  if (index === 0) {
    redMouseDown();
  } else if (index === 1) {
    greenMouseDown();
  } else if (index === 2) {
    yellowMouseDown();
  } else {
    blueMouseDown();
  }
}

function areEqual() {
  let result = false;
  for (let i = 0; i < userArr.length; i++) {
    console.log(randomArr[i], userArr[i]);
    if (userArr[i] === randomArr[i]) {
      result = true;
    } else {
      result = false;
      break;
    }
  }
  return result;
}
