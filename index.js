const got = require('got');
const Oauth = require('oauth-1.0a');
const crypto = require('crypto');
const qs = require('qs');
const tunnel = require('tunnel');
const { GET_URL } = require('./config/url');

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
	 * @param {string} name 
	 * @param {object} querys
	 */
	getRequest(name, querys = {}) {
		const querysValue = qs.stringify(querys);
		let url = GET_URL[name].url;

		if (querysValue !== '') {
			url = `${url}?${querysValue}`;
		}

		let headerToken = this.oauth.toHeader(this.oauth.authorize({url, method: 'GET'}, this.token));
		let	options = {
			headers: headerToken,
			json: true,
			timeout: 10000
		};

		if (this.proxy) {
			options = Object.assign({}, options, {
				agent: this.proxy
			});
		}

		return got(url, options).then(res => {
			if (res.body && res.body.response) {
				return res.body.response;
			}

			return res.meta;
		})
	}

	/**
	 * get user info
	 */
	userInfo() {
		return this.getRequest('userInfo');
	}

	/**
	 * get dashboard
	 */
	dashBoard(config = {}) {
		const querys = Object.assign({}, GET_URL.dashBoard.defaultConfig, config);
		return this.getRequest('dashBoard', querys);
	}

	/**
	 * get user like
	 */
	userLikes(config = {}) {
		const querys = Object.assign({}, GET_URL.userLikes.defaultConfig, config);
		
		if (
			(querys.limit && querys.before) ||
			(querys.limit && querys.after) ||
			(querys.before && querys.after)
		) {
			console.warn(`1.You can only provide either before, after, or offset. If you provide more than one of these options together you will get an error.
			2.You can still use limit with any of those three options to limit your result set.
			3.When using the offset parameter the maximum limit on the offset is 1000. If you would like to get more results than that use either before or after.`);
			return;
		}

		return this.getRequest('userLikes', querys);
	}
}

module.exports = Tumblr;