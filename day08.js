import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const puzzleInput = readFileSync(fileURLToPath(import.meta.url).replace('js', 'txt'), 'utf8').split(`\n`);

const example = `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`.split(`\n`);

const main = (array, cutoff) => {
    const possibilities = [];
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = i + 1; j < array.length; j++) {
            possibilities.push([array[i], array[j]]);
        }
    }
    possibilities.sort((a, b) => {
        const [ x1, y1, z1 ] = a[0].split(',').map(v => Number(v));
        const [ x2, y2, z2 ] = a[1].split(',').map(v => Number(v));
        const [ x3, y3, z3 ] = b[0].split(',').map(v => Number(v));
        const [ x4, y4, z4 ] = b[1].split(',').map(v => Number(v));
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2)) - Math.sqrt(Math.pow(x4 - x3, 2) + Math.pow(y4 - y3, 2) + Math.pow(z4 - z3, 2))
    });
    let connections = possibilities.slice(0, cutoff);
    let circuits = [];
    connections.forEach(conn => {
        const [ first, second ] = [...conn];
        const firstIndex = circuits.findIndex(cir => cir.includes(first));
        const secondIndex = circuits.findIndex(cir => cir.includes(second));
        if (firstIndex > -1 && secondIndex > -1) {
            if (firstIndex !== secondIndex) {
                const firstCircuit = circuits.splice(Math.max(firstIndex, secondIndex), 1)[0];
                const secondCircuit = circuits.splice(Math.min(firstIndex, secondIndex), 1)[0];
                circuits = [...circuits, [...firstCircuit, ...secondCircuit]];
            }
        } else if (firstIndex > -1) {
            const circuit = [...circuits.splice(firstIndex, 1)[0], second];
            circuits = [...circuits, circuit];
        } else if (secondIndex > -1) {
            const circuit = [...circuits.splice(secondIndex, 1)[0], first];
            circuits = [...circuits, circuit];
        } else {
            circuits = [...circuits, [first, second]];
        }
    });
    console.log(`part one: ${circuits.sort((a, b) => b.length - a.length).slice(0, 3).reduce((prod, arr) => prod * arr.length, 1)}`);
    connections = possibilities.slice(cutoff);
    let lastConnection = [];
    let index = 0;
    do {
        let conn = connections[index];
        lastConnection = conn;
        const [ first, second ] = [...conn];
        const firstIndex = circuits.findIndex(cir => cir.includes(first));
        const secondIndex = circuits.findIndex(cir => cir.includes(second));
        if (firstIndex > -1 && secondIndex > -1) {
            if (firstIndex !== secondIndex) {
                const firstCircuit = circuits.splice(Math.max(firstIndex, secondIndex), 1)[0];
                const secondCircuit = circuits.splice(Math.min(firstIndex, secondIndex), 1)[0];
                circuits = [...circuits, [...firstCircuit, ...secondCircuit]];
            }
        } else if (firstIndex > -1) {
            const circuit = [...circuits.splice(firstIndex, 1)[0], second];
            circuits = [...circuits, circuit];
        } else if (secondIndex > -1) {
            const circuit = [...circuits.splice(secondIndex, 1)[0], first];
            circuits = [...circuits, circuit];
        } else {
            circuits = [...circuits, [first, second]];
        }
        index++;
    } while (circuits.length > 1 || circuits[0].length !== array.length);
     console.log(`part two: ${lastConnection[0].split(',').map(v => Number(v))[0] * lastConnection[1].split(',').map(v => Number(v))[0]}`);
}

console.log('expected part one: 40, part two: 25272');
main(example, 10);
main(puzzleInput, 1000);
