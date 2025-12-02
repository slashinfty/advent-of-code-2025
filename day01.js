import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const puzzleInput = readFileSync(fileURLToPath(import.meta.url).replace('js', 'txt'), 'utf8').split(`\n`).filter(v => v != '');

const example = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`.split(`\n`);

const part1 = array => {
    let zeroCount = 0;
    array.reduce((val, el) => {
        const num = Number(el.match(/\d+/)[0]);
        val = el.startsWith('L') ? val - num : val + num;
        if (val < 0) {
            val += 100 * Math.abs(Math.floor(val / 100));
        } else if (val > 99) {
            val -= 100 * Math.floor(val / 100);
        }
        if (val === 0) {
            zeroCount++
        }
        return val;
    }, 50);
    return zeroCount;
}

console.log(`expected: 3, calculated: ${part1(example)}`);
console.log(`part one solution: ${part1(puzzleInput)}`);

const part2 = array => {
    let zeroCount = 0;
    array.reduce((val, el) => {
        const num = Number(el.match(/\d+/)[0]);
        const initialVal = val;
        val = el.startsWith('L') ? val - num : val + num;
        if (val < 0) {
            zeroCount += Math.abs(Math.floor(val / 100));
            if (initialVal === 0) zeroCount--;
            val += 100 * Math.abs(Math.floor(val / 100));
        } else if (val > 99) {
            zeroCount += Math.floor(val / 100);
            val -= 100 * Math.floor(val / 100);
            if (val === 0) zeroCount--;
        }
        if (val === 0) {
            zeroCount++;
        }
        return val;
    }, 50);
    return zeroCount;
}

console.log(`expected: 6, calculated: ${part2(example)}`);
console.log(`part two solution: ${part2(puzzleInput)}`);