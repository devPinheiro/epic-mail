import message from "../messages/message.model";

export default {
  
    sentMessages(req, res) {

            if(message.length !== 0){

                // get only sent messages
                const sent = message.filter((msg) => msg.status === "sent");

                // send response to clientside
                return res.status(200).json({
                    status: 200,
                    data: sent
                });

            } else {
                 // send response to clientside
                 return res.status(404).json({
                     status: 404,
                     error: "no sent messages found"
                 });
            }      

    },


}