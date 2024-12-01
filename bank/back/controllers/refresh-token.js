import getToken from "../utils/get-token.js";
import {verifyRefreshToken, generateAccessToken, generateRefreshToken} from "../utils/jwt.js";

const Refresh = function(req, res) {
    const refresh_token = getToken(req);
    let email = null;

    try {
        email = verifyRefreshToken(refresh_token);
    } catch (error) {
        return res.status(401).json({error: "Unautorized", message: error.message});
    }

    res.status(200).json({accessToken: generateAccessToken(email),
        refreshToken: generateRefreshToken(email)});
}

export default Refresh;