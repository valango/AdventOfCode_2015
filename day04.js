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

/*
day04, set #0
	puzzle-1 (        1394971 µsecs): 282749
	puzzle-2 (       46649016 µsecs): 9962624
 */
