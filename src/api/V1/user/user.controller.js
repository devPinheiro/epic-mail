import user from './user.model';
import { tokenizer } from './user.service';

export default {
   signup(req, res) {
        try {
            // creates a mock object          
            const userEntry = {};
            let isExisting;

            // validate user input
            if (req.body.firstName !== '' && req.body.lastName !== '' && typeof req.body.email === 'string') {

                // check if user already exists
                user.forEach((userObj) => {
                    if(userObj.email === req.body.email) {
                         isExisting = true;
                    }
                })
               
                if(!isExisting){
                   // set user entry object properties with values
                   userEntry.id = user.length + 1;
                   userEntry.firstName = req.body.firstName;
                   userEntry.lastName = req.body.lastName;
                   userEntry.password = req.body.password;
                   userEntry.email = req.body.email;
                   userEntry.role = req.body.role;

                   // push to mock db
                   user.push(userEntry);

                   // generate token
                   const tokenArray = [{
                       token: tokenizer()
                   }];

                   // send response to clientside
                   return res.status(201).json({
                       status: 201,
                       data: tokenArray
                   });
                } else {
                    // send response to clientside
                    return res.status(400).json({
                        status: 400,
                        error: "user exist already"
                    });
                }
                
           
            } else {
                 // send response to clientside
                 return res.status(400).json({
                     status: 400,
                     error: "enter valid credentials"
                 });
            }
        }
         catch (err) {

            // send response to clientside
            return res.status(500).json({
                status: 500,
                data: err
            });
        }
       
    },

    login(req, res) {
        try {

            let isUserExisting;

            // validate user input
            if (req.body.email !== '' && req.body.password !== '' && typeof req.body.email === 'string') {

                let email = req.body.email;
                let password = req.body.password;

                // check if the user exists
                user.forEach((userObj) => {
                    if (email === userObj.email && password === userObj.password) {
                       isUserExisting = true;
                    }
                });

                if(isUserExisting){
                    // generate token
                    let tokenArray = [{
                        token: tokenizer()
                    }];
                    // send response to clientside
                    return res.status(200).json({
                        status: 200,
                        data: tokenArray
                    });

                } else{
                     // send response to clientside
                     return res.status(404).json({
                         status: 404,
                         error: "user does not exist"
                     });
                }

                

            } else {
                // send response to clientside
                return res.status(400).json({
                    status: 400,
                    error: "enter valid credentials"
                });
            }
        } catch (err) {

            // send response to clientside
            return res.status(500).json({
                status: 500,
                data: err
            });
        }

    }
} 