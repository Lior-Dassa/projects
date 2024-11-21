import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_LIFETIME = process.env.ACCESS_TOKEN_LIFETIME;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_LIFETIME = process.env.REFRESH_TOKEN_LIFETIME;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const generateAccessToken = function(email) {
    return jwt.sign({
        email: email
    }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_LIFETIME });
}

const verifyAccessToken = function(token) {
    return jwt.verify(token, ACCESS_TOKEN_SECRET).email;
}

const generateRefreshToken = function(email) {
    return jwt.sign({
        email: email
    }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_LIFETIME });
}

const verifyRefreshToken = function(token) {
    return jwt.verify(token, REFRESH_TOKEN_SECRET).email;
}

export {generateAccessToken, verifyAccessToken, generateRefreshToken, verifyRefreshToken};