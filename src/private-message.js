class PrivateMessage {
  constructor(sender, receiver, message) {
    this.sender = sender
    this.receiver = receiver
    this.message = message
    this.id = id.generate()
    this.date = new Date()
  }
}

module.exports = PrivateMessage