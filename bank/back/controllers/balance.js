import { getUser } from "../utils/database.js";

const Balance = async function(req, res) {
    let email = req.body.email;

    let userBalance = null;

    try {
        const user = await getUser(email);
        userBalance = user.balance;
    } catch (error) {
        return res.status(500).json({error: "Server error", message : "Uh oh something went wrong"});
    }
     
    res.status(200).json({message: "balance was fetched", balance: userBalance});
}

export default Balance;