//Wait for webpage to load
$(document).ready(function() {
  //Config location adquisition
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  //Request location
  navigator.geolocation.getCurrentPosition(success, error, options);

  //If success
  function success(pos) {
    var crd = pos.coords;

    var lat = crd.latitude;
    var long = crd.longitude;

    var api = "http://api.openweathermap.org/data/2.5/weather?lat=";
    var longs = "&lon="
    var appid = "&APPID=061f24cf3cde2f60644a8240302983f2"
    var units = "&units=metric";
    var url = api + lat + longs + long + units + appid;

    $.ajax({
      url: url,
      cache: false,
      success: function(weatherJson) {
        var main = weatherJson["weather"][0]["main"];
        var description = weatherJson["weather"][0]["description"];
        var icon = weatherJson["weather"][0]["icon"];
        var temperature = weatherJson["main"]["temp"];
        var temperatureMax = weatherJson["main"]["temp_max"];
        var temperatureMin = weatherJson["main"]["temp_min"];
        var locationName = weatherJson["name"];

        //console.log(temperature);
        switch (main) {
          case "Clouds":
            $("body").css("background-image","url('http://wallpapercave.com/wp/4QyIoZO.jpg')");
            break;
          case "Rain":
            $("body").css("background-image","url('https://wallpaperscraft.com/image/rain_drops_splashes_heavy_rain_dullness_bad_weather_60638_1920x1080.jpg')");
            break;
          case "Thunderstorm":
            $("body").css("background-image","url('https://images6.alphacoders.com/716/thumb-1920-716538.jpg')");
            break;  
          case "Drizzle":
            $("body").css("background-image","url('http://wallsdesk.com/wp-content/uploads/2016/05/Pictures-of-Rain-.jpg')");
            break;
          case "Snow":
            $("body").css("background-image","url('https://wallpaperscraft.com/image/snow_mountains_winter_white_84815_1920x1080.jpg')");
            break;
          case "Clear":
            $("body").css("background-image","url('https://wallpaperscraft.com/image/sky_sea_horizon_boat_110937_5184x3456.jpg')");
            break;
          default:
            
        }
        
        $("#location").html(locationName);
        $("#mainWeather").html(main + ": " + description);
        $("#temperature").html(temperature + "<sup>o</sup>C");
        //$("#minTemperature").html("Min: " + temperatureMin + "ºC");
        //$("#maxTemperature").html("Max: " + temperatureMax + "ºC");

        var iconApi = "http://openweathermap.org/img/w/"
        var png = ".png";
        var iconUrl = iconApi + icon + png;

        $("#weatherPic").html("<img src=" + iconUrl + " alt='Current Weather'>");

        $("#celsius").on("click", function(e) {
          $("#temperature").html(temperature + "<sup>o</sup>C");
        });

        $("#fahrenheit").on("click", function(e) {
          $("#temperature").html(temperature * (9 / 5) + 32 + "<sup>o</sup>F");
        });
      }
    });

  };
  //If error
  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };

});