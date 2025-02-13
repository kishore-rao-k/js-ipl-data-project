import { readFileSync, writeFileSync } from 'fs';

const deliveriesData = JSON.parse(readFileSync('/home/kishore-k/mb/js-ipl-data-project/src/data/deliveries.json', 'utf-8'));
const matchesData = JSON.parse(readFileSync('/home/kishore-k/mb/js-ipl-data-project/src/data/matches.json', 'utf-8'));

//Top 10 economical bowlers in the year 2015
function top10EconomicalBowlers() {

    let matches2015Set = matchesData.reduce((accumulator, curr) => {
        if (curr.season === "2015") {
            accumulator.add(curr.id);
        }
        return accumulator;
    }, new Set());

    let bowlerEconomy = deliveriesData.filter((delivery) => matches2015Set.has(delivery.match_id))
        .reduce((acc, currDelivery) => {
            let bowler = currDelivery.bowler;
            let excludedRuns = (parseInt(currDelivery.bye_runs) + parseInt(currDelivery.legbye_runs) + parseInt(currDelivery.penalty_runs));
            let totalRuns = parseInt(currDelivery.total_runs) - excludedRuns;

            if (!acc[bowler]) {
                acc[bowler] = { balls: 0, runs: 0 };
            }

            if (currDelivery.wide_runs === "0" && currDelivery.noball_runs === "0") {
                acc[bowler].balls += 1;
            }

            acc[bowler].runs += totalRuns;

            return acc;
        }, {});

    return Object.entries(bowlerEconomy)
        .map(([bowler, stats]) => ({
            bowler,
            economy:  (Math.round((stats.runs / stats.balls) * 6 * 100) / 100)
        }))
        .sort((a, b) => a.economy - b.economy)
        .slice(0, 10); 
}

const result = top10EconomicalBowlers();

const outputFile = '/home/kishore-k/mb/js-ipl-data-project/src/public/output/4-top10EconomicalBowlers.json';
writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
console.log(`Output has been redirected to public/output dir`);