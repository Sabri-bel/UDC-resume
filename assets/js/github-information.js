
//function called in oninput event
function fetchGitHubInformation(event) {
    //1.create a variable to hold the username typed with jquery
    var username = $("#gh-username").val();
    //2. create the if statement if the username fields is empty
    if (!username) {
        $("#gh-user-data").html(`<h2>please enter a github username</h2>`);
        //2a. if the username is empty --> not using the api
        return;
    }
    //3. create the animate loader with jquery
    $("#gh-user-data").html(
        `<div id="loader">
        <img src="assets/css/loader.gif" alt="loading..." />
        </div>`);
    //4. create a promises for retrieve data from github 
    //promises two things correlated when one thing is done then do the other
    $.when(
        //when get a response from the api then run a function below
        //when get a function as argument getJSON() with the github api address
        $.getJSON(`https://api.github.com/users/${username}`)
    ).then(
        //display the information in the div gh-user-data using the fucntion response()
        function(response) {
            var userData = response;
            $("gh-user-data").html(userinformationHTML(userData));
        }, function(errorResponse) {
            //add function that handle the errors 
            if (errorResponse.status === 404) {
                $("gh-user-data").html(
                    `<h2>no info found for user ${username}</h2>`);
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        });
}
