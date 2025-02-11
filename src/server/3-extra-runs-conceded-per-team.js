
import { readFileSync, writeFileSync } from 'fs';

const deliveriesData = JSON.parse(readFileSync('/home/kishore-k/mb/js-ipl-data-project/src/data/deliveries.json', 'utf-8'));
const matchesData = JSON.parse(readFileSync('/home/kishore-k/mb/js-ipl-data-project/src/data/matches.json', 'utf-8'));

// Extra runs conceded per team in the year 2016

function extraRunsConcededPerTeam() {
    let accumulator = {};
    const matches2016 = matchesData.filter((match) => match.season === "2016");

    let deliveriesMap = deliveriesData.reduce((map, delivery) => {
        let matchId = delivery.match_id;
        if (!map[matchId]) {
            map[matchId] = [];
        }
        map[matchId].push(delivery);
        return map;
    }, {});

    matches2016.forEach((match) => {
        let matchId = match.id;
        let deliveries = deliveriesMap[matchId];

        deliveries.forEach((delivery) => {
            let extraRuns = Number(delivery.extra_runs);
            let bowlingTeam = delivery.bowling_team;

            if (!accumulator[bowlingTeam]) {
                accumulator[bowlingTeam] = 0;
            }
            accumulator[bowlingTeam] += extraRuns;
        });
    });

    return accumulator;
}


const result = extraRunsConcededPerTeam();

const outputFile = '/home/kishore-k/mb/js-ipl-data-project/src/public/output/3-extraRunsConcededPerTeam.json';
writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
console.log(`Output has been redirected to public/output dir`);
