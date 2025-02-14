import { readFileSync, writeFileSync } from 'fs';

const deliveriesData = JSON.parse(readFileSync('./src/data/deliveries.json'));
const matchesData = JSON.parse(readFileSync('./src/data/matches.json'));

//Top 10 economical bowlers in the year 2015
// filter 2015 & matchId
// get total runs given and total balls bowled per bowler
// calculate economy and return top 10.
function top10EconomicalBowlers() {
    let accumulator = [];
    for (let i = 0; i < matchesData.length; i++) {
        let year = matchesData[i].season;
        let matchId = matchesData[i].id;
        if (year === "2015") {
            accumulator.push(matchId);
        }
    }

    let runsAndBalls = {};
    for (let i = 0; i < deliveriesData.length; i++) {
        let bowler = deliveriesData[i].bowler;
        let matchId = deliveriesData[i].match_id;
        let runs = parseInt(deliveriesData[i].total_runs);
        let excludedRuns = parseInt(deliveriesData[i].bye_runs) + parseInt(deliveriesData[i].legbye_runs) + parseInt(deliveriesData[i].penalty_runs);
        let finalRun = runs - excludedRuns;
        if (accumulator.includes(matchId)) {
            if (!runsAndBalls[bowler]) {
                runsAndBalls[bowler] = { totalRuns: 0, totalBalls: 0 };
            }
            runsAndBalls[bowler].totalRuns += finalRun;
            if (deliveriesData[i].wide_runs === "0" && deliveriesData[i].noball_runs === "0") {
                runsAndBalls[bowler].totalBalls++;
            }
        }
    }

    let output = [];
    for (let bowler in runsAndBalls) {
        let runs = runsAndBalls[bowler].totalRuns;
        let balls = runsAndBalls[bowler].totalBalls;
        let economy = Math.round((runs / balls) * 6 * 100) / 100

        output.push({ bowler: bowler, economy: economy });
    }
    return output
        .sort((a, b) => a.economy - b.economy)
        .slice(0, 10);
}

const result = top10EconomicalBowlers();

const outputFile = './src/public/output/4-top10EconomicalBowlers.json';
writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
console.log(`Output has been redirected to public/output dir`);