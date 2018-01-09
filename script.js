$(document).ready(function() {
  
  var user = "freecodecamp";
  var url = "https://wind-bow.gomix.me/twitch-api/users/" + user;
  console.log(url);
 

  $.ajax({
    url: url,
    dataType: "jsonp",
    type: 'GET',
    success: function(data) {
      console.log(data);
    }
  });
});