import message from "../messages/message.model";

export default {

    unreadMessages(req, res) {

        if (message.length !== 0) {

            // get only unread messages
            const unread = message.filter((msg) => msg.status === "unread");

            // send response to clientside
            return res.status(200).json({
                status: 200,
                data: unread
            });

        } else {
            // send response to clientside
            return res.status(404).json({
                status: 404,
                error: "no unread messages found"
            });
        }

    },


}