
import { readFileSync, writeFileSync } from 'fs';

const deliveriesData = JSON.parse(readFileSync('/home/kishore-k/mb/js-ipl-data-project/src/data/deliveries.json', 'utf-8'));
const matchesData = JSON.parse(readFileSync('/home/kishore-k/mb/js-ipl-data-project/src/data/matches.json', 'utf-8'));

// Extra runs conceded per team in the year 2016

function extraRunsConcededPerTeam() {
    let matches2016 = [];
    for (let i = 0; i < matchesData.length; i++) {
        if (matchesData[i].season === "2016") {
            matches2016.push(matchesData[i]);
        }
    }

    let matchDeliveriesMap = {};
    for (let i = 0; i < deliveriesData.length; i++) {
        let matchId = deliveriesData[i].match_id;
        if (!matchDeliveriesMap[matchId]) {
            matchDeliveriesMap[matchId] = [];
        }
        matchDeliveriesMap[matchId].push(deliveriesData[i]);
    }

    let accumulator = {};
    for (let i = 0; i < matches2016.length; i++) {
        let match = matches2016[i];
        const matchId = match.id;
        const deliveries = matchDeliveriesMap[matchId];

        for (let j = 0; j < deliveries.length; j++) {
            const delivery = deliveries[j];
            const extraRuns = parseInt(delivery.extra_runs);
            const bowlingTeam = delivery.bowling_team;

            if (!accumulator[bowlingTeam]) {
                accumulator[bowlingTeam] = 0;
            }
            accumulator[bowlingTeam] += extraRuns;
        }
    }

    return accumulator;
}


const result = extraRunsConcededPerTeam();

const outputFile = '/home/kishore-k/mb/js-ipl-data-project/src/public/output/3.json';
writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
console.log(`Output has been redirected to public/output dir`);
