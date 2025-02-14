
import { readFileSync, writeFileSync } from 'fs';

const deliveriesData = JSON.parse(readFileSync('./src/data/deliveries.json'));
const matchesData = JSON.parse(readFileSync('./src/data/matches.json'));

// Extra runs conceded per team in the year 2016
// filter 2016 and get matchId
// count extraruns per team
function extraRunsConcededPerTeam() {
    let accumulator = [];
    for (let i = 0; i < matchesData.length; i++) {
        let year = matchesData[i].season;
        let matchId = matchesData[i].id;
        if (year === "2016") {
            accumulator.push(matchId);
        }
    }
    let teamRunAcc = {};
    for (let i = 0; i < deliveriesData.length; i++) {
        let matchId = deliveriesData[i].match_id;
        let team = deliveriesData[i].bowling_team;
        let extraRuns = parseInt(deliveriesData[i].extra_runs);
        if (accumulator.includes(matchId)) {
            if (!teamRunAcc[team]) {
                teamRunAcc[team] = extraRuns;
            } else {
                teamRunAcc[team] += extraRuns;
            }

        }
    }
    return teamRunAcc;
}


const result = extraRunsConcededPerTeam();

const outputFile = './src/public/output/3-extraRunsConcededPerTeam.json';
writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
console.log(`Output has been redirected to public/output dir`);
