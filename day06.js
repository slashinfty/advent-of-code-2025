import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const puzzleInput = readFileSync(fileURLToPath(import.meta.url).replace('js', 'txt'), 'utf8').split(`\n`);

const example = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `.split(`\n`);

const part1 = array => {
    const arr = array.map(row => row.split(/\s+/).filter(val => val !== ''));
    const length = arr[0].length;
    let total = 0;
    for (let i = 0; i < length; i++) {
        const numbers = arr.filter((_, j) => j < arr.length - 1).map(row => Number(row[i]));
        const operation = arr[arr.length - 1][i];
        if (operation === '+') total += numbers.reduce((sum, num) => sum + num, 0);
        else if (operation === '*') total += numbers.reduce((prod, num) => prod * num, 1);
    }
    return total;
}

console.log(`expected: 4277556, calculated: ${part1(example)}`);
console.log(`part one solution: ${part1(puzzleInput)}`);

const part2 = array => {
    const arr = array.map(row => row.split('').reverse());
    const length = arr[0].length;
    let total = 0;
    let numbers = [];
    for (let i = 0; i < length; i++) {
        let numberString = '';
        for (let j = 0; j < arr.length - 1; j++) {
            if (arr[j][i] !== ' ') numberString += arr[j][i];
        }
        numbers.push(Number(numberString));
        const operation = arr[arr.length - 1][i];
        if (operation === '+') total += numbers.reduce((sum, num) => sum + num, 0);
        else if (operation === '*') total += numbers.reduce((prod, num) => prod * num, 1);
        if (operation !== ' ') {
            numbers = [];
            i++;
        }
    }
    return total;
}

console.log(`expected: 3263827, calculated: ${part2(example)}`);
console.log(`part two solution: ${part2(puzzleInput)}`);