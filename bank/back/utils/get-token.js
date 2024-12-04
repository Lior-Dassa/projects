const getToken = function(req) {

    let token = req.get("Authorization");
    if (token) { 
        token = token.substring(token.indexOf(" ") + 1);
    } else {
        throw new Error("No token provided");
    }

    return token;
}

export default getToken;