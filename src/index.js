/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const IdGenerator = require('./id-generator')
const Customer = require('./customer')
const Hairdresser = require('./hairdresser')
const Photo = require('./photo')
const Video = require('./video')
const Certificate = require('./certificate')
const Rating = require('./rating')
const CustomerRequest = require('./post-request')
const ReplyToRequest = require('./post-reply')
const PrivateMessage = require('./private-message')

const id = new IdGenerator()
const hairdresser = new Hairdresser('Hair', 'Dresser', 'hair@dresser.com', 'password', id.generate())
const customer = new Customer('Customer', 'Surname', 'customer@customer.com', 'customerPassword', id.generate())

console.log('\n----ID check----')
console.log('Hairdresser ID:', hairdresser.id)
console.log('Customer ID:', customer.id)

console.log('\n----Hairdresser uploads photo to his portfolio----')
const photo = new Photo('image.jpg', id.generate())
hairdresser.uploadPhoto(photo)
console.log('Hairdresser`s photos: ', hairdresser.photos)

console.log('\n----Hairdresser tags user to uploaded photo----')
hairdresser.tagPhoto(photo, customer)
console.log('Hairdresser`s photos: ', hairdresser.photos)

console.log('\n----Customer likes Hairdresser`s photo----')
customer.likePhoto(photo)
console.log('Hairdresser`s photos: ', hairdresser.photos)

console.log('\n----Customer posts Hairdresser Request----')
const hairdresserRequest = new CustomerRequest(
  customer,
  'Hairdresser Request',
  'I am looking for a mobile hairdresser on this weekends. Can anyone help me?',
  id.generate()
)
customer.postRequest(hairdresserRequest)
console.log('Customers`s requests: ', customer.customerRequests)

console.log('\n----Hairdresser replies Customer`s Request----')
const replyToRequest = new ReplyToRequest(hairdresser, 'I can help! Please PM me!...', id.generate())
hairdresser.replyToCustomerRequest(hairdresserRequest, replyToRequest)
console.log('Customers`s requests: ', customer.customerRequests)

console.log('\n----Show Hairdresser Portfolio----')
console.log(hairdresser.portfolio)
