import { readFileSync, writeFileSync } from 'fs';

const matchesData = JSON.parse(readFileSync('/home/kishore-k/mb/js-ipl-data-project/src/data/matches.json', 'utf-8'));


// 6.Find a player who has won the highest number of Player of the Match awards for each seasons

 function HighestPlayerOfTheMatchPerSeason() {
  const playerOfTheMatchEachSeason = {};

  matchesData.forEach((match) => {
    const { season, player_of_match } = match;

    if (!playerOfTheMatchEachSeason[season]) {
      playerOfTheMatchEachSeason[season] = {};
    }

    if (!playerOfTheMatchEachSeason[season][player_of_match]) {
      playerOfTheMatchEachSeason[season][player_of_match] = 0;
    }

    playerOfTheMatchEachSeason[season][player_of_match]++;
  });

  const HighestPlayerOfTheMatchPerSeason = {};

  for (const season in playerOfTheMatchEachSeason) {
    const playersInSeason = playerOfTheMatchEachSeason[season];
    let topPlayer = { player: "", awards: 0 };

    for (const player in playersInSeason) {
      const awards = playersInSeason[player];
      if (awards > topPlayer.awards) {
        topPlayer = { player, awards };
      }
    }

    HighestPlayerOfTheMatchPerSeason[season] = topPlayer;
  }

  return HighestPlayerOfTheMatchPerSeason;
};

const result = HighestPlayerOfTheMatchPerSeason();

const outputFile = '/home/kishore-k/mb/js-ipl-data-project/src/public/output/6-HighestPlayerOfTheMatchPerSeason.json';
writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
console.log(`Output has been redirected to public/output dir`);