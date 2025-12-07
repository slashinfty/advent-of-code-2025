import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const puzzleInput = readFileSync(fileURLToPath(import.meta.url).replace('js', 'txt'), 'utf8').split(`\n`).map(row => row.split(''));

const example = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`.split(`\n`).map(row => row.split(''));

const part1 = array => {
    const start = array[0].findIndex(val => val === 'S');
    array[1][start] = '|';
    for (let row = 1; row < array.length - 1; row++) {
        const rays = array[row].reduce((arr, val, idx) => val === '|' ? [...arr, idx] : [...arr], []);
        rays.forEach(ray => {
            if (array[row + 1][ray] === '.') array[row + 1][ray] = '|';
            else if (array[row + 1][ray] === '^') {
                if (array[row + 1][ray - 1] === '.') array[row + 1][ray - 1] = '|';
                if (array[row + 1][ray + 1] === '.') array[row + 1][ray + 1] = '|';
            }
        });
    }
    return array.reduce((splits, row, idx) => {
        const splitters = row.reduce((arr, val, i) => val === '^' ? [...arr, i] : [...arr], []);
        return splits + splitters.reduce((sum, val) => sum + (array[idx - 1][val] === '|' ? 1 : 0), 0);
    }, 0);
}

console.log(`expected: 21, calculated: ${part1(example)}`);
console.log(`part one solution: ${part1(puzzleInput)}`);

const part2 = array => {
    const splitters = [];
    for (let row = 1; row < array.length - 1; row++) {
        const splits = array[row].reduce((arr, val, i) => val === '^' ? [...arr, i] : [...arr], []);
        splits.forEach(col => {
            let stop = false;
            let prevRow = row - 1;
            let count = 0;
            do {
                const above = array[prevRow][col];
                if (above === 'S') {
                    count = 1;
                    stop = true;
                } else if (above === '^') stop = true;
                else {
                    const adjacentSplits = splitters.filter(s => s.row === prevRow && (s.col === col - 1 || s.col === col + 1));
                    count += adjacentSplits.reduce((sum, s) => sum + s.count, 0);
                }
                prevRow--;
            } while (!stop && prevRow !== -1);
            splitters.push({
                row: row,
                col: col,
                count: count
            });
        });
    }
    return array[array.length - 1].reduce((total, _, col) => {
        let stop = false;
        let prevRow = array.length - 2;
        do {
            const above = array[prevRow][col];
            if (above === '^') stop = true;
            else {
                const adjacentSplits = splitters.filter(s => s.row === prevRow && (s.col === col - 1 || s.col == col + 1));
                total += adjacentSplits.reduce((sum, s) => sum + s.count, 0);
            }
            prevRow--;
        } while (!stop && prevRow !== -1);
        return total;
    }, 0);
}

console.log(`expected: 40, calculated: ${part2(example)}`);
console.log(`part two solution: ${part2(puzzleInput)}`);
