import { getTransactions as getUserTransactions} from "../utils/database.js";


const getTransactions = async function(req, res) {
    const email = req.email;

    const userTransactions = await getUserTransactions(email);

    res.status(200).json({message: "transactions was successfully fetched", transactions: userTransactions});
}

export default getTransactions;