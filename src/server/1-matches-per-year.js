import { readFileSync } from 'fs';

const data = JSON.parse(readFileSync('/home/kishore-k/mb/js-ipl-data-project/src/data/matches.json', 'utf-8'));

//Number of matches played per year for all the years in IPL.
console.log(data[1])

