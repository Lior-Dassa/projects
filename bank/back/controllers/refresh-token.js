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

    res.cookie("access_token", generateAccessToken(email),{httpOnly: true});
    res.cookie("refresh_token", generateRefreshToken(email),{httpOnly: true});

    res.status(200).json({message: "the token have been refreshed"});
}

export default Refresh;