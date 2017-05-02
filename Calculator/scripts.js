$(document).ready(function() {
  // Initial variables
  var lastCharSymbol = false;
  var numbers = 0;
  var value1 = 0;
  var value2 = 0;
  var result = 0;
  var lastFunction;
  var dotPulsed = false;
  var canPutDot = true;
  var firstOperation = true;
  var isFloat = false;

  // OnClick events
  $("#button1").on("click", function() {
    number(1);
  });
  $("#button2").on("click", function() {
    number(2);
  });
  $("#button3").on("click", function() {
    number(3);
  });

  $("#button4").on("click", function() {
    number(4);
  });
  $("#button5").on("click", function() {
    number(5);
  });
  $("#button6").on("click", function() {
    number(6);
  });

  $("#button7").on("click", function() {
    number(7);
  });
  $("#button8").on("click", function() {
    number(8);
  });
  $("#button9").on("click", function() {
    number(9);
  });

  $("#button0").on("click", function() {
    number(0);
  });

  $("#buttonSum").on("click", function() {
    operation("+", "Sum");
  });
  $("#buttonSubstract").on("click", function() {
    operation("-", "Substract");
  });
  $("#buttonMultiply").on("click", function() {
    operation("*", "Multiply");
  });
  $("#buttonDivide").on("click", function() {
    operation("/", "Divide");
  });

  $("#buttonPlusMinus").on("click", function() {
    invert();
  });

  $("#buttonUndo").on("click", function() {
    undo();
  });

  function invert() {
    $("#screen1").html($("#screen1").html() * -1);
  }

  function undo() {
    if ($("#screen1").html().length > 1) {
      $("#screen1").html($("#screen1").html().slice(0, -1));
    } else {
      $("#screen1").html(0);
    }
  }

  function number(n) {
    if (($("#screen1").html() == 0 || lastCharSymbol) && !dotPulsed) {
      numbers = 0;
      $("#screen1").html(n);
    } else if (numbers < 10) {
      dotPulsed = false;
      $("#screen1").html($("#screen1").html() + n);
    }
    numbers++;
    lastCharSymbol = false;
  }
  
  function getFloat(){
    if (lastFunction == "Sum") {
          result = parseFloat(value1) + parseFloat(value2);
        } else if (lastFunction == "Substract") {
          result = parseFloat(value1) - parseFloat(value2);
        } else if (lastFunction == "Multiply") {
          result = parseFloat(value1) * parseFloat(value2);
        } else if (lastFunction == "Divide") {
          result = parseFloat(value1) / parseFloat(value2);
        }
        result = result.toFixed(2);
        if(result.toString().length > 10){
          result = result.toExponential(3);
        }
    console.log(result);
    return result;
  }
  
  function getInt(){
     if (lastFunction == "Sum") {
          result = parseInt(value2) + parseInt(value1);
        } else if (lastFunction == "Substract") {
          result = parseInt(value2) - parseInt(value1);
        } else if (lastFunction == "Multiply") {
          result = parseInt(value2) * parseInt(value1);
        } else if (lastFunction == "Divide") {
          result = parseFloat(value2) / parseFloat(value1);
          result = result.toFixed(2);
        }
        if(result.toString().length > 10){
          result = result.toExponential(3);
        }
    console.log(result);
    return result;
  }

  function operation(symbol, mode) {
    // If only 1 operation
    if (!lastCharSymbol && firstOperation) {
      if (lastFunction == "Equals") {
        $("#screen2").html(0);
      }
      numbers = 0;
      value1 = $("#screen1").html();
      result = value1;
      if ($("#screen2").html() == 0) {
        $("#screen2").html($("#screen1").html() + symbol);
      } else {
        $("#screen2").html(
          $("#screen2").html() + $("#screen1").html() + symbol
        );
      }
      lastCharSymbol = true;
      lastFunction = mode;
      firstOperation = false;
      canPutDot = true;
      // If chaining operations
    } else if (!firstOperation) {
      if (lastFunction == "Equals") {
        $("#screen2").html(0);
      }
      numbers = 0;
      value1 = $("#screen1").html();
      value2 = result;
      if (isFloat) {
        result = getFloat();
      } else {
        result = getInt();
      }
      
      $("#screen1").html(result);
      if ($("#screen2").html() == 0) {
        $("#screen2").html(value1 + symbol);
      } else {
        $("#screen2").html($("#screen2").html() + value1 + symbol);
      }
      lastCharSymbol = true;
      lastFunction = mode;
      firstOperation = false;
      canPutDot = true;
    }
  }
  //Button =
  $("#buttonEquals").on("click", function(e) {
    if ($("#screen1").html() != 0) {
      numbers = 0;
      value1 = $("#screen1").html();
      value2 = result;
      if (isFloat) {
        result = getFloat();
      } else {
        result = getInt();
      }      

      if ($("#screen2").html() == 0) {
        $("#screen2").html($("#screen1").html() + "=" + result);
      } else {
        $("#screen2").html(
          $("#screen2").html() + $("#screen1").html() + "=" + result
        );
      }
      $("#screen1").html(result);
      lastCharSymbol = false;
      lastFunction = "Equals";
      firstOperation = true;
      canPutDot = true;
    }
  });
  //Button CE
  $("#buttonCE").on("click", function(e) {
    lastCharSymbol = false;
    numbers = 0;
    value1 = 0;
    value2 = 0;
    result = 0;
    firstOperation = true;
    lastFunction = "";
    dotPulsed = false;
    canPutDot = true;
    isFloat = false;
    $("#screen1").html(0);
  });
  //Button C
  $("#buttonC").on("click", function(e) {
    numbers = 0;
    value1 = 0;
    value2 = 0;
    result = 0;
    lastFunction = "";
    firstOperation = true;
    lastCharSymbol = false;
    dotPulsed = false;
    canPutDot = true;
    isFloat = false;
    $("#screen1").html(0);
    $("#screen2").html(0);
  });
  //Button .
  $("#buttonDot").on("click", function(e) {
    lastCharSymbol = false;
    if (canPutDot) {
      if ($("#screen1").html() == 0) {
        $("#screen1").html("0.");
      } else if (numbers < 10) {
        $("#screen1").html($("#screen1").html() + ".");
      }
      isFloat = true;
      dotPulsed = true;
      canPutDot = false;
      numbers++;
    }
  });
});
