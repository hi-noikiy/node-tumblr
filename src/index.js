// @flow
const got = require('got');
const Oauth = require('oauth-1.0a');
const crypto = require('crypto');
const qs = require('qs');
const tunnel = require('tunnel');
const { GET_URL } = require('../config/url');

type TumblrProps = {
	consumer_key: string,
	consumer_secret: string,
	token: string,
	token_secret: string
}

type TumblrToken = {
	key: string,
	secret: string
}

type TypeConfig = {
	limit: number,
	offset: number,
	type?: string, //'text, photo, quote, link, chat, audio, video, answer',
	since_id?: number,
	reblog_info?: boolean,
	notes_info?: boolean,
	before?: number,
	after?: number
}

class Tumblr {
	consumer: TumblrToken;
	token: TumblrToken;
	oauth: ?Oauth;
	proxy: ?null;

	constructor(token: TumblrProps) {
		this.consumer = {
			key: token.consumer_key,
			secret: token.consumer_secret
		}
		this.token = {
			key: token.token,
			secret: token.token_secret
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
	setProxy(proxy: {
		host: string,
		port: string
	}) {
		this.proxy = tunnel.httpOverHttp({
			proxy: {
				host: proxy.host,
				port: proxy.port
			}
		});
	}

	/**
	 * Assemble the data execution request
	 * @param {string} name 
	 * @param {object} querys
	 */
	getRequest(name: string, querys?: TypeConfig) {
		const querysValue = qs.stringify(querys);
		let url = GET_URL[name].url;

		if (querysValue !== '') {
			url = `${url}?${querysValue}`;
		}
		if (querys && (querys.limit < 1 || querys.limit > 20)) {
			console.warn('The number of results to return: 1–20, inclusive');
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
	 * Use this method to retrieve the user's account information that matches the OAuth credentials submitted with the request.
	 */
	userInfo() {
		return this.getRequest('userInfo');
	}

	/**
	 * Use this method to retrieve the dashboard that matches the OAuth credentials submitted with the request.
	 * @param {object} GET_URL.dashBoard.defaultConfig
	 */
	dashBoard(config: TypeConfig) { 
		const querys = Object.assign({}, GET_URL.dashBoard.defaultConfig, config); return this.getRequest('dashBoard', querys);
	}

	/**
	 * Use this method to retrieve the liked posts that match the OAuth credentials submitted with the request.
	 * @param {object} GET_URL.userLikes.defaultConfig 
	 */
	userLikes(config: TypeConfig) {
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

	/**
	 * Use this method to retrieve the blogs followed by the user whose OAuth credentials are submitted with the request.
	 * @param {object} config 
	 */
	userFollowing(config: TypeConfig) {
		const querys = Object.assign({}, GET_URL.dashBoard.defaultConfig, config);

		return this.getRequest('userFollowing', querys);
	}
}

module.exports = Tumblr;