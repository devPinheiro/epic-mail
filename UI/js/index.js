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
           
            showComposeAlert('error', 'message can not be empty')
        }

        // send mail to recipient
        if (checkEmail && checkMessage && checkSubject) {
            compose(payload);
        }

    };
}

if ($('#draft_btn')) {
    $('#draft_btn').onclick = (e) => {

        e.preventDefault();
        // get user's input
        const payload = {
            email: $("#receiver_email").value,
            subject: $("#subject").value,
            message: $("#mail_body").value,
            draft: 'draft'
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
            draft(payload);
        }

    };
}
let inboxData;
// fetch all inbox messages
if ($('.inbox-mail')) {
     document.addEventListener('DOMContentLoaded', async () => {
         
         // fetch
         const { inboxResult } = await Samios.inbox();

         if (inboxResult.error === 'token has expired' || inboxResult.error === 'not authorized') {
             window.location = 'login.html';
         } else {
             // initialize ui
             const UI = new MailBox;
             inboxData = inboxResult.data
             UI.inbox(inboxResult.data);
             
         }        
     });
}

const inboxMail = async (id) => {
    // fetch
    const data = inboxData.filter((inbox) => inbox.message_id === id);

    // initialize ui
    const UI = new MailBox;

    UI.singleView(data[0]);

    // fetch
    await Samios.singleView(id);

}

let deleteId;
// delete
const getId = (id) => {
    deleteId = id
    //
    let chk = document.querySelectorAll('#mail_action');
    chk.forEach((checkbox, i) => {
        if(checkbox.checked === false){
            checkbox.disabled = true
        }
    })
};


if($('#delete')){
    $('#delete').addEventListener('click', async ()=>{
      if(deleteId){
          // make a request to delete item
          const { delResult } = await Samios.deleteMail(deleteId);

          if (delResult.error) {
              let errMsg;
              if (delResult.status === 404) {
                  errMsg = delResult.error;
              }
              if (delResult.status === 400) {
                  errMsg = Object.values(delResult.error).join(' \n \n')
              }
              showDelAlert('error', errMsg);
            console.log(errMsg)
          } else {
              if (delResult.status === 200) {
                  showDelAlert("success", delResult.data.message);
                  window.location.reload();
              }

      }
    }
    });
}

if($('#delete_draft')){
    $('#delete_draft').addEventListener('click', async ()=>{
      if(deleteId){
          // make a request to delete item
          const { delResult } = await Samios.deleteDraft(deleteId);

          if (delResult.error) {
              let errMsg;
              if (delResult.status === 404) {
                  errMsg = delResult.error;
              }
              if (delResult.status === 400) {
                  errMsg = Object.values(delResult.error).join(' \n \n')
              }
              showDelAlert('error', errMsg);
          } else {
              if (delResult.status === 200) {
                  showDelAlert("success", delResult.data.message);
                  window.location.reload();
              }

      }
    }
    });
}

if($('#retract_sent')){
    $('#retract_sent').addEventListener('click', async ()=>{
      if(deleteId){
          // make a request to delete item
          const { delResult } = await Samios.retractMail(deleteId);

          if (delResult.error) {
              let errMsg;
              if (delResult.status === 404) {
                  errMsg = delResult.error;
              }
              if (delResult.status === 400) {
                  errMsg = Object.values(delResult.error).join(' \n \n')
              }
              showDelAlert('error', errMsg);
            console.log(errMsg)
          } else {
              if (delResult.status === 200) {
                  showDelAlert("success", delResult.data.message);
                  window.location.reload();
              }

      }
    }
    });
}

let sentData;
// fetch all sent messages
if ($('.sent-section')) {
    document.addEventListener('DOMContentLoaded', async () => {
        // fetch
        const { sentResult } = await Samios.sent();

        if (sentResult.error === 'token has expired' || sentResult.error === 'not authorized') {
            window.location = 'login.html';
        } else {
            // initialize ui
            const UI = new MailBox;
            sentData = sentResult.data;
            UI.sent(sentResult.data);
        }

    });
}

const viewSent = async (id) => {
    console.log(sentData)
    // fetch
    const data = sentData.filter((sent) => sent.message_id === id);
    // initialize ui
    const UI = new MailBox;
    UI.sentView(data[0]);


}

let draftData;
// fetch all draft messages
if ($('.draft-section')) {
     document.addEventListener('DOMContentLoaded', async () => {
         // fetch
         const { draftResult } = await Samios.draft();

         if (draftResult.error === 'token has expired' || draftResult.error === 'not authorized') {
             window.location = 'login.html';
         } else {
             // initialize ui
             const UI = new MailBox;
             // append to draft view
             draftData = draftResult.data;
             UI.draft(draftResult.data);

         }

     });
}



const editDraft = async (id) =>  {
                 // fetch
                     const data = draftData.filter((draft) => draft.id === id );
                    // initialize ui
                    const UI = new MailBox;
                   
                    UI.composeDraft(data[0]);

                   
                    }
                   
 // Listen for submit event -- draft message
 const draftSubmit = () => {

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
  
         showComposeAlert('error', 'message can not be empty')
     }

     // send mail to recipient
     if (checkEmail && checkMessage && checkSubject) {
         compose(payload);
     }

 };
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

            if (composeResult.status === 404) {
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
        showComposeAlert('error', 'Something is wrong with your credentials')
    }
}

const draft = async (body) => {
    if (body) {

        // disable button
        $('#draft_btn').disabled = true;
        $('#draft_btn').style.backgroundColor = '#c0c0c0';

        // make network request
        const {
            draftResult
        } = await Samios.draftMail(body);

        if (draftResult.error) {
            let errMsg;
            if (draftResult.status === 400) {
                errMsg = draftResult.error;
            }

            if (draftResult.status === 401) {
                errMsg = draftResult.error;
            }
            showComposeAlert('error', errMsg);
            // enable button
            $('#draft_btn').disabled = false;
            $('#draft_btn').style.backgroundColor = '#e68016';
        } else {
            if (draftResult.status === 201) {
                // clear input
                $("#receiver_email").value = '';
                $("#subject").value = '';
                $("#mail_body").value = '';
                showComposeAlert("success", 'Draft mail saved successfully');
                // enable button
                $('#draft_btn').disabled = false;
                $('#draft_btn').style.backgroundColor = '#e68016';
            }
        }
    } else {
        showComposeAlert('error', 'Something is wrong with your credentials')
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

// create an alert element
let showDelAlert = (classN, message) => {

    // create an error div
    let alertDiv = document.createElement('div');

    // add error message and style
    alertDiv.className = `alert ${classN}`;
    alertDiv.textContent = message;

    //insert before form and container
    $('.app').insertBefore(alertDiv, $('.compose-mail'));

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
    $('.compose-mail-form').insertBefore(alertDiv, $('#compose_after'));

    // Timeout after 5s
    setTimeout(function () {
        $('.alert').remove();
    }, 5000);
}


/***
 * Group Functionalities
 * 
 *  */

if ($('#create_grp_btn')) {
    $('#create_grp_btn').addEventListener('click', (e) => {
       //  
         e.preventDefault();
         // get user's input
         const payload = {
             name: $("#name").value,
         }
         
         // make network request
         createGroup(payload);
    });
}

// create group
const createGroup = async (body) => {
    if (body) {

        // disable button
        $('#create_grp_btn').disabled = true;
        $('#create_grp_btn').style.backgroundColor = '#c0c0c0';

        // make network request
        const {
            createResult
        } = await Samios.createGroup(body);

        if (createResult.error) {
            let errMsg;
            if (createResult.status === 400) {
                errMsg = Object.values(createResult.error).join(' \n \n');
            }

            if (createResult.status === 401) {
                errMsg = createResult.error;
            }
            showCreateAlert('error', errMsg);
            // enable button
            $('#create_grp_btn').disabled = false;
            $('#create_grp_btn').style.backgroundColor = '#e68016';
        } else {
            if (createResult.status === 201) {
                // clear input
                $("#name").value = '';
                showCreateAlert("success", 'Group created successfully');
                // enable button
                $('#create_grp_btn').disabled = false;
                $('#create_grp_btn').style.backgroundColor = '#e68016';
            }
        }
    } else {
        showCreateAlert('error', 'Something is wrong with your credentials')
    }
}


// fetch all groups
if ($('.group')) {
     document.addEventListener('DOMContentLoaded', async () => {
         
         // fetch
         const { groupResult } = await Samios.allGroups();

         if (groupResult.error === 'token has expired' || groupResult.error === 'not authorized') {
             window.location = 'login.html';
         } else {
             // initialize ui
             const UI = new MailBox;
             UI.allGroups(groupResult.data);
             
         }        
     });
}

// delete group
const delGroup = async (deleteId) => {
     
      if (confirm('Are you sure you want to delete this group?')) {
          // make a request to delete item
          const { delResult } = await Samios.deleteGroup(deleteId);

          if (delResult.error) {
              let errMsg;
              if (delResult.status === 404) {
                  errMsg = delResult.error;
              }
              if (delResult.status === 400) {
                  errMsg = Object.values(delResult.error).join(' \n \n')
              }
              showDelAlert('error', errMsg);
          } else {
              if (delResult.status === 200) {
                  showDelAlert("success", delResult.data.message);
                  window.location.reload();
              }

      }
    }
}

// create group alert
let showCreateAlert = (classN, message) => {

    // create an error div
    let alertDiv = document.createElement('div');

    // add error message and style
    alertDiv.className = `alert ${classN}`;
    alertDiv.textContent = message;

    //insert before form and container
    $('.compose-mail-form').insertBefore(alertDiv, $('.create_group'));

    // Timeout after 5s
    setTimeout(function () {
        $('.alert').remove();
    }, 5000);
}