//IIFE start the client side router
(function () {
    page('/log', function(ctx, next) {
        ctx.handled = true;
        navToLog();
        next();
    });
    page('/graph', function(ctx, next) {
        ctx.handled = true;
        navToGraph();
        next();
    });

    function navToLog() {
        $(".content").addClass("hide");
        $("<p>LOG PAGE PLACE HOLDER</p>").insertAfter(".navBar");
    }
    function navToGraph() {
        $(".content").addClass("hide");
        $("<p>GRAPH PAGE PLACE HOLDER</p>").insertAfter(".navBar");
    }

    page.start();
})();
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