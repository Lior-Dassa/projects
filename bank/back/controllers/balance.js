import mockGetBalance from "./mocks/mock-get-balance.js";
import getToken from "../utils/get-token.js";
import {verifyAccessToken} from "../utils/jwt.js";
import { getUser } from "../utils/database.js";

const Balance = async function(req, res) {
    const token = getToken(req);
    let email = null;

    try {
        email = verifyAccessToken(token);
    } catch (error) {
        return res.status(401).json({error: "Unauthorized", message : error.message});
    }

    let userBalance = null;

    try {
        userBalance = await getUser(email).balance;
    } catch (error) {
        return res.status(500).json({error: "Server error", message : "Uh oh something went wrong"});
    }
     

    res.status(200).json({message: "balance was fetched", balance: userBalance});
}

export default Balance;