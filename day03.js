import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const puzzleInput = readFileSync(fileURLToPath(import.meta.url).replace('js', 'txt'), 'utf8').split(`\n`);

const example = `987654321111111
811111111111119
234234234234278
818181911112111`.split(`\n`);

const part1 = array => {
    const joltages = [];
    array.forEach(bank => {
        const batteries = bank.split('').map(v => Number(v));
        const tens = Math.max(...batteries.slice(0, batteries.length - 1));
        const ones = Math.max(...batteries.slice(batteries.indexOf(tens) + 1));
        joltages.push(10 * tens + ones);
    });
    return joltages.reduce((sum, jolt) => sum + jolt, 0);
}

console.log(`expected: 357, calculated: ${part1(example)}`);
console.log(`part one solution: ${part1(puzzleInput)}`);

const part2 = array => {
    const joltages = [];
    array.forEach(bank => {
        const batteries = bank.split('').map(v => Number(v));
        const toggled = [];
        let prevIndex = -1;
        for (let i = 0; i < 12; i++) {
            let max = Math.max(...batteries.slice(prevIndex + 1, batteries.length - 11 + i));
            prevIndex = batteries.findIndex((b, i) => b === max && i > prevIndex);
            toggled.push(max);
        }
        joltages.push(toggled.reduce((sum, batt, i) => sum + batt * Math.pow(10, 11 - i), 0));
    });
    return joltages.reduce((sum, jolt) => sum + jolt, 0);
}

console.log(`expected: 3121910778619, calculated: ${part2(example)}`);
console.log(`part two solution: ${part2(puzzleInput)}`);