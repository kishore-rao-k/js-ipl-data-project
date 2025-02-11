import { readFileSync, writeFileSync } from 'fs';

const deliveriesData = JSON.parse(readFileSync('/home/kishore-k/mb/js-ipl-data-project/src/data/deliveries.json', 'utf-8'));
const matchesData = JSON.parse(readFileSync('/home/kishore-k/mb/js-ipl-data-project/src/data/matches.json', 'utf-8'));

//Top 10 economical bowlers in the year 2015

function top10EconomicalBowlers() {
    const matches2015 = matchesData.reduce((accumulator, match) => {
        if (match.season === "2015") {
            accumulator[match.id] = match;
        }
        return accumulator;
    }, {});

    const bowlerStats = deliveriesData.reduce((stats, delivery) => {

        if (matches2015[delivery.match_id]) {
            const bowler = delivery.bowler;
            const runsConceded = parseInt(delivery.total_runs);
            const over = parseInt(delivery.over);
            const ball = parseInt(delivery.ball);
            let extraBalls;
            if (ball > 6) {
                extraBalls = ball - 6; 
            } else {
                extraBalls = 0; 
            }

            if (!stats[bowler]) {
                stats[bowler] = { runsConceded: 0, oversBowled: new Set(), extraBowls: 0 };
            }
            stats[bowler].runsConceded += runsConceded;
            stats[bowler].oversBowled.add(over);
            stats[bowler].extraBowls += extraBalls;
        }
        return stats;
    }, {});

    const economyRates = Object.entries(bowlerStats).map(([bowler, { runsConceded, oversBowled, extraBowls }]) => {
        const totalBalls = oversBowled.size * 6 + extraBowls;
        const totalOvers = totalBalls / 6;
        const economyRate = runsConceded / totalOvers;
        return { bowler, economyRate };
    });
    return economyRates
        .sort((a, b) => a.economyRate - b.economyRate)
        .slice(0, 10);
};

const result = top10EconomicalBowlers();

const outputFile = '/home/kishore-k/mb/js-ipl-data-project/src/public/output/4-top10EconomicalBowlers.json';
writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
console.log(`Output has been redirected to public/output dir`);