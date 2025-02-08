const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// File paths for matches and deliveries
const FilePathForMatches = path.join(__dirname, '../data/matches.csv');
const FilePathForDeliveries = path.join(__dirname, '../data/deliveries.csv');

// Output JSON file paths
const jsonFilePathForMatches = path.join(__dirname, '../data/matches.json');
const jsonFilePathForDeliveries = path.join(__dirname, '../data/deliveries.json');

// Function to convert CSV to JSON
const convertCsvToJson = (csvFilePath, jsonFilePath) => {
    const results = [];

    fs.createReadStream(csvFilePath)
        .pipe(csv()) // Pipe CSV data through csv-parser
        .on('data', (row) => {
            results.push(row); // Push each row to the results array
        })
        .on('end', () => {
            // Write the JSON data to an output file
            fs.writeFileSync(jsonFilePath, JSON.stringify(results, null, 2));
            console.log(`CSV to JSON conversion completed for: ${jsonFilePath}`);
        });
};

// Convert both CSV files to JSON
convertCsvToJson(FilePathForMatches, jsonFilePathForMatches);
convertCsvToJson(FilePathForDeliveries, jsonFilePathForDeliveries);
