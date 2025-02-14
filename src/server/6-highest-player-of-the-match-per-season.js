import { readFileSync, writeFileSync } from 'fs';

const matchesData = JSON.parse(readFileSync('./src/data/matches.json'));


// 6.Find a player who has won the highest number of Player of the Match awards for each seasons
function HighestPlayerOfTheMatchPerSeason() {
  const playerOfTheMatchEachSeason = matchesData.reduce((accumulator, match) => {
    const { season, player_of_match } = match; 

    if (!accumulator[season]) {
      accumulator[season] = {};
    }
    if (!accumulator[season][player_of_match]) {
      accumulator[season][player_of_match] = 0;
    }
    accumulator[season][player_of_match]++;
    return accumulator;
  }, {});

  const HighestPlayerOfTheMatchPerSeason =  Object.keys(playerOfTheMatchEachSeason).reduce((accumulator, season) => {
    const playersInSeason = playerOfTheMatchEachSeason[season];
    const topPlayer = Object.keys(playersInSeason).reduce((top, player) => {
      const awards = playersInSeason[player];
      if (awards > top.awards) {
        return { player, awards };
      }
      return top;
    }, { player: "", awards: 0 });

    accumulator[season] = topPlayer;
    return accumulator;
  }, {});

  return HighestPlayerOfTheMatchPerSeason;
}

const result = HighestPlayerOfTheMatchPerSeason();

const outputFile = './src/public/output/6-HighestPlayerOfTheMatchPerSeason.json';
writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
console.log(`Output has been redirected to public/output dir`);