//IIFE start the client side router BEFORE the DOM is ready
(function () {
    page('/', logIn, function(ctx, next) {
        ctx.handled = true;
        render("landing");
    });
    page('/log', logIn, function(ctx, next) {
        ctx.handled = true;
        render("log");
    });
    page('/graph', logIn, function(ctx, next) {
        ctx.handled = true;
        render("graph");
    });
    //renders login page if not logged in
    //otherwise falls through to next.
    function logIn(ctx, next) {
        //when not logged in
        if(!sessionStorage.getItem("token")){
            //render the static html of logIn
            render("logIn");
            //add a listender to the submit button to do ajax
            addLogInListener(next);
        }
        else {
            next();
        }
    }
    
    function render(view) {
        $(".content").html(template(view));
    }
    //from page examples/chrome
    function template(name) {
        return $("#" + name + '-template').html();
    }

    //perfrom ajax call to get login token.
    //if successful navigates to next view as defined in route
    function addLogInListener(next) {
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
                    //safe to go though to next router
                    next();
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
    }

    //start the client-side router
    page.start();
})();