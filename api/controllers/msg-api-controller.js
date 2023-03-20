import mongoose from 'mongoose';
const messageModel = mongoose.model('message');

// GET Request Handler
export const getAllMessages = async (req, res) => {
    try {
        let messages = await messageModel.find({}, '', { sort: { _id: -1 }}).exec();
        return res.status(200).json(messages);
    } catch (err) {
        return res.status(400).send('Bad Request');
    }

};

// PATCH Request Handler
export const updateMessage = async (req, res) => {
    try {
        // get the message in question
        let message = await messageModel.findById(req.params.messageId).exec();
        if (!message){
            // message wasn't found
            return res.sendStatus(404);
        } else {
            // message found
            // is user authorized?
            if (message.name === req.user.username){
                // user is owner of message, proceed
                message.msgText = req.body.msgText;
                await message.save();
                // send back 204 No Content
                return res.sendStatus(204);
            } else {
                // user is not the owner, reject
                return res.sendStatus(401);
            }
        }
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }   
}

// DELETE Request Handler
export const deleteMessage = async (req, res) => {
    try {
        // get the message in question
        let message = await messageModel.findById(req.params.messageId).exec();
        if (!message){
            // message wasn't found
            return res.sendStatus(404);
        } else {
            // message found
            // is user authorized?
            if (message.name === req.user.username){
                // user is owner of message, proceed
                await message.remove();
                // send back 200 Success
                return res.sendStatus(200);
            } else {
                // user is not the owner, reject
                return res.sendStatus(401);
            }
        }
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
}

// POST Request Handler
export const addNewMessage = async (req, res) => {
    try {
        let message = await messageModel.create(req.body);
        return res.status(201).json(message);
    } catch (err) {
        return res
            .status(400)
            .send('Bad Request. The message in the body of the \
        Request is either missing or malformed.');
    }
};
