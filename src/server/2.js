
import { readFileSync, writeFileSync } from 'fs';
const matchesData = JSON.parse(readFileSync('/home/kishore-k/mb/js-ipl-data-project/src/data/matches.json', 'utf-8'));

//Number of matches won per team per year in IPL.
function matchesWonPerTeamPerYear() {
    let accumulator = {};
    for (let i = 0; i < matchesData.length; i++) {
        let year = matchesData[i].season;
        let winner = matchesData[i].winner;

        if (!accumulator[winner]) {
            accumulator[winner] = {};
        }
        if (!accumulator[winner][year]) {
            accumulator[winner][year] = 1;
        }
        else {
            accumulator[winner][year]++;
        }
    }
    return accumulator;
}


const result = matchesWonPerTeamPerYear();

const outputFile = '/home/kishore-k/mb/js-ipl-data-project/src/public/output/2.json';
writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
console.log(`Output has been redirected to public/output dir`);