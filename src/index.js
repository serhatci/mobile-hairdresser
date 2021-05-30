/* eslint-disable no-console */
const Customer = require('./customer')
const Hairdresser = require('./hairdresser')
const Photo = require('./photo')
const Video = require('./video')

const hairdresser = new Hairdresser('Hair', 'Dresser', 'hair@dresser.com', 'password')
const customer = new Customer('Customer', 'Surname', 'customer@customer.com', 'customerPassword')

// Hairdresser uploads photo and video to his portfolio
const photo = new Photo('image.jpg', 'With my best customer')
const video = new Video('video.mpeg', 'Customer Visit Heidelberg', 'This was my first customer ever')
hairdresser.uploadPhotoToPortfolio(photo)
hairdresser.uploadVideoToPortfolio(video)
// console.log('\nHairdresser added new photo and video:\n ', hairdresser.photos, hairdresser.videos)

// Hairdresser tags a user to the uploaded photo adn video
hairdresser.tagPhoto(photo, customer)
hairdresser.tagVideo(video, customer)
// console.log('\nHairdresser tagged customer to the photo and video:\n ', hairdresser.photos, hairdresser.videos)

// Customer likes Hairdresser's photo & video
customer.likePhoto(photo)
customer.likeVideo(video)
// console.log('\nCustomer liked a photo & video of Hairdresser\n ', hairdresser.photos, hairdresser.videos)

// Customer posts a Hairdresser Request
const customerRequest = customer.writeCustomerRequest(
  'Hairdresser Request',
  'Urgent Help Please!...',
  'I am looking for a mobile hairdresser on this weekends. Can anyone help me?'
)
customer.postRequest(customerRequest)
// console.log('\nCustomers created a Hairdresser requests:\n ', customer.customerRequests)

// Hairdresser replies Customer`s Request
const replyPhoto = new Photo('map.jpeg')
const replyPhoto2 = new Photo('map2.jpeg')
const reply = hairdresser.writeReply('I can help! Please PM me!...', replyPhoto, replyPhoto2)
hairdresser.replyToCustomerRequest(customerRequest, reply)
// console.log( '\nHairdresser replied to customer request:\n ', customer.customerRequests, reply)

// Customer answers back to hairdresser
const replyToRequest = customer.writeReply('I sent you a PM!...')
customer.replyToCustomerRequest(customerRequest, replyToRequest)
// console.log(customerRequest)

// Show Hairdresser Portfolio
// console.log('\nHairdresser portfolio:\n', hairdresser.portfolio)

// Show Customer Info
// console.log('\nCustomer info:\n', customer.info)

// Customer sends a PM to Hairdresser
const customerPM = customer.writePrivateMessage(hairdresser, 'hii...', 'Hello... Can you send me your price list?')
customer.sendPrivateMessage(customerPM)
// console.log('\nHairdresser PM:\n', hairdresser.messageBox.unseenMessages, hairdresser.messageBox.seenMessages)
// console.log('\nCustomer PM:\n', customer.messageBox.seenMessages, customer.messageBox.unseenMessages)

// Hairdresser Reads Customer PM
hairdresser.readPrivateMessage(customerPM)
// console.log('\nHairdresser PM:\n', hairdresser.messageBox.unseenMessages, hairdresser.messageBox.seenMessages)

// Hairdresser replies to Customer's PM
const hairdresserPM = hairdresser.writePrivateMessage(
  customer,
  'Hello... You can see my price list at my portfolio page'
)
hairdresser.sendPrivateMessage(hairdresserPM)
// console.log('\nHairdresser PM:\n', hairdresser.messageBox.unseenMessages, hairdresser.messageBox.seenMessages)
// console.log('\nCustomer PM:\n', customer.messageBox.seenMessages, customer.messageBox.unseenMessages)

// Hairdresser & Customer deletes seen messages
hairdresser.deletePrivateMessage(customerPM)
hairdresser.deletePrivateMessage(hairdresserPM)
customer.deletePrivateMessage(customerPM)
customer.readPrivateMessage(hairdresserPM)
customer.deletePrivateMessage(hairdresserPM)
// console.log('\nHairdresser PM:\n', hairdresser.messageBox.unseenMessages, hairdresser.messageBox.seenMessages)

// Hairdresser send a PM and recall it later
const recallMessage = hairdresser.writePrivateMessage(customer, 'Hiii', 'this msg will be recalled')
hairdresser.sendPrivateMessage(recallMessage)
console.log('\nCustomer PM:\n', customer.messageBox.unseenMessages)
console.log('\nHairdresser PM:\n', hairdresser.messageBox.seenMessages)
hairdresser.recallPrivateMessage(recallMessage)
console.log('\nCustomer PM:\n', customer.messageBox.unseenMessages)
console.log('\nHairdresser PM:\n', hairdresser.messageBox.seenMessages)
