$(function(){
  //  logout
  $('div.logout').click(function(){
    $('form.logout').submit();
  })
  
  posts()
  
}); // ajax function
 
function posts() {
  alert("calling fun")
  formdata = new FormData();
    $.ajax({
      headers: { "X-CSRFToken": $.cookie("csrftoken") },
      processData: false,
      contentType: false,
      type: "get",
      url: "posts",
      data:formdata,
      success: function(data) {
          alert(data);
          $("#posts").html(data);
      }
    });
 }