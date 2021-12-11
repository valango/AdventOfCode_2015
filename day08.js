'use strict'
const { loadData } = require('./core/utils')
const rawInput = [loadData(module.filename)]

rawInput[1] = loadData('day081.txt')

/**
 * @param {string} line
 */
const getCounts = (line) => {
  const chars = line.length
  const str = eval(line)
  const mem = str.length
  return { chars, mem }
}

const puzzle1 = (data) => {
  let result = 0

  for (const line of data) {
    const d = getCounts(line)
    result += d.chars - d.mem
  }
  return result
}

const encode = (line) => {
  const { length } = line, inner = line.slice(1, length - 1)
  const encoded = inner.replaceAll('\\', '\\\\').replaceAll('"', '\\"')

  return '"\\"' + encoded + '\\""'
}

const puzzle2 = (data) => {
  let result = 0

  for (const line of data) {
    const a = getCounts(line)
    const b = encode(line)
    const l = b.length
    result += l - a.chars
  }
  return result
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
"demo": { "1": { "value": 12, "time": 162 }, "2": { "value": 19, "time": 137 } },
"main": { "1": { "value": 1342, "time": 2438 }, "2": { "value": 2074, "time": 2867 } }
 */
