
import { readFileSync, writeFileSync } from 'fs';
const matchesData = JSON.parse(readFileSync('/home/kishore-k/mb/js-ipl-data-project/src/data/matches.json', 'utf-8'));

//Number of matches won per team per year in IPL.
function matchesWonPerTeamPerYear() {
    return matchesData.reduce((resultObject, match) => {
        let year = match.season;
        let winner = match.winner;

        if (!resultObject[winner]) {
            resultObject[winner] = {};
        }

        if (resultObject[winner][year]) {
            resultObject[winner][year]++;
        } else {
            resultObject[winner][year] = 1;
        }

        return resultObject;

    }, {});
}


const result = matchesWonPerTeamPerYear();

const outputFile = '/home/kishore-k/mb/js-ipl-data-project/src/public/output/matchesWonPerTeamPerYear.json';
writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
console.log(`Output has been redirected to public/output dir`);