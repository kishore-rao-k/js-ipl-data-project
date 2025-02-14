import { readFileSync, writeFileSync } from 'fs'

let deliveriesData = JSON.parse(readFileSync('./src/data/deliveries.json'));
//Find the bowler with the best economy in super overs
// check if it's a super over
// calculate economy
// sort and return one bowler with economy
function bestEconomyInSuperOvers() {
    let runsAndBalls = {};
    for (let i = 0; i < deliveriesData.length; i++) {
        let isSuperOver = deliveriesData[i].is_super_over;
        if (isSuperOver === "0") {
            continue;
        }

        let bowler = deliveriesData[i].bowler;
        let runs = parseInt(deliveriesData[i].total_runs);
        let runsExcluded = parseInt(deliveriesData[i].bye_runs) + parseInt(deliveriesData[i].legbye_runs) + parseInt(deliveriesData[i].penalty_runs);
        let finalRun = runs - runsExcluded;
        if (!runsAndBalls[bowler]) {
            runsAndBalls[bowler] = { totalRuns: 0, balls: 0 };
        }
        runsAndBalls[bowler].totalRuns += finalRun;

        if (deliveriesData[i].noball_runs === "0" && deliveriesData[i].wide_runs === "0") {
            runsAndBalls[bowler].balls++;
        }
    }
    // console.log(runsAndBalls);
    let result = [];
    for (let bowler in runsAndBalls) {
        let runs = runsAndBalls[bowler].totalRuns;
        let balls = runsAndBalls[bowler].balls;
        let economy = (Math.round((runs / balls) * 6 * 100) / 100)
        result.push({ bowler: bowler, economy: economy });
    }
    return result
        .sort((a, b) => a.economy - b.economy)
        .slice(0, 1);

}
const result = bestEconomyInSuperOvers();

const outputFile = './src/public/output/9-bestEconomyInSuperOvers.json';
writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
console.log(`Output has been redirected to public/output dir`);