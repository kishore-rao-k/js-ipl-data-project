import { readFileSync, writeFileSync } from 'fs';

const deliveriesData = JSON.parse(readFileSync('/home/kishore-k/mb/js-ipl-data-project/src/data/deliveries.json', 'utf-8'));
const matchesData = JSON.parse(readFileSync('/home/kishore-k/mb/js-ipl-data-project/src/data/matches.json', 'utf-8'));

//Find the strike rate of a batsman for each season
function StrikeRatePerSeason() {
    let accumulator = {};

    for (let i = 0; i < matchesData.length; i++) {
        let year = matchesData[i].season;
        let matchId = matchesData[i].id;
        if (!accumulator[year]) {
            accumulator[year] = [];
        }
        accumulator[year].push(matchId);
    }

    // console.log(accumulator);

    let batsmanData = {};
    for (let i = 0; i < deliveriesData.length; i++) {
        let batsman = deliveriesData[i].batsman;
        let runs = parseInt(deliveriesData[i].total_runs);
        let matchId = deliveriesData[i].match_id;
        let ball = 0;
        for (let year in accumulator) {
            if (accumulator[year].includes(matchId)) {

                if (!batsmanData[year]) {
                    batsmanData[year] = {};
                }
                if (!batsmanData[year][batsman]) {
                    batsmanData[year][batsman] = { totalRuns: 0, ball: 0 };
                }
                batsmanData[year][batsman].totalRuns += runs;
                batsmanData[year][batsman].ball += 1;
                break;
            }
        }
    }
    // console.log(batsmanData);
    let StrikeRate = {};
    for (let year in batsmanData) {
        StrikeRate[year] = [];
        for (let batsman in batsmanData[year]) {
            let totalRuns = batsmanData[year][batsman].totalRuns;
            let balls = batsmanData[year][batsman].ball;
            let strikeRate = (totalRuns / balls) * 100
            StrikeRate[year].push({
                batsman: batsman,
                strikeRate: strikeRate
            });
        }
    }
    return StrikeRate;
}



const result = StrikeRatePerSeason();

const outputFile = '/home/kishore-k/mb/js-ipl-data-project/src/public/output/7.json';
writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
console.log(`Output has been redirected to public/output dir`);