$(document).ready(function() {
  
  var users = ["esl_sc2", "freecodecamp"];
  var streamerList = $("#streamer-list");

  $.each(users, function(i) {
    $('#streamer-list').append($("<li>").append($("<img>").attr("class", "logo")));

    // console.log(users[i]);
    var url = "https://wind-bow.gomix.me/twitch-api/users/" + users[i] + "/?callback=?";
     console.log(url);
    $.getJSON(url, function(data) {
        $(".logo").attr("src",data.logo); 
        $(".display-name").html(data.display_name);
        var id = data._id;
        var url = "https://wind-bow.gomix.me/twitch-api/streams/" + users[i] + "/?callback=?";
        // console.log(url);
        $.getJSON(url, function(data) {
            if(data.stream === null) {
              $(".status").html("Offline");
            }
            else {
              $(".status").html(data.stream.channel.status);
            }
        });
    });
  });
});
