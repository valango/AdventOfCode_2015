'use strict'
const rawInput = [require('./data/day06')]
const { assert, parseInt } = require('./utils')

const interprete1 = (map, { op, corners }) => {
  for (let i = corners[0]; i <= corners[2]; ++i) {
    for (let j = corners[1], k; j <= corners[3]; ++j) {
      k = i + 1000 * j
      if (op === 'on') {
        map[k] = 1
      } else if (op === 'off') {
        map[k] = 0
      } else {
        map[k] ^= 1
      }
    }
  }
}

const interprete2 = (map, { op, corners }) => {
  for (let i = corners[0]; i <= corners[2]; ++i) {
    for (let j = corners[1], k, v; j <= corners[3]; ++j) {
      k = i + 1000 * j
      v = map[k]
      if (op === 'on') {
        map[k] = v + 1
      } else if (op === 'off') {
        map[k] = v ? v - 1 : 0
      } else {
        map[k] = v + 2
      }
    }
  }
}

const getCount = (map) => {
  let n = 0, i = 1000000
  do {
    if (!((n += map[--i]) >= 0)) {
      n = -1
    }
  } while (i > 0)
  return n
}

const puzzle1 = (data) => {
  const map = new Uint16Array(1000 * 1000)

  for (const row of data) {
    interprete1(map, row)
  }
  return getCount(map)
}

const puzzle2 = (data) => {
  const map = new Uint16Array(1000 * 1000)

  for (const row of data) {
    interprete2(map, row)
  }
  return getCount(map)
}

const parse = (dsn) => {
  let data = rawInput[dsn], r

  if (data && (data = data.split('\n').filter(v => Boolean(v))).length) {
    return data.map((row, i) => {
      assert(r = /^([a-z\s]+)(\d+),(\d+)\sthrough\s(\d+),(\d+)$/.exec(row), i, row)
      return {
        op: r[1][1] === 'o' ? r[1].trim() : (r[1][6] === 'f' ? 'off' : 'on'),
        corners: [parseInt(r[2]), parseInt(r[3]), parseInt(r[4]), parseInt(r[5])]
      }
    })
  }
}

//  Example data. If rawInput[2] is defined too, then 1 and 2 are for different puzzles.
// rawInput[1] = rawInput[0]

module.exports = { parse, puzzles: [puzzle1, puzzle2] }

/*
16:13 17:00 17:06
day06, puzzle #1 	REAL(          59768 µs): 543903
day06, puzzle #2 	REAL(          63839 µs): 14687245
 */
