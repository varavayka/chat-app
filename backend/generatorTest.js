
// function * 
























// function* testGenerator() {
//     yield 0
//     yield 1
//     yield 2
//     yield 3
//     yield 4
//     yield 5
// }
// const interGenrator = testGenerator() 
// console.log(interGenrator.next())
// console.log(interGenrator.next())
// console.log(interGenrator.next())
// console.log(interGenrator.next())
// console.log(interGenrator.next())
// console.log(interGenrator.next())
// console.log(interGenrator.next())


// function imaginaryHeavyComputation() {
//     let result = 0
//     for (let i = 0; i < 100; i++) {
//       result += i
//     }
  
//     return result
//   }
  
//   function* getLangs() {
//     const result1 = imaginaryHeavyComputation()
//     console.log('result of heavy compuation #1:', result1)
//     yield 'java';
  
//     const result2 = imaginaryHeavyComputation()
//     console.log('result of heavy compuation #2:', result1 + result2)
//     yield 'js';
  
//     console.log("easy compuation:", 2 + 2)
//     yield 'rust';
//   }
  
//   const generator = getLangs()

//   console.log(generator.next())
//   console.log(generator.next())
//   console.log(generator.next())
//   console.log(generator.next())


// function* choiceLang() {

//     const lang = yield 'JavaScript'

//     if(lang) {
//         return 'C++'
//     }
//     yield 'Rust'
// }
// const generator = choiceLang()
// let count = 0
// generator.next()

// while(count <= 100) {
//     console.log(generator.next(count % 2 === 0))
//     count++
// }

// generator.next()

// function* getLangs() {
//     /**
//      * Первый вызов next в любом случае вернет 'java',
//      * не имеет значения передадим мы что-то в него или нет
//      *
//      * Переменная isFavorite при этом будет 'undefined'
//     */
//     const isFavorite = yield 'java';
  
//       /**
//       * Если мы передадим аргумент в 'next' при следующем вызове, то:
//       *
//       * 1) он будет присвоен переменной isFavorite;
//       * 2) условие будет верно, и мы получим значение 'kotlin'
//       */
//     if (isFavorite) {
  
//       yield 'kotlin'
  
//     } else {
//       /**
//       * или 'js', если вызовем 'next' без аргументов
//       */
//       yield 'js';
  
//     }
  
//     yield 'rust';
//   }
  
//   const generator = getLangs()
  
//   console.log(generator.next())
//   // { value: 'java', done: false }
  
//   // Передаём true, потому что java нам понравилась
//   console.log(generator.next(true))
//   // { value: 'kotlin', done: false }


// function * mainGenerator() {
//     yield 'kotlin'
//     yield 'scala'
//     yield 'closure'

// }
// function * oneGenerator() {

//     const isFavorite = yield 'java'

//     if(isFavorite) {
//         yield * mainGenerator()
//     }
//     yield 'rust'
// }

// const generator = oneGenerator()

// generator.next()


// console.log(generator.next(true))
// console.log(generator.next(true))
// console.log(generator.next(true))
// console.log(generator.next(true))
