$(document).ready(function() {
  
  var users = ["esl_sc2", "freecodecamp"];
  var streamerList = $("#streamer-list");

  for (user in users) {
    console.log(users[user]);
    $("#streamer-list").append($("<li>").append($("<img>").attr("class", "logo")));

    
    var url = "https://wind-bow.gomix.me/twitch-api/users/" + users[user] + "/?callback=?";
     console.log(url);
     
    $.getJSON(url, function(data) {
        console.log("enter json");
        $(".logo").attr("src",data.logo); 
        $(".display-name").html(data.display_name);
        var id = data._id;
        var url = "https://wind-bow.gomix.me/twitch-api/streams/" + users[user] + "/?callback=?";
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
  };
});
