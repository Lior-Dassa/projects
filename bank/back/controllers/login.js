import { getUser } from "../utils/database.js";
import {generateRefreshToken, generateAccessToken} from "../utils/jwt.js";

let Login = async function(req, res) {
    const requestBody = req.body;
    const email = requestBody.email;
    let user = null;
    try {
        user = await getUser(email);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Server error", message : "Uh oh something went wrong"});
    }
     
    if (user != null && requestBody.password == user.password) {
        res.cookie("access_token", generateAccessToken(email),{httpOnly: true});
        res.cookie("refresh_token", generateRefreshToken(email),{httpOnly: true});

        res.status(200).json({message: "Login was successfull"});
    } else {
        return res.status(400).json({"error" : "Bad request", "message" : "wrong email or password"});
    }
}

export default Login;