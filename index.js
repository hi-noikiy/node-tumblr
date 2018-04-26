const got = require('got');
const Oauth = require('oauth-1.0a');
const crypto = require('crypto');
const qs = require('qs');
const tunnel = require('tunnel');

const API_BASE_URL = 'http://api.tumblr.com/v2';
const GET_URL = {
	userInfo: {
		url: API_BASE_URL + '/user/info'
	}
}

class Tumblr {
	constructor({ consumer_key, consumer_secret, token, token_secret }) {
		this.consumer = {
			key: consumer_key,
			secret: consumer_secret
		}
		this.token = {
			key: token,
			secret: token_secret
		}

		this.initOauth();
	}

	/**
	 * init token
	 */
	initOauth() {
		this.oauth = Oauth({
			consumer: this.consumer,
			signature_method: 'HMAC-SHA1',
			hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
		});
	}

	/**
	 * setting proxy
	 * @param {host port} proxy 
	 */
	setProxy({ host, port }) {
		this.proxy = tunnel.httpOverHttp({
			proxy: {
				host,
				port
			}
		});
	}

	/**
	 * Assemble the data execution request
	 * @param {string} url 
	 * @param {object} options 
	 */
	request(url, options) {
		if (this.proxy) {
			options = Object.assign({}, options, {
				agent: this.proxy
			})
		}
		return got(url, options);
	}

	/**
	 * get user info
	 */
	userInfo() {
		const url = GET_URL.userInfo.url,
			headerToken = this.oauth.toHeader(this.oauth.authorize({url, method: 'GET'}, this.token));

		return this.request(url, {
			headers: headerToken,
			json: true,
			timeout: 10000
		});
	}
}

module.exports = Tumblr;