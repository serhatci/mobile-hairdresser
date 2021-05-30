class MessageBox {
  seenMessages = []

  unseenMessages = []

  receiveMessage(message) {
    this.unseenMessages.push(message)
  }

  storeSentMessage(message) {
    this.seenMessages.push(message)
  }

  deleteSeenMessage(message) {
    this.seenMessages = this.seenMessages.filter(m => m !== message)
  }

  deleteUnseenMessage(message) {
    this.unseenMessages = this.unseenMessages.filter(m => m !== message)
  }

  tagMessageAsSeen(message) {
    this.seenMessages.push(message)
    this.unseenMessages = this.unseenMessages.filter(m => m !== message)
  }

  tagMessageAsUnseen(message) {
    this.unseenMessages.push(message)
    this.seenMessages = this.seenMessages.filter(m => m !== message)
  }
}

module.exports = MessageBox
