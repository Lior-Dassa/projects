import { generateAccessToken, generateRefreshToken} from "../utils/jwt.js";

const Refresh = function(req, res) {
    const email = req.body.email;

    res.status(200).json({accessToken: generateAccessToken(email),
        refreshToken: generateRefreshToken(email)});
}

export default Refresh;