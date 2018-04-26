const API_BASE_URL = 'http://api.tumblr.com/v2';

const GET_URL = {
	userInfo: {
		url: API_BASE_URL + '/user/info'
	},
	dashBoard: {
    url: API_BASE_URL + '/user/dashboard',
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
    url: API_BASE_URL + '/user/likes',
    defaultConfig: {
      limit: 20,
      offset: 0,
      // before: Date.now(),
      // after: Date.now()
    }
  }
}

module.exports = {
  GET_URL
}