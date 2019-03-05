
// let use something different
let $ = selector => document.querySelector(selector);

// select element needed
let container = $("#login-form"),
    form = $('.form'),
    container_signup = $("#signup_cont"),
    form_signup = $('#signup-form');
// Listen for submit event -- Sign Up
$('#signup-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // get user's input
    const fname = $("#fname").value,
        lname = $('#lname').value,
        email = $("#s_email").value,
        password = $("#s_password").value;

    // let's do a little validation
    if (email !== '') {

        showAlertSignup("success", `Successfully Registered`);
        // Timeout after 5s
        setTimeout(function () {
            window.location = 'inbox.html';
        }, 3000);

    } else {
        showAlertSignup('error', 'Something is wrong with your credentials')
    }


});

// create an alert element
let showAlertSignup = (classN, message) => {

    // create an error div
    let alertDiv = document.createElement('div');

    // add error message and style
    alertDiv.className = `alert ${classN}`;
    alertDiv.textContent = message;

    //insert before form and container
    container_signup.insertBefore(alertDiv, form_signup);

    // Timeout after 5s
    setTimeout(function () {
        $('.alert').remove();
    }, 5000);
}
