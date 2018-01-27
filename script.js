$(document).ready(function() {
  
  var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "boozycruzy"];

  function createStreamerList() {
    for (var id = 0; id < users.length; id++) {
      (function(id) {
        console.log(users[id]);
        $("#streamer-list").append($("<li>").attr("id", id).attr("class", "streamer-list-item"));

        $("#" + id).append($("<img>").attr("id", "logo" + id).attr("class", "logo"));
        $("#" + id).append($("<a>").attr("id", "link" + id).attr("target", "_blank"));
        $("#link" + id).append($("<span>").attr("id", "display-name" + id).attr("class", "display-name"));
        $("#" + id).append($("<span>").attr("id", "status" + id).attr("class", "status"));
        $("#" + id).append($("<span>").attr("class", "remove-icon").html("x"));
        $("#" + id).prepend($("<span>").attr("class", "status-icon"));

        var url = "https://wind-bow.gomix.me/twitch-api/users/" + users[id] + "/?callback=?";
        // console.log(url); 
        
        $.getJSON(url, function(data) {
          // console.log("entering json");
          $("#logo" + id).attr("src",data.logo); 
          $("#link" + id).attr("href", "https://www.twitch.tv/" + data.display_name)
          $("#display-name" + id).html(data.display_name);
          var url = "https://wind-bow.gomix.me/twitch-api/streams/" + users[id] + "/?callback=?";
          // console.log(url);
          $.getJSON(url, function(data) {
            // console.log(url +"entering 2nd json");
              if(data.stream === null) {
                $("#status" + id).html("Offline");
              }
              else {
                $("#status" + id).html(data.stream.channel.status);
              }
              colorListItem();
          });
        });
      })(id);
    };
  }
  createStreamerList();

  function addNewStreamer() {
    var id = users.length -1;
    console.log(typeof id);
    $("#streamer-list").append($("<li>").attr("id", id).attr("class", "streamer-list-item"));

        $("#" + id).append($("<img>").attr("id", "logo" + id).attr("class", "logo"));
        $("#" + id).append($("<a>").attr("id", "link" + id).attr("target", "_blank"));
        $("#link" + id).append($("<span>").attr("id", "display-name" + id).attr("class", "display-name"));
        $("#" + id).append($("<span>").attr("id", "status" + id).attr("class", "status"));
        $("#" + id).append($("<span>").attr("class", "remove-icon").html("x"));

        var url = "https://wind-bow.gomix.me/twitch-api/users/" + users[id] + "/?callback=?";
         console.log(url); 
        
        $.getJSON(url, function(data) {
          console.log(data);
          console.log(data.display_name);
          if (data.error === "Unprocessable Entity" || data.error === "Not Found") {
            $("#modal-text").text("Invalid username");
            $("#" + id).remove();
            users.pop();
          }
          else {
          $("#modal-container").css("display", "none");
          console.log("entering json");
          $("#logo" + id).attr("src",data.logo); 
          $("#link" + id).attr("href", "https://www.twitch.tv/" + data.display_name)
          $("#display-name" + id).html(data.display_name);
          
          var url = "https://wind-bow.gomix.me/twitch-api/streams/" + users[id] + "/?callback=?";
          // console.log(url);
          $.getJSON(url, function(data) {
            // console.log(url +"entering 2nd json");
            if(data.stream === null) {
              $("#status" + id).html("Offline");
            }
            else {
              $("#status" + id).html(data.stream.channel.status);
            }
            colorListItem();
            
          });
          }
        });
        
      }

  function colorListItem() {
    $("#streamer-list li").each(function(index) {
      if($(this).find(":nth-child(4)").text() == "Offline") {
        $(this).addClass("offline-color");
        $(this).find(".status-icon").addClass("offline-icon");
      }
      else {
        $(this).addClass("online-color");
        $(this).find(".status-icon").addClass("online-icon");
      }
    });
  }

  $("#streamer-add-btn").click(function() {
    $("#modal-container").css("display","block");
    $("#modal-form").css("display","block");
    $("#modal-text").text("Add new streamer");
    $("#modal-input").focus();
  });

  $("#streamer-remove-btn").click(function() {
    $("#done-btn").css("display", "block");
    $("#modal-container").css("display","block");
    $(".remove-icon").css("display", "block");
    $("#modal-text").text("Editor mode engaged!");
  });

  $("#close-btn").click(function() {
    $("#modal-container").css("display","none");
    $("#modal-form").css("display","none");
    $(".remove-icon").css("display", "none");
    $("#modal-input").val("");
  });

  $("#modal-form").submit(function() {
    var input = $("#modal-input").val();
    console.log(input)
    if (!(users.includes(input)) && input !== "") {
      users.push(input);
      addNewStreamer();
     
      $(".remove-icon").on("click", function() {
        $(this).parent().remove();
      });
    }
    else {
      $("#modal-text").text("Sorry, user already added.")
    }
    $("#modal-input").val("");
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
      if($(this).find(":nth-child(4)").text() == "Offline") {
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
      if($(this).find(":nth-child(4)").text() !== "Offline") {
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
