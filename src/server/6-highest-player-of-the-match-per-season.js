import { readFileSync, writeFileSync } from "fs";

const matchesData = JSON.parse(readFileSync("./src/data/matches.json"));

// 6.Find a player who has won the highest number of Player of the Match awards for each seasons
//get years and player of the match and count
//compare and return result
function HighestPlayerOfTheMatchPerSeason() {
  let result = {};
  for (let i = 0; i < matchesData.length; i++) {
    let playerofMathch = matchesData[i].player_of_match;
    let year = matchesData[i].season;
    if (!result[year]) {
      result[year] = {};
    }
    if (!result[year][playerofMathch]) {
      result[year][playerofMathch] = 1;
    } else {
      result[year][playerofMathch]++;
    }
  }
  let res = {};
  for (let year in result) {
    let maxCount = 0;
    let maxPlayer = "";
    for (let player in result[year]) {
      if (result[year][player] > maxCount) {
        maxCount = result[year][player];
        maxPlayer = player;
      }
    }
    res[year] = { Player: maxPlayer, Count: maxCount };
  }
  return res;
}

const result = HighestPlayerOfTheMatchPerSeason();

const outputFile =
  "./src/public/output/6-HighestPlayerOfTheMatchPerSeason.json";
writeFileSync(outputFile, JSON.stringify(result, null, 2), "utf-8");
console.log(`Output has been redirected to public/output dir`);
