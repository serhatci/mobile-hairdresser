class PrivateMessage {
  constructor(sender, receiver, message, id) {
    this.sender = sender
    this.receiver = receiver
    this.message = message
    this.id = id
    this.date = new Date()
  }
}

module.exports = PrivateMessage
