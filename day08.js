'use strict'
const { assert, loadData, parseInt } = require('./core/utils')
const rawInput = [loadData(module.filename)]

rawInput[1] = loadData('day081.txt')

const puzzle1 = (data) => {
}

const puzzle2 = (data) => {
}

const parse = (dsn) => {
  let data = rawInput[dsn]

  if (data && (data = data.split('\n').filter(v => Boolean(v))).length) {
    return data
  }
  return data   //  NOTE: The runner will distinguish between undefined and falsy!
}

module.exports = { parse, puzzles: [puzzle1, puzzle2] }

/*
 */
