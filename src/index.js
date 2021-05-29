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

console.log('\n----ID check----')
console.log('Hairdresser ID:', hairdresser.id)
console.log('Customer ID:', customer.id)

console.log('\n----Hairdresser uploads photo to his portfolio----')
const photo = new Photo('image.jpg')
hairdresser.uploadPhoto(photo)
console.log('Hairdresser`s photos: ', hairdresser.photos)

console.log('\n----Hairdresser tags user to uploaded photo----')
hairdresser.tagPhoto(photo, customer)
console.log('Hairdresser`s photos: ', hairdresser.photos)

console.log('\n----Customer likes Hairdresser`s photo----')
customer.likePhoto(photo)
console.log('Hairdresser`s photos: ', hairdresser.photos)

console.log('\n----Customer posts Hairdresser Request----')
const customerRequest = customer.writeCustomerRequest(
  'Hairdresser Request',
  'I am looking for a mobile hairdresser on this weekends. Can anyone help me?'
)
customer.postRequest(customerRequest)
console.log('Customers`s requests: ', customer.customerRequests)

console.log('\n----Hairdresser replies Customer`s Request----')
const reply = hairdresser.writeReply('I can help! Please PM me!...')
hairdresser.replyToCustomerRequest(customerRequest, reply)
console.log('Customers`s requests: ', customer.customerRequests)

console.log('\n----Show Hairdresser Portfolio----')
console.log(hairdresser.portfolio)
