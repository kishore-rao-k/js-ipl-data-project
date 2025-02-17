import { readFileSync, writeFileSync } from "fs";
const matchesData = JSON.parse(readFileSync("./src/data/matches.json"));

//Number of matches won per team per year in IPL.
function getMatchesWonPerTeamPerYear() {
  return matchesData.reduce((result, match) => {
    const seasonYear = match.season;
    const winningTeam = match.winner;
    if (!result[winningTeam]) {
      result[winningTeam] = {};
    }
    if (result[winningTeam][seasonYear]) {
      result[winningTeam][seasonYear]++;
    } else {
      result[winningTeam][seasonYear] = 1;
    }
    return result;
  }, {});
}

const result = getMatchesWonPerTeamPerYear();
const outputFile = "./src/public/output/2-getMatchesWonPerTeamPerYear.json";
writeFileSync(outputFile, JSON.stringify(result, null, 2), "utf-8");
console.log(`Output has been redirected to public/output dir`);
