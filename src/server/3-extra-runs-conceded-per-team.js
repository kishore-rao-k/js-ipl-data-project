
import { readFileSync, writeFileSync } from 'fs';

const deliveriesData = JSON.parse(readFileSync('/home/kishore-k/mb/js-ipl-data-project/src/data/deliveries.json', 'utf-8'));
const matchesData = JSON.parse(readFileSync('/home/kishore-k/mb/js-ipl-data-project/src/data/matches.json', 'utf-8'));

// Extra runs conceded per team in the year 2016
function extraRunsConcededPerTeam() {
    const matches2016 = matchesData.filter(match => match.season === "2016");

    const matchDeliveriesMap = deliveriesData.reduce((acc, delivery) => {
        const matchId = delivery.match_id;
        if (!acc[matchId]) {
            acc[matchId] = [];
        }
        acc[matchId].push(delivery);
        return acc;
    }, {});

    return matches2016.reduce((accumulator, match) => {
        const matchId = match.id;
        const deliveries = matchDeliveriesMap[matchId];

        deliveries.reduce((acc, delivery) => {
            const extraRuns = parseInt(delivery.extra_runs);
            const bowlingTeam = delivery.bowling_team;

            if (!acc[bowlingTeam]) {
                acc[bowlingTeam] = 0;
            }
            acc[bowlingTeam] += extraRuns;

            return acc;
        }, accumulator); 

        return accumulator;
    }, {});
}


const result = extraRunsConcededPerTeam();

const outputFile = '/home/kishore-k/mb/js-ipl-data-project/src/public/output/3-extraRunsConcededPerTeam.json';
writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
console.log(`Output has been redirected to public/output dir`);
