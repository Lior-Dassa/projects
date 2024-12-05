import { getTransactions as getUserTransactions} from "../utils/database.js";


const getTransactions = async function(req, res) {
    const email = req.body.email;

    const transactions   = await getUserTransactions(email);

    res.status(200).json({message: "transactions was successfully fetched", transactions});
}

export default getTransactions;