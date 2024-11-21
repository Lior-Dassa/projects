const mockRegisterUser = function(user) {
    if (user.email.startsWith('c')) {
        throw new Error("A user with this email is already registered");
    }
}

export default mockRegisterUser;