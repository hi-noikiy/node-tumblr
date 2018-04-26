const Tumblr = require('./index');

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
})
api.userInfo().then(res => {
	console.log(res)
}).catch(err => {
	console.log(err)
	console.log(api)
})