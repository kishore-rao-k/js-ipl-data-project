import { readFileSync, writeFileSync } from 'fs';

const deliveriesData = JSON.parse(readFileSync('/home/kishore-k/mb/js-ipl-data-project/src/data/deliveries.json', 'utf-8'));
const matchesData = JSON.parse(readFileSync('/home/kishore-k/mb/js-ipl-data-project/src/data/matches.json', 'utf-8'));

//Top 10 economical bowlers in the year 2015

function top10EconomicalBowlers(){


      };
      
const result = top10EconomicalBowlers();

const outputFile = '/home/kishore-k/mb/js-ipl-data-project/src/public/output/top10EconomicalBowlers.json';
writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
console.log(`Output has been redirected to public/output dir`);