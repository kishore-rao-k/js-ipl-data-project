import { readFileSync, writeFileSync } from 'fs';
const matchesData = JSON.parse(readFileSync('./src/data/matches.json'));

// Number of matches played per year for all the years in IPL.
//loop over matchesData 
// if year not found add to the object with  1
// else increase count
function matchesPlayedPerYear() {
    let accumulator = {};
    for (let i = 0; i < matchesData.length; i++) {
        let year = matchesData[i].season;
        // console.log(year);
        if (!accumulator[year]) {
            accumulator[year] = 1;
        } else {

            accumulator[year]++;
        }
    }
    return accumulator;
}

let result = matchesPlayedPerYear()
const outputFile = './src/public/output/1-matchesPlayedPerYear.json';
writeFileSync(outputFile, JSON.stringify(result, null, 2));
console.log(`Output has been redirected to public/output dir`);
