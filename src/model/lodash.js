import('lodash').then(({ default: _ }) => {
  console.log('Lodash loaded successfully:')
  const numberArray = [6, 2, 3, 4, 2, 2, 5, 1]
  const uniqueNumberArray = _.uniq(numberArray)
  console.log('Unique array:', uniqueNumberArray)
  console.log('Lodash random number:', _.random(1, 10))
})

// import lodash from 'lodash'
// const numberArray = [6, 2, 3, 4, 2, 2, 5, 1]
// const uniqueNumberArray = _.uniq(numberArray)
// console.log('Unique array:', uniqueNumberArray)
// console.log('Lodash random number:', lodash.random(1, 10))
