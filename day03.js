'use strict'
const rawInput = [require('./data/day03')]
const { assert } = require('./utils')

const alphabet = '<>^v'
const dirs = [-1, 0, 1, 0, 0, -1, 0, 1]

const puzzle1 = (data, duo = false) => {
  const map = new Set()
  let xy = [[0, 0], [0, 0]]

  map.add('0,0')
  for (let i = 0, c, j, k = 0; (c = data[i]); ++i) {
    assert((j = 2 * alphabet.indexOf(c)) >= 0, i, c)
    if (duo) {
      k = i & 1
    }
    map.add((xy[k][0] += dirs[j]) + ',' + (xy[k][1] += dirs[j + 1]))
  }

  return map.size
}

const puzzle2 = (data) => {
  return puzzle1(data, true)
}

const parse = (dsn) => {
  return rawInput[dsn]
}

//  Example data. If rawInput[2] is defined too, then 1 and 2 are for different puzzles.
rawInput[1] = `^>v<`

module.exports = { parse, puzzles: [puzzle1, puzzle2] }

/*
day03, puzzle #1 	REAL(           8171 µs): 2572
day03, puzzle #2 	REAL(           6267 µs): 2631
 */
