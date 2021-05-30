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
console.log('\nHairdresser added new photo and video:\n ', hairdresser.photos, hairdresser.videos)

// Hairdresser tags a user to the uploaded photo adn video
hairdresser.tagPhoto(photo, customer)
hairdresser.tagVideo(video, customer)
console.log('\nHairdresser tagged customer to the photo and video:\n ', hairdresser.photos, hairdresser.videos)

// Customer likes Hairdresser's photo & video
customer.likePhoto(photo)
customer.likeVideo(video)
console.log('\nCustomer liked a photo & video of Hairdresser\n ', hairdresser.photos, hairdresser.videos)

// Customer posts a Hairdresser Request
const customerRequest = customer.writeCustomerRequest(
  'Hairdresser Request',
  'Urgent Help Please!...',
  'I am looking for a mobile hairdresser on this weekends. Can anyone help me?'
)
customer.postRequest(customerRequest)
console.log('\nCustomers created a Hairdresser requests:\n ', customer.customerRequests)

// Hairdresser replies Customer`s Request
const reply = hairdresser.writeReply('I can help! Please PM me!...')
hairdresser.replyToCustomerRequest(customerRequest, reply)
console.log('\nHairdresser replied to customer request:\n ', customer.customerRequests)

// Show Hairdresser Portfolio
console.log('\nHairdresser portfolio:\n', hairdresser.portfolio)

// Show Customer Info
console.log('\nCustomer info:\n', customer.info)

// Customer sends a PM to Hairdresser
const customerPM = customer.writePrivateMessage(hairdresser, 'Hello... Can you send me your price list?')
customer.sendPrivateMessage(hairdresser, customerPM)
customer.storePrivateMessage(customerPM)
console.log('\nHairdresser PM:\n', hairdresser.privateMessages)

// Hairdresser replies to Customer's PM
const hairdresserPM = hairdresser.writePrivateMessage(
  customer,
  'Hello... You can see my price list at my portfolio page'
)
hairdresser.sendPrivateMessage(customer, hairdresserPM)
hairdresser.storePrivateMessage(hairdresserPM)
console.log('\nCustomer PM:\n', customer.privateMessages)
