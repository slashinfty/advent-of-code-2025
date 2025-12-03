import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const puzzleInput = readFileSync(fileURLToPath(import.meta.url).replace('js', 'txt'), 'utf8').split(',');

const example = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`.split(',');

const main = array => {
    const invalidIdsPart1 = [];
    const invalidIdsPart2 = [];
    array.forEach(range => {
        const [ start, end ] = range.split('-');
        for (let i = Number(start); i <= Number(end); i++) {
            if (/^(\d+)\1$/.test(i.toString())) {
                invalidIdsPart1.push(i);
            }
            if (/^(\d+)\1+$/.test(i.toString())) {
                invalidIdsPart2.push(i);
            }
        }
    });
    return [ invalidIdsPart1.reduce((sum, val) => sum + val, 0), invalidIdsPart2.reduce((sum, val) => sum + val, 0) ];
}

const [ exampleSolution1, exampleSolution2 ] = main(example);
const [ solution1, solution2 ] = main(puzzleInput);

console.log(`expected: 1227775554, calculated: ${exampleSolution1}`);
console.log(`part one solution: ${solution1}`);
console.log(`expected: 4174379265, calculated: ${exampleSolution2}`);
console.log(`part two solution: ${solution2}`);
