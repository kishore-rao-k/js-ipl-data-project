import { readFileSync, writeFileSync } from "fs";
const deliveriesData = JSON.parse(readFileSync("./src/data/deliveries.json"));
const matchesData = JSON.parse(readFileSync("./src/data/matches.json"));

// Extra runs conceded per team in the year 2016
function getExtraRunsConcededPerTeam() {
  let matchIds2016 = matchesData.reduce((matchIds2016, match) => {
    const { season, id } = match;
    if (season === "2016") {
      matchIds2016.add(id);
    }
    return matchIds2016;
  }, new Set());

  let extraRunsPerTeam = deliveriesData.reduce((extraRunsPerTeam, delivery) => {
    const { match_id, bowling_team, extra_runs } = delivery;
    const extraRuns = parseInt(extra_runs);
    if (matchIds2016.has(match_id)) {
      if (!extraRunsPerTeam[bowling_team]) {
        extraRunsPerTeam[bowling_team] = extraRuns;
      } else {
        extraRunsPerTeam[bowling_team] += extraRuns;
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
