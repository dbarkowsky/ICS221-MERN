import mongoose from 'mongoose';
const userModel = mongoose.model('user');

// GET Request Handler
export const getAllMessages = async (req, res) => {
    try {
        let messages = await userModel.find({}, '', { sort: { _id: -1 }}).exec();
        res.status(200).json(messages);
    } catch (err) {
        res.status(400).send('Bad Request');
    }

};

// POST Request Handler
export const addNewMessage = async (req, res) => {
    try {
        let message = await userModel.create(req.body);
        res.status(201).json(message);
    } catch (err) {
        res
            .status(400)
            .send('Bad Request. The message in the body of the \
        Request is either missing or malformed.');
    }
};

const registerNewUser = async (req, res) => {
    res.status(200).send('Successful new user');
}

export { registerNewUser };