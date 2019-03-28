// let use something different
let $ = selector => document.querySelector(selector);


let sidebar = $('.sidebar'),
    main = $('.main'),
    openSidebar = $('.open-sidebar'),
    closeSidebar = $('.close-sidebar');

// // Menu Navigation
// openSidebar.onClick('click', () => {
//     // open
//     openSidebar.style.display = 'none';
//     closeSidebar.style.display = "block";
//     sidebar.style.width = "200px";
//     main.style.marginLeft = "200px";

// });

//     // close
// closeSidebar.addEventListener('click', () => {
//     sidebar.style.width = "0px";
//     main.style.marginLeft = "0px";
//     openSidebar.style.display = 'block';
//     closeSidebar.style.display = "none";
// });

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

}