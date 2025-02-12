import { readFileSync, writeFileSync } from 'fs';

const deliveriesData = JSON.parse(readFileSync('/home/kishore-k/mb/js-ipl-data-project/src/data/deliveries.json', 'utf-8'));
const matchesData = JSON.parse(readFileSync('/home/kishore-k/mb/js-ipl-data-project/src/data/matches.json', 'utf-8'));

//Find the bowler with the best economy in super overs
function bestEconomyInSuperOvers() {
    let bowlerEconomy = deliveriesData.reduce((acc, delivery) => {
        let isSuperOver = delivery.is_super_over;
        
        if (isSuperOver === "0") {
            return acc;
        }

        let bowler = delivery.bowler;
        let countlessRuns = (parseInt(delivery.bye_runs) + parseInt(delivery.legbye_runs) + parseInt(delivery.penalty_runs));
        let totalRuns = parseInt(delivery.total_runs) - countlessRuns;
        if (!acc[bowler]) {
            acc[bowler] = { balls: 0, runs: 0 };
        }

        if (delivery.wide_runs === "0" && delivery.noball_runs === "0") {
            acc[bowler].balls += 1;
        }


        acc[bowler].runs += totalRuns;

        return acc; 
    }, {});

    return Object.entries(bowlerEconomy)
        .map(([bowler, stats]) => ({
            bowler,
            economy: (Math.round((stats.runs / stats.balls) * 6 * 100) / 100).toFixed(2)
        }))
        .sort((a, b) => a.economy - b.economy) 
        .slice(0, 1);  
}

const result = bestEconomyInSuperOvers();

const outputFile = '/home/kishore-k/mb/js-ipl-data-project/src/public/output/9-bestEconomyInSuperOvers.json';
writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
console.log(`Output has been redirected to public/output dir`);