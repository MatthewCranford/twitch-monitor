$(document).ready(function() {
  
  var users = ["freecodecamp", "esl_sc2"];

  $.each(users, function(i) {
    console.log(users[i]);
    var url = "https://wind-bow.gomix.me/twitch-api/users/" + users[i];
    console.log(url);
    $.ajax({
      url: url,
      dataType: "jsonp",
      type: 'GET',
      success: function(data) {
        $(".logo").attr("src",data.logo); 
        $(".display-name").html(data.display_name);
        var id = data._id;
        console.log(data._id);
        var url = "https://wind-bow.gomix.me/twitch-api/streams/" + id;
        console.log(url);
        $.ajax({
          url: url,
          dataType: "jsonp",
          type: 'GET',
          success: function(data) {
            if(data.stream === null) {
              $(".status").html("Offline");
            }
            else {
              $(".status").html(data.channel.status);
            }
          }
        });
      }
    });
  })
});