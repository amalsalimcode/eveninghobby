const fs = require('fs');
const csvParser = require('csv-parser');

class CSVParser {
	constructor(filePath) {
		this.filePath = filePath;
		this.results = [];
	}

	parse() {
		fs.createReadStream(this.filePath)
			.pipe(csvParser())
			.on('data', (data) => {
				// Process each row of data
				this.results.push(data);
			})
			.on('end', () => {
				// All rows have been processed
				console.log(this.results);
				console.log('CSV parsing completed.');
			})
			.on('error', (error) => {
				console.error('Error parsing CSV:', error);
			});
	}
}

// Example usage:
const filePath = 'example.csv';
const parser = new CSVParser(filePath);
parser.parse();
