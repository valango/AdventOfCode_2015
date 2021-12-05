'use strict'
const rawInput = [require('./data/day05')]    //  String analysis

const badStrings = 'ab cd pq xy'.split(' ')
const vowels = 'aeiou'

const isNice1 = (string) => {
  for (const str of badStrings) {
    if (string.includes(str)) {
      return 0
    }
  }

  const letters = Array.from(string)

  if (letters.reduce((acc, c) => vowels.includes(c) ? acc + 1 : acc, 0) < 3) {
    return 0
  }

  for (let c, c0, i = 0; (c = letters[i]) !== undefined; ++i, c0 = c) {
    if (c === c0) {
      return 1
    }
  }
  return 0
}

const isNice2 = (string) => {
  let a = false, b = false

  for (let i = 0, phrase, c, c0; !(a && b) && (c = string[i]); c0 = c, ++i) {
    if (!a && i !== 0) {
      phrase = [c0, c].join('')
      if (string.slice(i + 1).includes(phrase)) {
        a = true
      }
    }
    if (!b && string.indexOf(c, i + 2) === (i + 2)) {
      b = true
    }
  }
  return (a && b) ? 1 : 0
}

const puzzle1 = (data) => {
  return data.reduce((acc, string) => acc + isNice1(string), 0)
}

const puzzle2 = (data) => {
  return data.reduce((acc, string) => acc + isNice2(string), 0)
}

const parse = (dsn) => {
  let data = rawInput[dsn]

  if (data && (data = data.split('\n').filter(v => Boolean(v))).length) {
    return data
  }
}

// YYNNN
rawInput[1] = `
ugknbfddgicrmopn
aaa
jchzalrnumimnmhp
haegwjzuvuyypxyu
dvszwmarrgswjxmb`
rawInput[2] = `
qjhvhtzxzqqjkmpb
xxyxx
uurcxstgmygtbstg
ieodomkazucvgmuy`


module.exports = { parse, puzzles: [puzzle1, puzzle2] }

/*
12:28 12:52 13:20
day05, set #0
	puzzle-1 (           4196 µsecs): 238
	puzzle-2 (           5920 µsecs): 69
 */
