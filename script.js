$(document).ready(function() {
  
  var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  var streamerList = $("#streamer-list");
  for (var i = 0; i < users.length; i++) {
    (function(i) {
      console.log(users[i]);
      $("#streamer-list").append($("<li>").attr("id", i).attr("class", "streamer-list-item"));

      $("#" + i).append($("<img>").attr("id", "logo" + i).attr("class", "logo"));
      $("#" + i).append($("<span>").attr("id", "display-name" + i).attr("class", "display-name"));
      $("#" + i).append($("<span>").attr("id", "status" + i).attr("class", "status"));

      var url = "https://wind-bow.gomix.me/twitch-api/users/" + users[i] + "/?callback=?";
      console.log(url); 
      
      $.getJSON(url, function(data) {
        // console.log("entering json");
        $("#logo" + i).attr("src",data.logo); 
        $("#display-name" + i).html(data.display_name);
        var id = data._id;
        var url = "https://wind-bow.gomix.me/twitch-api/streams/" + users[i] + "/?callback=?";
        console.log(url);
        $.getJSON(url, function(data) {
          console.log(url +"entering 2nd json");
            if(data.stream === null) {
              $("#status" + i).html("Offline");
            }
            else {
              $("#status" + i).html(data.stream.channel.status);
            }
        });
      });
    })(i);
  };

  $("#all-container").click(function() {
    $("#streamer-list li").each(function(index) {
      $(this).css("display","flex");
    });
  });

  $("#online-container").click(function() {
    $("#streamer-list li").each(function(index) {
      console.log($(this));
      if($(this).find(":nth-child(3)").text() == "Offline") {
        $(this).css("display","none");
        console.log("true");
      }
      else {
        $(this).css("display","flex");
      }
    });
  });

  $("#offline-container").click(function() {
    $("#streamer-list li").each(function(index) {
      console.log($(this));
      if($(this).find(":nth-child(3)").text() !== "Offline") {
        $(this).css("display","none");
        console.log("true");
      }
      else {
        $(this).css("display","flex");
      }
    });
  });


  $(".tab-container").click(function() {
    // $(".tab-text").css("display", "none");
    // $(this).find(".tab-text").css("display", "block");
    $(".tab-container").removeClass("toggled-tab");
    $(".tab-container").find(":nth-child(2)").removeClass("toggled-text");
    $(this).addClass("toggled-tab");
    $(this).find(":nth-child(2)").addClass("toggled-text");
  });

  // $(".tab-container").mouseover(function() {
  //   $(".tab-container").css("width", "15px" );
  //   $(this).css("width", "65px" );
    
  // })
});
