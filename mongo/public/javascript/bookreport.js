$(document).ready(function(){
  $("#postReport").click(function(){
      var myobj = {Name:$("#title").val(),Comment:$("#report").val()};
      jobj = JSON.stringify(myobj);
      $("#json").text(jobj);

      var url = "report";
      $.ajax({
           url:url,
           type: "POST",
           data: jobj,
           contentType: "application/json; charset=utf-8",
           success: function(data,textStatus) {
                 $("#done").html(textStatus);
           }
      })
  });


  $("#getReport").click(function() {
    $.getJSON('report', function(data) {
      console.log(data);
      var everything = "<ul>";
      for(var report in data) {
        rpt = data[comment];
        everything += "<li> Title: " + rpt.Title + " -- Report: " + rpt.Report + "</li>";
      }
      everything += "</ul>";
      $("#reports").html(everything);
    })
  });

  
  $('#deleteReport').click(function() {
    var url = "/deleteReport";
    $.ajax({
      url: url,
      type: "DELETE",
      contentType: "application/json; charset=utf-8",
      success: function(data, textStatus) {
        $("#done").html("Cleared.");
      }
    })
  });

});
