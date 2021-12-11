'use strict'  //  Look-and-say game.

const { parseInt } = require('./core/utils')
const rawInput = ['1113222113']

const lookAndSay = (array) => {
  let cnt = 0, v0 = undefined, result = []

  for (let i = 0, v; (v = array[i++]); v0 = v) {
    if (v0 !== undefined && (v !== v0)) {
      result.push(cnt, v0)
      cnt = 1
    } else {
      cnt += 1
    }
  }
  result.push(cnt, v0)

  return result
}

const puzzle1 = (data) => {
  let array = data.slice()

  for (let n = 0; n < 40; n += 1) {
    array = lookAndSay(array)
  }
  return array.length
}

const puzzle2 = (data) => {
  let array = data.slice()

  for (let n = 0; n < 50; n += 1) {
    array = lookAndSay(array)
  }
  return array.length
}

const parse = (dsn) => {
  let data = rawInput[dsn]

  data = data && Array.from(data).map(parseInt)
  return data
}

module.exports = { parse, puzzles: [puzzle1, puzzle2] }

/*
"main": { "1": { "value": 252594, "time": 37580 }, "2": { "value": 3579328, "time": 529045 } }
 */
