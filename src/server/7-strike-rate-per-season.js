import { readFileSync, writeFileSync } from 'fs';

const deliveriesData = JSON.parse(readFileSync('./src/data/deliveries.json'));
const matchesData = JSON.parse(readFileSync('./src/data/matches.json'));


//Find the strike rate of a batsman for each season
function StrikeRatePerSeason() {
    let acc = matchesData.reduce((accumulator, match) => {
        let year = match.season;
        let matchId = match.id;
        if (!accumulator[year]) {
            accumulator[year] = [];
        }
        accumulator[year].push(matchId);
        return accumulator;
    }, {});
    // console.log(acc);

    let batsmanDataAcc = deliveriesData.reduce((batsmanData, deliveries) => {

        let batsman = deliveries.batsman;
        let runs = parseInt(deliveries.batsman_runs);
        let matchId = deliveries.match_id;
        Object.entries(acc).forEach(([year, matches]) => {
            if (matches.includes(matchId)) {

                if (!batsmanData[year]) {
                    batsmanData[year] = {};
                }
                if (!batsmanData[year][batsman]) {
                    batsmanData[year][batsman] = { totalRuns: 0, ball: 0 };
                }
                batsmanData[year][batsman].totalRuns += runs;
                if (deliveries.wide_runs === "0") {
                    batsmanData[year][batsman].ball += 1;
                }

            }
        });
        return batsmanData;
    }, {});

    // console.log(batsmanDataAcc);
    let StrikeRate = Object.keys(batsmanDataAcc).reduce((acc, year) => {
        acc[year] = Object.keys(batsmanDataAcc[year]).map(batsman => {
            let totalRuns = batsmanDataAcc[year][batsman].totalRuns;
            let balls = batsmanDataAcc[year][batsman].ball;
            let strikeRate = parseFloat(((totalRuns / balls) * 100).toFixed(2));
    
            return {
                batsman: batsman,
                strikeRate: strikeRate
            };
        });
        return acc;
    }, {});
    
    return StrikeRate;
 
}



const result = StrikeRatePerSeason();

const outputFile = './src/public/output/7-StrikeRatePerSeason.json';
writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
console.log(`Output has been redirected to public/output dir`);