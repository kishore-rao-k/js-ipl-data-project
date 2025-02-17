import { readFileSync, writeFileSync } from "fs";

const deliveriesData = JSON.parse(readFileSync("./src/data/deliveries.json"));
const matchesData = JSON.parse(readFileSync("./src/data/matches.json"));

//Find the strike rate of a batsman for each season
function getStrikeRatePerSeason() {
  let seasonToMatchIds = matchesData.reduce((seasonToMatchIds, match) => {
    const year = match.season;
    const matchId = match.id;
    if (!seasonToMatchIds[year]) {
      seasonToMatchIds[year] = [];
    }
    seasonToMatchIds[year].push(matchId);
    return seasonToMatchIds;
  }, {});

  let batsmanStatsBySeason = deliveriesData.reduce(
    (batsmanStatsBySeason, delivery) => {
      const matchId = delivery.match_id;
      const batsman = delivery.batsman;
      const runs = parseInt(delivery.batsman_runs);
      Object.keys(seasonToMatchIds).forEach((year) => {
        if (seasonToMatchIds[year].includes(matchId)) {
          if (!batsmanStatsBySeason[year]) {
            batsmanStatsBySeason[year] = {};
          }
          if (!batsmanStatsBySeason[year][batsman]) {
            batsmanStatsBySeason[year][batsman] = { totalRuns: 0, balls: 0 };
          }
          batsmanStatsBySeason[year][batsman].totalRuns += runs;
          if (delivery.wide_runs === "0") {
            batsmanStatsBySeason[year][batsman].balls += 1;
          }
        }
      });
      return batsmanStatsBySeason;
    },
    {}
  );

  let strikeRateBySeason = {};
  Object.keys(batsmanStatsBySeason).forEach((year) => {
    strikeRateBySeason[year] = [];
    Object.keys(batsmanStatsBySeason[year]).forEach((batsman) => {
      let totalRuns = batsmanStatsBySeason[year][batsman].totalRuns;
      let totalBalls = batsmanStatsBySeason[year][batsman].balls;
      let strikeRate = parseFloat((totalRuns / totalBalls) * 100).toFixed(2);
      strikeRateBySeason[year].push({
        batsman: batsman,
        strikeRate: strikeRate,
      });
    });
  });

  return strikeRateBySeason;
}

const result = getStrikeRatePerSeason();

const outputFile = "./src/public/output/7-getStrikeRatePerSeason.json";
writeFileSync(outputFile, JSON.stringify(result, null, 2), "utf-8");
console.log(`Output has been redirected to public/output dir`);
