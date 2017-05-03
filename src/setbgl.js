

$(document).ready(function() {
    //add listener to submit button
    $(".submit").click(function(){
        $.ajax({
            url: "https://www.managebgl.com/api/1.0/login.json",
            
            data: { email: $(".email").val(),
                    password: $(".password").val(),
                    debug: ""
                },
            type: "GET",

            dataType: "json"

        })
        .done(  function(res) {
            //if predict bgl accepts the login,
            //store the login token in sessionStorage 
            if(res.message === "Ok")  {
                sessionStorage.setItem("token", res.token);
            }
            //if predictbgl rejects the login alert with the errors message
            else {
                alert(res.message);
            }
        })
        //if the request fails log out the error and status
        .fail( function (xhr, status, errorThrown) {
                alert("Failed to connect to log in server");
                console.log( "Error: " + errorThrown );
                console.log( "Status: " + status );
                console.dir( xhr );
        });
    });
});