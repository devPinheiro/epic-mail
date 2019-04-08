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

    static async draftMail(payload) {
        const draftR = await fetch('https://epic-mail-devp.herokuapp.com/api/v1/messages/', {
            method: "post",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem('token')
            },
            body: JSON.stringify(payload)
        });

        const draftResult = await draftR.json()

        return {
            draftResult
        }
    }

    static async deleteMail(payload) {
        const delR = await fetch(`https://epic-mail-devp.herokuapp.com/api/v1/messages/${payload}`, {
            method: "delete",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem('token')
            }
        });

        const delResult = await delR.json()

        return {
            delResult
        }
    }

    static async deleteDraft(payload) {
         const delR = await fetch(`https://epic-mail-devp.herokuapp.com/api/v1/messages/draft/${payload}`, {
             method: "delete",
             mode: "cors",
             headers: {
                 Accept: "application/json",
                 "Content-Type": "application/json",
                 "x-access-token": localStorage.getItem('token')
             }
         });

         const delResult = await delR.json()

         return {
             delResult
         }
     }

    static async retractMail(payload) {
        const delR = await fetch(`https://epic-mail-devp.herokuapp.com/api/v1/messages/retract/${payload}`, {
            method: "delete",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem('token')
            }
        });

        const delResult = await delR.json()

        return {
            delResult
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

    static async singleView(id) {
        const single = await fetch(`https://epic-mail-devp.herokuapp.com/api/v1/messages/${id}`, {
            method: "get",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem('token')
            }
        });

        const singleResult = await single.json()
        return {
            singleResult
        }
    }

    static async draft() {
        const draft = await fetch('https://epic-mail-devp.herokuapp.com/api/v1/messages/draft', {
            method: "get",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem('token')
            }
        });

        const draftResult = await draft.json()
        return {
        draftResult
        }
    }

    static async createGroup(payload) {
        const createR = await fetch('https://epic-mail-devp.herokuapp.com/api/v1/groups', {
            method: "post",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem('token')
            },
            body: JSON.stringify(payload)
        });

        const createResult = await createR.json()

        return {
            createResult
        }
    }
    
    static async allGroups() {
         const group = await fetch('https://epic-mail-devp.herokuapp.com/api/v1/groups', {
             method: "get",
             mode: "cors",
             headers: {
                 Accept: "application/json",
                 "Content-Type": "application/json",
                 "x-access-token": localStorage.getItem('token')
             }
         });

         const groupResult = await group.json()
         return {
             groupResult
         }
     }

    static async deleteGroup(payload) {
         const delR = await fetch(`https://epic-mail-devp.herokuapp.com/api/v1/groups/${payload}`, {
             method: "delete",
             mode: "cors",
             headers: {
                 Accept: "application/json",
                 "Content-Type": "application/json",
                 "x-access-token": localStorage.getItem('token')
             }
         });

         const delResult = await delR.json()

         return {
             delResult
         }
     }

    static async editGroup(payload) {
          const editR = await fetch(`https://epic-mail-devp.herokuapp.com/api/v1/groups/${payload.id}`, {
              method: "PATCH",
              mode: "cors",
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "x-access-token": localStorage.getItem('token'),
              },
              body: JSON.stringify({name: payload.name})
          });
          const editResult = await editR.json()
          return {
              editResult
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
          $('.mail-section').innerHTML += `<div class="box ${mail.status}" >
                        <div class="mail-action">
                         
                            <input type="checkbox" class="inbox-checkout" onchange="getId(${mail.message_id})"  name="mail_action" id="mail_action">
                        </div>
 
                        <div class="box-top"  onclick="inboxMail(${mail.message_id})">
                           
                                    <span class="title">${mail.subject}</span> <span class="date">${moment(mail.created_on).fromNow()}</span>
                                    <div class="box-body">
                                        <p class="subject">(${mail.email})</p>
                        
                                        <span class="body text-muted">${mail.message.substring(0, 180)}</span>
                                    </div>                      
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
                            <input type="checkbox" onchange="getId(${mail.message_id})" name="mail_action" id="mail_action">
                        </div>

                        
                        <div class="box-top" onclick="viewSent(${mail.message_id})">
                            
                                    <span class = "title"> ${mail.subject} </span> <span class="date">${moment(mail.created_on).fromNow()}</span >
                                    <div class="box-body">
                                        <p class="subject">${mail.sender_id}</p>
                                        <span class="body text-muted">${mail.message.substring(0, 180)}</span>
                                    </div>
                            
                        </div>
                    </div>`
       );


   }

    singleView(res) {
       if (res.length === 0) {
           return '<h4 class="text-center">Message has been deleted</h4>'
       }
        // append
        $('.mail-section').innerHTML = `
                   <div class="app-title">
                          <h4 class="subject">${res.subject}</h6>
                          
                       </div>
                        
                        <div class="box no-border">
                            <div class="box-contact">

                                <div> <img class="user_img" src="https://lorempixel.com/200/200/people/" alt="" srcset=""> </div>
                                <div class="title"><span >${res.first_name} ${res.last_name}</span>
                                    <p class="subject">${res.email}</p>
                                   
                                </div>

                            </div>

                            <div class="box-top">
                                <span class="reply date">${moment(res.created_on).format("dddd, MMMM Do, h:mm a")}</span>                                   
                            </div>  
                       </div>
                       
                       <div class="box-mail-body">                                           
                          <span  class="body text-muted">${res.message}</span>
                      </div>`

   }

   draft(res) {
       if (res.length === 0) {
           return '<h4 class="text-center">You have no draft messages</h4>'
       }
       res.forEach((mail) =>
           // append
           $('.draft-section').innerHTML += `<div class="box ${mail.status}" >
                        <div class="mail-action">
                            <input type="checkbox" onchange="getId(${mail.id})" name="mail_action" id="mail_action">
                        </div>

                        
                        <div class="box-top" onclick="editDraft(${mail.id})">
                                    
                                    <span class = "title"> ${mail.subject} </span> <span class="date">${moment(mail.created_on).fromNow()}</span >
                                    <div class="box-body">
                                        <p>(no recipient)</p>
                                        <span class="body text-muted">${mail.message.substring(0, 180)}</span>
                                    </div>
                          
                        </div>
                    </div>`
       );
   }

   composeDraft(res){
      $('.draft-section').innerHTML = `
       <section class="mail-app compose-mail">

                        <div class="app-title">
                                <h4> Edit Draft and Send </h6>
            
                            </div>

                    <div class="compose-mail-form">
                        <div id="compose_after"  class="form-g">
                            <label for="Email">Recipient</label>
                            <input type="email" id="receiver_email" value="" >
                        </div>
                        <div class="form-g">
                             <label for="Email">Subject</label>
                            <input type="text" name="subject" id="subject" value="${res.subject}">
                        </div>
                       
                        <div class="form-g">
                         <textarea name="mail-content" id="mail_body" cols="30" rows="15">${res.message}</textarea>
                        </div>
                        
                        <div class="form-g">
                          <button type="submit" id="compose_btn" onclick="draftSubmit()" class="btn btn-primary">Send</button>       
                        
                        </div>
           
                    </div>


                </section>

      `
   }

    sentView(res) {
        // append
        $('.mail-section').innerHTML = `
                   <div class="app-title">
                          <h4 class="subject">${res.subject}</h6>
                          
                       </div>
                        
                        <div class="box no-border">
                            <div class="box-contact">

                                <div> <img class="user_img" src="https://lorempixel.com/200/200/people/" alt="" srcset=""> </div>
                                <div class="title"><span >${res.receiver_id}</span>
                                 
                                   
                                </div>

                            </div>

                            <div class="box-top">
                                <span class="reply date">${moment(res.created_on).format("dddd, MMMM Do, h:mm a")}</span>                                   
                            </div>  
                       </div>
                       
                       <div class="box-mail-body">                                           
                          <span  class="body text-muted">${res.message}</span>
                      </div>`

    }
    
    allGroups(res){
        if(res.length === 0){
            return '<h4 class="text-center">You have no groups created</h4>'
        }
        res.forEach((group) => {
        $('.container-grid-3').innerHTML +=`
                        <div class="contact">            
                             <span><i class="ion-ios-people"></i></span>
                            <p class="title">${group.name}</p>
                            <div class="actions">
                                <span onclick="openModal('${group.name}', ${group.id})"> <i class="ion-edit green"></i></span>
                                <span onclick="delGroup(${group.id})"> <i class="ion-ios-trash red"></i></span>
                            </div>
                        </div>
        `
        });
    }

    
}