const Tumblr = require('../dist/index');
const config = require('./testconfig');
const qs = require('qs');

const api = new Tumblr(config);
api.setProxy({
	host: 'localhost',
	port: '1087'
});

const testGetArray = ['userInfo', 'dashBoard', 'userLikes', 'userFollowing'];

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

function testGetAll() {
	for(let i = 0;i < testGetArray.length; i++) {
		testOne(testGetArray[i]);
	}
}

testGetAll();