import { readFileSync, writeFileSync } from 'fs';

const deliveriesData = JSON.parse(readFileSync('/home/kishore-k/mb/js-ipl-data-project/src/data/deliveries.json', 'utf-8'));
const matchesData = JSON.parse(readFileSync('/home/kishore-k/mb/js-ipl-data-project/src/data/matches.json', 'utf-8'));

//8.Find the highest number of times one player has been dismissed by another player
function highestOfOnePlayerDismissedByAnotherPlaye(){
    
}
const result = highestOfOnePlayerDismissedByAnotherPlaye();

const outputFile = '/home/kishore-k/mb/js-ipl-data-project/src/public/output/highestOfOnePlayerDismissedByAnotherPlaye.json';
writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
console.log(`Output has been redirected to public/output dir`);
