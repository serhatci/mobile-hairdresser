// THIS MODEL WILL BE IMPLEMENTED LATER

// const mongoose = require('mongoose')

// const MessageBoxSchema = new mongoose.Schema(
//   {
//     seenMessages: [],
//     unseenMessages: [],
//   },
//   { _id: false }
// )

// class MessageBox {
//   async receiveMessage(message) {
//     this.unseenMessages.push(message)
//     await this.save()
//   }

//   async storeSentMessage(message) {
//     this.seenMessages.push(message)
//     await this.save()
//   }

//   async deleteSeenMessage(message) {
//     this.seenMessages = this.seenMessages.filter(m => m !== message)
//     await this.save()
//   }

//   async deleteUnseenMessage(message) {
//     this.unseenMessages = this.unseenMessages.filter(m => m !== message)
//     await this.save()
//   }

//   async setMessageAsSeen(message) {
//     this.seenMessages.push(message)
//     this.unseenMessages = this.unseenMessages.filter(m => m !== message)
//     await this.save()
//   }

//   async setMessageAsUnseen(message) {
//     this.unseenMessages.push(message)
//     this.seenMessages = this.seenMessages.filter(m => m !== message)
//     await this.save()
//   }
// }

// MessageBoxSchema.loadClass(MessageBox)
// module.exports = MessageBoxSchema
