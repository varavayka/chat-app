const {v4:uuid} = require('uuid')
function  subArr(arr,sessionId=null, countElem=2) {
    let count = 0
    let resultArr = []
    // let resultArr = new Map()
    

    while(count < Math.ceil(arr.length / countElem)) {
        
        // resultArr[count] = arr.slice((count * countElem), (count * countElem) + countElem)
        // resultArr.push( arr.slice((count * countElem), (count * countElem) + countElem))
        // resultArr.push({clients:arr.slice((count * countElem), (count * countElem) + countElem), sessionId:sessionId})
        // if(sessionId) {
            // resultArr.set(sessionId, arr.slice((count * countElem), (count * countElem) + countElem))
            resultArr.push(arr.slice((count * countElem), (count * countElem) + countElem))

            // sessionId = null
        // }
        count++
    }
    
    return resultArr
}


module.exports = subArr

