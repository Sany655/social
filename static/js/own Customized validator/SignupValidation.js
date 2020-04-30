$(function(){
  $('.datepicker-input').datepicker();
  // alert("hello world");
  $("#name_alert").hide();
  $("#email_alert").hide();
  $("#password_alert").hide();
  $("#rpassword_alert").hide();

  // varriables for return true or false from success function
  var valid_name = false;
  var valid_email = false;

//Name
  $("#name").focusout(function(){
    name();
  });

  function name()
  {
    if($("#name").val().length == 0)
    {
      $("#name_alert").html("Name is required!");
      $("#name_alert").show();
      return true;
    }
    else
    {
      var name = $("#name").val();
      var formdata = new FormData();
      formdata.append("name",name);
      formdata.append("name_check",'name_check');
      $.ajax({
        processData:false,
        contentType:false,
        data:formdata,
        type:"post",
        url:"l&s.php",
        success:function(data)
        {
          var msg = $.trim(data);
          if (msg == "Found a name")
          {
            valid_name = true;
            $("#name_alert").html("Username already exiest, username must be unique!");
            $("#name_alert").show();
          }
          else if (msg == "Found no name")
          {
            valid_name = false;
            $("#name_alert").hide();
          }
        }
      });
      return valid_name;
    }
  }


//Email
  $("#email").focusout(function(){
    email();
  });

  function email()
  {
    if ($("#email").val().length == 0) {
      $("#email_alert").html("Email is requierd");
      $("#email_alert").show();
      return true;
    }
    else
    {
      var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
      if(!pattern.test($("#email").val()))
      {
        $("#email_alert").html("invalid email type");
        $("#email_alert").show();
        return true;
      }
      else
      {
        var email = $("#email").val();
        var valid = false;
        var formdata = new FormData();
        formdata.append("email",email);
        formdata.append("email_check",'email_check');
        $.ajax({
          processData:false,
          contentType:false,
          data:formdata,
          type:"post",
          url:"l&s.php",
          success:function(data)
          {
            var msg = $.trim(data);
            if (msg == "found email")
            {
              valid_email = true;
              $("#email_alert").html("Email already exiest, Email must be unique!");
              $("#email_alert").show();
            }
            else if(msg == "Found no email")
            {
              $("#email_alert").hide();
              valid_email = false;
            }
          }
        });
        return valid_email;
      }
    }
  }




//password
$("#password").focusout(function(){
  pass();
});
function pass()
{
  if($("#password").val().length == 0)
    {
      $("#password_alert").html("password is required");
      $("#password_alert").show();
      return true;
    }
   else
   {
     if( $("#password").val().length<8)
     {
       $("#password_alert").html("Minimum 8 character and password should contain One Uppercase, One lowercase,one number, one special character");
       $("#password_alert").show();
       return true;
     }
     else
     {
       var password_reg_ex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
       if(!password_reg_ex.test($("#password").val()))
       {
         $("#password_alert").html("Minimum 8 character and password should contain One Uppercase, One lowercase,one number, one special character");
         $("#password_alert").show();
         return true;
       }
       else
       {
         $("#password_alert").hide();
         return false;
       }
     }
   }
 }



// Retype password
$("#rpassword").focusout(function(){
  rpass();
});
function rpass()
{
  if ($("#rpassword").val().length !== 0)
  {
    if ($("#rpassword").val() == $("#password").val())
    {
      $("#rpassword_alert").hide();
      return false;
    }
    else
    {
      $("#rpassword_alert").html("Password not matched");
      $("#rpassword_alert").show();
      return true;
    }
  }
  else
  {
    $("#rpassword_alert").html("Confirm password requierd");
    $("#rpassword_alert").show();
    return true;
  }
}


$("#address").focusout(function(){
  addr();
});

function addr() 
{
  if ($("#address").val().length == 0)
  {
    $("#address_alert").html("Address is required");
    $("#address_alert").show();
    return true;
  }
  else
  {
    $("#address_alert").hide();
    return false;
  }
}


$("#city").focusout(function(){
  cty();
});

function cty() 
{
  if ($("#city").val().length == 0)
  {
    $("#city_alert").html("State & City is required");
    $("#city_alert").show();
    return true;
  }
  else
  {
    $("#city_alert").hide();
    return false;
  }
}



$("#phone").focusout(function(){
  phn();
});

function phn() 
{
  if ($("#phone").val().length == 0) 
  {
    $("#phone_alert").html("Phone number is required");
    $("#phone_alert").show();
    return true;
  }
  else
  {
    $("#phone_alert").hide();
    return false;
  }
}



$("#birthdate").focusout(function(){
  bd();
});

function bd() 
{
  if ($("#birthdate").val().length == 0) 
  {
    $("#birthdate_alert").html("Birth date is required");
    $("#birthdate_alert").show();
    return true;
  }
  else
  {
    $("#birthdate_alert").hide();
    return false;
  }
}


// $("#submit-next-2").click(function() {
  // $("#pp-form").slideUp();
  // $("#final-form").slideDown();
// });


$("#submit").click(function(){
  if (bd() == false && addr() == false && cty() == false) {

var name = $("#name").val();
var email = $("#email").val();
var password= $("#password").val();
var address = $("#address").val();
var city = $("#city").val();
var phone = $("#phone").val();
var language = $("#language").val();
var birthdate = $("#birthdate").val();

// alert(name+" "+email+" "+password+" "+address+" "+city+" "+phone+" "+pp+" "+language+" "+birthdate);

  var formdata = new FormData();
  formdata.append('name',name);
  formdata.append('email',email);
  formdata.append('password',password);
  formdata.append('address',address);
  formdata.append('city',city);
  formdata.append('phone',phone);
  formdata.append('language',language);
  formdata.append('birthdate',birthdate);
  formdata.append('signup',"signup");
  $.ajax({
    processData:false,
    contentType:false,
    data:formdata,
    type:"post",
    url:"l&s.php",
    success:function(data)
    {
      var msg = $.trim(data);
      if (msg == "congo")
      {
        location.href="index.php"
      }
      else {
        alert("something went wrong");
      }
    }
  });

  }
  else{
    if (addr() == true)
    {
      $("#address_alert").show();
    }
    if (cty() == true)
    {
      $("#city_alert").show();
    }
    if (bd() == true)
    {
      $("#birthdate_alert").show();
    }
  }
});

$("#final-form").hide();

//click the button
  $("#submit-next").click(function(){
    if(name() == false && email() == false && phn() == false && pass() == false  && rpass() == false)
    {
      $("#initial-form").slideUp();
      $("#final-form").slideDown();
    }
    else
    {

      if (name() == true)
      {
        $("#name_alert").show();
      }

      if (email() == true)
      {
        $("#email_alert").show();
      }

      if (phn() == true)
      {
        $("#phone_alert").show();
      }

      if (pass() == true)
      {
        $("#password_alert").show();
      }


      if (rpass() == true)
      {
        $("#rpassword_alert").show();
      }

    }

  });
});
