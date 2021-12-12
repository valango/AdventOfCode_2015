'use strict'  //  Race simulation.

const { loadData, parseInt } = require('./core/utils')
const rawInput = [loadData(module.filename)]

/**
 * @typedef {{
 * name:string,
 * restFor:number,
 * runFor:number,
 * distance:number, timeLeft:number, isRunning:boolean,
 * points: number,
 * speed:number
 * }} TData
 */

const simSecond = (data) => {
  for (const rec of data) {
    let { isRunning, timeLeft } = rec

    if (timeLeft === 0) {
      rec.isRunning = isRunning = !isRunning
      rec.timeLeft = isRunning ? rec.runFor : rec.restFor
    }
    if (isRunning) rec.distance += rec.speed
    rec.timeLeft -= 1
  }
}

/**
 * @param {TData[]} data
 * @param {boolean} isDemo
 */
const puzzle1 = (data, isDemo) => {
  for (let t = 0, limit = isDemo ? 1000 : 2503; t < limit; t += 1) {
    simSecond(data)
  }
  data.sort((a, b) => b.distance - a.distance)
  return data[0].distance
}

/**
 * @param {TData[]} data
 * @param {boolean} isDemo
 */
const puzzle2 = (data, isDemo) => {
  for (const row of data) {
    row.isRunning = false
    row.distance = row.points = row.timeLeft = 0
  }
  for (let t = 0, limit = isDemo ? 1000 : 2503; t < limit; t += 1) {
    simSecond(data)
    const longest = Math.max(...data.map((r) => r.distance))
    if ([1, 140, 1000].includes(t)) {
      t += 0
    }

    for (let i = 0, r; (r = data[i]); i += 1) {
      if (r.distance === longest) {
        r.points += 1
      }
    }
  }
  data.sort((a, b) => b.points - a.points)
  return data[0].points
}

const parse = (dsn) => {
  let data = rawInput[dsn]

  if (data && (data = data.split('\n').filter(v => Boolean(v))).length) {
    return data.map(line => {
      const r = /^(\S+)[^\d]+(\d+)[^\d]+(\d+)[^\d]+(\d+)/.exec(line)
      return {
        distance: 0,
        name: r[1],
        isRunning: false,
        speed: parseInt(r[2]),
        points: 0,
        restFor: parseInt(r[4]),
        runFor: parseInt(r[3]),
        timeLeft: 0
      }
    })
  }
  return data   //  NOTE: The runner will distinguish between undefined and falsy!
}

//  Example (demo) data.
rawInput[1] = `
Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.`

module.exports = { parse, puzzles: [puzzle1, puzzle2] }

/*
"demo": { "1": { "value": 1120, "time": 667 }, "2": { "value": 689, "time": 823 } },
"main": { "1": { "value": 2660, "time": 4791 }, "2": { "value": 1256, "time": 9009 } }
 */
