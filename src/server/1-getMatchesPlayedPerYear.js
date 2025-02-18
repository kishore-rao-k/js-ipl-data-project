import { readFileSync, writeFileSync } from "fs";
const matchesData = JSON.parse(readFileSync("./src/data/matches.json"));

//Number of matches played per year for all the years in IPL.
function getMatchesPlayedPerYear() {
  return matchesData.reduce((matchesPlayedPerYear, match) => {
    const { season } = match;
    if (matchesPlayedPerYear[season]) {
      matchesPlayedPerYear[season]++;
    } else {
      matchesPlayedPerYear[season] = 1;
    }
    return matchesPlayedPerYear;
  }, {});
}

const result = getMatchesPlayedPerYear();
const outputFile = "./src/public/output/1-getMatchesPlayedPerYear.json";
writeFileSync(outputFile, JSON.stringify(result, null, 2));
console.log(`Output has been redirected to public/output dir`);
