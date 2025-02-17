import { readFileSync, writeFileSync } from "fs";
const matchesData = JSON.parse(readFileSync("./src/data/matches.json"));

//Find the number of times each team won the toss and also won the match
function getTeamsWinningTossAndMatch() {
  return matchesData.reduce((teamsWinningTossAndMatch, match) => {
    const matchWinner = match.winner;
    const tossWinner = match.toss_winner;
    if (matchWinner === tossWinner) {
      if (!teamsWinningTossAndMatch[matchWinner]) {
        teamsWinningTossAndMatch[matchWinner] = 1;
      } else {
        teamsWinningTossAndMatch[matchWinner]++;
      }
    }
    return teamsWinningTossAndMatch;
  }, {});
}

const result = getTeamsWinningTossAndMatch();
const outputFile = "./src/public/output/5-getTeamsWinningTossAndMatch.json";
writeFileSync(outputFile, JSON.stringify(result, null, 2), "utf-8");
console.log(`Output has been redirected to public/output dir`);
