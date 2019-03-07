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
                error: error
            });

        }
     
    },

     allMessages(req, res) {

         try {
                 // send response to clientside
                 return res.status(200).json({
                     status: 200,
                     data: message
                 });

         } catch (error) {

             // send response to clientside
             return res.status(404).json({
                 status: 404,
                 error: "no messages found"
             });

         }

     },

      getOneMessage(req, res) {

          try {

              // get message id
              const id  = req.params.id;
              
              // fetch message using id
                let singleMessage = message.find((msg)=> msg.id == id);

                // if message does not exists
                if(!singleMessage){
                     // send response to clientside
                     return res.status(404).json({
                         status: 404,
                         error: "message does not exist"
                     });
                }

                // send response to clientside
                return res.status(200).json({
                    status: 200,
                    data: singleMessage
                });
             

          } catch (error) {

              // send response to clientside
              return res.status(500).json({
                  status: 500,
                  error: error
              });

          }

      },


      deleteOneMessage(req, res) {

          try {

              // get message id
              const id = req.params.id;

              // fetch message using id
              let singleMessage = message.find((msg) => msg.id == id);

              // if message does not exists
              if (singleMessage) {
                  // remove from db
                  message.splice(id, 1);

                  // send response to clientside
                  return res.status(200).json({
                      status: 200,
                      data: {
                          message: "messsage deleted successfully"
                      }
                  });
              } else {
                // send response to clientside
                return res.status(404).json({
                    status: 404,
                    error: "message does not exist"
                });
              }

              


          } catch (error) {

              // send response to clientside
              return res.status(500).json({
                  status: 500,
                  error: error
              });

          }

      },


}