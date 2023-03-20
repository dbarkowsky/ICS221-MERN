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
    return res.status(200).send('Success')
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
