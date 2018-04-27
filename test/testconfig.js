const fs = require('fs');
const path = require('path');
let defaultConfig = {}

const isExist = fs.existsSync(path.join(__dirname, './token.js'));
if (isExist) {
	defaultConfig = require('./token.js');
} else {
	console.warn('You must provide the token.js file, which contains the tokens that this library needs to run.');
}

module.exports = defaultConfig;