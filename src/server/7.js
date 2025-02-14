import { readFileSync, writeFileSync } from 'fs';

const deliveriesData = JSON.parse(readFileSync('./src/data/deliveries.json'));
const matchesData = JSON.parse(readFileSync('./src/data/matches.json'));

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
        let runs = parseInt(deliveriesData[i].batsman_runs);
        let matchId = deliveriesData[i].match_id;
        for (let year in accumulator) {
            if (accumulator[year].includes(matchId)) {

                if (!batsmanData[year]) {
                    batsmanData[year] = {};
                }
                if (!batsmanData[year][batsman]) {
                    batsmanData[year][batsman] = { totalRuns: 0, ball: 0 };
                }
                batsmanData[year][batsman].totalRuns += runs;
                if(deliveriesData[i].wide_runs === "0"){
                    batsmanData[year][batsman].ball += 1;
                    }
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
            let strikeRate = parseFloat(((totalRuns / balls) * 100).toFixed(2))
            StrikeRate[year].push({
                batsman: batsman,
                strikeRate: strikeRate
            });
        }
    }
    return StrikeRate;
}



const result = StrikeRatePerSeason();

const outputFile = './src/public/output/7.json';
writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
console.log(`Output has been redirected to public/output dir`);