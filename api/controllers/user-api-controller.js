import mongoose from 'mongoose';
const userModel = mongoose.model('user');

const registerNewUser = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        if (await alreadyExists(email, username)) return res.status(403).send('Username or email already exists');
        let user = await userModel.create({
            email,
            username,
            password
        });
        return res.status(201).json(user);
    } catch (err) {
        return res.status(400).send('Bad Request');
    }
}

// helper funtion to see if email or username already exists
// Returns true/false
const alreadyExists = async (email, username) => (
    await userModel.exists({
        '$or': [
            { email: email },
            { username: username }
        ]
    })
);

export { registerNewUser };