const {v4:uuid} = require('uuid')
function  subArr(arr,socketId, countElem=2) {
    let count = 0
    let resultArr = []
    while(count < Math.ceil(arr.length / countElem)) {
        // resultArr[count] = arr.slice((count * countElem), (count * countElem) + countElem)
        // resultArr.push( arr.slice((count * countElem), (count * countElem) + countElem))
        resultArr.push({clients:arr.slice((count * countElem), (count * countElem) + countElem), sessionId:socketId})
        count++
    }
    
    return resultArr
}


module.exports = subArr