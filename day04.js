'use strict'
const rawInput = [`yzbqklnj`]   //  The Ideal Stocking Stuffer
const { createHash } = require('crypto')

let last = 0

const computeHash = (data) => {
  return createHash('md5').update(data).digest().toString('hex')
}

const solve = (key, length) => {
  const prefix = '0'.padEnd(length, '0')

  for (let i = last, hash; (hash = computeHash(key + i)); ++i) {
    if (hash.slice(0, length) === prefix) {
      return (last = i)
    }
  }
}

//  Find the lowest number resulting in hash '00000...'
const puzzle1 = (key) => {
  return solve(key, 5)
}

const puzzle2 = (key) => {
  return solve(key, 6)
}

const parse = (dsn) => {
  return rawInput[dsn]
}

module.exports = { parse, puzzles: [puzzle1, puzzle2] }

rawInput[1] = 'abcdef'
rawInput[2] = ''

/*
day04, puzzle #0 	DEMO(        3047610 µs): 609043 	REAL(        5057914 µs): 1647256
day04, puzzle #1 	DEMO: n/a			                    REAL(       40344958 µs): 9962624
 */
