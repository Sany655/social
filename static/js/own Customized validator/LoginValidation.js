$(function(){
$("#login_alert").hide();

// name
$("#userName").focusout(function(){
  name();
});
function name()
{
  if ($("#userName").val().length == 0)
  {
    $("#login_alert").html("Fill the empty input fields");
    $("#login_alert").show();
    return true;
  }
  else
  {
    $("#login_alert").hide();
    return false;
  }
}

//click the button
$("#signin").click(function(){
  if (name() == false)
  {
    var formdata = new FormData();
    formdata.append('userName',$("#userName").val());
    formdata.append('password',$("#password").val());
    formdata.append("login",'login');
    $.ajax
    ({
      processData:false,
      contentType:false,
      data:formdata,
      type:"post",
      url:"l&s.php",
      success:function(data)
      {
        msg = $.trim(data);
        if (msg == "congo")
        {
          $("#login_alert").hide();
          window.location.href="index.php";
        }
        else
        {
          $("#login_alert").html("Credentials not matched");
          $("#login_alert").show();
        }
      }
    });
  }
});


});
