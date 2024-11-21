import getRandomArbitrary from "./genrate-random-number.js";

export default function generateSmsCode() {
    const min = 10000;
    const max = 999999;

    return getRandomArbitrary(min, max).toString();
}

