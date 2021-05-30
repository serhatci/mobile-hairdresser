class PrivateMessage {
  constructor(sender, receiver, title = '', message) {
    this.id = undefined
    this.createdAt = new Date()
    this.sender = sender
    this.receiver = receiver
    this.title = title
    this.message = message
  }
}

module.exports = PrivateMessage
