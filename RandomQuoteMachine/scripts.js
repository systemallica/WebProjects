//Wait for webpage to load
$(document).ready(function() {
  $.ajaxSetup({ cache: false });
  //Get new quote OnClick function
  $("#getQuote").on("click", function(e) {  
    //Connecting to API and getting a random quote
    $.getJSON("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1" + "?", function(quotesJson) {
        //Show the quote and author
        console.log(quotesJson)
        var rawQuote = quotesJson[0].content;
        var quote = rawQuote.slice(3, rawQuote.length-5);
        $("#quote").html(quote);
        $("#author").html("— " + quotesJson[0].title);
      });    
  });
  //Send tweet OnClick function
  $("#sendTweet").on("click", function(e) {  
    var tweetlink = "https://twitter.com/intent/tweet?text="
    tweetlink += $( "#quote" ).html();
    tweetlink += " ";
    tweetlink += $( "#author" ).html();
    if(tweetlink.length <= 140){
      window.open(tweetlink,'_blank');
    }
    else{
      $("#sendTweet").notify("This quote is too long for a tweet!", "info");
    }
  });
});