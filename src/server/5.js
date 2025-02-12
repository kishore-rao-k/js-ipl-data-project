import { readFileSync, writeFileSync } from 'fs';

const matchesData = JSON.parse(readFileSync('/home/kishore-k/mb/js-ipl-data-project/src/data/matches.json', 'utf-8'));

//Find the number of times each team won the toss and also won the match
function wonTossAndMatch() {
    let obj = {};
    for(let i =0;i<matchesData.length;i++){
        if(matchesData[i].toss_winner === matchesData[i].winner){
            if(!obj[matchesData[i].winner]){
                obj[matchesData[i].winner] = 1;
            }else{
            obj[matchesData[i].winner]++;
            }
        }
    }
    return obj;
}


const result = wonTossAndMatch();

const outputFile = '/home/kishore-k/mb/js-ipl-data-project/src/public/output/5.json';
writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
console.log(`Output has been redirected to public/output dir`);