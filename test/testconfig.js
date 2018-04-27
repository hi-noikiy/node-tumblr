const fs = require('fs');
const path = require('path');
let defaultConfig = {}

const isExist = fs.existsSync(path.join(__dirname, './token.js'));
if (isExist) {
	defaultConfig = require('./token.js');
}

module.exports = defaultConfig;