import { readFileSync, writeFileSync } from 'fs';

const deliveriesData = JSON.parse(readFileSync('/home/kishore-k/mb/js-ipl-data-project/src/data/deliveries.json', 'utf-8'));
const matchesData = JSON.parse(readFileSync('/home/kishore-k/mb/js-ipl-data-project/src/data/matches.json', 'utf-8'));

//Top 10 economical bowlers in the year 2015

function top10EconomicalBowlers() {
    
    let matches2015Set = new Set();
    for (let i = 0; i < matchesData.length; i++) {
        if (matchesData[i].season === "2015") {
            matches2015Set.add(matchesData[i].id);
        }
    }

    let bowlerEconomy = {};
    for (let i = 0; i < deliveriesData.length; i++) {
        let delivery = deliveriesData[i];

        if (matches2015Set.has(delivery.match_id)) {
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
    }

    let economyRates = [];
    for (let bowler in bowlerEconomy) {
            let stats = bowlerEconomy[bowler];
            let economy = (Math.round((stats.runs / stats.balls) * 6 * 100) / 100);
            economyRates.push({ bowler, economy });
    }

    economyRates.sort((a, b) => a.economy - b.economy);
    return economyRates.slice(0, 10);
}

const result = top10EconomicalBowlers();

const outputFile = '/home/kishore-k/mb/js-ipl-data-project/src/public/output/4.json';
writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
console.log(`Output has been redirected to public/output dir`);