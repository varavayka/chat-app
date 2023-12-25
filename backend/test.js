// const range = {
//     from: 0,
//     to: 5,

//     [Symbol.iterator]() {
//         return {
//             current: this.from,
//             last: this.to,

//             next() {
//                 if(this.current <= this.last) {
//                     return {done:false, value: this.current++}
//                 }
//                 return {done:true}
//             }
//         }
//     }
// }

// // Варианты объектов итераторов


// const rangeGenerator = {
//     from: 0,
//     to: 5,

//     *[Symbol.iterator]() {
//         for(let start = this.from; start <= this.to; start++) {
//             yield start
//         }
//     }
// }

// console.log([...rangeGenerator])
// console.log([...range])




// function* pseudoGeneratorNums(seed) {
//     let prev = seed
    
//     while(true) {
//         prev = prev * 16807 % 2147483647
//         yield prev
//     }
    


    
//     // const previev2 =  previev1 * 16807 % 2147483647
//     // const previev3 =  previev2 * 16807 % 2147483647
//     // const previev4 =  previev3 * 16807 % 2147483647

    
    
   


    
// }

// const pseudo = pseudoGeneratorNums(1)
// console.log(pseudo.next())
// console.log(pseudo.next())
// console.log(pseudo.next())
// console.log(pseudo.next())


// // console.log(pseudo.next())
// // console.log(pseudo.next())0
const wsList = [1,2,3,4,5,6,7,8,9,10]

const result = []


// const r = wsList.map((item, index) => {
//     const a = result.push(wsList.splice(0, 2))
//     console.log(item)
//     return [item, a]
   
// })


// function* fff(arr) {

// }

// const rrr = wsList.map((item, index, arr) => {
//     return arr[Math.ceil(index /  2)]
//     console.log(`item - ${item} index - ${index} arr - ${arr}`)
//     // const a = Math.ceil(index / 2)
    
//     // return wsList.slice((a * 2), (a * 2) + 2)
//     // return Math.ceil((index / 2))
    

// })
// console.log(rrr)
// 
// for(let i = 0; i < Math.ceil(wsList.length / 2); i++) {
//     result[i] = wsList.slice((i * 2), (i * 2) + 2)
//     console.log(i)
// }
// console.log(result)

function  subArr(arr, countElem=2) {
    let count = 0
    let resultArr = []
    while(count < Math.ceil(arr.length / countElem)) {

        resultArr[count] = arr.slice((count * countElem), (count * countElem) + countElem)
        count++
    }

    return resultArr
}
