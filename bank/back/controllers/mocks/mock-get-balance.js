const mockGetBalance = function(email) {
    return getRandomArbitrary(99, 1000000);
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export default mockGetBalance;