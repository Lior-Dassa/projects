import {generateRefreshToken, generateAccessToken} from "../utils/jwt.js";
import mockGetEmail from "./mocks/mock-get-email.js";
import { activateUser } from "../utils/database.js";

let Confirmation = async function(req, res) {
    const code = req.body.confirmationCode;
    let email = null;

    try {
        email = await activateUser(code);
    } catch (err) {
        return res.status(400).json({"error" : "Bad request", "message" : err.message});
    }

    res.status(200).json({access_token: generateAccessToken(email),
        refresh_token: generateRefreshToken(email)
    });
}

export default Confirmation;