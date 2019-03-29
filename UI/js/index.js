
// select element needed
let container = $("#login-form"),
    form = $('.form'),
    container_signup = $("#signup_cont"),
    form_signup = $('#signup-form'),
    compose_before = $('.compose-mail-form'),
    compose_after = $('#compose_after');


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

// Listen for submit event -- Sign In
if ($('#reset_btn')) {
    $('#reset_btn').onclick = (e) => {

        e.preventDefault();
        // get user's input
        const payload = {
            email: $("#email").value,
        }

        // first validate user input
        // let's do a little validation
        let regMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        let checkEmail = regMail.test(payload.email); // returns a boolean 

        $('#email').style.border = '';
        if (!checkEmail) {
            $('#email').style.border = "1px solid #ff1e1e";
            showAlert('error', 'provide correct email credential')
        }

        // let's sign user up
        if (checkEmail) {
            resetPassword(payload);
        }

    };
}


// Listen for submit event -- Compose
if ($('#compose_btn')) {
    $('#compose_btn').onclick = (e) => {

        e.preventDefault();
        // get user's input
        const payload = {
            email: $("#receiver_email").value,
            subject: $("#subject").value,
            message: $("#mail_body").value,
        }

        // first validate user input
        // let's do a little validation
        let regMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        let checkEmail = regMail.test(payload.email); // returns a boolean 
        let reg = /[A-Za-z]/;
        let checkSubject = reg.test(payload.subject); // returns a boolean 
        let checkMessage = reg.test(payload.message); // returns a boolean 

        $('#receiver_email').style.border = '';
        if (!checkEmail) {
            $('#receiver_email').style.border = "1px solid #ff1e1e";
            showComposeAlert('error', 'provide correct email credential')
        }

        if (!checkSubject && payload.subject === '') {
            $('#subject').style.border = "1px solid #ff1e1e";
            showComposeAlert('error', 'subject can not be empy')
        }
 
        if (!checkMessage && payload.message === '') {
            $('#mail_body').style.border = "1px solid #ff1e1e";
            showComposeAlert('error', 'message can not be empty')
        }

        // send mail to recipient
        if (checkEmail) {
            compose(payload);
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
            if(signinResult.status === 404){
                errMsg = signinResult.error;
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
            showAlert("success", `Sign in was successful`);
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

// reset user password
const resetPassword = async (body) => {
    if (body) {

        // disable button
        $('#reset_btn').disabled = true;
        $('#reset_btn').style.backgroundColor = '#c0c0c0';
        // make network request
        const { resetResult } = await Samios.resetPassword(body);

        if (resetResult.error) {
            let errMsg;
            if (resetResult.status === 404) {
                errMsg = resetResult.error;
            }
            if (resetResult.status === 400) {
                errMsg = Object.values(resetResult.error).join(' \n \n')
            }
            showAlert('error', errMsg);
            // enable button
            $('#reset_btn').disabled = false;
            $('#reset_btn').style.backgroundColor = '#e68016';
        } else {
            if (resetResult.status === 200) {
               showAlert("success", resetResult.data.message);
            }
            
            // enable button
            $('#reset_btn').disabled = false;
            $('#reset_btn').style.backgroundColor = '#e68016';
            
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

// compose mail alert
let showComposeAlert = (classN, message) => {

    // create an error div
    let alertDiv = document.createElement('div');

    // add error message and style
    alertDiv.className = `alert ${classN}`;
    alertDiv.textContent = message;

    //insert before form and container
    compose_before.insertBefore(alertDiv, compose_after);

    // Timeout after 5s
    setTimeout(function () {
        $('.alert').remove();
    }, 5000);
}


// compose message
const compose = async (body) => {
    if (body) {

        // disable button
        $('#compose_btn').disabled = true;
        $('#compose_btn').style.backgroundColor = '#c0c0c0';

        // make network request
        const { composeResult } = await Samios.composeMail(body);

        if (composeResult.error) {
            let errMsg;
            if (composeResult.status === 400) {
                errMsg = composeResult.error;
            }

            if (composeResult.status === 401) {
                errMsg = composeResult.error;
            }
            showComposeAlert('error', errMsg);
            // enable button
            $('#compose_btn').disabled = false;
            $('#compose_btn').style.backgroundColor = '#e68016';
        } else {
            if (composeResult.status === 201) {
                // clear input
                $("#receiver_email").value = '';
                $("#subject").value = '';
                $("#mail_body").value = '';
               showComposeAlert("success", 'Mail has been sent successfully');
               // enable button
               $('#compose_btn').disabled = false;
               $('#compose_btn').style.backgroundColor = '#e68016';
             
            }
                       
        }
    } else {
        showAlert('error', 'Something is wrong with your credentials')
    }
}