
//function return the object returned from the github api
//returned in a formatted form
function userInformationHTML(user) {
    //user is the object returned from the APi and it contains many methods
    // return the user public display name and the public profile in formatted form
    return `
        <h2>${user.name}
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
            </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url} target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
                </a>
            </div>
            <p> followers: ${user.followers} - following: ${user.following} <br> Repos: ${user.public_repos}</p>
        </div>
        `;
}



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
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        //display the information in the div gh-user-data using the fucntion response()
        function(firstResponse, secondResponse) {
            var userData = firstResponse[0];
            var repoData = secondResponse[0];
            $("#gh-user-data").html(userInformationHTML(userData));
            $("#gh-repo-data").html(repoInformationHTML(repoData))

        }, function(errorResponse) {
            //add function that handle the errors 
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(
                    `<h2>no info found for user ${username}</h2>`);
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        });
}
