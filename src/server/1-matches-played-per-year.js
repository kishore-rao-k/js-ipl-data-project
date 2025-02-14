import { readFileSync, writeFileSync } from 'fs';

const matchesData = JSON.parse(readFileSync('./src/data/matches.json'));

//Number of matches played per year for all the years in IPL.
function matchesPlayedPerYear() {
    return matchesData.reduce((accumulator, match) => {
        let year = match.season;

        if (accumulator[year]) {
            accumulator[year]++;
        } else {
            accumulator[year] = 1;
        }

        return accumulator;

    }, {});
}
const result = matchesPlayedPerYear();

const outputFile = './src/public/output/1-matchesPlayedPerYear.json';
writeFileSync(outputFile, JSON.stringify(result, null, 2));
console.log(`Output has been redirected to public/output dir`);
