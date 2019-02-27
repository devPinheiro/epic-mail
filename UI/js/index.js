// let use something different
let $ = selector => document.querySelector(selector);

// select element needed
let container = $("#login-form"),
    form = $('.form'),
    container_signup = $("#signup_cont"),
    form_signup = $('#signup-form');



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


  // Listen for submit event -- Login
  $('#login-form').addEventListener('submit', (e) => {
      e.preventDefault();
  
      // get user's input
      const email = $('#email').value,
          password = $('#password').value;
  
      // let's do a little validation
      let reg = /^[A-Za-z0-9]/;
      let checkEmail = reg.test(email);	// returns a boolean 
      if (checkEmail) {
          $('#email').style.border = '';
         showAlert("success", `Your email is ${email} and password is ${password}`);
         // Timeout after 5s
          setTimeout(function () {
            window.location = 'inbox.html';
        }, 3000);
  
      } else {
          $('#email').style.border ="1px solid #ff1e1e";
          showAlert('error', 'Something is wrong with your credentials')
      }
  
  
  });
  
 