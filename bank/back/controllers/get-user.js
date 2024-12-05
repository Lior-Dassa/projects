import { getUser } from "../utils/database.js";

const GetUser = async function(req, res) {
    const email = req.body.email;
    let user = null;

    try {
        user = await getUser(email);
        user = {
            email: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Server error", message : "Uh oh something went wrong"});
    }
    if (user) {
        res.status(200).json(user);
    } else {
        return res.status(404).json({error: "Not found", message : "User not found"});
    }
}

export default GetUser;