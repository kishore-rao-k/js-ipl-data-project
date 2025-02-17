import { readFileSync, writeFileSync } from "fs";

const matchesData = JSON.parse(readFileSync("./src/data/matches.json"));

// 6.Find a player who has won the highest number of Player of the Match awards for each seasons
function getTopPlayersOfTheMatchPerSeason() {
  let playerOfTheMatchCountBySeason = matchesData.reduce(
    (playerOfTheMatchCountBySeason, match) => {
      const seasonYear = match.season;
      const playerOfMatch = match.player_of_match;
      if (!playerOfTheMatchCountBySeason[seasonYear]) {
        playerOfTheMatchCountBySeason[seasonYear] = {};
      }
      if (!playerOfTheMatchCountBySeason[seasonYear][playerOfMatch]) {
        playerOfTheMatchCountBySeason[seasonYear][playerOfMatch] = 1;
      } else {
        playerOfTheMatchCountBySeason[seasonYear][playerOfMatch]++;
      }
      return playerOfTheMatchCountBySeason;
    },
    {}
  );

  let topPlayersBySeason = [];
  Object.keys(playerOfTheMatchCountBySeason).forEach((season) => {
    let maxCount = 0;
    let topPlayers = [];
    Object.keys(playerOfTheMatchCountBySeason[season]).forEach((player) => {
      let count = playerOfTheMatchCountBySeason[season][player];
      if (count > maxCount) {
        maxCount = count;
        topPlayers = [player];
      } else if (count === maxCount) {
        topPlayers.push(player);
      }
    });
    topPlayersBySeason.push({
      season: season,
      playerName: topPlayers,
      awards: maxCount,
    });
  });
  return topPlayersBySeason;
}

const result = getTopPlayersOfTheMatchPerSeason();

const outputFile =
  "./src/public/output/6-getTopPlayersOfTheMatchPerSeason.json";
writeFileSync(outputFile, JSON.stringify(result, null, 2), "utf-8");
console.log(`Output has been redirected to public/output dir`);
