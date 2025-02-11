import { readFileSync, writeFileSync } from 'fs';

const deliveriesData = JSON.parse(readFileSync('/home/kishore-k/mb/js-ipl-data-project/src/data/deliveries.json', 'utf-8'));
const matchesData = JSON.parse(readFileSync('/home/kishore-k/mb/js-ipl-data-project/src/data/matches.json', 'utf-8'));

// Find the strike rate of a batsman for each season

function StrikeRate(Total_Runs_Scored, Balls_Faced) {
    if(Balls_Faced === 0){
        return 0;
    } else{
        return (Total_Runs_Scored / Balls_Faced) * 100;
    }
}

 function StrikeRatePerSeason () {
    const strikeRateEachSeason = {};

    const deliveriesByMatchId = deliveriesData.reduce((accumulator, delivery) => {
        if (!accumulator[delivery.match_id]) {
            accumulator[delivery.match_id] = [];
        }
        accumulator[delivery.match_id].push(delivery);
        return accumulator;
    }, {});

    matchesData.forEach((matchData) => {
        const { id: matchId, season } = matchData;

        const deliveries = deliveriesByMatchId[matchId];
        if (deliveries) {

            if (!strikeRateEachSeason[season]) {
                strikeRateEachSeason[season] = {};
            }

            deliveries.forEach((delivery) => {
                const {
                    batsman_runs: runs,
                    batsman,
                    wide_runs,
                    noball_runs,
                } = delivery;

        
                if (!strikeRateEachSeason[season][batsman]) {
                    strikeRateEachSeason[season][batsman] = { runs: 0, ballsFaced: 0 };
                }


                strikeRateEachSeason[season][batsman].runs += Number(runs);

          
                if (wide_runs === "0" && noball_runs === "0") {
                    strikeRateEachSeason[season][batsman].ballsFaced += 1;
                }
            });
        }
    });

    for (let season in strikeRateEachSeason) {
        for (let batsman in strikeRateEachSeason[season]) {
            const { runs, ballsFaced } = strikeRateEachSeason[season][batsman];
            strikeRateEachSeason[season][batsman].StrikeRateEach = StrikeRate(
                runs,
                ballsFaced
            );
        }
    }

    return strikeRateEachSeason;
};


const result = StrikeRatePerSeason();

const outputFile = '/home/kishore-k/mb/js-ipl-data-project/src/public/output/7-StrikeRatePerSeason.json';
writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
console.log(`Output has been redirected to public/output dir`);