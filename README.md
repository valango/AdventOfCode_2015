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


## Code
The project codebase consists of daily puzzle files named like `day01.js`, universal runner code
and module tests for runner code.

### Performance report
The following report was generated using command `./run abm`.

| day|main#1|main#2|µs1|µs2|demo#1|demo#2|µs1|µs2|
|---:|---:|---:|---:|---:|---:|---:|---:|---:|
|01|280|1797|401|90|||||
|02|1598415|3812909|1466|1234|58|34|87|70|
|03|2572|2631|6973|6211|4|3|77|48|
|04|1647256|9962624|4939921|40458915|609043||2993990||
|05|238|69|2464|4702|2|2|161|157|
|06|543903|14687245|53984|56296|||||
|07|16076|2797|42450|115261|65412|65412|274|190|

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
