const Tumblr = require('./index');
const qs = require('qs');

const client = {
	consumer_key: 'wsGzCwE7eyxoMa9hQAWcy010feXRRw5r872nyoGhmBevIOrGgX',
  consumer_secret: '2zCZ2DeRnhwli6XjAEPDmzf1a29K7M6qu5BTYtAE6csGaAU1t5',
  token: 'TmN6v2lINldt2yrhcrGmrPKdmqKK7jMApw2W5MSYznlTjSOAfE',
  token_secret: '2pSyG8QWlN1bEMaUkVdCC8g60NB1oCqf2CZV3CGdbBHqMlq7M0'
}

const api = new Tumblr(client);
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