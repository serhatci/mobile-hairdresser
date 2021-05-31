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
// console.log('\nHairdresser added new photo and video:\n ', hairdresser.portfolioPhotos, hairdresser.portfolioVideos)

// Hairdresser deletes photo and video from his portfolio
// hairdresser.deletePhotoFromPortfolio(photo)
// hairdresser.deleteVideoFromPortfolio(video)
// console.log('\nHairdresser added new photo and video:\n ', hairdresser.portfolioPhotos, hairdresser.portfolioVideos)

// Hairdresser tags a user to the uploaded photo & video
hairdresser.tagPhoto(photo, customer)
hairdresser.tagVideo(video, customer)
// console.log(
//   '\nHairdresser tagged customer to the photo and video:\n ',
//   hairdresser.portfolioPhotos,
//   hairdresser.portfolioVideos
// )

// Hairdresser untags a user to the uploaded photo & video
// hairdresser.unTagPhoto(photo, customer)
// hairdresser.unTagVideo(video, customer)
// console.log(
//   '\nHairdresser untagged customer to the photo and video:\n ',
//   hairdresser.portfolioPhotos,
//   hairdresser.portfolioVideos
// )

// Customer likes Hairdresser's photo & video
customer.likePhoto(photo)
customer.likeVideo(video)
// console.log(
//   '\nCustomer liked a photo & video of Hairdresser\n ',
//   hairdresser.portfolioPhotos,
//   hairdresser.portfolioVideos
// )

// customer.unlikePhoto(photo)
// customer.unlikeVideo(video)
// console.log(
//   '\nCustomer unlikes a photo & video of Hairdresser\n ',
//   hairdresser.portfolioPhotos,
//   hairdresser.portfolioVideos
// )

// Customer posts a Hairdresser Request
customer.postRequest(
  'Hairdresser Request',
  'Urgent Help Please!...',
  'I am looking for a mobile hairdresser on this weekends. Can anyone help me?'
)
// // console.log('\nCustomers created a Hairdresser requests:\n ', customer.customerRequests)
// const request = customer.customerRequests[0]
// customer.deleteRequest(request)
// // console.log('\nCustomers created a Hairdresser requests:\n ', customer.customerRequests)

// Hairdresser replies Customer`s Request
const replyPhoto = new Photo('map.jpeg')
const replyPhoto2 = new Photo('map2.jpeg')
const customerRequest = customer.customerRequests[0]
hairdresser.replyToCustomerRequest(customerRequest, 'I can help! Please PM me!...', replyPhoto, replyPhoto2)
// console.log('\nHairdresser replied to customer request:\n ', customerRequest)

// Customer answers back to hairdresser
customer.replyToRequest(customerRequest, 'I sent you a PM!...')
// console.log(customerRequest)

// Show Hairdresser Portfolio
// console.log('\nHairdresser portfolio:\n', hairdresser.portfolio)

// Show Customer Info
// console.log('\nCustomer info:\n', customer.info)

// Customer sends a PM to Hairdresser
customer.sendPrivateMessage(hairdresser, 'hii...', 'Hello... Can you send me your price list?')
// console.log('\nHairdresser PM:\n', hairdresser.messageBox.unseenMessages, hairdresser.messageBox.seenMessages)
// console.log('\nCustomer PM:\n', customer.messageBox.seenMessages, customer.messageBox.unseenMessages)

// Hairdresser Reads Customer PM
const newPM = hairdresser.messageBox.unseenMessages[0]
hairdresser.readPrivateMessage(newPM)
// console.log('\nHairdresser PM:\n', hairdresser.messageBox.unseenMessages, hairdresser.messageBox.seenMessages)

// Hairdresser replies to Customer's PM
hairdresser.sendPrivateMessage(customer, 'Hello... You can see my price list at my portfolio page')
// console.log('\nHairdresser PM:\n', hairdresser.messageBox.unseenMessages, hairdresser.messageBox.seenMessages)
// console.log('\nCustomer PM:\n', customer.messageBox.seenMessages, customer.messageBox.unseenMessages)

// Customer Reads Hairdresser's PM
const newPM2 = customer.messageBox.unseenMessages[0]
customer.readPrivateMessage(newPM2)
// console.log('\nHairdresser PM:\n', hairdresser.messageBox.unseenMessages, hairdresser.messageBox.seenMessages)

// Hairdresser & Customer deletes seen messages
hairdresser.deletePrivateMessage(newPM)
hairdresser.deletePrivateMessage(newPM2)
customer.deletePrivateMessage(newPM)
customer.deletePrivateMessage(newPM2)
// console.log('\nHairdresser PM:\n', hairdresser.messageBox.unseenMessages, hairdresser.messageBox.seenMessages)

// Hairdresser send a PM and recall it later
hairdresser.sendPrivateMessage(customer, 'Hiii', 'this msg will be recalled')
// console.log('\nCustomer PM:\n', customer.messageBox.unseenMessages)
// console.log('\nHairdresser PM:\n', hairdresser.messageBox.seenMessages)
const recallMessage = hairdresser.messageBox.seenMessages[0]
hairdresser.recallPrivateMessage(recallMessage)
// console.log('\nCustomer PM:\n', customer.messageBox.unseenMessages)
// console.log('\nHairdresser PM:\n', hairdresser.messageBox.seenMessages)

// Customer reviews Hairdresser
customer.reviewHairdresser(hairdresser, 'He was so good!...', 5)
console.log('\nHairdresser customer reviews:\n ', hairdresser.customerReviews)
