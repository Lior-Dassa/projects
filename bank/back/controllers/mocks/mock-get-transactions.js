const mockGetTransactions = function(email) {
    const transactions = [
        {
            from: "lior",
            to: "maya",
            amount: "100",
            date: "10.11.2024",
            time: "14:22"
        },
        {
            from: "yarin",
            to: "lior",
            amount: "2500",
            date: "17.10.2024",
            time: "09:57"
        },
        {
            from: "lior",
            to: "chayim",
            amount: "9.25",
            date: "23.07.2024",
            time: "21:21"
        }
    ];

    return transactions;
}

export default mockGetTransactions;