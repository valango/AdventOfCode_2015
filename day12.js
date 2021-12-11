'use strict'  //  JSON parser ignoring any objs w attr value of "red"

const { assert, loadData, parseInt } = require('./core/utils')
const rawInput = [loadData(module.filename)]

const puzzle1 = (data) => {
  let regex = /(-?\d+)/g, sum = 0

  for (let r; (r = regex.exec(data));) {
    sum += parseInt(r[1])
  }
  return sum
}

const findLeft = (data, pos) => {
  for (let n = 0, v; ;) {
    assert(pos > 0, 'underflow')

    if ((v = data[--pos]) === '{') {
      if (--n < 0) {
        return pos
      }
    } else if (v === '}') ++n
  }
}

const findRight = (data, pos) => {
  for (let n = 0, v; ;) {
    assert(pos > 0, 'underflow')

    if ((v = data[++pos]) === '}') {
      if (--n < 0) {
        return pos
      }
    } else if (v === '{') ++n
  }
}

const puzzle2 = (data) => {
  data = data.slice()

  for (let iRed = 0, iL, iR; (iRed = data.indexOf(':"red"')) >= 0;) {
    iL = findLeft(data, iRed)
    iR = findRight(data, iRed)
    data = data.slice(0, iL - 1) + data.slice(iR+1)
  }
  return puzzle1(data)
}

const parse = (dsn) => {
  let data = rawInput[dsn]

  if (data && (data = data.split('\n').filter(v => Boolean(v))).length) {
    return data[0]
  }
  return data   //  NOTE: The runner will distinguish between undefined and falsy!
}

//  Example (demo) data.
rawInput[1] = '[1,2,{"red":"red","u":10},3]'

module.exports = { parse, puzzles: [puzzle1, puzzle2] }

/*
"demo": { "1": { "value": 16, "time": 172 }, "2": { "value": 6, "time": 116 } },
"main": { "1": { "value": 156366, "time": 976 }, "2": { "value": 96852, "time": 6743 } }
 */
