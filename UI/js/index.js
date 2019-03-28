
// select element needed
let container = $("#login-form"),
    form = $('.form'),
    container_signup = $("#signup_cont"),
    form_signup = $('#signup-form');


// Listen for submit event -- Sign Up
if ($('#signup_btn')){
   $('#signup_btn').onclick = (e) => {

       e.preventDefault();
       // get user's input
       const payload = {
           firstName: $("#fname").value,
           lastName: $('#lname').value,
           email: $("#s_email").value,
           password: $("#s_password").value
       }

       // first validate user input
       // let's do a little validation
       let regMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
       let reg = /[A-Za-z]/;
       let checkEmail = regMail.test(payload.email); // returns a boolean 
       let checkFirstname = reg.test(payload.firstName); // returns a boolean 
       let checkLastname = reg.test(payload.lastName); // returns a boolean 
       let checkPassword = reg.test(payload.password); // returns a boolean 

       $('#s_email').style.border = '';
       $('#s_password').style.border = '';
       $('#fname').style.border = '';
       $('#lname').style.border = '';
       if (!checkEmail) {
           $('#s_email').style.border = "1px solid #ff1e1e";
           showAlertSignup('error', 'provide correct email credential')
       }

       if (!checkFirstname) {
           $('#fname').style.border = "1px solid #ff1e1e";
           showAlertSignup('error', 'firstname is incorrect')
       }

       if (!checkLastname) {
           $('#lname').style.border = "1px solid #ff1e1e";
           showAlertSignup('error', 'lastname is incorrect')
       }

       if (!checkPassword) {
           $('#s_password').style.border = "1px solid #ff1e1e";
           showAlertSignup('error', 'password requires min 6 characters')
       }

       // let's sign user up
       if (checkEmail && checkFirstname && checkLastname && checkPassword) {
           signUp(payload);
       }

   };
}


// Listen for submit event -- Sign In
if ($('#signin_btn')) {
    $('#signin_btn').onclick = (e) => {

        e.preventDefault();
        // get user's input
        const payload = {
            email: $("#email").value,
            password: $("#password").value
        }

        // first validate user input
        // let's do a little validation
        let regMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        let reg = /[A-Za-z]/;
        let checkEmail = regMail.test(payload.email); // returns a boolean 
        let checkPassword = reg.test(payload.password); // returns a boolean 

        $('#email').style.border = '';
        $('#password').style.border = '';
        if (!checkEmail) {
            $('#email').style.border = "1px solid #ff1e1e";
            showAlert('error', 'provide correct email credential')
        }

        if (!checkPassword) {
            $('#password').style.border = "1px solid #ff1e1e";
            showAlert('error', 'password requires min 6 characters')
        }

        // let's sign user up
        if (checkEmail && checkPassword) {
            logIn(payload);
        }

    };
}



// sign user up
const signUp = async (body) => {

    if (body) {

        // disable button
        $('#signup_btn').disabled = true;
        $('#signup_btn').style.backgroundColor = '#c0c0c0';
        // make network request
        const { signupResult } = await Samios.signUp(body);

        if(signupResult.error){
            let errMsg;
            if(signupResult.status === 409){
                errMsg = signupResult.error;
            }
            if(signupResult.status === 400){
                    errMsg = Object.values(signupResult.error).join(' \n \n')
            }
           showAlertSignup('error', errMsg);
           // enable button
           $('#signup_btn').disabled = false;
           $('#signup_btn').style.backgroundColor = '#e68016';
        } else{
            // store token into localstorage
            localStorage.setItem('token', signupResult.data.token);
            showAlertSignup("success", `Successfully Registered`);
            // enable button
            $('#signup_btn').disabled = false;
            $('#signup_btn').style.backgroundColor = '#e68016';
            // Timeout after 5s
            setTimeout(function () {
                window.location = 'inbox.html';
            }, 3000);
        }
    } else {
        showAlertSignup('error', 'Something is wrong with your credentials')
    }
}

// sign in user
const logIn = async (body) => {
     if (body) {

        // disable button
        $('#signin_btn').disabled = true;
        $('#signin_btn').style.backgroundColor = '#c0c0c0';
        // make network request
        const { signinResult } = await Samios.signIn(body);

        if(signinResult.error){
            let errMsg;
            if(signinResult.status === 409){
                errMsg = signupResult.error;
            }
            if(signinResult.status === 400){
                    errMsg = Object.values(signinResult.error).join(' \n \n')
            }
           showAlert('error', errMsg);
           // enable button
           $('#signin_btn').disabled = false;
           $('#signin_btn').style.backgroundColor = '#e68016';
        } else{
            // store token into localstorage
            localStorage.setItem('token', signinResult.data.token);
            showAlert("success", `Successfully Registered`);
            // enable button
            $('#signin_btn').disabled = false;
            $('#signin_btn').style.backgroundColor = '#e68016';
            // Timeout after 5s
            setTimeout(function () {
                window.location = 'inbox.html';
            }, 3000);
        }
    } else {
        showAlert('error', 'Something is wrong with your credentials')
    }
}

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
    }, 10000);
}

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


