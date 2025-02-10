import { readFileSync, writeFileSync } from 'fs';
const matchesData = JSON.parse(readFileSync('/home/kishore-k/mb/js-ipl-data-project/src/data/matches.json', 'utf-8'));

//Number of matches played per year for all the years in IPL.
function matchesPlayedPerYear() {
    return matchesData.reduce((matchCount, match) => {
        let year = match.season;

        if (matchCount[year]) {
            matchCount[year]++;
        } else {
            matchCount[year] = 1;
        }

        return matchCount;

    }, {});
}
const result = matchesPlayedPerYear();

const outputFile = '/home/kishore-k/mb/js-ipl-data-project/src/public/output/matchesPlayedPerYear.json';
writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
console.log(`Output has been redirected to public/output dir`);
