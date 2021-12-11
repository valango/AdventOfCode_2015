'use strict'  // Corporate Policy

const { assert } = require('./core/utils')
const rawInput = ['vzbxkghb']

const minValue = 'a'.charCodeAt(0), maxValue = 'z'.charCodeAt(0)
const illegals = Array.from('ilo').map(c => c.charCodeAt(0))

const check1 = (codes) => {
  for (let a, b, c, i = 0; (c = codes[i]); i += 1, a = b, b = c) {
    if (c === (a + 2) && c === (b + 1)) {
      return true
    }
  }
  return false
}

const check3 = (codes) => {
  for (let c, i = 0, j, k, n = 0; (c = codes[i]); i += 1) {
    if ((j = codes.indexOf(c, i)) >= 0) {
      if ((j = codes.indexOf(c, k = j + 1)) === k) {
        if (++n === 2) {
          return true
        }
        i = j
      }
    }
  }
  return false
}

/**
 * @param {number[]} codes  - contents will be modified!
 * @return {number[]}
 */
const makeNext = (codes) => {
  do {
    for (let i = codes.length, v; --i >= 0 && (v = codes[i]);) {
      v += 1
      while (illegals.includes(v)) {
        v += 1
      }
      if ((codes[i] = v) <= maxValue) {
        break
      }
      assert(i > 0)
      v = minValue + v - maxValue - 1
      while (illegals.includes(v)) {
        v += 1
      }
      codes[i] = v
    }
  } while (check1(codes) && check3(codes))

  return codes
}

const puzzle1 = (data) => {
  return makeNext(data.slice()).map(c => String.fromCharCode(c)).join('')
}

const puzzle2 = (data) => {
  const pw1 = makeNext(data.slice())
  return makeNext(pw1).map(c => String.fromCharCode(c)).join('')
}

const parse = (dsn) => {
  let data = rawInput[dsn]

  return data && Array.from(data).map(c => c.charCodeAt(0))
}

//  Example (demo) data.
rawInput[1] = `abcdefgh`

module.exports = { parse, puzzles: [puzzle1, puzzle2] }

/*
"demo": { "1": { "value": "abcdffaa", "time": 12524 }, "2": { "value": "abcdffbb", "time": 16591 } },
"main": { "1": { "value": "vzbxxyzz", "time": 13419 }, "2": { "value": "vzcaabcc", "time": 40454 } }
 */
