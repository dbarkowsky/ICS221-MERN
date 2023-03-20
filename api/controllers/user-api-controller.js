import mongoose from 'mongoose';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import jwt from 'jsonwebtoken';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;

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

const logInUser = async (req, res) => {
    // generate and send jwt token
    jwt.sign(
        { sub: req.user._id, username: req.user.username }, // what is stored in payload
        process.env.JWT_SECRET, // secret for signature and encrypting
        { expiresIn: '20m' },   // token expiry
        (error, token) => { // Callback function
            if (error){
                return res.status(400).send('Bad Request. Could not generate token.');
            } else {
                return res.status(200).json({ token });
            }
        }
    )
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
passport.use(new LocalStrategy(
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

// Configure JWT token auth
passport.use(new JwtStrategy(
    jwtOptions,
    (jwt_payload, done) => {
        userModel
        .findById(jwt_payload.sub)
        .exec((error, user) => {
            // error in searching
            if (error) return done(error);

            if (!user) {
                // user not found
                return done(null, false);
            } else {
                // user found
                return done(null, user);
            }
        })
    }
))

export { registerNewUser, logInUser };