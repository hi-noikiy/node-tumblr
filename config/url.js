const API_BASE_URL = 'http://api.tumblr.com/v2';

function wrapUrl(api) {
	return API_BASE_URL + api;
}

const GET_URL = {
	userInfo: {
		url: wrapUrl('/user/info')
	},
	dashBoard: {
    url: wrapUrl('/user/dashboard'),
    defaultConfig: {
      limit: 20,
			offset: 0,
			// type: 'text, photo, quote, link, chat, audio, video, answer',
			since_id: 0,
			reblog_info: false,
			notes_info: true
    }
  },
  userLikes: {
    url: wrapUrl('/user/likes'),
    defaultConfig: {
      limit: 20,
      offset: 0,
      // before: Date.now(),
      // after: Date.now()
    }
	},
	userFollowing: {
		url: wrapUrl('/user/following'),
		defaultConfig: {
			limit: 20,
			offset: 0
		}
	}
}

module.exports = {
  GET_URL
}