'use strict'  //  The shortest route through all cities.

const { loadData, parseInt } = require('./core/utils')
const rawInput = [loadData(module.filename)]

/** @typedef {{cities: string[], distance:number}} TDist */

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

const getRecord = (data, a, b) => data.find(({ cities }) => cities[0] === a && cities[1] === b)

const createNamesArray = (data) => {
  const set = new Set()
  data.forEach(({ cities }) => set.add(cities[0]) & set.add(cities[1]))

  return Array.from(set).sort()
}

const computeDistance = (data, route) => {
  let total = 0

  for (let i = 0, a, b, record; (b = route[i]); i += 1, a = b) {
    if (a) {
      record = getRecord(data, a, b) || getRecord(data, b, a)
      total += record.distance
    }
  }
  return total
}

const puzzle1 = (data, findLongest = false) => {
  let route = createNamesArray(data)
  const routes = []

  do {
    routes.push({ distance: computeDistance(data, route), route })
  } while ((route = permute(route)))

  findLongest
    ? routes.sort((a, b) => b.distance - a.distance)
    : routes.sort((a, b) => a.distance - b.distance)

  return routes[0].distance
}

const puzzle2 = (data) => {
  return puzzle1(data, true)
}

const parse = (dsn) => {
  let data = rawInput[dsn]

  if (data && (data = data.split('\n').filter(v => Boolean(v))).length) {
    return data.map(line => line.split(' '))
      .map(([a, , b, , d]) => ({ cities: [a, b], distance: parseInt(d) }))
  }
  return data   //  NOTE: The runner will distinguish between undefined and falsy!
}

//  Example (demo) data.
rawInput[1] = `
London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141
`

module.exports = { parse, puzzles: [puzzle1, puzzle2] }

/*
"demo": { "1": { "value": 605, "time": 329 }, "2": { "value": 982, "time": 101 } },
"main": { "1": { "value": 207, "time": 128189 }, "2": { "value": 804, "time": 138401 } } }
 */
