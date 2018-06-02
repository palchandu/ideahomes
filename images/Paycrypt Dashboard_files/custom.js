$(document).ready(function(){
  //myFunction();
  //sessionFunction();
    var base_url=$("#base_url").val();

//disbaleTfa
$("#disbleTfa").on('click',function(){
//pop up

swal({
        title: "Are you sure ??",
        text: "You want to disable two factor authentication!", 
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
     if (willDelete) {
     	$.post(base_url+'UserManager/disableTfa',
    		{ 'action':'disableTfa' },
    		function(result) {
    			var obj = $.parseJSON(result);
				//alert( obj.name === "John" );
    			//alert(obj.status);
    			if(obj.status==200)
    			{
    				swal(obj.message, {
           		    icon: "success",
         			});
         			setTimeout(function(){ window.location.href=base_url+"logout";},3000);

    			}
    			else if(obj.status==400)
    			{
    				swal(obj.message, {
           		    icon: "warning",
           		    });
    			}
    			
    		});
        } 
        else {
            swal("You canceled the two factor autenntication disable");
          }
     });
});
$(".addPlansMerchant").on('click',function(){
    var planId=$(this).attr('id');
    var plan=planId.split('_');
    swal({
        title: "Are you sure ??",
        text: "You want to change your plan", 
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        //window.location.href="https://www.google.co.in/?gfe_rd=cr&dcr=0&ei=6BqtWpuKHuucX6_ZtfgE";
        $.post(base_url+'UserManager/addPlans',
        {
            "planId":plan[1]
        },
        function(result)
        {
            if(result==1)
            {
                swal("Successfully plan added to your account", {
                icon: "success",
                });
                setTimeout(function(){ window.location.href=base_url+"dashboard";},2000);
            }
            else
            {
                swal("Something wrong!try again", {
                icon: "warning",
                });
            }
        }
       );
      }
      else
      {
        swal("You canceled the plan change");
      }
      });
    //alert(base_url);
    
});
$(".setPlan").on('click',function(){
swal("Please  update your profile", {
            icon: "warning",
            });
});
$.validator.addMethod( 'checkCurrency', function(value, element) {
      // The two password inputs
      var currency = $("#recurringCurrency").val();

      // Check for equality with the password inputs
      if (currency=="select") {
          return false;
      } else {
          return true;
      }

  }, "Please select recurring currency");

$.validator.addMethod( 'checkRecurring', function(value, element) {
      // The two password inputs
      var recurring = $("#recurringType").val();

      // Check for equality with the password inputs
      if (recurring=="select") {
          return false;
      } else {
          return true;
      }

  }, "Please select recurring type");

$("#recurringForm").validate({
    rules:{
        pymentDate:{
            required:true
        },
        recurringType:{
            required:true,
            checkRecurring:true
        },
        recurringCurrency:{
            required:true,
            checkCurrency:true
        },
        recurringAddr:{
            required:true
        }
    },
    messages:{
        pymentDate:{
            required:"Date is required"
        },
        recurringType:{
            required:"Recurring Type is required"
        },
        recurringCurrency:{
            required:"Recurring currency is required"
        },
        recurringAddr:{
            required:"Address is required"
        }
    },
    submitHandler:function(form){
        form.submit();
    }
});
$(".dropbtn").on('click',function(){
$(".dropdown-content").show();
});
$(".selectFilter").on('click',function(){
var ids=$(this).attr('id');
if(ids=='invoice')
{
  $("#order_id").show();
  $("#amount_id").hide();
  $("#wallet_id").hide();
  $("#transaction_id").hide();
  $(".dropdown-content").hide();
  $("#filt_type").text('Invoice ID');

}
else if(ids=='amount')
{
  $("#order_id").hide();
  $("#amount_id").show();
  $("#wallet_id").hide();
  $("#transaction_id").hide();
  $(".dropdown-content").hide();
  $("#filt_type").text('Amount');
}
else if(ids=='wallet')
{
  $("#order_id").hide();
  $("#amount_id").hide();
  $("#wallet_id").show();
  $("#transaction_id").hide();
  $(".dropdown-content").hide();
  $("#filt_type").text('Wallet');
}
else if(ids=='transaction')
{
$("#order_id").hide();
  $("#amount_id").hide();
  $("#wallet_id").hide();
  $("#transaction_id").show();
  $(".dropdown-content").hide();
  $("#filt_type").text('Transaction Date');
}
});

$("#filters_search").on('click',function(){
var filt_type=$("#filt_type").text();
var filt=$("#search_type").val();
if(filt_type=="Invoice ID")
{
  var inputVal=$("#orderID").val();
  if(inputVal=="")
  {
    alert("Please enter invoice id");
  }
  else
  {
    var filtParam='t='+filt+'&f='+filt_type+"&v="+inputVal;
  }
  
}
else if(filt_type=="Amount")
{
  var inputVal1=$("#amountfrom").val();
  var inputVal2=$("#amounto").val();
  if(inputVal1=="")
  {
    alert("Please enter initial amount");
  }
  else if(inputVal2=="")
  {
    alert("Please enter final amount");
  }
  else
  {
    var filtParam='t='+filt+'&f='+filt_type+"&v1="+inputVal1+"&v2="+inputVal2;
  }
  
}
else if(filt_type=="Wallet")
{
  var inputVal=$("#addrInt").val();
  if(inputVal=="")
  {
    alert("Please enter wallet address");
  }
  else
  {
  var filtParam='t='+filt+'&f='+filt_type+"&v="+inputVal;
  }
}
else if(filt_type=="Transaction Date")
{
  var inputVal1=$("#txDatefrom").val();
  var inputVal2=$("#txDateto").val();
  if(inputVal1=="")
  {
    alert("Please enter starting date");
  }
  else if(inputVal2=="")
  {
    alert("Please enter end date");
  }
  else
  {
  var filtParam='t='+filt+'&f='+filt_type+"&v1="+inputVal1+"&v2="+inputVal2;
  }
}
  $.ajax({
    type:"POST",
    url:base_url+"UserManager/search_payment",
    data:filtParam,
    dataType:"text",
    success:function(result){
      $("#success_payment").html(result);
    }
  });
  //alert(base_url);
});

//to check number only

$(".amtval").on("keypress keyup blur",function (event) {
            //this.value = this.value.replace(/[^0-9\.]/g,'');
 $(this).val($(this).val().replace(/[^0-9\.]/g,''));
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });

});
var myVar;

function myFunction() {
    myVar = setInterval(getAlert, 3000);
}

function getAlert()
{
  //var addr=$("#address").val();
  var base_url=$("#base_url").val();
  var addr=$("input[name=address]").val();
  if(addr!="")
  {
    $.post(base_url+'Paymentcoin/getnotification', 
      { address: addr}, 
      function(data) {
      if(data>0)
      {
        
      }
    });
  }
}

          var check_session;
            function sessionFunction() {
                check_session = setInterval(checkForSession, 100);
            }

            function checkForSession()
            {
              var base_url=$("#base_url").val();
                $.post(base_url+'UserManager/isLiveSession', 
                  { param: "session_check"}, 
                  function(data) {
                  if(data== "1")
                  {
                    window.location.href=base_url+"login"
                  }
                  // else if(data== "0")
                  // {
                  //   window.location.href=base_url+"dashboard"
                  // }
                });
            }
