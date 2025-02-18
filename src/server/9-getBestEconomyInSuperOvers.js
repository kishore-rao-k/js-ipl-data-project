import { readFileSync, writeFileSync } from "fs";

const deliveriesData = JSON.parse(readFileSync("./src/data/deliveries.json"));

//Find the bowler with the best economy in super overs
function getBestEconomyInSuperOvers() {
  const superOverDeliveries = deliveriesData.filter(
    (delivery) => delivery.is_super_over === "1"
  );

  let bowlerStats = superOverDeliveries.reduce((bowlerStats, delivery) => {
    const bowler = delivery.bowler;
    const runs = parseInt(delivery.total_runs);
    const excludedRuns =
      parseInt(delivery.bye_runs) +
      parseInt(delivery.legbye_runs) +
      parseInt(delivery.penalty_runs);
    const validRuns = runs - excludedRuns;

    if (!bowlerStats[bowler]) {
      bowlerStats[bowler] = { totalRuns: 0, totalBalls: 0 };
    }
    bowlerStats[bowler].totalRuns += validRuns;
    if (delivery.wide_runs === "0" && delivery.noball_runs === "0") {
      bowlerStats[bowler].totalBalls++;
    }

    return bowlerStats;
  }, {});

  let bowlerEconomyList = [];
  Object.keys(bowlerStats).forEach((bowler) => {
    let runs = bowlerStats[bowler].totalRuns;
    let balls = bowlerStats[bowler].totalBalls;
    let economy = Math.round((runs / balls) * 6 * 100) / 100;

    bowlerEconomyList.push({ bowler: bowler, economy: economy });
  });
  return bowlerEconomyList.sort((a, b) => a.economy - b.economy).slice(0, 1);
}

const result = getBestEconomyInSuperOvers();

const outputFile = "./src/public/output/9-getBestEconomyInSuperOvers.json";
writeFileSync(outputFile, JSON.stringify(result, null, 2), "utf-8");
console.log(`Output has been redirected to public/output dir`);
