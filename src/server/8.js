import { readFileSync, writeFileSync } from 'fs';

const deliveriesData = JSON.parse(readFileSync('./src/data/deliveries.json'));

//8.Find the highest number of times one player has been dismissed by another player
function highestOfOnePlayerDismissedByAnotherPlayer() {
    let accumulator = {};
    for (let i = 0; i < deliveriesData.length; i++) {
        let batsman = deliveriesData[i].batsman;
        let bowler = deliveriesData[i].bowler;

        if (deliveriesData[i].player_dismissed === batsman) {

            let key = `${batsman}_${bowler}`;

            if (accumulator[key]) {
                accumulator[key].dismissalCount++;
            } else {
                accumulator[key] = {
                    batsman: batsman,
                    bowler: bowler,
                    dismissalCount: 1
                };
            }
        }
    }

    return Object.values(accumulator)
        .sort((a, b) => b.dismissalCount - a.dismissalCount)
        .slice(0, 1);
}


const result = highestOfOnePlayerDismissedByAnotherPlayer();

const outputFile = './src/public/output/8.json';
writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
console.log(`Output has been redirected to public/output dir`);
