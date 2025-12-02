# Advent of Code 2025

Importing puzzle input:

```js
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const puzzleInput = readFileSync(fileURLToPath(import.meta.url).replace('js', 'txt'), 'utf8');
```

Divide by line breaks and remove empty lines: `.split('\n').filter(v => v != '')`
