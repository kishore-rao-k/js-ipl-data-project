import { readFileSync, writeFileSync } from "fs";
const matchesData = JSON.parse(readFileSync("./src/data/matches.json"));

//Find the number of times each team won the toss and also won the match
function getTeamsWinningTossAndMatch() {
  return matchesData.reduce(
    (teamsWinningTossAndMatch, match) => {
      const {winner , toss_winner} = match;
      if (winner === toss_winner) {
        if (!teamsWinningTossAndMatch[winner]) {
          teamsWinningTossAndMatch[winner] = 1;
        } else {
          teamsWinningTossAndMatch[winner]++;
        }
      }
      return teamsWinningTossAndMatch;
    },
    {}
  );
}

const result = getTeamsWinningTossAndMatch();
const outputFile = "./src/public/output/5-getTeamsWinningTossAndMatch.json";
writeFileSync(outputFile, JSON.stringify(result, null, 2), "utf-8");
console.log(`Output has been redirected to public/output dir`);
