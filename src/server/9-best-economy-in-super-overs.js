import { readFileSync, writeFileSync } from 'fs';

const deliveriesData = JSON.parse(readFileSync('./src/data/deliveries.json'));

//Find the bowler with the best economy in super overs
function bestEconomyInSuperOvers() {
    let bowlerEconomy = {};
    for (let i = 0; i < deliveriesData.length; i++) {
        let delivery = deliveriesData[i];
        let isSuperOver = delivery.is_super_over;

        if (isSuperOver === "0") {
            continue;
        }


        let bowler = delivery.bowler;
        let excludedRuns = (parseInt(delivery.bye_runs) + parseInt(delivery.legbye_runs) + parseInt(delivery.penalty_runs));
        let totalRuns = parseInt(delivery.total_runs) - excludedRuns;


        if (!bowlerEconomy[bowler]) {
            bowlerEconomy[bowler] = { balls: 0, runs: 0 };
        }


        if (delivery.wide_runs === "0" && delivery.noball_runs === "0") {
            bowlerEconomy[bowler].balls += 1;
        }


        bowlerEconomy[bowler].runs += totalRuns;
    }


    let economyRates = [];
    for (let bowler in bowlerEconomy) {
        let stats = bowlerEconomy[bowler];
        let economy = (Math.round((stats.runs / stats.balls) * 6 * 100) / 100);
        economyRates.push({ bowler, economy });
    }

    economyRates.sort((a, b) => a.economy - b.economy);
    return economyRates.slice(0, 1);
}
const result = bestEconomyInSuperOvers();

const outputFile = './src/public/output/9-bestEconomyInSuperOvers.json';
writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
console.log(`Output has been redirected to public/output dir`);