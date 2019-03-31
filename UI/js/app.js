// let use something different
let $ = selector => document.querySelector(selector);


let sidebar = $('.sidebar'),
    main = $('.main'),
    openSidebar = $('.open-sidebar'),
    closeSidebar = $('.close-sidebar');

 // Menu Navigation
if(openSidebar){
   openSidebar.addEventListener('click', () => {
    // open
    openSidebar.style.display = 'none';
    closeSidebar.style.display = "block";
    sidebar.style.width = "200px";
    main.style.marginLeft = "200px";

   });
}

if(closeSidebar) {
    // close
    closeSidebar.addEventListener('click', () => {
        sidebar.style.width = "0px";
        main.style.marginLeft = "0px";
        openSidebar.style.display = 'block';
        closeSidebar.style.display = "none";
    });

}


// API library
class Samios {   

    // static method for post requests
    static async signUp(payload) {
        const signupR = await fetch('https://epic-mail-devp.herokuapp.com/api/v1/auth/signup',  {
                method: "post",
                mode: "cors",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

        const signupResult = await signupR.json()

        return {
            signupResult
        }
    }

    static async signIn(payload) {
        const signinR = await fetch('https://epic-mail-devp.herokuapp.com/api/v1/auth/login', {
            method: "post",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const signinResult = await signinR.json()

        return {
            signinResult
        }
    }

    static async resetPassword(payload) {
        const resetR = await fetch('https://epic-mail-devp.herokuapp.com/api/v1/auth/reset', {
            method: "post",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const resetResult = await resetR.json()

        return {
            resetResult
        }
    }

    static async composeMail(payload) {
        const composeR = await fetch('https://epic-mail-devp.herokuapp.com/api/v1/messages', {
            method: "post",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem('token')
            },
            body: JSON.stringify(payload)
        });

        const composeResult = await composeR.json()

        return {
            composeResult
        }
    }

    static async inbox() {
        const inbox = await fetch('https://epic-mail-devp.herokuapp.com/api/v1/messages', {
            method: "get",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem('token')
            }
        });

        const inboxResult = await inbox.json()
        return {
            inboxResult
        }
    }

    static async sent() {
        const sent = await fetch('https://epic-mail-devp.herokuapp.com/api/v1/messages/sent', {
            method: "get",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem('token')
            }
        });

        const sentResult = await sent.json()
        return {
            sentResult
        }
    }

}


// Mailbox UI class
class MailBox{

   inbox(res){
     if (res.length === 0) {
         return '<h4 class="text-center">You have no messages</h4>'
     }
     res.forEach((mail) => 
          // append
          $('.mail-section').innerHTML += `<div class="box ${mail.status}">
                        <div class="mail-action">
                            <input type="checkbox" name="mail_action" id="mail_action">
                        </div>

                        
                        <div class="box-top">
                            <a href="view-box.html">
                                    <span class="title">${mail.subject}</span> <span class="date">24th Feb</span>
                                    <div class="box-body">
                                        <p class="subject">${mail.sender_id}</p>
                                        <span class="body text-muted">${mail.message.substring(0, 180)}</span>
                                    </div>
                             </a>
                        </div>
                    </div>`
     );
   
    
   }

   sent(res) {
       if (res.length === 0) {
           return '<h4 class="text-center">You have no sent messages</h4>'
       }
       res.forEach((mail) =>
           // append
           $('.mail-section').innerHTML += `<div class="box ${mail.status}">
                        <div class="mail-action">
                            <input type="checkbox" name="mail_action" id="mail_action">
                        </div>

                        
                        <div class="box-top">
                            <a href="view-box.html">
                                    <span class = "title"> ${mail.subject} </span> <span class="date">${moment(mail.created_on).fromNow()}</span >
                                    <div class="box-body">
                                        <p class="subject">${mail.sender_id}</p>
                                        <span class="body text-muted">${mail.message.substring(0, 180)}</span>
                                    </div>
                             </a>
                        </div>
                    </div>`
       );


   }
}