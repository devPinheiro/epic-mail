import message from "../messages/message.model";

export default {
  

    sentMessages(req, res) {

        try {
            const sent = message.filter((msg) => msg.status === "sent");

            // send response to clientside
            return res.status(200).json({
                status: 200,
                data: sent
            });

        } catch (error) {

            // send response to clientside
            return res.status(404).json({
                status: 404,
                data: "no sent messages found"
            });

        }

    },


}