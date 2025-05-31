import Conversation from "../models/Conversation.model.js";
import Message from "../models/message.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";


export const sendMessage = async (req, res, next) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user.id;

        let conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                members: [senderId, receiverId],
                messages: []
            });
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
    
        }
        //this will run in parallel
        Promise.all([
            conversation.save(),
            newMessage.save()
        ]);


        return res.status(201).json(
            new apiResponse(201, "Message sent successfully", {
                conversation,
                message: newMessage
            })
        );
    } catch (error) {
        console.error("Error sending message:", error);
        return next(new apiError(500, "Unable to send message"));
    }
}


export const receiveMessage = async (req, res, next) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user.id;

        const conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] }
        }).populate("messages");

        if (!conversation) {
            return next(new apiError(404, "Conversation not found"));
        }

        return res.status(200).json(
            new apiResponse(200, "Messages retrieved successfully", {
                conversation
            })
        );
    } catch (error) {
        console.error("Error receiving messages:", error);
        return next(new apiError(500, "Unable to retrieve messages"));
    }
}
