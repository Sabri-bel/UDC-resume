
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
}