$(document).ready(function() {
  
  var users = ["esl_sc2", "freecodecamp"];
  var streamerList = $("#streamer-list");
  for (var i = 0; i < users.length; i++) {
    (function(i) {
      console.log(users[i]);
      $("#streamer-list").append($("<li>").append($("<img>").attr("class", "logo" + i)));
      $("streamer-list").append($("<li>").append($("<span>").attr("class", "display-name" + i)));
      var url = "https://wind-bow.gomix.me/twitch-api/users/" + users[i] + "/?callback=?";
      console.log(url); 
      
      $.getJSON(url, function(data) {
        console.log("enter json");
        $(".logo" + i).attr("src",data.logo); 
        $(".display-name" + i).html(data.display_name);
        var id = data._id;
        var url = "https://wind-bow.gomix.me/twitch-api/streams/" + users[i] + "/?callback=?";
        console.log(url);
        $.getJSON(url, function(data) {
            if(data.stream === null) {
              $(".status").html("Offline");
            }
            else {
              $(".status").html(data.stream.channel.status);
            }
        });
      });
    })(i);
  };

  function fetchData (url, user) {
    
    
  } 
});
