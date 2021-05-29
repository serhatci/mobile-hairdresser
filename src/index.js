/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const IdGenerator = require('./id-generator')
const Customer = require('./customer')
const Hairdresser = require('./hairdresser')
const Photo = require('./photo')
const Video = require('./video')
const Certificate = require('./certificate')
const Rating = require('./rating')
const PrivateMessage = require('./private-message')

const hairdresser = new Hairdresser('Hair', 'Dresser', 'hair@dresser.com', 'password')
const customer = new Customer('Customer', 'Surname', 'customer@customer.com', 'customerPassword')

// Hairdresser uploads photo to his portfolio
const photo = new Photo('image.jpg')
hairdresser.uploadPhoto(photo)
console.log('\nHairdresser added new photo:\n ', hairdresser.photos)

// Hairdresser tags a user to the uploaded photo
hairdresser.tagPhoto(photo, customer)
console.log('\nHairdresser tagged customer to the photo:\n ', hairdresser.photos)

// Customer likes Hairdresser`s photo
customer.likePhoto(photo)
console.log('\nCustomer liked a photo of Hairdresser\n ', hairdresser.photos)

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
console.log(hairdresser.portfolio)
