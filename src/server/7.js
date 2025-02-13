import { readFileSync, writeFileSync } from 'fs';

const deliveriesData = JSON.parse(readFileSync('/home/kishore-k/mb/js-ipl-data-project/src/data/deliveries.json', 'utf-8'));
const matchesData = JSON.parse(readFileSync('/home/kishore-k/mb/js-ipl-data-project/src/data/matches.json', 'utf-8'));

function StrikeRatePerSeason() {
    const strikeRateEachSeason = {};
    const deliveriesByMatchId = {};

    for (let i = 0; i < deliveriesData.length; i++) {
        const delivery = deliveriesData[i];
        const matchId = delivery.match_id;

        if (!deliveriesByMatchId[matchId]) {
            deliveriesByMatchId[matchId] = [];
        }
        deliveriesByMatchId[matchId].push(delivery);
    }
    // console.log(deliveriesByMatchId);
    for (let i = 0; i < matchesData.length; i++) {
        const matchData = matchesData[i];
        const matchId = matchData.id;
        const season = matchData.season;

        const deliveries = deliveriesByMatchId[matchId];
        if (deliveries) {
            if (!strikeRateEachSeason[season]) {
                strikeRateEachSeason[season] = {};
            }

            for (let j = 0; j < deliveries.length; j++) {
                const delivery = deliveries[j];
                const runs = delivery.batsman_runs;
                const batsman = delivery.batsman;
                const wide_runs = delivery.wide_runs;
                const noball_runs = delivery.noball_runs;

                if (!strikeRateEachSeason[season][batsman]) {
                    strikeRateEachSeason[season][batsman] = { runs: 0, ballsFaced: 0 };
                }

                strikeRateEachSeason[season][batsman].runs += parseInt(runs);

                if (wide_runs === "0" && noball_runs === "0") {
                    strikeRateEachSeason[season][batsman].ballsFaced += 1;
                }
            }
        }
    }


    for (let season in strikeRateEachSeason) {
        for (let batsman in strikeRateEachSeason[season]) {
            const batsmanStats = strikeRateEachSeason[season][batsman];
            const runs = batsmanStats.runs;
            const ballsFaced = batsmanStats.ballsFaced;
            batsmanStats.StrikeRateEach = (runs / ballsFaced) * 100;
        }
    }

    return strikeRateEachSeason;
}



const result = StrikeRatePerSeason();

const outputFile = '/home/kishore-k/mb/js-ipl-data-project/src/public/output/7.json';
writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
console.log(`Output has been redirected to public/output dir`);