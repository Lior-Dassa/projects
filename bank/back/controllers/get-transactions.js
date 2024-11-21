import getToken from "../utils/get-token.js";
import {verifyAccessToken} from "../utils/jwt.js";
import mockGetTransactions from "./mocks/mock-get-transactions.js";


const getTransactions = function(req, res) {
    const token = getToken(req);

    let email = null;

    try {
        email = verifyAccessToken(token);
    } catch (error) {
        return res.status(401).json({error: "Unauthorized", message : error.message});
    }

    const userTransactions = mockGetTransactions(email);

    res.status(200).json({message: "transactions was successfully fetched", transactions: userTransactions});
}

export default getTransactions;