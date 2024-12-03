import { processTransaction } from "../utils/database.js";
const postTransactions = async function(req, res) {
    const details = req.body;
    console.log(details);

    try {
        await processTransaction(details);
    } catch (error) {
        console.log(error);
        if (error.message.includes("Balance can not be negative")) {
            return res.status(400).json({error: "Bad request", message: "Insufficient funds"});
        } else if(error.message == "Unknown user") {
            return res.status(400).json({error: "Bad request", message: "Unknown recipient"});
        } else {
            return res.status(500).json({error: "Server error", message: "Uh oh something went wrong"});
        }
    }
    
    res.status(200).json({message: "transaction was successfully processed", amount: details.amount,
        from: details.email, to: details.to, date: new Date(Date.now()).toLocaleString()
    });
}

export default postTransactions;