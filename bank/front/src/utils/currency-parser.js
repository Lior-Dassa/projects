export default function formatCurrency(balance) {
    if (balance?.$numberDecimal) {
        return '$' + new Number(balance.$numberDecimal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')  
    }

    return '$' + new Number(balance).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')  
}