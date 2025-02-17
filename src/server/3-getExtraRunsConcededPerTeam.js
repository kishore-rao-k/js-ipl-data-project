import { readFileSync, writeFileSync } from "fs";
const deliveriesData = JSON.parse(readFileSync("./src/data/deliveries.json"));
const matchesData = JSON.parse(readFileSync("./src/data/matches.json"));

// Extra runs conceded per team in the year 2016
function getExtraRunsConcededPerTeam() {
  let matchIds2016 = matchesData.reduce((matchIds2016, match) => {
    const seasonYear = match.season;
    const matchId = match.id;
    if (seasonYear === "2016") {
      matchIds2016.add(matchId);
    }
    return matchIds2016;
  }, new Set());

  let extraRunsPerTeam = deliveriesData.reduce((extraRunsPerTeam, delivery) => {
    const extraRuns = parseInt(delivery.extra_runs);
    const matchId = delivery.match_id;
    const bowlingTeam = delivery.bowling_team;
    if (matchIds2016.has(matchId)) {
      if (!extraRunsPerTeam[bowlingTeam]) {
        extraRunsPerTeam[bowlingTeam] = extraRuns;
      } else {
        extraRunsPerTeam[bowlingTeam] += extraRuns;
      }
    }
    return extraRunsPerTeam;
  }, {});
  return extraRunsPerTeam;
}

const result = getExtraRunsConcededPerTeam();
const outputFile = "./src/public/output/3-getExtraRunsConcededPerTeam.json";
writeFileSync(outputFile, JSON.stringify(result, null, 2), "utf-8");
console.log(`Output has been redirected to public/output dir`);
