# Advent Of Code '2015

I play this in Dec'21, so there is no track record or stats.

## Diary
1800 2017 2023

* `day 01 (04, 10):` Super simple.
* `day 02 (17, 22):` Super simple.
* `day 03 (17, 26):` Quite simple.
* `day 04 (26, 48):` Wasted some time to find clever solution, but brute force was enough.
* `day 05 (24, 52):` Quite simple.
* `day 06 (47, 57):` Carelessness with regExp syntax!.
* `day 07 (77, 86):` I love simulations!
* `day 08 (10, 20):` Super simple.
* `day 09 (??, ??):` Super simple with permutations.
* `day 10 (26, 28):` Super simple.
* `day 11 (80, 84):` Lots of tiny details w array indexes.

### Bits Of Wisdom
1. _**Hold your horses**_ until you have understood the task and have clear idea.
1. [_**KISS**_](https://en.wikipedia.org/wiki/KISS_principle) while you can_ -
   try a non-elegant, but simple brute-force approach first.
1. When code seems to overwhelm you, pull back and _**meditate**_.
1. _Hold to [**Clean Code**](https://en.wikipedia.org/wiki/Robert_C._Martin)_,
   declare function signatures.

## Code
The project codebase consists of daily puzzle files named like `day01.js`, universal runner code
and module tests for runner code.

### Performance report
The following report was generated using command `./run abm`.

| day|Main1|Main2|Demo1|Demo2|M1_µs|M2_µs|D1_µs|D2_µs|
|---:|---:|---:|---:|---:|---:|---:|---:|---:|
|01|279|1797| | |432|98| | |
|02|1598415|3812909|58|34|1421|1239|94|83|
|03|2572|2631|4|3|7118|6087|74|61|
|04|1647256|9962624|609043| |4989931|39786213|2988310| |
|05|238|69|2|2|2383|4757|189|156|
|06|543903|14687245| | |50764|63036| | |
|07|16076|2797|65412|65412|41286|111607|213|241|
|08|1342|2074|12|19|2049|2480|125|146|
|09|207|804|605|982|128091|140686|325|127|
|10|252594|3579328| | |36926|535464| | |
|11|vzbxkghc|vzbxkghd|abcdefgj|abcdefgk|10|13|166|62|

### Usage

After installing with npm or yarn, just type `./run` and the puzzles from the most
recent puzzle file will be executed.

The following command line parameters apply:

* integer - day number(s), (default: most recent day only);
* a: all days;
* b: both datasets (default: main data only);
* d: example data only (mutually exclusive with 'b' option;
* h: print help information and terminate;
* j: generate output as JSON-formatted rows;
* m: generate markdown output (default: text table for multiple, JSON for single puzzle).

If neither 'b' nor 'd' is present, only the main dataset is used. If 'd' is present, and demo data
is not defined, it falls back to main dataset.

### Coding

To start with a new puzzle for, say, _day 14_, do:
1. copy the contents of [template.js](./template.js) to `day14.js`;
1. create `day14.txt` in `./data` directory and populate it with data from the website;
1. have fun!

It is recommended to copy the puzzle data into a text file in `data` folder.

### Debugging

**To trap failed assertions** when debugging, set a breakpoint to
[runner/index.js](./runner/index.js) line #20.
