const range = {
    from: 0,
    to: 5,

    [Symbol.iterator]() {
        return {
            current: this.from,
            last: this.to,

            next() {
                if(this.current <= this.last) {
                    return {done:false, value: this.current++}
                }
                return {done:true}
            }
        }
    }
}

// Варианты объектов итераторов


const rangeGenerator = {
    from: 0,
    to: 5,

    *[Symbol.iterator]() {
        for(let start = this.from; start <= this.to; start++) {
            yield start
        }
    }
}

console.log([...rangeGenerator])
console.log([...range])




function* pseudoGeneratorNums(seed) {
    let prev = seed
    
    while(true) {
        prev = prev * 16807 % 2147483647
        yield prev
    }
    


    
    // const previev2 =  previev1 * 16807 % 2147483647
    // const previev3 =  previev2 * 16807 % 2147483647
    // const previev4 =  previev3 * 16807 % 2147483647

    
    
   


    
}

const pseudo = pseudoGeneratorNums(1)
console.log(pseudo.next())
console.log(pseudo.next())
console.log(pseudo.next())
console.log(pseudo.next())


// console.log(pseudo.next())
// console.log(pseudo.next())
// console.log(pseudo.next())
// console.log(pseudo.next())




