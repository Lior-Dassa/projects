const mockConfirm = function(code) {
    if (code.length !== 6 || code.startsWith("3")) {
        throw new Error("Wrong confirmation code");
    }
}

export default mockConfirm;