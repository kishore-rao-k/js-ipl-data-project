import { readFileSync, writeFileSync } from "fs";

const deliveriesData = JSON.parse(readFileSync("./src/data/deliveries.json"));

//8.Find the highest number of times one player has been dismissed by another player
function getMostDismissalsByBowler() {
  let dismissalsByBowlerBatsman = deliveriesData.reduce(
    (dismissalsByBowlerBatsman, delivery) => {
      const { player_dismissed, batsman, bowler } = delivery;
      if (player_dismissed === batsman) {
        let batsmanBowlerKey = `${batsman}_${bowler}`;
        if (!dismissalsByBowlerBatsman[batsmanBowlerKey]) {
          dismissalsByBowlerBatsman[batsmanBowlerKey] = {
            batsman: batsman,
            bowler: bowler,
            totalDismissals: 1,
          };
        } else {
          dismissalsByBowlerBatsman[batsmanBowlerKey].totalDismissals++;
        }
      }
      return dismissalsByBowlerBatsman;
    },
    {}
  );

  return Object.values(dismissalsByBowlerBatsman)
    .sort((a, b) => b.totalDismissals - a.totalDismissals)
    .slice(0, 1);
}

const result = getMostDismissalsByBowler();

const outputFile = "./src/public/output/8-getMostDismissalsByBowler.json";
writeFileSync(outputFile, JSON.stringify(result, null, 2), "utf-8");
console.log(`Output has been redirected to public/output dir`);
