const UserModel = require('./model/User');
const connectToDatabase = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs-then');
class User {

    getAll() {
        return connectToDatabase()
            .then(() => {
                return UserModel.find();
            });
    }

    register(eventBody) {
        return connectToDatabase()
            .then(() => {
                return checkIfInputIsValid(eventBody) // validate input
                    .then(() =>
                        UserModel.findOne({ email: eventBody.email }) // check if user exists
                    )
                    .then(user => {
                        return user ? Promise.reject(new Error('UserModel with that email exists.')) : bcrypt.hash(eventBody.password, 8) // hash the pass
                    })
                    .then(hash =>
                        UserModel.create({ name: eventBody.name, email: eventBody.email, password: hash })
                    )
                    .then(user => {
                        return { auth: true, token: signToken(user._id) };
                    });
            })
    }

    login(eventBody, callback) {
        return connectToDatabase()
            .then(() => {
                return UserModel.findOne({ email: eventBody.email })
                    .then(user =>
                        !user
                            ? Promise.reject(new Error('User with that email does not exits.'))
                            : comparePassword(eventBody.password, user.password, user._id)
                    )
                    .then(token => ({ auth: true, token: token }));
            })
    }

    me(userId, callback) {
        return connectToDatabase()
            .then(() => {
                return UserModel.findById(userId, { password: 0 })
                    .then(user =>
                        !user
                            ? Promise.reject('No user found.')
                            : user
                    )
                    .catch(err => Promise.reject(new Error(err)));
            });
    }

}

function signToken(id) {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: 86400 // expires in 24 hours
    });
}

function checkIfInputIsValid(eventBody) {
    console.log(eventBody, eventBody);
    if (!(eventBody.password && eventBody.password.length >= 7)) {
        return Promise.reject(new Error('Password error. Password needs to be longer than 8 characters.'));
    }

    if (
        !(eventBody.name &&
            eventBody.name.length > 5 &&
            typeof eventBody.name === 'string')
    ) return Promise.reject(new Error('Username error. Username needs to longer than 5 characters'));

    if (
        !(eventBody.email &&
            typeof eventBody.name === 'string')
    ) return Promise.reject(new Error('Email error. Email must have valid characters.'));

    return Promise.resolve();
}

function comparePassword(eventPassword, userPassword, userId) {
    return bcrypt.compare(eventPassword, userPassword)
        .then(passwordIsValid =>
            !passwordIsValid
                ? Promise.reject(new Error('The credentials do not match.'))
                : signToken(userId)
        );
}

module.exports = User;