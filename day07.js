'use strict'
const { assert, loadData, parseInt } = require('./core/utils')
const rawInput = [loadData(module.filename)]

const puzzle1 = (data) => {
  const wires = {}
  let pending, added, names = new Set()

  const read = (src) => {
    if (typeof src === 'number') return src
    if (wires[src] === undefined) {
      assert(src, 'read(undefined)')
      throw src
    }
    return wires[src]
  }

  const write = (key, value) => {
    assert(typeof value === 'number' && key && typeof key === 'string', 'write(%o,%o)', key, value)
    wires[key] = value
  }

  do {
    added = pending = 0

    for (const { dst, op, src } of data) {
      assert(names === undefined || !names.has(dst), 'duplicate assignment %s', dst)

      if (wires[dst] === undefined) {
        try {
          if (op === 'COPY') {
            write(dst, read(src[0]))
          } else if (op === 'NOT') {
            write(dst, 0xffff ^ read(src[0]))
          } else if (op === 'AND') {
            write(dst, read(src[0]) & read(src[1]))
          } else if (op === 'OR') {
            write(dst, read(src[0]) | read(src[1]))
          } else if (op === 'LSHIFT') {
            write(dst, read(src[0]) << read(src[1]))
          } else if (op === 'RSHIFT') {
            write(dst, read(src[0]) >> read(src[1]))
          } else {
            assert(false, 'bad command %o', { op, src, dst })
          }
          added += 1
        } catch (e) {
          if (typeof e !== 'string') {
            throw e
          }
          pending += 1
        }
      }
    }
    names = undefined
  } while (pending && added)

  assert(!pending, 'Loop logic')

  return wires['a']
}

const puzzle2 = (data) => {
  const a = puzzle1(data)

  if (a !== undefined) {
    const i = data.findIndex(({ dst }) => dst === 'b')
    data[i].src = [a]

    return puzzle1(data)
  }
}

const parse = (dsn) => {
  let data = rawInput[dsn]

  if (data && (data = data.split('\n').filter(v => Boolean(v))).length) {
    return data.map((row) => {
      let op, src, dst, v
      const r = row.split(' '), l = r.length
      if (l === 3) {
        op = 'COPY', src = [r[0]], dst = r[2]
      } else if (r[0] === 'NOT') {
        op = 'NOT', src = [r[1]], dst = r[3]
      } else {
        op = r[1], src = [r[0], r[2]], dst = r[4]
      }
      src = src.map(s => (v = parseInt(s)) >= 0 ? v : s)
      return { dst, op, src }
    })
  }
}

//  Example data. If rawInput[2] is defined too, then 1 and 2 are for different puzzles.
rawInput[1] = `
123 -> x
456 -> b
x AND b -> d
x OR b -> e
x LSHIFT 2 -> f
b RSHIFT 2 -> g
NOT x -> a
NOT b -> i`

module.exports = { parse, puzzles: [puzzle1, puzzle2] }

/*
day07, puzzle #1 	REAL(          40255 µs): 16076
day07, puzzle #2 	REAL(          72328 µs): 2797
 */
