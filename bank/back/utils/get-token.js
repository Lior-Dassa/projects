const getToken = function(req) {

    let token = req.get("Authorization");
    token = token.substring(token.indexOf(" ") + 1);

    return token;
}

export default getToken;