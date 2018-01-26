$(document).ready(function() {
  
  var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "boozycruzy"];

  function createStreamerList() {
    for (var i = 0; i < users.length; i++) {
      (function(i) {
        console.log(users[i]);
        $("#streamer-list").append($("<li>").attr("id", i).attr("class", "streamer-list-item"));

        $("#" + i).append($("<img>").attr("id", "logo" + i).attr("class", "logo"));
        $("#" + i).append($("<a>").attr("id", "link" + i).attr("target", "_blank"));
        $("#link" + i).append($("<span>").attr("id", "display-name" + i).attr("class", "display-name"));
        $("#" + i).append($("<span>").attr("id", "status" + i).attr("class", "status"));
        $("#" + i).append($("<span>").attr("class", "remove-icon").html("x"));

        var url = "https://wind-bow.gomix.me/twitch-api/users/" + users[i] + "/?callback=?";
        // console.log(url); 
        
        $.getJSON(url, function(data) {
          // console.log("entering json");
          $("#logo" + i).attr("src",data.logo); 
          $("#link" + i).attr("href", "https://www.twitch.tv/" + data.display_name)
          $("#display-name" + i).html(data.display_name);
          var id = data._id;
          var url = "https://wind-bow.gomix.me/twitch-api/streams/" + users[i] + "/?callback=?";
          // console.log(url);
          $.getJSON(url, function(data) {
            // console.log(url +"entering 2nd json");
              if(data.stream === null) {
                $("#status" + i).html("Offline");
              }
              else {
                $("#status" + i).html(data.stream.channel.status);
              }
              colorListItem();
          });
        });
      })(i);
    };
  }
  createStreamerList();

  function addNewStreamer() {
    var i = users.length -1;
    console.log(typeof i);
    $("#streamer-list").append($("<li>").attr("id", i).attr("class", "streamer-list-item"));

        $("#" + i).append($("<img>").attr("id", "logo" + i).attr("class", "logo"));
        $("#" + i).append($("<a>").attr("id", "link" + i).attr("target", "_blank"));
        $("#link" + i).append($("<span>").attr("id", "display-name" + i).attr("class", "display-name"));
        $("#" + i).append($("<span>").attr("id", "status" + i).attr("class", "status"));
        $("#" + i).append($("<span>").attr("class", "remove-icon").html("x"));

        var url = "https://wind-bow.gomix.me/twitch-api/users/" + users[i] + "/?callback=?";
        // console.log(url); 
        
        $.getJSON(url, function(data) {
          // console.log("entering json");
          $("#logo" + i).attr("src",data.logo); 
          $("#link" + i).attr("href", "https://www.twitch.tv/" + data.display_name)
          $("#display-name" + i).html(data.display_name);
          var id = data._id;
          var url = "https://wind-bow.gomix.me/twitch-api/streams/" + users[i] + "/?callback=?";
          // console.log(url);
          $.getJSON(url, function(data) {
            // console.log(url +"entering 2nd json");
              if(data.stream === null) {
                $("#status" + i).html("Offline");
              }
              else {
                $("#status" + i).html(data.stream.channel.status);
              }
              colorListItem();
          });
        });
      }

  function colorListItem() {
    $("#streamer-list li").each(function(index) {
      if($(this).find(":nth-child(3)").text() == "Offline") {
        $(this).css("background-color","red");
      }
      else {
        $(this).css("background-color","green");
      }
    });
  }

  $("#streamer-add-btn").click(function() {
    $("#streamer-form").css("display", "block");
    // $(this).css("margin-right", "inherit");
    $("#page-mask").addClass("mask");
  });

  $("#close-btn").click(function() {
    $("#streamer-form").css("display", "none");
    $("#page-mask").removeClass("mask");
  });

  $("#streamer-remove-btn").click(function() {
    $("#done-btn").css("display", "block");
    $("#page-mask").addClass("mask");
    $(".remove-icon").css("display", "block");
  });

  $("#done-btn").click(function() {
    $("#page-mask").removeClass("mask");
    $("#done-btn").css("display", "none");
    $(".remove-icon").css("display", "none");
    
  });


 

  $("#streamer-form").submit(function() {
    var input = $("#streamer-add-input").val();
    console.log("Ready for action!");
    console.log(input)
    if (!(users.includes(input))) {
      users.push(input);
      addNewStreamer();
      $("#streamer-form").css("display", "none");
      $("#page-mask").removeClass("mask");
      $(".remove-icon").on("click", function() {
        $(this).parent().remove();
      });
    }
    else {
      alert("Streamer is already added.")
    }
    $("#streamer-add-input").val("");
  });

  $(".remove-icon").on("click", function() {
    $(this).parent().remove();
  });

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
    $(".tab-container").removeClass("toggled-tab");
    $(".tab-container").find(":nth-child(2)").removeClass("toggled-text");
    $(this).addClass("toggled-tab");
    $(this).find(":nth-child(2)").addClass("toggled-text");
  });
});
