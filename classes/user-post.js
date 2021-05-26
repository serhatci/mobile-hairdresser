class UserPost {
    // Base class for posts
    constructor(user, postMessage, id) {
        this.user = user
        this.postMessage = postMessage
        this.id = id
        this.date = new Date()
    }
}
class CustomerRequest extends UserPost {
    constructor(user, type, postMessage, id) {
        super(user, postMessage, id)
        this.type = type
        this.replies = []
        this.photos = [] // optional
    }
}

class ReplyToRequest extends UserPost {
    constructor(user, postMessage, id) {
        super(user, postMessage, id)
        this.photos = [] // optional
    }
}

module.exports = { CustomerRequest, ReplyToRequest }