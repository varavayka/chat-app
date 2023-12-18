function modificateReport(message) {
    let i = 0
    let result = ''

    
    while(message.length >= i) {
        result += '-'
        i++
    }
    return console.log(`\n${result}\n${message}\n${result}\n`)
}
module.exports = modificateReport