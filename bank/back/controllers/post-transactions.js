import getToken from "../utils/get-token.js";
import {verifyAccessToken} from "../utils/jwt.js";
import mockPostTransaction from "./mocks/mock-post-transaction.js";

const postTransactions = function(req, res) {
    const token = getToken(req);

    let userEmail = null;

    try {
        userEmail = verifyAccessToken(token);
    } catch (error) {
        return res.status(401).json({error: "Unauthorized", message : error.message});
    }

    const details = req.body;

    try {
       mockPostTransaction(userEmail, details);
    } catch (error) {
        res.status(400).json({error: "Bad request", message: error.message});
    }
    
    res.status(200).json({message: "transaction was successfully processed", amount: details.amount,
        from: details.from, to: details.to, date: new Date(Date.now()).toLocaleString()
    });
}

export default postTransactions;