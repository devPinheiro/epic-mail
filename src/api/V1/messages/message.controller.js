import  message  from "./message.model";

export default {
    compose (req, res){

        try {        
               // handle createdOn
               const today = new Date();

               // empty object to store created messages
               const newMessage = {};

               // validate user input
               if (req.body.subject !== '' && req.body.message !== '' && typeof req.body.subject === 'string') {

                   // set message entry object properties with values
                   newMessage.id = message.length + 1;
                   newMessage.createdOn = today.toLocaleDateString('en-US', {
                       year: 'numeric',
                       month: 'long',
                       day: 'numeric'
                   });
                   newMessage.subject = req.body.subject;
                   newMessage.message = req.body.message;
                   newMessage.parentMessageId = req.body.parentMessageId;
                   newMessage.status = req.body.status;
                    

                   // push to mock db
                   message.push(newMessage);

                   // send response to clientside
                   return res.status(201).json({
                       status: 201,
                       data: newMessage
                   });
               } else {
                   // send response to clientside
                   return res.status(400).json({
                       status: 400,
                       error: "enter valid input"
                   });
               }

        } catch (error) {
            
            // send response to clientside
            return res.status(500).json({
                status: 500,
                data: error
            });

        }
     
    }
}