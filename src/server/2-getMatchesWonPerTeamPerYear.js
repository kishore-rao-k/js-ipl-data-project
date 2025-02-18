import { readFileSync, writeFileSync } from "fs";
const matchesData = JSON.parse(readFileSync("./src/data/matches.json"));

//Number of matches won per team per year in IPL.
function getMatchesWonPerTeamPerYear() {
  return matchesData.reduce((matchesWonPerTeamPerYear, match) => {
    const { season, winner } = match;
    if (!matchesWonPerTeamPerYear[winner]) {
      matchesWonPerTeamPerYear[winner] = {};
    }
    if (matchesWonPerTeamPerYear[winner][season]) {
      matchesWonPerTeamPerYear[winner][season]++;
    } else {
      matchesWonPerTeamPerYear[winner][season] = 1;
    }
    return matchesWonPerTeamPerYear;
  }, {});
}

const result = getMatchesWonPerTeamPerYear();
const outputFile = "./src/public/output/2-getMatchesWonPerTeamPerYear.json";
writeFileSync(outputFile, JSON.stringify(result, null, 2), "utf-8");
console.log(`Output has been redirected to public/output dir`);
