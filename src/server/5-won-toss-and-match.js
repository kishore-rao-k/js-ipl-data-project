import { readFileSync, writeFileSync } from 'fs';

const matchesData = JSON.parse(readFileSync('./src/data/matches.json'));

//Find the number of times each team won the toss and also won the match
// check if winner == tossEinner
// increase count
function wonTossAndMatch() {
  let accumulator = {};
  for (let i = 0; i < matchesData.length; i++) {
    let winner = matchesData[i].winner;
    let tossWinner = matchesData[i].toss_winner;
    if (winner === tossWinner) {
      if (!accumulator[winner]) {
        accumulator[winner] = 1;
      } else {
        accumulator[winner]++;
      }
    }
  }
  return accumulator;
}

const result = wonTossAndMatch();

const outputFile = './src/public/output/5-wonTossAndMatch.json';
writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
console.log(`Output has been redirected to public/output dir`);