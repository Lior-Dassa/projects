import mockGetBalance from "./mocks/mock-get-balance.js";
import getToken from "../utils/get-token.js";
import {verifyAccessToken} from "../utils/jwt.js";
import { getUser } from "../utils/database.js";

const Balance = async function(req, res) {
    let email = req.email;

    let userBalance = null;

    try {
        userBalance = await getUser(email).balance;
    } catch (error) {
        return res.status(500).json({error: "Server error", message : "Uh oh something went wrong"});
    }
     
    res.status(200).json({message: "balance was fetched", balance: userBalance});
}

export default Balance;