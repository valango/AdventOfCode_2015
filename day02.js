'use strict'
const rawInput = [require('./data/day02')]
const { parseInt } = require('./utils')

const puzzle1 = (data) => {
  let total = 0
  for (let i = 0, row; (row = data[i]); ++i) {
    const [a, b, c] = row, areas = [a * b, a * c, b * c]
    const area = 2 * areas.reduce((acc, v) => acc + v, 0)
    const extra = Math.min(...areas)
    total += area + extra
  }
  return total
}

const puzzle2 = (data) => {
  let total = 0
  for (let i = 0, row; (row = data[i]); ++i) {
    row.sort((a, b) => a - b)
    const wrap = 2 * row[0] + 2 * row[1]
    const bow = row[0] * row[1] * row[2]
    total += wrap + bow
  }
  return total
}

const parse = (dsn) => {
  let data = rawInput[dsn]

  if (data && (data = data.split('\n').filter(v => Boolean(v))).length) {
    return data.map(row => row.split('x').map(parseInt))
  }
}

//  Example data. If rawInput[2] is defined too, then 1 and 2 are for different puzzles.
rawInput[1] = `
2x3x4
`

module.exports = { parse, puzzles: [puzzle1, puzzle2] }

/*
day02, puzzle #1 	REAL(            804 µs): 1598415
day02, puzzle #2 	REAL(           2193 µs): 3812909
 */
