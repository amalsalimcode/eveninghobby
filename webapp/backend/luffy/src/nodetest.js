
/* 
   Use express to setup node server, because it provides routing and middlewares
   */

/*------------------------------------*/

function fetchData() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			// async call to external resource
			// calling resolve, will call the then
			resolve('Data received');
		}, 1000);
	});
}

fetchData()
	.then((data) => {
		console.log(data); // Output: Data received
	})
	.catch((error) => {
		console.error(error);
	});

const emitter = require('events');
const { Db } = require('mongodb');

emitter.on('processUser', (arg) => { console.log("I can write ", arg, "to db here") })

emitter.emit('processUser', ["data1", "data2"])


const fs = require('fs');
const readline = require('readline');

// Create a readline interface
const rl = readline.createInterface({
	input: fs.createReadStream('example.txt', { encoding: 'utf8' }),
	crlfDelay: Infinity // Delay for recognizing CRLF as a single newline
});

// Listen for the 'line' event to process each complete line
rl.on('line', (line) => {
	console.log('Line:', line);
});

// Handle errors
rl.on('error', (err) => {
	console.error('Error reading file:', err);
});
