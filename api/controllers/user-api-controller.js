import mongoose from 'mongoose';
import passport from 'passport';
import { BasicStrategy } from 'passport-http';
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

// passport authentication configuration
passport.use(new BasicStrategy(
    (username, password, done) => {
        userModel
        .findOne({
            '$or': [
                { email: username },
                { username: username }
            ]
        })
        .exec( async (error, user) => {
            if (error) return done(error);
            // user wasn't found
            if (!user) return done(null, false);
            // user was found, see if it's a valid password
            if (!await user.verifyPassword(password)) { 
                return done(null, false); 
            }
            return done(null, user);
        });
    }
));

export { registerNewUser };