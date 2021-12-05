'use strict'
const rawInput = [require('./data/day01')]

const compute = (data, getBasement = false) => {
  let floor = 0

  for (let i = 0, c; (c = data[i]); ++i) {
    if (c === '(') {
      floor += 1
    } else if ((floor -= 1) === -1 && getBasement) {
      return i + 1
    }
  }
  return getBasement ? 'nope' : floor
}

const puzzle1 = (data) => {
  return compute(data)
}

const puzzle2 = (data) => {
  return compute(data, true)
}

const parse = (dsn) => {
  return rawInput[dsn]
}

module.exports = { parse, puzzles: [puzzle1, puzzle2] }

/*
day01, puzzle #1 	REAL(            424 µs): 280
day01, puzzle #2 	REAL(             86 µs): 1797
 */
