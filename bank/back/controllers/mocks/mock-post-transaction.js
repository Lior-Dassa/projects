const mockPostTransaction = function(email, details) {
    if (getRandomArbitrary(1, 1000) % 3 == 0) {
        throw new Error("can not process transaction");
    }
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export default mockPostTransaction;
