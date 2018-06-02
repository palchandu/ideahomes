$(document).ready(function(){
  sessionFunction();
  $.validator.addMethod( 'passwordMatch', function(value, element) {

      // The two password inputs
      var password = $("#upassword").val();
      var confirmPassword = $("#ucpassword").val();

      // Check for equality with the password inputs
      if (password != confirmPassword ) {
          return false;
      } else {
          return true;
      }

  }, "Your Passwords Must Match");
  $.validator.addMethod( 'passwordMatchtReset', function(value, element) {

      // The two password inputs
      var password = $("#newpass").val();
      var confirmPassword = $("#confirm_new_pass").val();

      // Check for equality with the password inputs
      if (password != confirmPassword ) {
          return false;
      } else {
          return true;
      }

  }, "Your Passwords Must Match");
  //to check user name alphabetically
  $.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^[a-z\s]+$/i.test(value);
  }, "Please enter alphabet");
//Valid emailId
$.validator.addMethod("validEmail", function(value, element) {
return this.optional(element) || /([a-zA-Z][0-9]*)+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i.test(value);
}, "Please enter valid email");

// $.validator.addMethod("alphanumeric", function(value, element) {
//     return this.optional(element) || /^[\w.]+$/i.test(value);
// }, "Letters, numbers only please");

$.validator.addMethod("noSpace", function(value, element) {
      return value == '' || value.trim().length != 0;
    }, "No space please");

///captcha validation
$.validator.addMethod('captchValValidate', function(value, element) {

      // The two password inputs
      var captchVal = $("#captchVal").text();
      var captchInputVal = $("#inputcap").val();

      // Check for equality with the password inputs
      if (captchVal != captchInputVal ) {
          return false;
      } else {
          return true;
      }

  }, "Captcha Code Must Match");
//spaces not allowed
$.validator.addMethod("noSpace", function(value, element) { 
  return value.indexOf(" ") < 0 && value != ""; 
}, "No space please");

  $("#register").validate({
    rules:{
      fname:
      {
        required:true,
        lettersonly:true,
        noSpace:true,
      },
      lname:{
        required:true,
        lettersonly:true,
        noSpace:true,
      },
      uemail:{
        required:true,
        email:true,
        validEmail: true,
      },
      upassword:{
        required:true,
        noSpace:true,
        minlength:8,
      },
      ucpassword:{
        required:true,
        noSpace:true,
        minlength:8,
        passwordMatch:true,
      }
    },
    messages:{
      fname:
      {
        required:"First name is required",
      },
      lname:{
        required:"Last name is required",
      },
      uemail:{
        required:"Email is required",
        email:"Please enter valid email",
      },
      upassword:{
        required:"Password is required",
        minlength:"Password will be minimum 8 character",
      },
      ucpassword:{
        required:"Confirm password is required",
        minlength:"Password will be minimum 8 character",
      }
    },
    submitHandler: function(form) {
      form.submit();
    }
  });
  /*Generate userCaptcha*/
  $("#userCaptcha").on('click',function(){
    var preCaptcha=$("#inputcap").val();
    var baseUrl=$("#baseUrl").val();
    var baseUrl2=$("#base_url").val();
    $.ajax({
      type:"GET",
      url:baseUrl2+"userManager/userCaptch",
      dataType:"text",
      success:function(result){
        if(preCaptcha!="")
        {
          $("#inputcap").val("");
        }
        $("#captchVal").text(result);
      }
    });
  });
  /*Validate User Login*/
  $("#userLogin").validate({
    rules:{
      uemail:{
        required:true,
        email:true,
        validEmail:true
      },
      upassword:{
        required:true,
        minlength:8
      },
      inputcap:{
        required:true,
        minlength:6,
        captchValValidate:true,
      }
    },
    messages:{
      uemail:{
        required:"Email is required",
        email:"Please enter valid email",
      },
      upassword:{
        required:"Password is required",
        minlength:"Password length will be 8 character in length"
      },
      inputcap:{
        required:"Please enter captcha",
        minlength:"Minimum length of captcha is 6 character in length",
      }
    },
    submitHandler: function(form) {
      form.submit();
    }
  });

  $("#forgetPass").validate({
    rules:{
      uemail:{
        required:true,
        email:true,
        validEmail:true
      }
    },
    messages:{
      uemail:{
        required:"Email is required",
        email:"Please enter valid email",
      }
    },
    submitHandler:function(form){
      form.submit();
    }
  });
  $("#userProfile").validate({
    rules:{
      org_name:{
        required:true
      },
      website_name:{
        required:true,
        url: true
      },
      businessType:{
        required:true
      },
      mobileNum:{
        required:true,
        number: true
      }

    },
    messages:{
      org_name:{
        required:"Organisation is required"
      },
      website_name:{
        required:"Enter website URL",
        url:"Please Enter valid website url"
      },
      businessType:{
        required:"Please select business Type"
      }
      ,
      mobileNum:{
        required:"Mobile Number is required",
        number:"Please enter number only"
      }
    },
    submitHandler: function(form) {
      form.submit();
    }
  });
  $("#resetPass").validate({
    rules:{
      current_pass:{
        required:true
      },
      newpass:{
        required:true,
        minlength:8
      },
      confirm_new_pass:{
        required:true,
        minlength:8,
        passwordMatchtReset:true
      }
    },
    messages:{
      current_pass:{
        required:"Current password is required"
      },
      newpass:{
        required:"New password is required",
        minlength:"Password will be minimum 8 character"
      },
      confirm_new_pass:{
        required:"Confirm new password is required",
        minlength:"Password will be minimum 8 character"
      }
    },
    submitHandler:function(form)
    {
      form.submit();
    }
  });
});
            var check_session;
            function sessionFunction() {
                check_session = setInterval(checkForSession, 1000);
            }

            function checkForSession()
            {
              var base_url=$("#base_url").val();
                $.post(base_url+'UserManager/isLiveSession',
                  { param: "session_check"},
                  function(data) {
                  if(data== "0")
                  {
                    window.location.href=base_url+"dashboard"
                  }
                });
            }
