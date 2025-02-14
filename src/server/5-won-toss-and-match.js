import { readFileSync, writeFileSync } from 'fs';

const matchesData = JSON.parse(readFileSync('./src/data/matches.json'));

//Find the number of times each team won the toss and also won the match
function wonTossAndMatch() {

  let winningTossMatches = matchesData.filter((match) => match.toss_winner === match.winner);

  let tossMatchWon = winningTossMatches.reduce((accumulator, match) => {
    let tossWinner = match.toss_winner;
    if (!accumulator[tossWinner]) {
      accumulator[tossWinner] = 0;
    }
    accumulator[tossWinner]++;
    return accumulator;
  }, {});
  return tossMatchWon;
};

const result = wonTossAndMatch();

const outputFile = './src/public/output/5-wonTossAndMatch.json';
writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
console.log(`Output has been redirected to public/output dir`);