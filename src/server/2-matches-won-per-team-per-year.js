
import { readFileSync, writeFileSync } from 'fs';
const matchesData = JSON.parse(readFileSync('./src/data/matches.json'));

// Number of matches won per team per year in IPL.
//check if year & team present or not
// if yes increase count
function matchesWonPerTeamPerYear() {
    let accumulator = {};
    for(let i =0;i<matchesData.length;i++){
        let year = matchesData[i].season;
        let winnerTeam = matchesData[i].winner;
        if(!accumulator[year]){
            accumulator[year] = {};
        }
        // console.log(accumulator);
        if(!accumulator[year][winnerTeam]){
            accumulator[year][winnerTeam] = 1;
        }else{
            accumulator[year][winnerTeam]++;
        }
    }
    return accumulator;
}


const result = matchesWonPerTeamPerYear();

const outputFile = './src/public/output/2-matchesWonPerTeamPerYear.json';
writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
console.log(`Output has been redirected to public/output dir`);