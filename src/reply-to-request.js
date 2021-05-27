const UserPost = require('./user-post');

class ReplyToRequest extends UserPost {
  constructor(user, postMessage, id) {
    super(user, postMessage, id);
    this.photos = []; // optional
  }
}

module.exports = ReplyToRequest;
