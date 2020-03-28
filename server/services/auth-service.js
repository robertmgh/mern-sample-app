const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const checkJwt = require('express-jwt');
const User = require('../models/user-model');

module.exports.logIn = async (email, password) => {
    const user = await User.findOne({ email });

    if (err) {
        throw new Error('User not found');
    }

    const verifyResult = await argon2.verify(user.password, password);

    if (!verifyResult) {
        throw new Error('Wrong password');
    }

    const retUser = {
        name: user.name,
        surname: user.surname,
        email: user.email
    };

    return {
        user: retUser,
        token: generateToken(retUser)
    };
};

module.exports.logOut = async email => {
    //test
};

const tokenSignature = 'passSignature123';
const tokenExpiration = '8h';

const generateToken = data => {
    return jwt.sign({ data }, tokenSignature, { expiresIn: tokenExpiration });
};

const getTokenFromHeader = req => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
};

module.exports.attachUserData = async (req, res, next) => {
    const decodedTokenData = req.tokenData;
    const userRecord = await User.findOne({ email: decodedTokenData.email });

    req.currentUser = userRecord;

    if (!userRecord) {
        return res.status(401).end('User not found');
    } else {
        return next();
    }
};

module.exports.isAuth = checkJwt({
    secret: tokenSignature,
    userProperty: 'token',
    getToken: getTokenFromHeader
});
