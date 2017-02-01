$(document).ready(function(){
var lat;
var long;
var scale;
var span;
var temp;


  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(getPosition, showError);
      } else {
          alert("Geolocation is not supported by this browser");
      }
  }

  function getPosition(position) {
      lat = position.coords.latitude ;
      long = position.coords.longitude;
      var api = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&APPID=f81ba32df5ee600cc4d67e688df44b44&units=metric";
      $.getJSON(api,function(json){

      var city = json["name"];
      var cuntry = json["sys"]["country"];
      temp= Math.floor(json["main"]["temp"]);
      scale = "C";
      span = '<span> ° ' + scale +   '    </span>' ;
      var icon = json["weather"][0]["icon"];
      var description= json["weather"][0]["description"]
      ///alert(icon)
        $("#location").html(city + "," + cuntry);
        $("#temp").html(temp + span );
        $("#icon").html( description + "<img src='http://openweathermap.org/img/w/" + icon + ".png'>" );


      });



  }

  function showError(error) {
      switch(error.code) {
          case error.PERMISSION_DENIED:
              alert("User denied the request for Geolocation.")
              break;
          case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.")
              break;
          case error.TIMEOUT:
            alert("The request to get user location timed out.")
              break;
          case error.UNKNOWN_ERROR:
              alert("An unknown error occurred.")
              break;
      }
  }
  getLocation();

  $("#temp").on( "click", function(){
      switch (scale) {
        case  (scale = 'C'):
        scale = 'F';
        temp = Math.round((temp * 1.8) +32);
          span = '<span id ="span"> ° ' + scale +   '    </span>' ;
          $("#temp").html(temp + span );
          break;
        case  (scale = 'F'):
          scale = 'C';
          temp = Math.round((temp - 32) * 0.5556) ;
            span = '<span id ="span"> ° ' + scale +   '    </span>' ;
            $("#temp").html(temp + span );
          break;

      }
    });


});
