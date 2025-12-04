import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const puzzleInput = readFileSync(fileURLToPath(import.meta.url).replace('js', 'txt'), 'utf8').split(`\n`).map(row => row.split(''));

const example = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`.split(`\n`).map(row => row.split(''));

const part1 = array => {
    let accessible = 0;
    array.forEach((row, rowIndex) => {
        row.forEach((roll, rollIndex) => {
            if (roll === '@') {
                let rollsToCheck = [ row[rollIndex - 1], row[rollIndex + 1] ];
                if (array[rowIndex - 1] !== undefined) {
                    rollsToCheck = [ array[rowIndex - 1][rollIndex - 1], array[rowIndex - 1][rollIndex], array[rowIndex - 1][rollIndex + 1], ...rollsToCheck ];
                }
                if (array[rowIndex + 1] !== undefined) {
                    rollsToCheck = [ ...rollsToCheck, array[rowIndex + 1][rollIndex - 1], array[rowIndex + 1][rollIndex], array[rowIndex + 1][rollIndex + 1] ];
                }
                if (rollsToCheck.reduce((count, check) => count + (check === '@' ? 1 : 0), 0) < 4) {
                    accessible++;
                }
            }
        });
    });
    return accessible;
}

console.log(`expected: 13, calculated: ${part1(example)}`);
console.log(`part one solution: ${part1(puzzleInput)}`);

const part2 = array => {
    let removed = 0;
    let accessible = [];
    do {
        accessible.forEach(arr => {
            array[arr[0]][arr[1]] = '.';
            removed++;
        });
        accessible = [];
        array.forEach((row, rowIndex) => {
            row.forEach((roll, rollIndex) => {
                if (roll === '@') {
                    let rollsToCheck = [ row[rollIndex - 1], row[rollIndex + 1] ];
                    if (array[rowIndex - 1] !== undefined) {
                        rollsToCheck = [ array[rowIndex - 1][rollIndex - 1], array[rowIndex - 1][rollIndex], array[rowIndex - 1][rollIndex + 1], ...rollsToCheck ];
                    }
                    if (array[rowIndex + 1] !== undefined) {
                        rollsToCheck = [ ...rollsToCheck, array[rowIndex + 1][rollIndex - 1], array[rowIndex + 1][rollIndex], array[rowIndex + 1][rollIndex + 1] ];
                    }
                    if (rollsToCheck.reduce((count, check) => count + (check === '@' ? 1 : 0), 0) < 4) {
                        accessible.push([ rowIndex, rollIndex ]);
                    }
                }
            });
        });
    } while (accessible.length !== 0);
    return removed;
}

console.log(`expected: 43, calculated: ${part2(example)}`);
console.log(`part two solution: ${part2(puzzleInput)}`);