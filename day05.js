import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const puzzleInput = readFileSync(fileURLToPath(import.meta.url).replace('js', 'txt'), 'utf8').split(`\n`);

const example = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`.split(`\n`);

const part1 = array => {
    const ranges = array.filter(row => /^\d+\-\d+$/.test(row)).map(val => val.split('-').map(v => Number(v)));
    const ids = array.filter(row => /^\d+$/.test(row)).map(val => Number(val));
    let fresh = 0;
    ids.forEach(id => {
        if (ranges.filter(range => id >= range[0] && id <= range[1]).length > 0) fresh++;
    });
    return fresh;
}

console.log(`expected: 3, calculated: ${part1(example)}`);
console.log(`part one solution: ${part1(puzzleInput)}`);

const part2 = array => {
    const ranges = array.filter(row => /^\d+\-\d+$/.test(row)).map(val => val.split('-').map(v => Number(v))).sort((a, b) => a[0] - b[0]);
    let coverage = [ ranges[0] ];
    for (let i = 1; i < ranges.length; i++) {
        const range = ranges[i];
        const lastRange = coverage[coverage.length - 1];
        if (lastRange[1] >= range[0]) {
            coverage[coverage.length - 1][1] = Math.max(lastRange[1], range[1]);
        } else {
            coverage.push(range);
        }
    }
    return coverage.reduce((sum, arr) => sum + arr[1] - arr[0] + 1, 0);
}

console.log(`expected: 14, calculated: ${part2(example)}`);
console.log(`part two solution: ${part2(puzzleInput)}`);