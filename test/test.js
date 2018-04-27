const Tumblr = require('../index');
const config = require('./testconfig');
const qs = require('qs');

const api = new Tumblr(config);
api.setProxy({
	host: 'localhost',
	port: '1087'
});

const testArray = ['userInfo', 'dashBoard', 'userLikes'];

const testOne = async (name, isShowData = false) => {
	try {
		const res = await api[name]();
		console.log(`${name} is success!`);
		if (isShowData) {
			console.log(res);
		}
	} catch(e) {
		console.log(`${name} is error.`);
		console.log(e);
	}
}

function testAll() {
	for(let i = 0;i < testArray.length; i++) {
		testOne(testArray[i]);
	}
}

testAll();