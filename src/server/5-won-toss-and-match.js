import { readFileSync, writeFileSync } from 'fs';

const matchesData = JSON.parse(readFileSync('/home/kishore-k/mb/js-ipl-data-project/src/data/matches.json', 'utf-8'));

//Find the number of times each team won the toss and also won the match
function wonTossAndMatch() {

  const winningTossMatches = matchesData.filter((match) => match.toss_winner === match.winner);

  const tossMatchWon = winningTossMatches.reduce((accumulator, match) => {
    const tossWinner = match.toss_winner;
    if (!accumulator[tossWinner]) {
      accumulator[tossWinner] = 0;
    }
    accumulator[tossWinner]++;
    return accumulator;
  }, {});

  return tossMatchWon;
};

const result = wonTossAndMatch();

const outputFile = '/home/kishore-k/mb/js-ipl-data-project/src/public/output/5-wonTossAndMatch.json';
writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
console.log(`Output has been redirected to public/output dir`);