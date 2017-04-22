$(document).ready(function() {
  var firstTime = true;
  $('#searchbox').keypress(function(e) {
    var key = e.which;
    if (key == 13) // the enter key code
    {
      var searchTerm = $("#searchbox").val();
      if (searchTerm !== "") {
        $.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&limit=10&format=json" + "&callback=?", function(data) {
          if(!firstTime){
              $(".cardt").remove();
            }
          for (var i = 0; i < 10; i++) {
            
            var str1 = "<div class=\"row justify-content-center\"><div id=\"box";
            var str2 = i.toString();
            var str3 = "\" class=\"mt-5 cardt text-center col-sm-10 col-md-8\"></div></div>";
            var newBox = str1 + str2 + str3;  

            $(".container").append(newBox);
            $("#box" + i.toString()).html("<h3 class=\"text-center\">" + data[1][i] + "</h3>" + data[2][i] + "<br><a href=\""+data[3][i]+"\">Full article</a>");
          }
        });
        firstTime = false;
      }
    }
  });

  $("#random").on("click", function(e) {  
    window.open("https://en.wikipedia.org/wiki/Special:Random",'_blank');
  });
  
  $("#delete").on("click", function(e) {  
     $(".cardt").remove();
  });
});