//  /index.js
'use strict'

const { assert, print, usecsFrom } = require('./utils')
const { opendirSync } = require('fs')
const maxN = BigInt(Number.MAX_SAFE_INTEGER)

const helpText = `Command line parameters:
  integer - day number(s), (default: most recent day only)
  a: all days
  b: both datasets (default: main data only)
  d: example data only (mutually exclusive with 'b' option
  h: print this information and terminate\n\n`

assert.beforeThrow((assertionError, args) => {
  console.error('Assertion FAILED with args:', args)
})

const parseCLI = (argv) => {
  let days = new Set(), flags = ''

  for (const arg of argv) {
    if (/^\d+$/.test(arg)) {
      days.add(arg.padStart(2, '0'))
    } else {
      if (arg.includes('h')) {
        return { code: 0, message: helpText }
      }
      if (Array.from(arg).some(c => !'abd'.includes(c))) {
        return { code: 1, message: `Illegal parameter '${arg}' - use -h option for help!\n` }
      }
      flags += arg
    }
  }

  const useBoth = flags.includes('b'), useDemo = flags.includes('d')

  return (useBoth && useDemo)
    ? { code: 1, message: `Can not use both 'b' and 'd' simultaneously!\n` }
    : { allDays: flags.includes('a'), days, useBoth, useDemo }
}

const prepareDays = (requiredDays, modules, allDays) => {
  let days

  if (allDays) {
    days = modules.sort()
  } else {
    if (requiredDays.size) {
      days = Array.from(requiredDays).filter(day => modules.includes(day))
      if (days.length !== requiredDays.size) {
        return 'No modules for given day(s)!\n'
      }
    } else {
      days = [modules.sort().reverse()[0]]
    }
  }
  return days
}

const execute = (puzzle, data) => {
  const t0 = process.hrtime()
  let result = puzzle(data)
  const usecs = Math.floor(usecsFrom(t0)) + ''

  if (result !== undefined) {
    if (typeof result === 'bigint' && result < maxN) {
      result = Number(result)
    }
    return { result, usecs }
  }
}

const runAndReport = (puzzle, ds, label, print) => {
  const res = ds && execute(puzzle, ds, print('\t' + label))

  print(res ? `(${res.usecs.padStart(15)} µs): ${res.result} ` : `: n/a\t\t\t`)
}

const runPuzzles = (selectedDays, { useBoth, useDemo, print }) => {
  for (const day of selectedDays) {
    const loadable = require('./day' + day)

    for (let d, d0, d1, n = 0, dLabel = 'DEMO'; n <= 1; ++n) {
      print(`day${day}, puzzle #${n + 1} `)

      if (useBoth || useDemo) {
        if (n && (d = loadable.parse(2)) !== undefined) {
          d1 = d, dLabel = 'DEMO'
        }
        if (d1 === undefined) {
          d1 = loadable.parse(1)

          if (!d1 && !useBoth && (d1 = loadable.parse(0))) {
            dLabel = 'MAIN'
          }
        }
        runAndReport(loadable.puzzles[n], d1, dLabel, print)
      }

      if (!useDemo) {
        if (d0 === undefined) d0 = loadable.parse(0)
        runAndReport(loadable.puzzles[n], d0, 'MAIN', print)
      }
      print('\n')
    }
  }
}

exports = module.exports = (argv) => {
  const modules = []

  for (let dir = opendirSync('.'), entry; (entry = dir.readSync());) {
    if (entry.isFile() && /^day\d\d\.js$/.test(entry.name)) {
      modules.push(entry.name.slice(3, 5))
    }
  }

  const { allDays, code, days, message, useBoth, useDemo } = parseCLI(argv)

  if (message) {
    print(message)
    return code
  }

  assert(modules.length, 'No dayNN.js modules found!')

  const selectedDays = prepareDays(days, modules, allDays)

  if (typeof selectedDays === 'string') {
    print(message)
    return 1
  }

  runPuzzles(selectedDays, { useBoth, useDemo, print })

  return 0
}

//  Expose internals for module testing.
Object.assign(exports, { execute, parseCLI, prepareDays, runAndReport, runPuzzles })
