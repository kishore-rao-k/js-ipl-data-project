import { readFileSync, writeFileSync } from "fs";

const deliveriesData = JSON.parse(readFileSync("./src/data/deliveries.json"));
const matchesData = JSON.parse(readFileSync("./src/data/matches.json"));

//Top 10 economical bowlers in the year 2015
function getTop10EconomicalBowlers2015() {
  let matchIds2015 = matchesData.reduce((matchIds2015, match) => {
    let year = match.season;
    let matchId = match.id;
    if (year === "2015") {
      matchIds2015.push(matchId);
    }
    return matchIds2015;
  }, []);

  let bowlerStats = deliveriesData.reduce((bowlerStats, delivery) => {
    const bowler = delivery.bowler;
    const matchId = delivery.match_id;
    const runs = parseInt(delivery.total_runs);
    const excludedRuns =
      parseInt(delivery.bye_runs) +
      parseInt(delivery.legbye_runs) +
      parseInt(delivery.penalty_runs);
    const validRuns = runs - excludedRuns;
    if (matchIds2015.includes(matchId)) {
      if (!bowlerStats[bowler]) {
        bowlerStats[bowler] = { totalRuns: 0, totalBalls: 0 };
      }
      bowlerStats[bowler].totalRuns += validRuns;
      if (delivery.wide_runs === "0" && delivery.noball_runs === "0") {
        bowlerStats[bowler].totalBalls++;
      }
    }
    return bowlerStats;
  }, {});

  let economyRates = [];
  Object.keys(bowlerStats).forEach((bowler) => {
    let runs = bowlerStats[bowler].totalRuns;
    let balls = bowlerStats[bowler].totalBalls;
    let economy = Math.round((runs / balls) * 6 * 100) / 100;

    economyRates.push({ bowler: bowler, economy: economy });
  });
  return economyRates.sort((a, b) => a.economy - b.economy).slice(0, 10);
}

const result = getTop10EconomicalBowlers2015();

const outputFile = "./src/public/output/4-getTop10EconomicalBowlers2015.json";
writeFileSync(outputFile, JSON.stringify(result, null, 2), "utf-8");
console.log(`Output has been redirected to public/output dir`);
