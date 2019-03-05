// let use something different
let $ = selector => document.querySelector(selector);

// select element needed
let container = $("#reset-form"),
    form = $('.form');

// Listen for submit event -- Reset
$('#reset-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // get user's input
    const email = $('#email').value;

    // let's do a little validation
    let reg = /^[A-Za-z0-9]/;
    let checkEmail = reg.test(email); // returns a boolean 
    if (checkEmail) {
        $('#email').style.border = '';
        showAlert("success", `Password successfully reset - check your mail`);

    } else {
        $('#email').style.border = "1px solid #ff1e1e";
        showAlert('error', 'Something is wrong with your credentials')
    }


});


// create an alert element
let showAlert = (classN, message) => {

    // create an error div
    let alertDiv = document.createElement('div');

    // add error message and style
    alertDiv.className = `alert ${classN}`;
    alertDiv.textContent = message;

    //insert before form and container
    form.insertBefore(alertDiv, container);

    // Timeout after 5s
    setTimeout(function () {
        $('.alert').remove();
    }, 5000);
}
