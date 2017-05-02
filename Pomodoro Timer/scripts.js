var timeInterval;
var pauseInterval;

$("#reset").on("click", function() {
  $("#start").removeClass("disabled");
  $("#pausePlus").removeClass("disabled");
  $("#pauseMinus").removeClass("disabled");
  $("#clockPlus").removeClass("disabled");
  $("#clockMinus").removeClass("disabled");
  
  clearInterval(timeInterval);
  clearInterval(pauseInterval);
  
  $("#minuteSet").html(25);
  $("#pauseSet").html(5);
  $("#seconds").html("00");
  $("#minutes").html(25);
});

$("#start").on("click", function() {
// Run myTimer every second
if(!($("#start").hasClass("disabled"))){
  
$("#start").addClass("disabled");
$("#pausePlus").addClass("disabled");
$("#pauseMinus").addClass("disabled");
$("#clockPlus").addClass("disabled");
$("#clockMinus").addClass("disabled");
  
timeInterval = setInterval(myTimer, 1000);
var minutesSet = $("#minuteSet").html();
var pauseSet = $("#pauseSet").html();
  
  function myTimer() {
  var seconds = $("#seconds").html();
  var minutes = $("#minutes").html();
  
    if(seconds == 00){
      if(minutes == 00){
        clearInterval(timeInterval);
        $("#start").removeClass("disabled");
        $("#pausePlus").removeClass("disabled");
        $("#pauseMinus").removeClass("disabled");
        $("#clockPlus").removeClass("disabled");
        $("#clockMinus").removeClass("disabled");
      }else{
       $("#seconds").html(59);
       $("#minutes").html($("#minutes").html()-1);
      }
      
    }else{
      $("#seconds").html($("#seconds").html()-1);
    }    
  }
  //Start pause
  $("#pause").on("click", function() {
    //Stop countdown
    $("#stop").addClass("disabled");
    clearInterval(timeInterval);
    var count = 0;
    pauseInterval = setInterval(myPause, 1000);
    function myPause(){
      var length = ($("#pauseSet").html())*60;
      count++;
      console.log(count);
      //When pause finishes
      if(count >= length){
        $("#stop").removeClass("disabled");
        clearInterval(pauseInterval);
        //Restore coundown
        timeInterval = setInterval(myTimer, 1000);
      }
    }
  });
   }
});

$("#pauseMinus").on("click", function() {
  var newValue = parseInt($("#pauseSet").html())-1;
  if(!($("#pauseMinus").hasClass("disabled"))){
  if(newValue < 0){
    $("#pauseSet").html(0);
  }else{
    $("#pauseSet").html(newValue);
  }
  }
});

$("#pausePlus").on("click", function() {
  var newValue = parseInt($("#pauseSet").html())+1;
  if(!($("#pausePlus").hasClass("disabled"))){
  $("#pauseSet").html(newValue);
  }
});

$("#clockMinus").on("click", function() {
  var newValue = parseInt($("#minutesSet").html())-1;
   if(!($("#clockMinus").hasClass("disabled"))){
  if(newValue < 0){
    $("#minutesSet").html(0);
    $("#minutes").html(0);
  }else{
    $("#minutesSet").html(newValue);
    $("#minutes").html(newValue);
  }
   }
});

$("#clockPlus").on("click", function() {
  var newValue = parseInt($("#minutesSet").html())+1;
   if(!($("#clockPlus").hasClass("disabled"))){
  $("#minutesSet").html(newValue);
  $("#minutes").html(newValue);
   }
});