import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const puzzleInput = readFileSync(fileURLToPath(import.meta.url).replace('js', 'txt'), 'utf8').split(`\n`);

const example = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`.split(`\n`);

const part1 = array => {
    let maxArea = 0;
    array.forEach((tile, i) => {
        const [ x1, y1 ] = tile.split(',').map(n => Number(n));
        maxArea = Math.max(maxArea, Math.max(...array.slice(i + 1).map(str => {
            const [ x2, y2 ] = str.split(',').map(n => Number(n));
            return (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);
        })));
    });
    return maxArea;
}

console.log(`expected: 50, calculated: ${part1(example)}`);
console.log(`part one solution: ${part1(puzzleInput)}`);