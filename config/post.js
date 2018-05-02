const API_BASE_URL = 'http://api.tumblr.com/v2';

function wrapUrl(api) {
	return API_BASE_URL + api;
}

function wrapConfig(config) {
  return Object.assign({}, createPost.defaultConfig, config);
}

const createPost = {
  url: ({blogIdentifier}) => wrapUrl(`/blog/${blogIdentifier}/post`),
  defaultConfig: {
    type： 'text',
    state: 'published', // published, draft, queue, private
    // rags: [],
    // tweet: '',
    // date: '', // new Date()
    format: 'html', // html， markdown
    // slug： '',
    native_inline_images: false
  }
}

module.exports = {
	createTextPost: {
    url: createPost.url,
    defaultConfig: wrapConfig({
      title: '',
      body: '', // require
    })
  },
  createPhotoPost: {
    url: createPost.url,
    defaultConfig: wrapConfig({
      // caption: '',
      // link: '',
      // source: '', // require
      // data: [], // require
      // data64: '', // require
    })
  },
  createQuotePost: {
    url: createPost.url,
    defaultConfig: wrapConfig({
      quote: '', // require
      // source: '',
    })
  },
  createLinkPost: {
    url: createPost.url,
    defaultConfig: wrapConfig({
      url: '', // require
      // title: '',
      // description: '',
      // thumbnail: '',
      // excerpt: '',
      // author: ''
    })
  },
  createChatPost: {
    url: createPost.url,
    defaultConfig: wrapConfig({
      // title: '',
      conversation: '' , // require
    })
  },
  createAudioPost: {
    url: createPost.url,
    defaultConfig: wrapConfig({
      // caption: '',
      // external_url: '' , // require
      // data: '', // require
    })
  },
  createVideoPost: {
    url: createPost.url,
    defaultConfig: wrapConfig({
      // caption: '',
      // embed: '' , // require
      // data: '', // require
    })
  },
  editPost: {
    url: ({blogIdentifier}) => wrapUrl(`/blog/${blogIdentifier}/post/edit`),
    defaultConfig: wrapConfig({
      id: '', // require
    })
  },
  reblogPost: {
    url: ({blogIdentifier}) => wrapUrl(`/blog/${blogIdentifier}/post/reblog`),
    defaultConfig: {
      id: '', // require
      reblog_key: '', //require
      // comment: '',
      // native_inline_images: ''
    }
  },
  deletePost: {
    url: ({blogIdentifier}) => wrapUrl(`/blog/${blogIdentifier}/post/delete`),
    defaultConfig: {
      id: '', // require
    }
  },
  followBlog: {
    url: wrapUrl('/user/follow'),
    defaultConfig: {
      url: ''
    }
  },
  unfollowBlog: {
    url: wrapUrl('/user/unsfollow'),
    defaultConfig: {
      url: ''
    }
  },
  likePost: {
    url: wrapUrl('/user/like'),
    defaultConfig: {
      id: 0,
      reblog_key: ''
    }
  },
  unlikePost: {
    url: wrapUrl('/user/unlike'),
    defaultConfig: {
      id: 0,
      reblog_key: ''
    }
  }
}
