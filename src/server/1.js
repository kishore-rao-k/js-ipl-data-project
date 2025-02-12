import { readFileSync, writeFileSync } from 'fs';
const matchesData = JSON.parse(readFileSync('/home/kishore-k/mb/js-ipl-data-project/src/data/matches.json', 'utf-8'));

//Number of matches played per year for all the years in IPL.
function matchesPlayedPerYear() {
    let accumulator = {};
    for (let i = 0; i < matchesData.length; i++) {
        if (!accumulator[matchesData[i].season]) {
            accumulator[matchesData[i].season] = 1;
        } else {
            accumulator[matchesData[i].season]++;
        }
    }
    return accumulator;
}
const result = matchesPlayedPerYear();

const outputFile = '/home/kishore-k/mb/js-ipl-data-project/src/public/output/1.json';
writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
console.log(`Output has been redirected to public/output dir`);
