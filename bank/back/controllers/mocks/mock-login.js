const mockLogin = function(user) {
    if (user.email.startsWith('o') || user.email.startsWith('d') ||
        user.password.includes("r") || user.password.includes("123")) {
        throw new Error("Wrong email or password");
    }
}

export default mockLogin;