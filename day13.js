'use strict'

const { assert, loadData, parseInt } = require('./core/utils')
const rawInput = [loadData(module.filename)]
/** @typedef {{cities: string[], distance:number}} TDist */

const createNamesArray = (data) => {
  const set = new Set()
  data.forEach(({ who }) => set.add(who[0]) & set.add(who[1]))

  return Array.from(set)
}

const permute = (array) => {
  //  NB: Our strings contain unique chars only and are lexicographically ordered initially.
  array = Array.from(array)

  for (let i, k = array.length - 1, v; --k >= 0;) {
    if ((v = array[k]) < array[k + 1]) {
      for (i = array.length; --i > k;) {
        if (array[k] < array[i]) {
          array[k] = array[i], array[i] = v
          v = array.slice(k + 1).reverse()
          array = array.slice(0, k + 1)
          array = array.concat(v)
          return array
        }
      }
    }
  }
  return null
}

const getDelta = (data, a, b) => {
  const r = data.find(({ who }) => who[0] === a && who[1] === b)
  return r ? r.delta : 0
}

const evaluate = (data, people) => {
  let score = 0, last = people.length - 1, a, b

  for (let i = 0; i <= last && (b = people[i]); ++i, a = b) {
    if (a) {
      score += getDelta(data, a, b) + getDelta(data, b, a)
    }
  }
  if (a) {
    b = people[0]
    score += getDelta(data, a, b) + getDelta(data, b, a)
  }
  return score
}

const solve = (data, people) => {
  const arrangements = []

  do {
    arrangements.push({ score: evaluate(data, people), people })
  } while ((people = permute(people)))

  arrangements.sort((a, b) => b.score - a.score)

  return arrangements[0].score
}

const puzzle1 = (data) => {
  return solve(data, createNamesArray(data).sort())
}

const puzzle2 = (data) => {
  return solve(data, createNamesArray(data).concat('@').sort())
}

const parse = (dsn) => {
  let data = rawInput[dsn]

  if (data && (data = data.split('\n').filter(v => Boolean(v))).length) {
    return data.map(row => {
      const r = /^(\S+)\swould\s(\S+)\s(\d+).+to\s(\S+)\./.exec(row)
      assert(r[1] !== '@' && r[4] !== '@', 'reserved name "me"!')
      const v = parseInt(r[3])
      return { who: [r[1], r[4]], delta: r[2] === 'gain' ? v : -v }
    })
  }
  return data   //  NOTE: The runner will distinguish between undefined and falsy!
}

//  Example (demo) data.
rawInput[1] = `
Alice would gain 54 happiness units by sitting next to Bob.
Alice would lose 79 happiness units by sitting next to Carol.
Alice would lose 2 happiness units by sitting next to David.
Bob would gain 83 happiness units by sitting next to Alice.
Bob would lose 7 happiness units by sitting next to Carol.
Bob would lose 63 happiness units by sitting next to David.
Carol would lose 62 happiness units by sitting next to Alice.
Carol would gain 60 happiness units by sitting next to Bob.
Carol would gain 55 happiness units by sitting next to David.
David would gain 46 happiness units by sitting next to Alice.
David would lose 7 happiness units by sitting next to Bob.
David would gain 41 happiness units by sitting next to Carol.`

//  Uncomment the next line to disable demo for puzzle2 or to define different demo for it.
//  rawInput[2] = ``

module.exports = { parse, puzzles: [puzzle1, puzzle2] }

/*
"demo": { "1": { "value": 330, "time": 676 }, "2": { "value": 286, "time": 11634 } },
"main": { "1": { "value": 618, "time": 200590 }, "2": { "value": 601, "time": 2059550 } }
 */
